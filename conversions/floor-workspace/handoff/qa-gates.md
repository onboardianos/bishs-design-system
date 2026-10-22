# Floor Workspace — QA gates

Gates from `documents/design-conversion-process.md`. Fill in the result, evidence, date and reviewer at each review.

| # | Gate | Result | Evidence | Date · reviewer |
|---|---|---|---|---|
| G1 | Mounts in AppShell; nav from NavConfig | **Pass** | `component-map.md`; `frame-app-shell` on every state | 2026-10-22 · build |
| G2 | SpecLint passes every state × width | **Pending** | Click **Export handoff** and commit `floor-workspace.manifest.json`; `gates[]` must be all `pass: true`. The verifier confirmed phone 100% and fixed the 4 artboards with double-`#` IDs | |
| G3 | Shrink test 1440 → 375 | **Pending** | Drag the Fill stage continuously; record any broken width per state | |
| G4 | 200% text zoom | **Pending** | Browser zoom 200% at 1280 and 390 | |
| G5 | WCAG AA contrast | **Pass (by tokens)** | Built only on AA tokens; spot-check dark-band chips | 2026-10-22 · build |
| G6 | Gold rule | **Pass** | Only gold fill is `btn-commit-*`; Up Now card is ink + edge; current tabs use gold-lo | 2026-10-22 · verifier |
| G7 | Lucide only | **Pass** | `data-lucide` on every icon | 2026-10-22 · build |
| G8 | Six data states per module | **Fail** | `state-map.md` data-state table: loading, error, partial and stale aren't built | |
| G9 | Canvas ⇄ Prototype 1:1 | **Pass** | 17 prototype states, each with a canvas artboard | 2026-10-22 · build |
| G11 | Roles & permissions | **Partial** | Manager and Receptionist postures built; `data-bos-perm` / `data-bos-access` on every gated control; matrices in `roles-permissions.md`. The pause-approval queue isn't built (D-08) | 2026-10-22 · build |
| G10 | Requirements complete (no TODO) | **Pass** for built elements | `requirements.md`; re-check against the generated skeleton after export | 2026-10-22 · build |

## Shrink-test log (G3)
| State | 1440 | 1280 | 1100 | 980 | 834 | 700 | 600 | 480 | 390 | 375 |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 floor | | | | | | | | | | |
| 03 check-in | | | | | | | | | | |
| 09 rep menu | | | | | | | | | | |
