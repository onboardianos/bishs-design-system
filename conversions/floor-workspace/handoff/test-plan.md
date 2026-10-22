# Floor Workspace — test plan

## Automated
| Suite | Tool | What it checks |
|---|---|---|
| Stamps & permissions | Playwright + `SpecLint.run()` | For each role (manager, receptionist) × state (17) × width (390, 834, 1280, 1920): `pass === true`, `hiddenRendered === 0`, and every ID in `floor-workspace.manifest.json` is present |
| Accessibility | `@axe-core/playwright` | No serious or critical violations per state |
| Permissions (API) | Integration tests | Each Matrix B row: an allowed role gets 2xx, a forbidden role gets 403 with `perm`; reason rows return 422 when the reason is missing |
| Visual | Playwright screenshots | Per state × width, diffed against the approved baseline |
| Unit | Vitest | `can()`, timers, the event reducer (snapshot + events → state), check-in validation |

## Acceptance scenarios (Given / When / Then)
The scenarios come from `requirements.md`. These must pass end-to-end:

1. **Check-in, in-rotation outfitter.** Given Mike is up now, when the receptionist checks in the Jacksons with a matched phone number and keeps Mike, then a card appears in Assigned with Mike, the welcome SMS is sent and Mike is notified.
2. **Check-in, override.** Given Mike is up now, when Sarah is picked instead, then commit stays disabled until an override reason is chosen, and the audit records the reason.
3. **Drag to move, with undo.** Given a manager at 1280, when they drag Bakers to MCP and click Undo within 6s, then Bakers returns to Discovery with the original timer.
4. **Move without drag.** Given a manager at 390, when they open the case menu and choose Move to… → Demo, then the case moves. No drag is required.
5. **Receptionist can't move.** Given a receptionist, when they open a case menu, then there's no Move to… and the note explains who can. Cards can't be dragged, and `POST /move` returns 403.
6. **Bench gating.** Given a receptionist, the rep menu shows Bench disabled with "Only a manager can bench or un-bench." Given a manager, Bench needs a reason and a coaching note, then moves that outfitter's active cases to Waiting.
7. **Pause request.** Given a receptionist, when they request a lunch pause for Sarah, then Sarah stays available and the manager gets an approval request. After approval, Sarah shows as paused (Lunch).
8. **Customer left.** When Customer left is committed with a reason, then the card is removed and the exit appears in that phase's detail.
9. **Responsive.** Drag the window continuously from 1440 to 375. There's no page-level horizontal scroll at any width. The views switch to tabs below 980 and to single phase below 600. The commit stays reachable throughout.
10. **Keyboard.** Every overlay opens with Enter or Space on its trigger, traps focus, closes with Escape and returns focus to the trigger.

## Manual
- 200% browser zoom at 1280 and 390 (G4)
- VoiceOver and NVDA pass: rep card labels, phase counts, toast announcements
- Reduced motion: no drag-overlay animation, instant drops
