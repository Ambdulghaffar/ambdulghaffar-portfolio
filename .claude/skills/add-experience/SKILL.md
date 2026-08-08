---
name: add-experience
description: Adds a new professional experience entry to the portfolio's Experience & Education
timeline. Use when the user asks to add, reference, or document a new job, internship, or position
they've obtained.
---

## Architecture to know before starting

`src/data/experience.json` is the source of truth, an array of `Experience` (schema in
`src/types/index.ts`). It's rendered by `experience-section.tsx` and `timeline-item.tsx` as a single
alternating vertical timeline, **experiences first, then education**, in plain array order — there is
**no date parsing or automatic sorting**. Whatever order the JSON is in is the order shown on the page.
This makes step 3 below (positioning) the most important — and most easily botched — part of this
skill.

## Procedure

### 1. Collect the experience information

Ask for (or infer from what's already provided by the user):

- Company name (plain string, not localized — matches existing entries like `"S B SOLUTIONS MA & DEV
  MAROC"`)
- Bilingual role/title (`fr`/`en`)
- Bilingual contract type (e.g. `"Stage"`/`"Internship"`, `"CDI"`/`"Full-time"`,
  `"Freelance"`/`"Freelance"`)
- Bilingual location (`"Ville, Pays"`/`"City, Country"`)
- Period — match the format already used in existing entries, e.g.
  `"Janv. 2026 - Juin 2026 · 6 mois"` / `"Jan 2026 - Jun 2026 · 6 months"`. Ask the user for the exact
  start/end (or "present") rather than guessing a duration.
- A list of bilingual bullets (`bullets.fr[]` / `bullets.en[]`, same length/order on both sides)
  describing responsibilities and achievements. Keep the existing style: short, concrete bullet points
  naming specific technologies, systems, or outcomes — not a paragraph and not vague generic statements
  (compare the level of detail in the existing `sb-solutions` entry vs. the more generic `ace-maroc`
  one; prefer the former's specificity).

### 2. Add the entry to `src/data/experience.json`

Follow the `Experience` schema from `src/types/index.ts` exactly:

```ts
interface Experience {
  id: string;
  company: string;
  role: LocalizedText; // { fr, en }
  contractType: LocalizedText;
  location: LocalizedText;
  period: MaybeLocalizedText; // string | { fr, en }
  bullets: Record<Locale, string[]>; // { fr: string[], en: string[] }
}
```

- `id`: kebab-case, unique, derived from the company name (e.g. `"S B SOLUTIONS MA & DEV MAROC"` →
  `"sb-solutions"`).

### 3. Position the entry in the array — do not skip or guess this

New experiences must be inserted **at the start of the array** (most recent first) by default, not
appended at the end, since there's no automatic date sorting (see Architecture above). If the array
already has more than one experience and it isn't obvious from context where the new one falls
chronologically relative to the existing ones, **ask the user to confirm the exact position** before
writing the file. Never silently append to the end on the assumption that "new = most recent" — a past
job added late, or an ongoing role update, can break that assumption.

### 4. Do not touch `src/data/education.json`

This skill only handles professional experience. Education entries are out of scope — they change
rarely enough not to warrant this skill, and mixing the two concerns risks reordering education items
by accident.

### 5. Check the `period` format against `localize()`

`src/lib/i18n-data.ts` exposes `localize(value, locale)`, which accepts either a plain string or a
`{ fr, en }` object for `MaybeLocalizedText` fields like `period`. If the new entry's period is a plain
string (no translation needed, e.g. a year range identical in both languages), that's valid — just make
sure it's consistent with how similar existing entries are formatted (compare to `ace-maroc`'s
`"2023 - 2025"`, used as a plain string-per-locale object rather than a shared string in the current
data — match whichever convention neighboring entries use).

### 6. No component changes needed

`timeline-item.tsx` and `experience-section.tsx` read `experience.json` dynamically and already
differentiate experience entries with a Briefcase icon (vs. GraduationCap for education). A new,
correctly-formed JSON entry appears in the timeline automatically — don't touch these components.

### 7. Check for regressions

```
npx tsc --noEmit
npx eslint src/data/experience.json
```

### 8. Don't commit

Let the user review the diff and commit it themselves.
