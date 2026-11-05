# Business intake · Outfitter Discovery

## Rules (every rule has a source)
| ID | Rule | Source |
|---|---|---|
| BR-OD-01 | Path (towable / motorhome) is a hard gate on class group | Source engine + app (screen `path`) |
| BR-OD-02 | Only classes present in the snapshot are offered | Source app (`shopperClasses`) |
| BR-OD-03 | Cash ceiling rounds to the nearest $500 | Engine `cashCeiling` (s10) |
| BR-OD-04 | Payment path solves price from payment, down, credit tier (6.99 / 9 / 12% APR) and term bands (120/144/180/240 mo) | Engine s10.2 |
| BR-OD-05 | Tax uses the closest store's rate; 6% until a store is picked | Engine s10.3 + rooftops lookup |
| BR-OD-06 | Tow limit = 90% of rating by default, or the exact number | Source app (screen `tow`) |
| BR-OD-07 | Sleep count minimum = adults + children | Source app |
| BR-OD-08 | Units missing gate data are "needs verification", not removed | Engine s9 / rank groups s11 |
| BR-OD-09 | An option is shown only if it splits 5–95% of units in play | Source app (`splits`) |
| BR-OD-10 | Steps skip with a stated reason (e.g. "Motorhomes are driven") | Source app (`skip`) |
| BR-OD-11 | Required cards turn a preference into a hard gate | Source app (`must`) |
| BR-OD-12 | Scoring: base by rank group + explicit (30) + lifestyle (12) + construction (8) + numeric (7) − misses (12) − QA (8) | Engine s11 |
| BR-OD-13 | Zero results → exactly two recovery actions; safety gates (GVWR) say "Requires advisor/tow verification" | Engine s16 |
| BR-OD-14 | Garage length pre-filters toy haulers; unknown garages stay in | Source app (`unitsNow`) |

## Answered 2026-10-27 (Zach)
| ID | Question | Answer | Effect |
|---|---|---|---|
| Q-OD-1 | Who can run Discovery? | Outfitters or managers | Receptionist keeps the no-access state |
| Q-OD-2 | Where do matches go? | To the Matches screen | Matches is the end of the flow; no extra COMMIT needed |
| Q-OD-3 | Nav item or phase? | Entered through the customer screen | AppShell activeId = customers; no new catalog item |
| Q-OD-4 | Stale snapshot? | Any inventory that shows up is usable | No stale state; G9 closed |
| Q-OD-5 | Customer-facing? | Yes, deferred | Privacy pass on data-gap notices and QA reasons comes later |
| Q-OD-6 | Save answers to the case? | Yes | Answers + current step saved per case (prototype: localStorage) |

## Open questions (`needs-rule`)
| ID | Question |
|---|---|
| Q-OD-5b | When the customer-facing pass happens: which notices, scores and QA reasons are outfitter-only? |
| Q-OD-7 | Which button on the customer screen opens Discovery (label + placement)? |
