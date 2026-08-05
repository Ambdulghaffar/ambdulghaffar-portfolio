# Diagnostic of the existing codebase — my-portfolio

> Read-only document. No repo file was modified to produce this diagnostic.
>
> ⚠️ **Note on the context provided**: the initial prompt was supposed to paste the content of
> `design_diagnostic.md` (diagnostic of the Vue reference) but that content didn't arrive in the
> message received — only the placeholder `[Paste the full content here...]` came through. The
> "Anticipated friction points" section below is therefore based on the generic comparison points
> you listed yourself in the prompt (multi-page vs anchored sections, Framer Motion + i18n), not on
> the actual detail of the reference. Paste the file again if you want a more precise point-by-point
> comparison.

---

## 1. Current stack and configuration

| Package | Version |
|---|---|
| next | **16.2.10** |
| react / react-dom | 19.2.4 |
| next-intl | ^4.13.1 |
| tailwindcss | ^4 (+ `@tailwindcss/postcss`) |
| shadcn (CLI) | ^4.13.0 |
| @base-ui/react | ^1.6.0 |
| next-themes | ^0.4.6 |
| tw-animate-css | ^1.4.0 |
| class-variance-authority, clsx, tailwind-merge | standard shadcn utilities |
| lucide-react | ^1.23.0 (icons) |
| resend | ^6.17.1 (sends the contact form email) |

**Structural points not to miss:**

- **Next.js 16 replaced `middleware.ts` with [proxy.ts](src/proxy.ts)**. The file already exists and
  wraps next-intl's `createMiddleware(routing)` — that's the proxy's only job (locale negotiation).
  Keep as-is.
- **shadcn uses `@base-ui/react`, not Radix.** The configured shadcn style is `"base-nova"`
  ([components.json](components.json)). This shows up in [button.tsx](src/components/ui/button.tsx):
  the `render={<Link ... />}` pattern + `nativeButton={false}` prop instead of the usual Radix
  `asChild`. **Important for the redesign**: any "classic" shadcn doc/snippet found online
  (Radix-based) won't drop in directly against these primitives' API — it'll need adapting to
  base-ui's `render` pattern.
- Tailwind v4: no `tailwind.config.js`, everything is driven by `@theme` in
  [globals.css](src/app/globals.css) (config `"tailwind": { "config": "" }` in components.json).

**App Router — existing route structure:**

```
src/app/
├── globals.css
├── favicon.ico
├── api/contact/route.ts        (POST — sends the form via Resend)
└── [locale]/
    ├── layout.tsx               (fonts, ThemeProvider, NextIntlClientProvider, metadata)
    ├── page.tsx                 (single page with anchored sections)
    └── projects/page.tsx        (full list of projects)
```

**next-intl configuration:**

- [src/i18n/routing.ts](src/i18n/routing.ts): locales `["fr", "en"]`, `defaultLocale: "fr"`,
  `localePrefix: "as-needed"` → French (the default locale) has **no** URL prefix
  (`/projects`), English does (`/en/projects`).
- [src/i18n/request.ts](src/i18n/request.ts): loads `messages/{locale}.json` dynamically.
- [src/i18n/navigation.ts](src/i18n/navigation.ts): exports localized `Link`, `useRouter`,
  `usePathname` (next-intl wrappers).
- [src/proxy.ts](src/proxy.ts): locale negotiation via a matcher that excludes `api`, `_next`,
  `_vercel`, and static files.
- Translation files: [messages/fr.json](messages/fr.json) and
  [messages/en.json](messages/en.json), organized by namespace (`Nav`, `Hero`, `Stack`, `About`,
  `Projects`, `Experience`, `Contact`, `Footer`, `Common`) — these are **UI labels**, not
  content (see Data section).
- There is **no long-form translated content in the messages JSON files**: all "business" text (bio,
  project titles, descriptions...) lives in `src/data/*.json` as
  `{ fr: "...", en: "..." }` objects — two translation systems coexist (UI via next-intl,
  content via homegrown bilingual data). Keep this in mind for the redesign.

---

## 2. Current color system and theme

In [globals.css](src/app/globals.css):

- Default **shadcn "neutral"** palette, in `oklch()`, near-monochrome (grays from white to black,
  no brand hue — even `--primary` is a gray, `oklch(0.205 0 0)` in light /
  `oklch(0.922 0 0)` in dark). There is **no accent color** defined currently (no
  blue, purple, etc.) — this is a plain, uncustomized shadcn theme.
