# Precedent library

These are requirement patterns proven in an earlier build. When a new design contains the same pattern, the generator pre-fills the requirement and marks it **precedent: <build> — confirm**. A precedent is a **suggestion**: it becomes a rule only when someone confirms it in the new build's intake (`confirmed: true`).

**How a pattern matches:** by element family shape (`btn-commit-*`, `frame-*`, `input-*-reason#*` …) and/or the domain entity and verb in `data-bos-perm` (`case.assign`, `rep.bench` …). The machine-readable copy is `precedents.json`, which the generator reads.

| ID | Pattern | Matches | Rule | Acceptance | From |
|---|---|---|---|---|---|
| P-001 | Assign owner with rotation override | `case.assign`, `case.override`, `input-outfitter#*`, `input-override-reason#*` | The next-up person is preselected. Choosing anyone else requires an override reason, which is audited | Commit stays disabled until a reason is chosen when the pick isn't next-up | Floor Workspace |
| P-002 | Close with reason | `*.close`, `frame-*-left`, `input-*-reason#*` | Ending a record requires a reason from a fixed list plus an optional note; the result is logged as an exit or audit | Commit is disabled until a reason is chosen; the exit appears in reporting | Floor Workspace |
| P-003 | Move between stages, with an alternative to dragging | `*.move`, `list-phase#*`, `frame-move-*` | Dragging and a "Move to…" dialog do the same thing; a 6s Undo follows | Moving without dragging works at 390px; Undo restores the previous stage and timer | Floor Workspace, boards-and-dnd |
| P-004 | Manager-only discipline | `rep.bench`, `frame-bench-*` | Only a manager can bench or un-bench. A coaching note is required and is visible to manager, GM and admin only | Non-managers see the control disabled with a note saying who can | Floor Workspace |
| P-005 | Request instead of act | access `approve` | Roles with `approve` access create a request; the approver confirms; the state doesn't change until then | The requester sees "request sent"; the approver sees a queue item | Floor Workspace |
| P-006 | Pause with fulfilment check | `rep.pause`, `frame-unpause-*` | Pausing needs a reason and a duration. Unpausing needs confirmation that the reason is fulfilled | Unpause stays disabled until the check is ticked | Floor Workspace |
| P-007 | Multi-step intake with lookup | `frame-check-in`, `input-lookup-*` | Look up an existing record first; walk-in is the fallback; the match pre-fills names; a new profile is created after intake | A 10-digit phone number returns a match or a warning; walk-in skips lookup | Floor Workspace |
| P-008 | Inspect-and-return detail | `frame-*-detail#*`, sheets | Detail opens in a side sheet (a bottom sheet on phone) without leaving the list | The list stays visible behind the sheet; Escape closes it and returns focus | Floor Workspace, HIG |
| P-009 | Live counts and timers | `metric-*`, `card-*` timers | Counts and timers are worked out on the client from timestamps and tick every second; the server stays the source of truth | A timer advances without reloading; the count equals the list length | Floor Workspace |
| P-010 | Tracked commit | `btn-commit-*` | Every commit emits a named event with its payload (see `api-contract`) | The event fires once per commit, with actor, role and store | Floor Workspace |

**Adding precedents:** when a build's handoff is approved, every requirement row with a confirmed rule that isn't specific to that build is added here, and to `precedents.json`, with its source build.
