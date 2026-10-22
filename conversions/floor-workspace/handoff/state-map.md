# Floor Workspace — state map

## States (Canvas ⇄ Prototype, 1:1)

| # | State ID | Label | Frame | Trigger | Exits | Artboards |
|---|---|---|---|---|---|---|
| 01 | `floor` | Floor workspace | `frame-app-shell` | Route `/floor` · `nav-floor` | any trigger below | 1920, 1280, 834, 390 |
| 02 | `case-menu` | Case actions | `frame-case-menu#{case}` | `btn-action-case-menu#{case}` | `menuitem-*` → 04/05/06/07/15; Escape / scrim → 01 | 1280, 390 |
| 03 | `checkin` | New check-in | `frame-check-in` | `btn-commit-new-check-in` | Done → 01 (new card in Assigned); Cancel → 01 | 1280, 390 |
| 04 | `assign` | Assign outfitter | `frame-assign-outfitter` | `menuitem-assign#{case}` · `btn-action-assign#{case}` | commit → 01 + toast | 1280 |
| 05 | `move` | Move to phase | `frame-move-case` | `menuitem-move#{case}` | commit → 01 + Undo toast | 1280 |
| 06 | `note` | Add note | `frame-add-note` | `menuitem-note#{case}` | commit → 01 + toast | 1280 |
| 07 | `left` | Customer left | `frame-customer-left` | `menuitem-left#{case}` | commit → 01 (card removed, exit logged) | 1280 |
| 08 | `phase` | Phase detail | `frame-phase-detail#{phase}` | `btn-action-phase-detail#{phase}` | close → 01 | 1280, 390 |
| 09 | `rep-menu` | Outfitter actions | `frame-rep-menu#{o}` | `btn-action-rep#{o}` | → 10/11/12/13/14/15 | 1280, 390 |
| 10 | `rep-pause` | Pause outfitter | `frame-pause-outfitter` | `btn-action-rep-pause#{o}` | commit → 01 | 1280 |
| 11 | `rep-unpause` | Unpause outfitter | `frame-unpause-outfitter` | `btn-action-rep-unpause#{o}` | commit → 01 | 1280 |
| 12 | `rep-bench` | Bench outfitter | `frame-bench-outfitter` | `btn-action-rep-bench#{o}` (Manager) | commit → 01 | 1280 |
| 13 | `rep-unbench` | Un-bench outfitter | `frame-unbench-outfitter` | `btn-action-rep-unbench#{o}` (Manager) | commit → 01 | 1280 |
| 14 | `rep-move` | Move in rotation | `frame-move-in-rotation` | `btn-action-rep-move#{o}` · drag on `list-rotation` | commit → 01 | 1280 |
| 15 | `chat` | Message outfitter | `frame-chat#{o}` | `btn-action-rep-message#{o}` · `menuitem-message#{case}` · `btn-action-message-outfitter#{id}` | close → previous | 1280 |
| 16 | `appt` | Schedule item detail | `frame-schedule-item#{id}` | `btn-action-open-schedule-item#{id}` | → 15 / 17; close → 01 | 1280 |
| 17 | `appt-checkin` | Customer arrived | `frame-schedule-check-in` | `btn-commit-check-in-arrival#{id}` | commit → 01 + toast | 1280 |

```mermaid
stateDiagram-v2
  [*] --> Floor
  Floor --> CaseMenu: case menu
  CaseMenu --> Assign
  CaseMenu --> Move
  CaseMenu --> Note
  CaseMenu --> Left
  CaseMenu --> Chat
  Floor --> Assign: quick Assign
  Floor --> CheckIn: New check-in
  CheckIn --> Floor: Done
  Floor --> PhaseDetail
  Floor --> RepMenu: outfitter card
  RepMenu --> Pause
  RepMenu --> Unpause
  RepMenu --> Bench
  RepMenu --> Unbench
  RepMenu --> MoveRep
  RepMenu --> Chat
  Floor --> MoveRep: drag card
  Floor --> ScheduleItem
  ScheduleItem --> Chat
  ScheduleItem --> ArrivalCheckIn
  Assign --> Floor
  Move --> Floor
  Note --> Floor
  Left --> Floor
  Pause --> Floor
  Unpause --> Floor
  Bench --> Floor
  Unbench --> Floor
  MoveRep --> Floor
  ArrivalCheckIn --> Floor
```

## Data states per module (gate G8)

| Module | Loading | Empty | Error | Partial | Stale | Permission |
|---|---|---|---|---|---|---|
| Ups rotation | **TODO** skeleton cards | **TODO** "No one in rotation" | **TODO** | **TODO** | **TODO** "Updated n min ago" | n/a (all roles view) |
| Today's schedule | **TODO** | Built for filtered empty | **TODO** | **TODO** | **TODO** | n/a |
| Floor traffic | **TODO** | Built: "No customers in {phase}" | **TODO** | **TODO** | **TODO** | n/a |
| Phase detail | **TODO** | Built: "No one has left from {phase} today" | **TODO** | n/a | **TODO** | n/a |
| Rep menu | **TODO** | n/a | **TODO** | n/a | **TODO** | Built: Bench disabled for non-managers |

G8 is **not met** until every TODO is built (see `decisions.md` › D-03).
