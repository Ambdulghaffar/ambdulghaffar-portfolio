# Redesign action plan

> Checklist-based action plan, validated rebuild order. See `docs/design-reference.md`
> (diagnostic of the Vue.js reference portfolio) and `docs/design-diagnostic.md` (diagnostic of
> this repo's existing state) for the full context behind each step.

- [ ] Remove legacy design-specific components and pages (per docs/design-diagnostic.md "to remove" list)
- [ ] Remove the /projects/[slug] dynamic route and the ProjectDetails-as-page logic (superseded by an
  AlertDialog pattern — project details now open in a dialog, not a separate page)
- [ ] Define design tokens (navy/orange palette) as Tailwind v4 @theme CSS variables
- [ ] Rebuild layout shell (header/nav, mobile Sheet, background layer)
- [ ] Install/verify shadcn primitives needed (Button, Card, Badge, Dialog/AlertDialog, Sheet, Sonner)
- [ ] Build Hero section
- [ ] Build About section
- [ ] Build Skills section (grid + auto-cycling spotlight highlight)
- [ ] Build Projects section (grid + card with "View details" trigger opening an AlertDialog: tech
  stack badges, description, footer with "Watch demo" button — video if available, otherwise hidden
  or disabled — and a "Close" button)
- [ ] Build Contact modal (Dialog triggered from Hero)
- [ ] Build Footer (absent from reference, to design)
- [ ] Build 404 page
- [ ] Wire all text through next-intl (fr default, en secondary)
- [ ] Polish: focus states, responsive audit below `xs`, accessibility check
