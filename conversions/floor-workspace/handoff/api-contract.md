# Floor Workspace — API contract (proposed)

Types are in `types.ts.tpl`. Every endpoint is scoped to the caller's store and enforces `roles-permissions.md` Matrix B **on the server**. A forbidden call returns `403 { code: 'forbidden', perm: '<entity.verb>' }`. Every mutation that needs a reason returns `422 { code: 'reason_required' }` when the reason is missing.

## 1 · Reads
| Method | Path | Returns | Perm |
|---|---|---|---|
| GET | `/stores/:storeId/floor` | `FloorSnapshot` | `case.view_detail` |
| GET | `/stores/:storeId/floor/phases/:phaseId/stats?date=` | `PhaseStats` + `Exit[]` | `phase.stats` (read) |
| GET | `/outfitters/:id/stats?range=today\|week\|month` | `RepStats` | `rep.stats` |
| GET | `/outfitters/:id/bench-history` | bench entries | `rep.bench` |
| GET | `/threads/:outfitterId/messages` | `ChatMessage[]` | `rep.message` |
| GET | `/customers/lookup?phone=\|email=` | `{ matches: CustomerMatch[] }` (0..n) | `case.create` |

## 2 · Mutations
| Method | Path | Body | Perm · access | Emits |
|---|---|---|---|---|
| POST | `/stores/:storeId/cases` | `{ lookup, partyType, buyers[], interest, notes?, outfitterId, overrideReason? }` | `case.create`; `case.override` needs a reason when the outfitter isn't `up_now` | `case.created`, SMS welcome link, outfitter push |
| POST | `/cases/:id/assign` | `{ outfitterId, overrideReason? }` | `case.assign` | `case.assigned`, push |
| POST | `/cases/:id/move` | `{ toPhase, source: 'drag'\|'menu' }` | `case.move` | `case.moved` |
| POST | `/cases/:id/move/undo` | `{ eventId }` (within 6s) | `case.move` | `case.moved` (revert) |
| POST | `/cases/:id/notes` | `{ text }` | `case.note` | — |
| POST | `/cases/:id/left` | `{ reason: LeftReason, note? }` | `case.close` (reason) | `case.left`, Exit created |
| POST | `/outfitters/:id/pause` | `{ reason, duration, detail? }` | `rep.pause`: **manager** applies it; **receptionist** gets `202 { requestId }` | `rep.paused` or `rep.pause_requested` |
| POST | `/pause-requests/:id/approve` \| `/decline` | `{ note? }` | `rep.pause` (approve) | `rep.paused` |
| POST | `/outfitters/:id/unpause` | `{ fulfilled: true }` | `rep.pause` | `rep.unpaused` |
| POST | `/outfitters/:id/bench` | `{ reason, duration, note }` | `rep.bench` (manager only) | `rep.benched`; the outfitter's active cases → `waiting` |
| POST | `/outfitters/:id/unbench` | `{ note }` | `rep.bench` | `rep.unbenched` |
| POST | `/stores/:storeId/rotation/reorder` | `{ outfitterId, toPosition, reason, detail? }` | `rotation.reorder` (reason) | `rotation.reordered` |
| POST | `/threads/:outfitterId/messages` | `{ text }` | `rep.message` | `chat.sent` |
| POST | `/schedule/:itemId/arrived` | `{}` | `schedule.checkin` | `schedule.arrived`, case created or advanced |

## 3 · Live updates
`GET /stores/:storeId/floor/stream` (SSE) or WebSocket channel `floor:<storeId>`. Every event the server emits is pushed as `{ type, payload, at, byUserId }`. The client applies events to the cached `FloorSnapshot`.

Timers (`since`, `total`) are computed on the client from `phaseEnteredAt` and `checkedInAt`, ticking every second.

## 4 · Audit
Every event in the audit list in `roles-permissions.md` writes `{ event, actorId, actorRole, storeId, entityId, reason?, before?, after?, at }`. Audit entries can't be edited. Managers, GMs and admins can read them.

## 5 · Errors (UI copy follows the HIG error grammar)
| Code | UI |
|---|---|
| `forbidden` | Inline note: "Only a sales manager can …" (should be unreachable, since the UI hides or disables first) |
| `reason_required` | Keep the dialog open and focus the reason field |
| `conflict` (stale snapshot) | Refresh, then toast "The board changed. Your view is up to date." |
| `network` | Module error state with Retry (`state-map.md` data states) |
