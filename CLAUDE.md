@AGENTS.md

# my-portfolio — stable project facts

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (no `tailwind.config.js`, everything
  goes through `@theme` in `src/app/globals.css`).
- shadcn/ui configured with the **"base-nova"** style, based on **`@base-ui/react`, not Radix**
  (`components.json`). Primitives (`Button`, `Dialog`, `Sheet`, `DropdownMenu`...) use base-ui's
  `render={<X />}` / `nativeButton={false}` pattern, not Radix's `asChild`. Do not reinstall Radix
  primitives on top.
- `next-themes` for dark/light mode (`attribute="class"`, `defaultTheme="dark"`).
- Next.js 16 replaces `middleware.ts` with `src/proxy.ts` — that's the file to use for anything
  related to locale negotiation / proxying.

## next-intl

- Locales: `fr` (default, **no URL prefix**) and `en` (prefixed `/en/...`) —
  `localePrefix: "as-needed"` in `src/i18n/routing.ts`.
- Config: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`,
  `src/proxy.ts`.
- UI translations (fixed labels): `messages/fr.json` and `messages/en.json`, organized by namespace.
- **Strict rule: always use `Link` / `useRouter` / `usePathname` imported from
  `src/i18n/navigation.ts`, never `next/link` or `next/navigation` directly.** Otherwise the locale
  prefix (`/en`) isn't handled correctly.

## Existing routes

```
src/app/
├── globals.css
├── api/contact/route.ts        # POST — sends the contact form via Resend
└── [locale]/
    ├── layout.tsx               # fonts, ThemeProvider, NextIntlClientProvider
    ├── page.tsx                 # single page with anchored sections (id="about", "stack", etc.)
    └── projects/page.tsx        # full list of projects
```

No custom 404 page yet (`not-found.tsx` still to be created, see the redesign plan).

## Data

- All "business" content (not UI) lives in `src/data/*.json`: `profile.json`, `projects.json`,
  `stack.json`, `experience.json`, `education.json`.
- Typed by `src/types/index.ts` (`Profile`, `Project`, `StackCategory`, `Experience`, `Education`).
- Every translatable field in these JSON files is an object `{ fr: "...", en: "..." }`, consumed via
  `field[locale]` — independent from the `messages/*.json` files (which only carry fixed UI labels).
  Two translation systems deliberately coexist: don't merge them.

## Design redesign documentation

Currently redesigning the design system (see detailed context in these docs, to be consulted on
demand without needing to paste their content again):

- @docs/design-reference.md — diagnostic of the reference portfolio (Vue.js) inspiring the redesign
- @docs/design-diagnostic.md — diagnostic of this repo's existing state (stack, components to keep/drop, friction points)
- @docs/plan-refonte.md — checklist-based action plan, validated rebuild order
