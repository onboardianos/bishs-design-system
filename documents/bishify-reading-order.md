# Bishify: the reading order

"Bishify" means taking a design that wasn't built in this system and converting it into a Bish's OS build: re-skinned, restructured, fluid, stamped and handed off.

Read these files **in this order, before building anything.** Each one is short. Skipping one is how a build drifts.

## Tier 1 · Always, before the first reply

| # | File | What it settles |
|---|---|---|
| 1 | `CLAUDE.md` | The START HERE router and the "Never" list. Pick the row for this request |
| 2 | `SKILL.md` | What's in the system and which components exist. Use these; don't rebuild them |
| 3 | `documents/design-intake-to-handoff.md` | The whole route on one page: intake → six passes → gates → handoff |
| 4 | `README.md` › Components | Every component and its `theme` prop, including the Floor cards and the intentional additions |
| 5 | `documents/component-selection-guide.md` | Which component to use for which job |

**Then reply with the pre-flight checklist ticked** (section 0 of `BRING-A-DESIGN-IN.md`).

## Tier 2 · Before pass 0–2 (intake, inventory, map)

| # | File | What it settles |
|---|---|---|
| 6 | `documents/business-intake.md` | Every rule needs a source. Unknowns become `needs-rule` |
| 7 | `documents/design-conversion-process.md` | The six passes in detail and gates G1–G12 |
| 8 | `documents/roles-and-permissions.md` | One designed posture per role and `data-bos-perm` on gated elements |
| 9 | `documents/precedents/` | Rules already approved in earlier builds. Reuse them, don't re-ask |

## Tier 3 · Before pass 3–6 (restructure, re-skin, fluid, stamp)

| # | File | What it settles |
|---|---|---|
| 10 | `documents/prototype-canvas-architecture-guide.md` | Canvas ⇄ Prototype harness. Start from `templates/prototype-canvas-shell/` |
| 11 | `ui_kits/app-shell/README` + `AppShell.d.ts` | The required shell. Nav is data in NavConfig, never hardcoded |
| 12 | `documents/decisions-2026-10-21.md` | Gold's three jobs, ink avatars, Up-next card, ID rules |
| 13 | `documents/responsive-fluidity-requirement.md` | RF01–RF12: one fluid screen, container queries, shrink test, 200% zoom |
| 14 | `documents/hig-adoptions-2026-08-05.md` | Touch targets, feedback timing, forms, modality, error grammar |
| 15 | `documents/CHANGES-wcag.md` | The AA-remediated token values |
| 16 | `documents/design-laws.md` | L01–L27 for every screen |
| 17 | `documents/spec-ready-v2-proposal.md` | Stamp IDs as you build. SpecLint must pass at 100% |
| 18 | `documents/boards-and-dnd.md` | Only if the design has a kanban, board or drag-and-drop |

## Tier 4 · Before handoff

| # | File | What it settles |
|---|---|---|
| 19 | `documents/handoff-package-standard.md` | Every file the dev zip must contain |
| 20 | `conversions/floor-workspace/` | The worked reference. When unsure, do what it does |

## Rules that come out of this reading (the short version)

- Use DS components from `window.BishSRVDesignSystem_26feec`. On light surfaces pass `theme="light"`. Never build local copies.
- Every screen mounts inside AppShell. Never hand-build a header, nav or tab bar.
- Gold: the COMMIT fill (lighter gold, darker on hover, near-black text), ACTION outlines and the current nav item. Nowhere else.
- Keep the source's card and overlay layouts. Re-skin them; don't redesign them.
- Inventory **everything**, including hidden layers, extra scripts and overlay modules.
- Stamp as you build, and never rename a published ID.
- Invent no business rules.
