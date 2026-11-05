# Project instructions — built on the Bish's RV Nexus Design System

Drop this file at the root of every project that uses the design system. It makes this project follow the same rules as the design system project. Don't edit the rules here. Change them in the design system and re-copy this file.

## 0 · Before anything else
1. **Link the live design system** to this project. Never copy a design-system folder in. Copies go stale: the v1.1 (2026-08-05) copy has no AppShell, no tagging, no floor components and no handoff standard. If you find a v1.x folder in this project, stop and tell the user.
2. **Find the design-system folder.** It's usually at `_ds/<folder>/`. Every path below is relative to it. If you can't find it, stop and ask; don't build from memory.
3. **Read, in order:** `SKILL.md` → `documents/bishify-reading-order.md` → `documents/component-selection-guide.md`. Then follow the reading order for each pass.
4. **Copy the reference:** `conversions/floor-workspace/`. When unsure, do what it does.

## 1 · Route the request (START HERE in SKILL.md)
- **New design or prototype:** business intake → Prototype & Canvas Shell → AppShell → fluid → stamp as you build → roles + handoff.
- **Convert an existing design ("bishify this"):** business intake, then the six passes in `documents/design-conversion-process.md`: inventory → map → restructure → re-skin → fluid → stamp and wire. Plus `conversion-report.md`.
- **Review:** SpecLint in review mode plus gates G1–G12. Report the gaps with stamp IDs; don't fix them silently.
- **Dev handoff:** everything in `documents/handoff-package-standard.md`, plus Export handoff (manifest · requirements · Jira CSV) and the dev zip.

## 2 · Start from the template
Copy `templates/prototype-canvas-shell/` into this project and build from it. Its `ds-base.js` finds the design system on its own. If it shows a red "design system not found" banner, add `<meta name="bishs-ds-base" content="_ds/<folder>">` to the page.

## 3 · Hard rules (any one broken = not done)
- **Components, never hand-builds.** Headers and nav: `AppShell`. Alerts: `PhaseAlert`. Customer and kanban cards: `CustomerCard`. Question screens: `QuestionCard` + `ChoiceChip` / `ChoiceGroup` / `ChoiceTile`. Light surfaces: `theme="light"` on the component; never write a local light copy.
- **Gold has three jobs only:** the single COMMIT fill per frame (near-black text on gold), ACTION outlines, and gold-lo for the current nav item. Hover goes from lighter gold to darker gold.
- **Avatars:** ink on light backgrounds, white on dark backgrounds.
- **Icons:** Lucide only. **Type:** brand fonts only. **Tokens:** use `colors_and_type.css` variables; invent no hex values.
- **Fluid, one file per screen (RF01–RF12):** container queries, 360→1600px, no device forks or phone bezels, 44×44 touch targets, no horizontal scroll. The primary CTA stays on screen at every width (sticky action bar S99). All options of a question are visible without scrolling. Pass the shrink test and the 200% zoom test.
- **Stamp every element when you create it:** `data-spec-id` + `data-bos-*`. Never rename a published ID. `SpecLint.run()` must pass at 100% before you ship.
- **Never invent a business rule.** Log it in the intake as an open question; the ticket gets `needs-rule`.
- **Images:** put every image in `images/` inside the package, linked with a relative path. PNG/JPEG/WebP/GIF, ≤10 MB, about 200 KB at display size, named by content. Atlas hosts them; never use web links or embed images in the HTML.

## 4 · Keep the project lean
- One build per project; one build, or one batch of related screens, per chat.
- After pulling what you need out of an upload, delete the bulky original.
- Keep only the latest handoff export, with no `v2`/`v3` copies. Build zips and standalone snapshots at handoff only.

## 5 · Deliver
One zip, laid out as in `handoff-packs/<pack>/BRING-A-DESIGN-IN.md`: `prototype/` (with `images/`), `handoff/` (every file in the handoff standard), the three exports, and the SpecLint coverage line in the README.
