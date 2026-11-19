# Project instructions — Bish's RV Design System · release 2.2.0

**The rulebook is `SKILL.md`. Read it before any design work. If this file and `SKILL.md` ever differ, `SKILL.md` wins.** This file holds only what must load in every chat: routing, the hard rules, and the ship gate. New to the package? `START-HERE.md`.

## Route every request (full table: `SKILL.md` › START HERE)
- **New design / prototype / screen:** business intake → Step 0 Canvas ⇄ Prototype (start from `templates/prototype-canvas-shell/`) → 0A AppShell → 0B fluid (RF01–RF12) → 0C stamp as you build → 0D roles + handoff → 0E self-check.
- **Convert an existing design:** business intake → the six passes in `documents/design-conversion-process.md` → 0E self-check. Plus `conversion-report.md`.
- **Review / audit:** 0E self-check + SpecLint review mode + gates G1–G12. Report gaps with stamp IDs; don't silently fix.
- **Dev handoff:** everything in `documents/handoff-package-standard.md` + Export handoff (manifest · requirements · Jira CSV · `flow.json`) + the flow board (`templates/flow-board/`) + dev zip.
- **One-off asset:** visual canon only — tokens, type, gold rule, Lucide, voice.

## Never (identical to `SKILL.md`)
- Invent a business rule. Put it in the intake as an open question, and label the ticket `needs-rule`.
- Hand-build a header or nav.
- Build local light copies of DS components. Pass `theme="light"` (Button, Badge, Card, StatTile, UnitRow, Header, Input, TabBar, Avatar, AppShell, RolesNavAdmin).
- Hand-build an alert card, a customer/kanban card, a question card or answer chips. Use `PhaseAlert`, `CustomerCard`, `QuestionCard`, `ChoiceChip` / `ChoiceGroup` / `ChoiceTile` from `ui_kits/floor/`.
- Put gold outside its three jobs.
- Ship unstamped elements.
- Fork a screen per device.
- Rename a published ID or a published component name.
- Build from an unversioned or v1.x copy of this system, or ship without a passing self-check.

## Canon in one breath (detail in `SKILL.md` and `documents/`)
- **Gold, three jobs only:** the single COMMIT fill per frame (near-black text), ACTION outlines, gold-lo for the current nav item. Cream is text-only. 4px spacing. Lucide only. Brand fonts only. Tokens from `colors_and_type.css`; no invented hex.
- **AppShell** on every screen; nav is data in `NavConfig`, edited only in `RolesNavAdmin`.
- **One fluid implementation per screen**, container queries, 360→1600px, 44×44 targets ≤1023px, no sideways scroll, survives 200% zoom.
- **WCAG AA:** `--text-muted` is `#A2A59C`; `--text-subtle` is decorative only; no persistent text under 11px; links underlined.
- **Stamp at creation:** `data-spec-id="<class>-<slug>[#<instance>]"` + `data-bos-*`; stable domain keys, never indexes; never rename a published ID. `SpecLint.run()` must pass.
- **HIG adoptions** (`documents/hig-adoptions-2026-08-05.md`) and the **27 design laws** (`documents/design-laws.md`) are structural.

## Ship gate
`selfcheck/` must pass and its `qa-gates.md` goes in `<build>/handoff/` with the manual gates evidenced. Details: `selfcheck/README.md`.

## Where things are
Components: `COMPONENTS.md` → `documents/component-selection-guide.md`. Reading order: `documents/bishify-reading-order.md`. Whole route: `documents/design-intake-to-handoff.md`. Reference build: `conversions/floor-workspace/`. Other projects: copy `starter-kit/CLAUDE.md`. Release: `release/README.md`.

The 19 components the checker calls "named after nothing in the kit" are confirmed intentional (`README.md` › Intentional additions). Don't rename them.
