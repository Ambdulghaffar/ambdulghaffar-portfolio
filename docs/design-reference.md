# Design diagnostic — reference portfolio (Vue.js)

> Structural and visual analysis only. No content (copy, links, personal
> data) is reproduced below — only how the UI is built.
> Stack of the analyzed repo: Vue 3 + Vite + TypeScript + Tailwind CSS v3 (legacy config,
> essentially a manual clone of the Tailwind defaults) + Pinia + Vue Router.

## Color system & theme

**Single, dark** theme, no real light mode despite `darkMode: "media"` in
`tailwind.config.js` (no `dark:` class is used in a functional way across
the views — a single residual trace in `CloseButton.vue`, with no theme switch anywhere
in the app).

Hardcoded palette (raw hex values in the template, no CSS tokens/variables):

| Role | Value | Usage |
|---|---|---|
| Global background | `#0a192f` (very dark navy) | `body { background-color }`, utility class `.BG0` (cards, panels) |
| Accent / primary | `#FD6F00` (orange) | CTA, active nav item, scrollbar thumb, `.primary` class (highlighted text), halo/scrollbar-track (orange `box-shadow`) |
| Default text | `aliceblue` (near-white) | text on dark background |
| Light background (modals, mobile menu, white cards) | `#ffffff` | `ModalComponent`, mobile menu panel |
| Semantic — error | bg `#fdf4f4`, border `#d14342`, text `#A73636` | alert toast |
| Semantic — success | bg `#e0ffe3`, border `#008120`, text `#16a700` | alert toast |
| Semantic — info | bg `#F4F6FA`, border `#474D66`, text `#474D66` | alert toast |

No CSS gradient used for the background or headings. There is however a **background
image layer**: `App.vue` overlays a full-screen image (`desktop-wallpaper-portfolio.jpg`)
positioned `absolute inset-0`, `bg-cover bg-center`, `opacity-50`, behind all
content (`relative z-10`) — this creates a depth/texture effect on the navy background rather
than a flat color.

Colors are **not** centralized (no `:root` CSS variables, no custom
`theme.colors` extension in Tailwind): they're repeated as arbitrary values
(`text-[#FD6F00]`, `bg-[#0a192f]`, etc.) throughout — a token system would be a
real improvement at the time of the port.

## Typography

No custom font loaded (no Google Fonts `<link>`, no `@font-face`). The
Tailwind config entirely overrides `fontFamily` with the system defaults:
`ui-sans-serif, system-ui, sans-serif, ...`. There are `font-work-sans` classes
used in `InputField.vue` / `TextArea.vue`, but "work-sans" is declared nowhere
in the theme → dead class, no effect (silently falls back to the system font).

Observed size hierarchy (default Tailwind, no custom scale):
- Hero: name in `text-2xl font-bold`, two-line display heading up to `lg:text-8xl font-extrabold`
- Section titles ("About Me", "SKILLS", "PROJECTS"): `text-2xl`/`text-3xl font-bold`
- Body text: `text-lg` / `text-base`
- Form labels: `text-base font-semibold`

No custom `line-height`/`letter-spacing` beyond the Tailwind defaults.

## Overall layout

This is **not** a single page with anchors — it's a multi-route SPA (Vue Router):
`/` (Landing/Hero), `/about`, `/skills`, `/projects`, a catch-all 404. Navigation changes
the route and transitions the displayed component.

Shell structure (`App.vue`):
```
<div relative min-h-screen>
  <div absolute inset-0>  ← background image, opacity-50
  <div relative z-10 w-3/4 m-auto>  ← content container
      <TopNavBar />
      <AlertComponent v-if="open" />   ← toast, positioned fixed independently
      <RouterView> (with route transition)
```
- **Container**: no breakpoint-based `max-w-*` design-system approach — just `w-3/4 m-auto`
  (75% of viewport width, centered) applied to the entire content column, regardless of
  screen size. No additional horizontal padding finely managed below `lg`.
- **Header**: `TopNavBar` is **not sticky/fixed** — it scrolls with the page, at the top of
  the normal flow. No "transparent then solid on scroll" behavior: the style is
  static (`shadow-md`, transparent background over the global background).
- **Footer**: absent. No footer component in the repo.
- **Spacing/grids**: default Tailwind spacing, layouts mostly in
  `flex` + `flex-wrap` (no CSS Grid for card lists, except for an
  unused `GridComponent.vue` component — see below).

## Identified sections

Since the site is multi-page, here's the "sections of a homepage" equivalent split by route:

1. **Hero / Landing (`/`)** — 2-column `flex` layout:
   - Left: short tagline + name (orange) + two-line display heading + paragraph + "Contact me" CTA button (opens a modal)
   - Right (desktop only, hidden on mobile/tablet): profile photo + row of social media icons
   - The CTA opens a **contact modal** (form), not a dedicated section