- Dark mode is **functional**: `.dark` class with a separate set of variables, activated by
  [ThemeProvider](src/components/theme-provider.tsx) (a `next-themes` wrapper,
  `attribute="class"`, `defaultTheme="system"`, `enableSystem`). [ThemeToggle](src/components/theme-toggle.tsx)
  switches `light`/`dark` via `useTheme()`.
- `@theme inline` maps the standard shadcn tokens (`background`, `foreground`, `card`, `primary`,
  `secondary`, `muted`, `accent`, `destructive`, `border`, `ring`, `chart-1..5`, `sidebar-*`) plus
  a `--radius-*` scale derived from a single `--radius: 0.625rem`.
- **Single typeface**: Geist Sans (`--font-geist-sans`) loaded via `next/font/google` in
  [layout.tsx](src/app/[locale]/layout.tsx), plus Geist Mono for code/tech badges
  (`font-mono` used in [tech-badge.tsx](src/components/tech-badge.tsx)). `--font-heading` is
  currently an **alias of `--font-sans`** — there's no distinct heading typeface, even though the
  token already exists and is used everywhere (`font-heading` on `h1`/`h2`/stat titles).
  → An easy entry point to inject a display font without touching any markup.

---

## 3. Existing pages and routes

| Route | File | Role |
|---|---|---|
| `/` (and `/en`) | [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx) | Single page with anchored sections: Header → Hero → Stack → About → Projects (first 6) → Experience(+Education) → Contact → Footer |
| `/projects` (and `/en/projects`) | [src/app/[locale]/projects/page.tsx](src/app/[locale]/projects/page.tsx) | Full project list (grid), back-to-home button |
| `POST /api/contact` | [src/app/api/contact/route.ts](src/app/api/contact/route.ts) | Route handler, sends the message via Resend to the profile's email |

**Conclusion for the comparison with the Vue reference**: this portfolio is **hybrid**, neither
purely "single-page with anchors" nor purely "multi-page" — a home page with `id="..."` sections
navigated via hash (`/#projects`), plus a single dedicated secondary route (`/projects`) for the
full list. No separate pages for "About", "Experience", etc.

---

## 4. Existing components to keep (reusable logic, styling to redo)

These components encapsulate logic (i18n, state, a11y) that's better kept and
simply restyled rather than rebuilt:

- **[header.tsx](src/components/header.tsx)** — nav structure (items, hash links), sticky/blur; to
  be restyled but the logic that generates the translated `navItems` is reusable.
- **[theme-toggle.tsx](src/components/theme-toggle.tsx)** — correct `next-themes` logic (animated
  Sun/Moon in CSS), no reason to rebuild it.
- **[theme-provider.tsx](src/components/theme-provider.tsx)** — `next-themes` wrapper, keep as is.
- **[language-toggle.tsx](src/components/language-toggle.tsx)** — locale-switching logic via
  `router.replace(pathname, { locale })` (correct next-intl API), only the dropdown styling needs
  redoing.
- **[mobile-nav.tsx](src/components/mobile-nav.tsx)** — shadcn/base-ui `Sheet` already wired to
  `navItems`, just needs restyling.
- **[scroll-to-hash.tsx](src/components/scroll-to-hash.tsx)** — fallback that scrolls to a hash on
  load; a small utility independent of design, keep it.
- **[contact-form.tsx](src/components/contact-form.tsx)** — validation, `idle/loading/success/error`
  states, call to `/api/contact`, the behavior is all sound; only the markup/style needs redoing.
- **[lib/i18n-data.ts](src/lib/i18n-data.ts)** (`localize()`) — small helper for fields that can be
  either `string` or `{fr,en}` (legacy `period` in experience/education); keep it.
- **[i18n/routing.ts](src/i18n/routing.ts), [i18n/request.ts](src/i18n/request.ts),
  [i18n/navigation.ts](src/i18n/navigation.ts), [proxy.ts](src/proxy.ts)** — the i18n core, don't
  touch for a purely visual redesign.
- **[types/index.ts](src/types/index.ts)** — `Profile`, `Project`, `Experience`, `Education`,
  `StackCategory` types: the data contract, keep it (see section 6).
- The shadcn/base-ui primitives in `src/components/ui/` (`button`, `card`, `input`, `label`,
  `badge`, `dropdown-menu`, `textarea`, `sheet`, `dialog`) — these are generic primitives
  reconfigurable via their CVA `variants`; no need to throw them out, just tweak the
  Tailwind classes/variants if the new design diverges significantly (radius, shadows, density).

