# Floor Workspace — decisions & open questions

## Open
| # | Question | Owner | Due |
|---|---|---|---|
| D-01 | Phase colours: ratify the tones used (waiting danger, demo info, 2-min warning, delivery success, others olive) or replace them under GB12 | Zach | |
| D-03 | Build loading / error / partial / stale for every module (G8) | Design | |
| D-04 | Check-in multi-match: restore the buyer / co-buyer pick from multiple records (AF score, DOB) from the source | Zach + Dev | |
| D-05 | Promote ChoiceGroup, OutfitterPicker, RepCard, PhaseColumn and Hexagon badge into `ui_kits/` | Design | |
| D-06 | Confirm the source system for each entity in `data-contract.md` (DMS, CRM, HR directory) | Dev | |
| D-08 | Build the sales manager's pause-approval queue for receptionist pause requests | Design | |
| D-09 | Confirm the permission matrix in `roles-permissions.md`, especially whether a receptionist can move cases or only view them | Zach | |
| D-10 | Should the receptionist's Check-In and Up Queue screens (their own nav items) link into this build, or stay separate builds? | Zach | |
| D-11 | Nav destinations: Desking, Pipeline, Inventory, Reports, Messenger, Alerts and the other `nav-*` buttons go to **separate builds** (stamped `data-bos-target="screen:<id>"`). Confirm which already exist | Zach | |
| D-07 | Exits on the board: the source showed exits on the board; the conversion shows them only in phase detail | Zach | |

## Decided
| Date | Decision | By |
|---|---|---|
| 2026-10-22 | **Tracked actions = every `btn-commit-*`** plus `btn-action-undo` and `btn-action-send-chat#*`. Each maps to the event in `api-contract.md` §2 (the generated requirements show it in the *Tracked event* column) | Build |
| 2026-10-22 | **Status:** all 17 states are **MVP**. The pause-approval queue (D-08) is the only MVP gap | Build |
| 2026-10-22 | **Shared shell recorded once:** AppShell elements are scoped `FLOOR-WORKSPACE::shell::<id>` with states `all`, and listed in one "Shared shell" section | Build |
| 2026-10-22 | Receptionist posture built (D-02 closed): no outfitter stats, no rotation reorder, bench disabled with a note, pause becomes a request to the manager, case moves read-only | Build, per roles-and-permissions |
| 2026-10-22 | Convert design A (schedule timeline) only; design B (left rail + messages dock) is dropped | Zach (screenshot) |
| 2026-10-22 | Rep menu opens on click / Enter, not on a 1.2s hover (RF08) | Build, per canon |
| 2026-10-22 | Every drag has a stamped alternative: Move to… (cases) and Move in rotation (outfitters) | Build, per boards-and-dnd |
| 2026-10-22 | Clothing pickers and party illustrations dropped from check-in (not Lucide); replaced by party type + notes | Build, per canon |

## Retired IDs (source v1.2 → spec-ready v2)
| Retired | Replaced by |
|---|---|
| `btn-check-in-cta` | `btn-commit-new-check-in` |
| `nav-open-floor-workspace` (Home tile) | AppShell `nav-floor` |
| `scr-floor-workspace` / `data-spec-screen="floor-workspace"` | `frame-app-shell` + `sec-floor-workspace` |
| v1.2 `-N` index suffixes from the uniqueness sweep | Domain-keyed instances (`#jacksons`, `#mh`, `#waiting`) |