2. **About (`/about`)**:
   - Intro block in `flex`: photo (desktop only) on the left + "About Me" title + bio paragraphs + social icons on the right
   - Following section, full width: additional paragraphs, then a "bold title + description" list (professional approach), then closing paragraphs — all as a simple vertical stack of `<p>` elements, no cards

3. **Skills (`/skills`)**:
   - Title + grid of cards (`flex flex-wrap`, no fixed columns) — one square card per skill (icon + name)
   - Automatic animation effect: one card at a time is highlighted ("pulsate", `scale-95`) in a loop via a JS `setInterval` every 2s, independent of scroll or hover

4. **Projects (`/projects`)**:
   - Same visual structure as Skills (reuses the **same component**, `SkillsCard`, with the project screenshot in place of the icon) — `flex flex-wrap` grid, each card is an external link to the deployed project
   - Same auto-cycling highlight effect

5. **Contact** — not a separate page/section: a **modal** (`ModalComponent`) triggered from the Hero, containing a form (Name, Email, Message) that POSTs to an external API, with feedback via toast (success/error)

6. **404 (catch-all)** — centered SVG illustration + message + "back to home" button

Worth noting: the repo also contains components that are **unused** in the current routes
(dead code on the design side, but informative):
- `ProjectCard.vue` — a more "classic" project card variant (full-width image on top, title, "View Project >" button aligned bottom-right), different from `SkillsCard`, never mounted in the router
- `GridComponent.vue` — a generic CSS Grid wrapper (`repeat(auto-fill, minmax(186px,1fr))`), unused
- `SliderComponent.vue` — a disabled range input styled as a "skill level gauge" (%), unused

## Notable UI components

- **ButtonComponent** — solid orange button (`#FD6F00`), white text, rounded corners
  (`rounded-md`). Disabled state → light orange + `cursor-not-allowed`. Loading state →
  inline SVG spinner (`LoaderIcon`, `animate-spin`) shown before the text.
- **SkillsCard** (reused for both skills AND projects) — square card 208×208px, navy
  background, white border/shadow, icon + label centered. Hover: `scale-90` (slight
  shrink, not a grow) + elevated `z-index`. An "active" state cycled automatically
  applies `scale-95`.
- **ProjectCard** (unwired variant) — 364×288px card, image on top, title +
  link button at the bottom. Hover: `scale-105` + `shadow-lg`, 300ms transition.
- **ModalComponent** — full-screen semi-transparent black overlay, closes on click on
  the backdrop (detected via the `closeModal` CSS class), centered white box with header
  (title + `CloseButton`) and a `<slot>` for the content.
- **AlertComponent** (toast) — fixed card top-right, color based on severity
  (error/success/info) with a dedicated icon, manual dismiss (`CloseButton`) or
  auto-dismiss after 60s (progress bar coded but visually hidden —
  `hidden` on the container). Animated enter/exit.
- **TopNavBar** — logo/name on the left, desktop links (`lg+`) with a solid orange dot
  on the active item (current route), white border on hover for inactive items.
  Below `lg`, a hamburger button opens a `fixed` panel (2/3 of the width, white background)
  that slides in from the top.
- **InputField / TextArea** — label + bordered field, fixed width in px (400px), rounded
  corner `rounded-lg`. Bug noted: the orange border is on `active:` instead of
  `focus:` (so it doesn't produce the expected focus effect) — worth fixing rather than reproducing.
- **SocialMedia** — simple row of icon links (PNG images), fixed size 40×40px.
- **CloseButton** — minimal icon button, reused by Modal and Alert.
- **LoaderIcon** — inline SVG spinner, used in `ButtonComponent` during async
  actions.

## Animations & interactions

No external animation library (no GSAP, no Framer/Motion, no AOS) —
everything relies on **Vue's native transition system** (`<Transition>` /
`<TransitionGroup>`) combined with `enter/leave` CSS classes, plus
Tailwind utilities for hover:

- **Route transition** (`App.vue`, `.route-*` classes): opacity fade (`0.2 → 1`),
  `mode="out-in"`, 0.3s ease-out on enter / ease-in on exit. No translation
  (the `translateY` is present but commented out).
- **Alert toast** (`.list-*` classes via `TransitionGroup`): fade + horizontal slide
  (`translateX(100px)`), 0.5s ease.
- **Mobile menu panel** (`TopNavBar`, `.fade-*` classes): fade + vertical slide
  (`translateY(±100px)`), 0.3s ease-out.
- **Hover on cards**: `transition duration-300` + `hover:scale-*` (grow on
  `ProjectCard`, slight shrink on `SkillsCard`) + `hover:shadow-lg`.