---

## 5. Components and pages to remove / replace (purely visual)

These are presentations specific to the current "shadcn neutral minimal" design — to be rewritten
entirely once the new design system arrives (optionally keep the props logic, discard the
markup/classes):

- **[hero-section.tsx](src/components/sections/hero-section.tsx)**,
  **[about-section.tsx](src/components/sections/about-section.tsx)**,
  **[stack-section.tsx](src/components/sections/stack-section.tsx)**,
  **[projects-section.tsx](src/components/sections/projects-section.tsx)**,
  **[experience-section.tsx](src/components/sections/experience-section.tsx)**,
  **[contact-section.tsx](src/components/sections/contact-section.tsx)** — layout/style of each
  section, to redo per the new system.
- **[project-card.tsx](src/components/project-card.tsx)**,
  **[projects-grid.tsx](src/components/projects-grid.tsx)**,
  **[project-image.tsx](src/components/project-image.tsx)** — current project card (16:9 image,
  status badge, tech badges, link buttons + video modal): keep the image fallback and video modal
  logic, redo the card styling.
- **[experience-card.tsx](src/components/experience-card.tsx)**,
  **[education-card.tsx](src/components/education-card.tsx)** — simple text cards, purely
  visual.
- **[tech-badge.tsx](src/components/tech-badge.tsx)** — trivial (a `Badge` + mono font), to be
  rewritten per the new badge system if it differs.
- **[section-heading.tsx](src/components/section-heading.tsx)** — title + subtitle for a section,
  design to redo (but the component itself, as a single reused title wrapper, is worth keeping as
  one entry point to restyle only once).
- **[profile-avatar.tsx](src/components/profile-avatar.tsx)** — avatar with initials fallback,
  keep the fallback logic, revisit the style (gradient, ring).
- **[footer.tsx](src/components/footer.tsx)** — layout to redo, keep the logic (filtered social
  links).
- **globals.css**: the entire `:root` / `.dark` section (color palette) will be replaced by the
  new palette from the reference design — this is the core of the visual change.
- **[icons.tsx](src/components/icons.tsx)** — custom SVG icons (GitHub, LinkedIn, Instagram,
  Facebook): probably keep as is (these are logos, not design styling), unless the new system
  prefers a different brand icon set.

There is currently **no animation/scroll-reveal at all** (no Framer Motion, no
`framer-motion`/`motion` in `package.json`): everything renders statically/SSR with no entrance
transitions. This is a net addition, not a replacement.

---

## 6. Existing data

All "business" data lives in `src/data/*.json`, typed by [src/types/index.ts](src/types/index.ts):

- **`profile.json`** → type `Profile`: identity, title/tagline/bio/summary (bilingual), location,
  email/phone, availability, social links (`linkedin`, `github`, `kaggle`, `whatsapp`,
  `instagram`, `facebook`), CV URLs per language (`/cv/CV_..._FR.pdf` / `_EN.pdf`).
- **`projects.json`** → type `Project[]`: `id`, bilingual `title`/`status`/`description`, `stack`
  (list of untranslated strings), `image` (static path `/images/projects/...`), `links[]`
  (`type: github-backend|github-frontend|github-mobile|github|live`, bilingual label, url — can be
  an empty string, filtered out at render time), optional `videoUrl?` (local mp4, triggers a modal),
  `featured: boolean` (not currently used in rendering, just stored). 9 projects total, 3
  `featured: true`.
- **`stack.json`** → type `StackCategory[]`: skill categories (`frontend`, `backend`,
  `ai-ml`, `database-auth`, `tools`, `mobile`), each with a bilingual name and an untranslated
  `items: string[]` list.
- **`experience.json`** → type `Experience[]`: role, company, contract type, location, period
  (`MaybeLocalizedText` — legacy: sometimes a `string`, sometimes `{fr,en}`, hence the `localize()`
  helper), `bullets: {fr: string[], en: string[]}`.
- **`education.json`** → type `Education[]`: degree, institution, detail, period (same
  `MaybeLocalizedText` type).

**Content translation pattern**: every translatable field is a `{ fr: string, en:
string }` object consumed via `field[locale]`, independent of next-intl's `messages/*.json` files
which only carry fixed UI labels. This is a deliberate choice (structured content, not free text) —
keep it as is for the redesign: the new design just needs to consume these same
data shapes, no schema migration is required a priori.

