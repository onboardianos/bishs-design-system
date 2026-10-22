# Floor Workspace — business intake

Built from the source app and review decisions. The machine-readable copy is `../fw-intake.babel`, which feeds the Jira export.

## 1 · Outcome
| Field | Answer | Source |
|---|---|---|
| Problem | Managers and front desk need one live view of who's on the floor, who's up, and what's scheduled, so no customer waits unassigned | Source app › Home tile description |
| Roles | Sales manager, Receptionist | Source app › RoleProvider; `roles-permissions.md` |
| Success KPI | **Not provided.** Proposed: median time in Waiting under 3 min; 0 customers leave from Waiting | Needs Zach |
| Today without it | **Not provided** | Needs Zach |
| Out of scope | Bullpen, Outfitter Mobile, Decline flow, Customer Mobile (separate builds) | Zach, 2026-10-22 |
| Release | MVP: all 17 states; pause-approval queue pending (D-08) | `decisions.md` |

## 3 · Business rules
| # | Rule | Source |
|---|---|---|
| BR-01 | Up-now is preselected; anyone else requires an override reason | Source › Modals |
| BR-02 | Customer left needs a reason; the exit is logged against the phase | Source › Modals + SEED_EXITS |
| BR-03 | 8 phases in order; cards mostly advance automatically; a manual move is an override | Source › PHASES + Manual Move copy |
| BR-04 | Only a manager can bench or un-bench; reason + coaching note | Source › RepActions |
| BR-05 | Lunch and manager check-in pauses need approval + return time | Source › RepActions |
| BR-06 | Unpause needs a fulfilment confirmation | Source › RepActions |
| BR-07 | A rotation move needs a reason; returning customer applies automatically | Source › RepActions |
| BR-08 | Check-in looks up by phone or email first; a walk-in creates a profile | Source › Modals |
| BR-09 | Assigning notifies the outfitter and sends the customer a welcome link | Source › Modals |
| BR-10 | Benching returns the outfitter's active customers to Waiting | Zach, 2026-10-22 |
| BR-11 | Receptionists can't move cases (**proposed, confirm in D-09**) | Conversion proposal |

Sections 2 (roles), 5 (approvals and audit) and 6 (notifications) are in `roles-permissions.md` and `api-contract.md`. Section 4 (data sources) is open as D-06. Section 7 (known edge cases) has none provided yet.