- **Auto-cycling "spotlight" effect** on the Skills/Projects grids: a composable
  (`useSetInterval`) increments an index every 2 seconds in a loop, applying a
  `scale-95` class to one card at a time sequentially — a passive attention effect,
  time-triggered (not by scroll or hover).
- **No scroll animation at all** (no `IntersectionObserver`, no scroll-reveal).
- Loading spinner (Tailwind's `animate-spin`) on the button during async
  submission of the contact form.

## Responsive

Custom breakpoints declared in `tailwind.config.js`:
`2xs: 320px, xs: 470px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`.

Dominant pattern: **explicit show/hide per breakpoint** rather than grid
reflow — e.g. `2xs:hidden xs:hidden sm:hidden md:hidden lg:flex` for
desktop-only content (profile photo, horizontal nav) vs. `lg:hidden` for the hamburger.

- Nav: switches to a hamburger below `lg` (1024px) → partial `fixed` panel (2/3 width),
  not a full-screen overlay.
- Skills/Projects grids: `flex-wrap` with no fixed columns per breakpoint → natural
  reflow based on available width, no media-query-driven `grid-cols-{n}`.
- Hero: text sizes that scale up progressively (`sm:` → `md:` → `lg:text-8xl`).
- Weak points not to reproduce as-is: several fixed pixel widths
  (400px inputs, 800×200px About image) that aren't fluid and can overflow on
  very small screens — a sign that responsiveness wasn't audited below `xs`.

## Port plan to Next.js/Tailwind/shadcn

**shadcn/ui components to use as a base:**

| Need (Vue reference) | shadcn/ui component |
|---|---|
| `ModalComponent` (contact) | `Dialog` — overlay, click-outside, focus trap already handled |
| `AlertComponent` (toast) | `Sonner` (toast) — auto-dismiss, stacking, accessible by default |
| Desktop nav | `NavigationMenu` (or simple styled links if the nav stays basic) |
| Mobile nav panel | `Sheet` — exactly replaces the custom `fixed` hamburger panel |
| `ButtonComponent` | `Button` (`default` variant, loading state with lucide-react's `Loader2`) |
| `SkillsCard` / `ProjectCard` | `Card` (`CardHeader`, `CardContent`, `CardFooter`) as the structure, with custom styles on top |
| Tech stack tags (if you add them) | `Badge` |
| `InputField` / `TextArea` | `Input` / `Textarea` + `Label` (fixes the `focus:` vs `active:` bug along the way) |
| Profile photo | `Avatar` (optional) |

**Framer Motion vs. Tailwind alone:**
- Card hover (scale/shadow) and Dialog/Sheet/Toast transitions are already
  natively covered by shadcn/Radix (`data-[state=]` + Tailwind) → **no need for
  Framer Motion for that**.
- However, two effects from the reference have no direct native Next.js equivalent:
  1. The Vue route transition (`mode="out-in"`) — the Next.js App Router has no
     built-in equivalent mechanism. If you keep separate pages, this would require
     Framer Motion's `AnimatePresence` inside a `template.tsx`. Recommendation:
     rather than reproducing route transitions, consider **merging Hero/About/
     Skills/Projects into a single page with anchored sections** (a more common
     portfolio pattern, and simpler to animate) — see the rebuild order below.
  2. The "auto-cycling spotlight" effect (one card highlighted every 2s) and a
     possible scroll reveal for the grids — doable in plain Tailwind (a class + `setInterval`
     like the original), but **Framer Motion** (`whileInView`, `staggerChildren`) gives a
     cleaner result for cards cascading in on scroll, which is absent from the
     reference but consistent with this type of design.
  → **Recommendation: plain Tailwind is enough for 90% of the UI (hover, focus, Dialog/Sheet/
  Toast); add Framer Motion only for section transitions/scroll-reveal
  and the cascading entrance of the grids**, rather than for everything else.

**Logical rebuild order:**
1. Design tokens: colors (navy/orange → Tailwind v4 `@theme` CSS variables), radius,
   typeface (choose a deliberate Google Font, unlike the reference which has none)
2. Layout shell: header (desktop nav + mobile `Sheet`), container, background layer
   (to decide: image, gradient, or flat background — the original mixes both)
3. UI primitives via `shadcn init`: `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Dialog`, `Sheet`, `Sonner`
4. Hero section
5. About section
6. Skills section (grid + cascading entrance effect)
7. Projects section (grid + cards, reuses the same primitives as Skills)
8. Contact — either a modal (`Dialog`) like the original, or a dedicated section at the bottom of the page
9. Footer (absent from the reference — to be designed, the original has none)
10. 404 page (`not-found.tsx`)
11. i18n: wire up all text via `next-intl` once the structure is validated
12. Polish: focus-visible states, dark/light mode if desired (absent from the original), fine-grained responsive below `xs`