---

## 7. Anticipated friction points for the redesign

1. **Current color palette = pure shadcn neutral (no hue)**. The entire
   "visual personality" part (brand color, accents) is to be built from scratch: this is a clean
   `@theme`/`:root`/`.dark` change, with no dependency elsewhere in the code (all
   components already consume the tokens `bg-primary`, `text-muted-foreground`, etc., never
   hardcoded colors) → low risk, mechanical change.
2. **base-ui, not Radix.** If the new design draws on "classic" shadcn patterns/snippets
   found online (often written for Radix), they'll need adapting to the `render`/`nativeButton`
   API of base-ui already in place here (see [button.tsx](src/components/ui/button.tsx),
   [dropdown-menu.tsx](src/components/ui/dropdown-menu.tsx), [sheet.tsx](src/components/ui/sheet.tsx),
   [dialog.tsx](src/components/ui/dialog.tsx)). Don't reinstall Radix primitives on top —
   that would duplicate the system and break consistency with `components.json` (`style: base-nova`).
3. **Single page + anchored sections vs. multi-page architecture.** If the reference really is
   multi-page (separate routes per section), a decision is needed: either replicate that split by
   adding routes like `src/app/[locale]/about/`, `.../experience/`, etc. (which implies rethinking
   the nav in [header.tsx](src/components/header.tsx), currently 100% hash-based toward `/`), or
   keep the current single-page-with-anchors model and only apply the reference's visual *skin*.
   The content (`src/data/*.json`) works either way with no change.
4. **Scroll-reveal / Framer Motion + next-intl / RSC.** No animation library is installed
   today, and most of the section components are **Server Components** (`async
   function ... getTranslations(...)`). Framer Motion (`motion.div`, `useInView` hooks, etc.)
   requires `"use client"`. Options are:
   - keep the sections as Server Components for fetching translations/data, and isolate
     the animation only inside a small client wrapper (`<Reveal>{children}</Reveal>`) that receives
     already-translated HTML as `children` — recommended pattern, low refactor cost;
   - or switch some sections to client components and pass `locale`/messages as props —
     more refactoring, best avoided if possible.
   This isn't blocked by next-intl itself (the text is already resolved server-side before reaching
   the DOM), so there's no real i18n × animation conflict, just a matter of placing the
   server/client boundary correctly.
5. **`localePrefix: "as-needed"`** means links/routes must always go through the
   `Link`/`useRouter` from [i18n/navigation.ts](src/i18n/navigation.ts) rather than plain
   `next/link`, otherwise the `/en` prefix won't be handled correctly when reworking nav
   components.
6. **`--font-heading` already present but not differentiated** (alias of `--font-sans`): good news,
   adding a display font to match the reference only requires changing the token's value
   plus one extra `next/font` in the layout, no component needs touching (they already
   use the `font-heading` class).
7. **Two distinct translation layers** (next-intl messages for the UI, bilingual JSON for the
   content): if the Vue reference has a different content system (e.g. Markdown/CMS per project),
   it'll need an explicit decision to keep this bilingual JSON pattern rather than replace it — it's
   probably the right call here given the content volume (personal portfolio, not a blog).
8. **`featured: boolean` on projects is unused** in the current rendering (just the implicit
   order of the JSON + `.slice(0, 6)` on the home page): if the new design wants to highlight
   certain projects (e.g. a large "featured" card + smaller cards), the data already exists but
   the sort/filter logic still needs writing.
9. **Project images/videos are local static files** (`/images/projects/*.png`,
   `/videos/projects/*.mp4` in `public/`), no `next/image` optimization currently (raw `<img>` usage
   with an `onError` fallback, likely to support missing images in dev). Needs a decision on
   whether the redesign migrates to `next/image` (better perf/LCP) or keeps the manual fallback.

---

## Quick summary

- **Solid, recent stack** (Next 16, Tailwind v4, base-ui, next-intl 4) — no technical debt
  blocking a visual redesign.
- **Data/UI separation is already clean**: the new design can plug directly into
  `src/data/*.json` + `src/types/index.ts` with no migration.
- **i18n, theme, form, and mobile nav logic are solid and worth keeping** — only the CSS/markup of
  the sections and cards is "disposable".
- **The real redesign work** = color palette (`globals.css`), heading typography,
  section spacing/density system, card styling, and adding a scroll-reveal system
  properly isolated from the RSC boundary.
