# Redesign action plan

> Checklist-based action plan, validated rebuild order. See `docs/design-reference.md`
> (diagnostic of the Vue.js reference portfolio) and `docs/design-diagnostic.md` (diagnostic of
> this repo's existing state) for the full context behind each step.

- [x] Remove legacy design-specific components and pages (per docs/design-diagnostic.md "to remove" list)
- [x] Remove the /projects/[slug] dynamic route and the ProjectDetails-as-page logic (superseded by a
  Dialog pattern — project details now open in a dialog, not a separate page)
- [x] Define design tokens (navy/orange palette) as Tailwind v4 @theme CSS variables
- [x] Rebuild layout shell (header/nav, mobile Sheet, background layer)
- [x] Install/verify shadcn primitives needed (Button, Card, Badge, Dialog/AlertDialog, Sheet, Sonner)
- [x] Build Hero section
- [x] Build About section
- [x] Build Skills/Stack section (category filters + animated skill-level progress bars — supersedes
  the auto-cycling spotlight idea from the original Vue reference, per updated design direction)
- [x] Build Projects section (in-place grid, no dedicated /projects route — a "Show more/less" toggle
  reveals the rest; card click opens a Dialog with edge-to-edge image, full description, tech stack
  badges, and a footer with "Watch demo"/"View project" (solid), GitHub repo links (outline), and a
  "Close" button, each shown only when applicable)
- [x] Build combined Experience & Education section (single alternating vertical timeline, ordered
  experiences then education as given in the data — no auto-sort by date; Briefcase/GraduationCap
  icon on the marker to tell the two apart; scroll-reveal per item via Motion)
- [x] Build Contact section (anchored `#contact` section, not a modal — two-column layout: contact
  form card + "let's connect" info card with availability/response-time/location, copy-to-clipboard
  email, and social links; shares the particle background with the preceding sections)
- [x] Build Footer (absent from reference, to design)
- [ ] Build 404 page
- [ ] Wire all text through next-intl (fr default, en secondary)
- [ ] Polish: focus states, responsive audit below `xs`, accessibility check
