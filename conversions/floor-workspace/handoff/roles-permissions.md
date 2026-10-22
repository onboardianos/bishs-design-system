# Floor Workspace — roles & permissions

Canon: `documents/roles-and-permissions.md`. The live matrix is `PERMS` in `fw-data.babel`. Every gated element carries `data-bos-perm` and `data-bos-access`, and the manifest records both for every role × state × width.

## Who reaches this build

| Role | Reaches it? | How | Posture built |
|---|---|---|---|
| Sales manager (`manager`) | **Yes** | `NavConfig` › `floor` (Sales Floor) | ✅ all 17 states |
| Receptionist (`receptionist`) | **Yes** | `NavConfig` › `floor` | ✅ Canvas section "Receptionist posture" plus the Prototype **Role** switcher |
| Outfitter | No | Not in the outfitter nav; outfitters use Outfitter Mobile | n/a |
| Admin / GM | No by default | An admin can switch on `floor` in Roles & Navigation. If they do, they inherit the **manager** column | n/a until enabled |

## Matrix A · screen and sections

| Element | Manager | Receptionist |
|---|---|---|
| `sec-floor-workspace` (screen) | act | act |
| `sec-ups-rotation` | act | act (no stats, no reorder) |
| `sec-todays-schedule` | act | act |
| `sec-floor-traffic` | act | act (can't move cases) |
| `frame-phase-detail#*` | act | read |
| `frame-rep-menu#*` stats block | act | **hidden** |

## Matrix B · actions

| Permission | Elements | Manager | Receptionist | Approver | Audit |
|---|---|---|---|---|---|
| `case.create` | `btn-commit-new-check-in` | act | act | — | `case.created` |
| `case.assign` | `btn-action-assign#*`, `menuitem-assign#*` | act | act | — | `case.assigned` |
| `case.override` | override reason inside check-in / assign | reason | reason | — | ✅ |
| `case.move` | `menuitem-move#*`, card drag | act | **read** (no drag, menu item disabled) | — | `case.moved` |
| `case.note` | `menuitem-note#*` | act | act | — | — |
| `case.close` | `menuitem-left#*` | reason | reason | — | `case.left` |
| `case.view_detail` | `btn-action-case-menu#*`, schedule items | act | act | — | — |
| `rep.message` | `btn-action-rep-message#*`, `menuitem-message#*` | act | act | — | — |
| `rep.pause` | `btn-action-rep-pause#*` | reason | **approve** ("Request pause" → manager) | Sales manager | ✅ |
| `rep.bench` | `btn-action-rep-bench#*`, un-bench | reason | **disabled** + note | — | ✅ |
| `rep.stats` | stats tabs + metrics | act | **hidden** | — | — |
| `rotation.reorder` | rep-card drag, `btn-action-rep-move#*` | reason | **hidden** | — | `rotation.reordered` |
| `rotation.view` | `btn-action-rep#*` | act | act | — | — |
| `schedule.checkin` | `btn-commit-check-in-arrival#*` | act | act | — | `schedule.arrived` |
| `phase.stats` | `btn-action-phase-detail#*` | act | read | — | — |

## Matrix C · data visibility

| Field / data | Manager | Receptionist |
|---|---|---|
| Customer name, interest, phase, timers | ✅ | ✅ |
| Outfitter performance (demos, write-ups, sold, gross/unit) | ✅ | ❌ |
| Bench reason, coaching note, bench history | ✅ | ❌ |
| Pause reason + return time | ✅ | ✅ |
| Exit notes (customer left) | ✅ | ✅ (own store, today) |
| Check-in lookup (phone/email match) | ✅ | ✅ |

**Store scope:** both roles see their own store only (Twin Falls).

## Approval chains
- **Receptionist pause request:** the receptionist submits a reason and duration, and the sales manager approves or declines. The outfitter stays *available* until the request is approved. The approval queue is **not built yet** (D-08).

## Audit events
`case.created` (with override reason) · `case.assigned` (with override reason) · `case.moved` · `case.left` · `rep.paused` · `rep.pause_requested` · `rep.benched` · `rep.unbenched` · `rotation.reordered`
