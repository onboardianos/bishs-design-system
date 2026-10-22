# Floor Workspace — build plan & tickets

Each ticket lists the requirement rows it covers (`requirements.md`), the stamps it must render, and its acceptance criteria. Estimates are relative (S / M / L). **DoD** for every ticket is in `engineering.md` §6.

## Epic 0 · Foundation
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-01 | Tailwind v4 + shadcn new-york + tw-animate-css set up from `design-system/shadcn/` | tokens, `variants.ts` | M |
| FW-02 | Port **AppShell** + **NavConfig** to TSX (sidebar / sheet / tab bar / Action overlay). Container-driven bands | `frame-app-shell`, `sec-header`, `sec-side-panel`, `sec-drawer`, `sec-tab-bar` | L |
| FW-03 | `permissions.ts` (`can(role, perm)`) + server middleware that enforces Matrix B | `roles-permissions.md` | M |
| FW-04 | SpecLint in CI: Playwright runs `SpecLint.run()` for each role × state × width and fails on `pass:false` | `qa-gates.md` G2/G11 | M |
| FW-05 | `GET /floor` snapshot + live stream; TanStack Query cache + event reducer | `api-contract.md` §1, §3 | L |

## Epic 1 · Screen layout
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-10 | `FloorWorkspace` S03 layout: rail + board ≥980, view tabs <980, container queries | `sec-floor-workspace`, `nav-floor-views`, `nav-tab-floor-view#*` | M |
| FW-11 | Status footer + toast/undo | `sec-status`, `info-toast`, `btn-action-undo` | S |

## Epic 2 · Ups rotation (S10)
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-20 | Rotation band + RepCard (5 states, ink up-now card + gold edge, unread badge, delivery hexagon) | `sec-ups-rotation`, `list-rotation`, `btn-action-rep#*` | M |
| FW-21 | Hide benched / collapse | `btn-action-toggle-benched`, `btn-action-collapse-rotation` | S |
| FW-22 | Rep menu (popover / bottom sheet) + stats tabs (manager only) | `frame-rep-menu#*`, `nav-tab-rep-stats#*`, `metric-rep-*` | M |
| FW-23 | Pause / Request pause (receptionist → approval) / Unpause | `frame-pause-outfitter`, `frame-unpause-outfitter` | M |
| FW-24 | Bench / Un-bench (manager only, coaching note, history) | `frame-bench-outfitter`, `frame-unbench-outfitter` | M |
| FW-25 | Reorder with **dnd-kit** (keyboard + touch sensors) → Move in rotation dialog | `frame-move-in-rotation`, `input-rotation-position` | M |
| FW-26 | Manager pause-approval queue (**D-08**) | new frame | M |

## Epic 3 · Today's schedule (S11)
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-30 | Schedule rail: filters, now line, items | `sec-todays-schedule`, `btn-action-filter-schedule#*`, `info-now-indicator`, `btn-action-open-schedule-item#*` | M |
| FW-31 | Schedule item sheet + Customer arrived dialog | `frame-schedule-item#*`, `frame-schedule-check-in` | S |

## Epic 4 · Floor traffic (S12)
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-40 | **SVAR React Kanban** board: 8 phases, custom card + column header templates, DS tokens | `list-board`, `list-phase#*`, `card-case#*` | L |
| FW-41 | Phone posture: single phase + phase tabs; drag disabled, Move to… is the main path | `nav-phase-tabs`, `nav-tab-phase#*` | M |
| FW-42 | Case menu + Assign / Move / Note / Customer left dialogs | `frame-case-menu#*`, `frame-assign-outfitter`, `frame-move-case`, `frame-add-note`, `frame-customer-left` | L |
| FW-43 | Phase detail sheet (stats + exits) | `frame-phase-detail#*`, `metric-phase-*` | S |
| FW-44 | New check-in: 4 steps, lookup (0..n matches, **D-04**), override reason, welcome link | `frame-check-in`, `btn-commit-new-check-in`, `input-*` | L |
| FW-45 | Rep chat sheet | `frame-chat#*` | S |

## Epic 5 · States & roles
| # | Ticket | Covers | Size |
|---|---|---|---|
| FW-50 | Six data states for rotation, schedule, board, phase detail, rep menu (**D-03**, G8) | `state-map.md` table | L |
| FW-51 | Receptionist posture QA against Matrix A/B/C | `roles-permissions.md` | M |
| FW-52 | Shrink test + 200% zoom pass (G3/G4) | `qa-gates.md` | S |

## Suggested order
FW-01 → 02 → 03 → 05 → 10 → 40 → 20 → 30 → 42 → 44 → 22–25 → 31/43/45 → 50 → 26 → 04 (already in CI from the start) → 51/52.
