---
name: add-project
description: Adds a new project to the portfolio (Projects grid + details Dialog). Use when the user
asks to add, reference, or publish a new personal project on the portfolio.
---

## Architecture to know before starting

This project has **no dedicated per-project page** (no `/projects/[slug]` route). Everything relies on
three pieces already in place:

1. `src/data/projects.json` — the source of truth, an array of `Project` (schema in
   `src/types/index.ts`).
2. `src/components/project-card.tsx` (+ `project-image.tsx`, `tech-badge.tsx`) — the clickable card in
   the grid, which opens a shared details `Dialog` (the same component reused for every project).
3. `src/components/projects-grid.tsx` — displays the first 6 projects from the array, with a "Show
   more" button that reveals the rest.

**Never suggest creating a route or a component specific to a single project.** Adding a project =
adding a JSON entry, nothing more on the structural side.

## Procedure

### 1. Collect the project information

Ask (or infer from information already provided by the user) for:

- Bilingual title (`fr`/`en`)
- Bilingual status (e.g. "Projet personnel"/"Personal project", "Stage PFE"/"Internship (final year)")
- **Short** bilingual description — it's truncated to 3 lines on the card (`line-clamp-3`), so don't
  write a wall of text that becomes meaningless once cut off. The full (untruncated) description is
  shown in the Dialog, so it needs to read well at both lengths.
- The tech stack (list of technology names, e.g. `"Next.js"`, `"Spring Boot"`)
- The available links, and for each one the right `type`:
  - `"live"` — only if the project is **actually deployed online**. If not, don't add this link at
    all (never set an empty `url` "just in case" — a link with `url: ""` is automatically
    filtered/hidden by `project-card.tsx`, but it's better not to add it in the first place).
  - `"github"` / `"github-backend"` / `"github-frontend"` / `"github-mobile"` — depending on the repo
    structure (a single fullstack repo → `"github"`; separate repos → the matching precise type).
- Is there a demo video? (optional, `videoUrl`)

### 2. Verify the assets exist

- Image: must already exist in `public/images/projects/`, named in kebab-case consistent with the
  project's `id` (e.g. `id: "my-new-app"` → `public/images/projects/my-new-app.png`). **If the file
  doesn't exist yet, tell the user clearly rather than referencing a broken path.**
- Demo video (if provided): same check in `public/videos/projects/`.

### 3. Choose the position in the array

The order of the `projects.json` array determines the display order in the grid: the first 6 entries
are visible by default, the rest appear behind "Voir plus"/"Show more" (`projects-grid.tsx`). **Ask the
user where to position the new project** (at the start, at the end, or at a specific spot) rather than
deciding for them. The `featured` field exists in the schema but is no longer used for filtering the
grid (legacy) — no need to compute it precisely, `true` by default is fine.

### 4. Add the entry to `src/data/projects.json`

Follow the `Project` schema from `src/types/index.ts` exactly:

```ts
interface Project {
  id: string;
  title: LocalizedText; // { fr, en }
  status: LocalizedText;
  description: LocalizedText;
  stack: string[];
  image: string;
  links: ProjectLink[]; // { type, label: LocalizedText, url }
  videoUrl?: string;
  featured: boolean;
}
```

### 5. Check the stack icons (shared registry)

`src/components/tech-icon.tsx` is the central technology-name → icon registry (a Simple Icons logo if
available in `react-icons/si`, otherwise a manually chosen Lucide fallback). For every technology in
the new stack that's missing from this registry, add an entry: a real `Si*` logo first, otherwise a
Lucide icon that fits the technology rather than falling back to the generic `Code2` default if a
better choice exists.

Note: this registry is currently consumed by the Stack/Skills section (`skill-card.tsx`), not by the
project cards (`project-card.tsx` renders the stack via `TechBadge`, plain text with no icon). Keeping
it up to date is still worthwhile (shared registry, reusable if project cards gain icons someday), but
it won't be visible immediately on the Projects grid — don't try to "wire up" icons on the cards, that's
not the current design.

### 6. Check for regressions

```
npx tsc --noEmit
npx eslint <touched files>
```

### 7. Don't commit

Let the user review and commit it themselves.
