# Business intake · Wayfinder Discovery

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


## v2.1 additions (2026-10-28)
| ID | Rule | Source |
|---|---|---|
| BR-WF-01 | Rapport answers (camping today, trade-in, camping style, activities, brand tier, pets) are recorded on the case and **never** reach the engine | Source app comment "buildSession() never reads these" |
| BR-WF-02 | "Has a camper now" opens two trade-in steps; any other answer skips them | Source `skip: S.camping!=='current'` |
| BR-WF-03 | Trade-in lists (manufacturer → brand → model) come from the makes and models in today's inventory; "Other / not listed" allows free text (80 chars) | Source `rvMfrs / rvMakes / rvModels` |
| BR-WF-04 | A trade-in can be added from any step (overlay) and is only stored once it holds something | Source `commitInline / tradeIsEmpty` |
| BR-WF-05 | Voice note audio stays on the device for the session; the case stores length + a flag only. Max 2 minutes (**build proposal, Q-WF-3**) | Source `VOICE` comment; 2-min cap proposed |
| BR-WF-06 | Tow vehicle lookup (RV LIFE 2026 Trailer Towing Guide, 2026 MY, 875 rows) only prefills the tow rating; a manual rating overrides it | Source `TOW_VEH` comment |
| BR-WF-07 | Third tow answer "Needs it delivered" applies no GVWR gate (same effect as "Not sure yet") | Source comment, 2026-10-28 reorder |
| BR-WF-08 | Step order: path, type, camping, trade-in ×2, camping style, activities, sleep, bedroom, tow, length, garage, bath, inside, outside, slide-outs, build, brand, budget, matches | Source `screens[]` (2026-10-28 reorder) |
| BR-WF-09 | Sidewall construction is its own step; skipped when every unit in play has one construction | Source screen `build` |
| BR-WF-10 | Price is DSRP (`evoDsrp`); the raw feed carries no sale price. Zero price/length/GVWR/sleeps = missing | Snapshot `meta.priceSource` |
| BR-WF-11 | L-stock = stocknumber starts with L, or condition id 8, or condition Marketing / Marketing-Stocknumber. Shown as "floorplan examples" (customer: "Floorplans we can order") | Snapshot `meta.lStockRule` |

## Open questions
| ID | Question | Blocks |
|---|---|---|
| Q-WF-1 | Customer shell: AppShell has no customer role. The customer layer uses the DS Header + a brand strip only. Confirm, or add a Customer Portal shell to the DS | `needs-rule` · customer frame |
| Q-WF-2 | What happens on "Send to my outfitter"? Prototype marks the case; confirm the notification (Messenger? phase alert?) and whether the customer can still edit | `needs-rule` · btn-commit-send-to-outfitter |
| Q-WF-3 | Voice note: storage (device only vs uploaded to the case), max length, consent copy | `needs-rule` · sec-voice-note |
| Q-WF-4 | Customer-facing price: DSRP is the only price in the feed (median sale ≈ 0.91 × DSRP on 2026-09-16). Show DSRP to customers, hide it, or label it "MSRP"? | `needs-rule` · card-match |
| Q-WF-5 | Should the customer see stock numbers? Shown in the prototype so the outfitter can find the unit | `needs-rule` · card-match |
| Q-WF-6 | Athena init file also carries reps, buyer codes, order statuses and approval statuses. None are used by Discovery. Confirm they stay out of scope | Scope |
