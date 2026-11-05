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
| 2026-10-22 | ~~Clothing pickers and party illustrations dropped from check-in~~ **Superseded 2026-10-22 (rev 2):** restored. They are domain illustrations, not UI icons, so the Lucide-only rule doesn't apply | Zach (screenshot) |
| 2026-10-22 | Rev 2 · Customer card rebuilt to the original cust-card-v2 anatomy (party tile, outfitter row + avatar, phase clock ▏ total footer, red edge when unassigned) | Zach (screenshot) |
| 2026-10-22 | Rev 2 · Overlays restored to the original structures: dark case popover, outfitter stats popover (4 ranges, 4 stats, 3 bars), phase detail as a centred modal, 4-step check-in modal. No more side drawers for these | Zach (screenshot) |
| 2026-10-22 | Rev 2 · Phase Action Hub added (column header → MCP / Worksheet hub: Needs-action rail, KPI tiles, stage filters, search, date range, activity table) | Source › phase-hub layer |
| 2026-10-22 | Rev 2 · Phase alert added: cards in MCP / Worksheet raise a recurring alert until a manager starts them; snooze parks it 60s | Source › phase-hub layer |
| 2026-10-22 | Rev 2 · Canon re-skin of the source: selected period, filter chips and progress bars are ink, not gold; hub CTAs are ACTION tints; START DEAL NOW is the alert's single COMMIT; initials avatars are ink | Build, per gold rule |
| 2026-10-22 | Rev 2 · Non-up outfitter override reason is inline in the check-in, not a second stacked modal | Build, per HIG modality |

## Retired IDs (source v1.2 → spec-ready v2)
| Retired | Replaced by |
|---|---|
| `btn-check-in-cta` | `btn-commit-new-check-in` |
| `nav-open-floor-workspace` (Home tile) | AppShell `nav-floor` |
| `scr-floor-workspace` / `data-spec-screen="floor-workspace"` | `frame-app-shell` + `sec-floor-workspace` |
| v1.2 `-N` index suffixes from the uniqueness sweep | Domain-keyed instances (`#jacksons`, `#mh`, `#waiting`) |

| 2026-10-23 | **D-19 closed in the design system:** Button, Badge, Card, StatTile, UnitRow, Header, Input and TabBar now take `theme="light"`. Consumer builds must use it rather than local light copies. Packs gained a pre-flight checklist | Zach · DS owner |
| 2026-10-23 | Rev 3 · Customer card, phase alert and override-reason chips now use the shared DS components (`CustomerCard`, `PhaseAlert`, `ChoiceChip` in `ui_kits/floor/`). Local `.fw-cc` / `.fw-alert` copies deleted. All published IDs kept | Zach |
| 2026-10-23 | Rev 3 · Avatar rule: contrast with the surface (ink on light, white on dark). Supersedes "avatars are ink-filled" | Zach |
| 2026-10-23 | Rev 3 · Phase alert waiting timer turns danger ("Over limit") after 10 min. **Limit is a mock value**, confirm with Q-HUB-2 | Build · `needs-rule` |
