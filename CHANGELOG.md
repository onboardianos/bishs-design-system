# Changelog — Bish's RV design system

The version lives in `VERSION` and in the `--ds-version` token in `colors_and_type.css`. Bump both together, add an entry here, and rebuild the release (`release/README.md`).

## 2.2.0 — 2026-11-12 · Flow board and self-check reference
- **Requirements & Flow Board** (`templates/flow-board/`): role swimlanes, one card per screen state with frame, artboards, data states, exits and requirement cards; arrows labelled by trigger `data-spec-id`; a gate panel for G2, G8, G9, G10 and G12. Reads `flow.json`, generated from the SpecLint manifest by `flow-from-manifest.js`. The example is the Floor Workspace reference build.
- The handoff standard (`state-map.md` section) now requires the flow board. Export handoff writes `flow.json`.
- **`selfcheck/README.md`**: the full reference for scoring, every rule and threshold, exemptions, limits, fixes and version sync. `START-HERE.md`, `SKILL.md` Step 0E, `CLAUDE.md`, `starter-kit/CLAUDE.md` and `release/README.md` now point to it instead of repeating it.

## 2.1.0 — 2026-11-12 · Release package and self-check
- **Release package.** The design system now ships as one versioned zip built from an allowlist (`release/release.json`). Workshop material (scratch, uploads, reviews, other conversions, old exports) is left out.
- **START-HERE.md** is the first file in the package: precedence, reading order, how to load the system, and how to prove a build.
- **COMPONENTS.md** lists all 21 exported components with file, use, key props and the intentional additions.
- **Self-check** (`selfcheck/`). `selfcheck.js` measures a live page: right material, tokens and contrast, gold, type, spacing, icons, AppShell, fit and targets, and stamping. `selfcheck/index.html` runs it at six widths and writes `qa-gates` markdown. It also checks that the package is complete.
- **`--ds-version` token** added to `colors_and_type.css`, so a stale or unversioned copy can be detected.
- **One rulebook.** `SKILL.md` is canonical. `CLAUDE.md` is now a short pointer with the hard rules. The `Never` lists in all three files match.
- Fixed: README said v1.0 and gates G1–G10; it now points to v2.1.0 and G1–G12. starter-kit pointed to `handoff-packs/<pack>/BRING-A-DESIGN-IN.md`; it now points to `documents/BRING-A-DESIGN-IN.md`.

## 2.0 — 2026-10-21 → 2026-10-28 · Spec-ready v2, AppShell, floor components
*Reconstructed from document dates.*
- Spec-ready stamping v2 ratified; gold rule ratified (three jobs) — `documents/decisions-2026-10-21.md`.
- AppShell, NavConfig, RolesNavAdmin, ActionOverlay, NavIcon.
- Floor components promoted from Floor Workspace: PhaseAlert, CustomerCard, QuestionCard, ChoiceChip, ChoiceGroup (10-23); ChoiceTile (10-27); compact density (10-28).
- Conversion process, handoff package standard, business intake, roles and permissions, gates G1–G12.

## 1.1 — 2026-08-05 · HIG adoptions
- `documents/hig-adoptions-2026-08-05.md`. No AppShell, tagging or floor components yet — **never build from a 1.x copy.**

## 1.0 — 2026-04 · Initial system
- Tokens, type, brand assets, portal-dark primitives.
