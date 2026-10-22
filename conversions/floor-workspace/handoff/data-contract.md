# Floor Workspace — data contract

All data in the prototype is **seeded** from the source app (`data/workspace`). The source system for each entity is a proposal until dev confirms it (D-06).

## Entities

**Outfitter**: `id` (string, e.g. `mh`) · `name` · `first` · `initials` · `photo` (URL, nullable → ink initials). Source: HR / user directory.

**RotationEntry** (ordered list; order = rotation position)
| Field | Type | Notes |
|---|---|---|
| `outfitter` | Outfitter.id | |
| `state` | `up_now` \| `available` \| `with_customer` \| `paused` \| `benched` | Exactly one `up_now` |
| `deal` | string | Chip text: standby, customer · minutes, or pause reason |
| `mtd` | string | e.g. "MTD · 11 units", or a bench reason · duration |
| `delivery` | string? | Customer with a delivery today → hexagon |
| `pauseReason`, `pauseDetail`, `pauseReturnsAt` | string? | When paused |
| `benchReason` | string? | When benched |

**Case** (a customer on the floor)
| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable domain key, used as the stamp instance |
| `phase` | Phase.id | `waiting` · `assigned` · `discovery` · `mcp` · `lotwalk` (Demo) · `worksheet` · `twomin` · `delivery` |
| `customer` | string | Household / display name |
| `type` | `single` \| `couple` \| `family` | Drives the party icon |
| `interest` | Unit type | Travel Trailer, Fifth Wheel, Toy Hauler, Motorhome, Truck Camper, Destination, Class A, Bunkhouse |
| `outfitter` | Outfitter.id? | null = unassigned |
| `since` | duration | Time in the current phase (derived) |
| `total` | duration | Time on the floor since check-in (derived) |

**Exit**: `id` · `phase` · `customer` · `outfitter` · `note` (reason or free text) · `when` (time).

**ScheduleItem**: `id` · `kind` (`sale` \| `delivery`) · `time` · `ampm` · `customer` · `label` · `outfitterId` · `unit` · `status` · `delay` (bool) · `todos[]` · `notes[]`.

**RepStats** (per outfitter, per `today` / `week` / `month`): `demo` · `wup` (write-ups) · `sold` · `goal` · `gross` (per unit) · `avg` (time with customer).

**ChatMessage**: `from` (`me` \| `them`) · `text` · `at`.

## Derived values
- `since` = now − time the case entered its current phase. `total` = now − check-in time. They tick every second in production; the prototype shows them static.
- Customers on the floor = the number of cases.
- Phase detail: `checked-in-today`, `entered-phase`, `currently-in-phase` = cases in the phase, `conversion` = advanced ÷ entered, `exits` = number of exits from the phase, `avg-time-in-phase`.
- Unread = unread messages per outfitter, cleared when chat opens.

## Events and mutations

| Event | Payload | Fired by | Side effects |
|---|---|---|---|
| `case.created` | customer, type, interest, outfitter, override reason?, lookup source | `btn-commit-check-in` (step 3) | Welcome SMS link; outfitter notification; audit entry if overridden |
| `case.assigned` | caseId, outfitterId, override reason? | `btn-commit-assign-outfitter` | Waiting → Assigned; outfitter notification |
| `case.moved` | caseId, fromPhase, toPhase, source (`drag` \| `menu`) | drop on `list-phase#*` · `btn-commit-move-case` | Resets `since`; undo within 6s reverts it |
| `case.note_added` | caseId, text | `btn-commit-add-note` | — |
| `case.left` | caseId, phase, reason, note | `btn-commit-customer-left` | Case removed; Exit created |
| `rep.paused` / `rep.unpaused` | outfitterId, reason, duration / fulfilled | pause / unpause commits | Rotation state change |
| `rep.benched` / `rep.unbenched` | outfitterId, reason, duration, coaching note / note | bench / un-bench commits (**Manager only**) | Bench moves the outfitter's active customers to Waiting; audit entry |
| `rotation.reordered` | outfitterId, from, to, reason, detail | `btn-commit-move-in-rotation` | Audit entry |
| `chat.sent` | outfitterId, text | `btn-action-send-chat#*` | — |
| `schedule.arrived` | itemId | `btn-commit-schedule-check-in` | Outfitter notified; card added to the board |
