# State map · Wayfinder Discovery

Two layers, same screens. Customer ids start `c-`, outfitter ids `o-`. Skipped steps stay visible in the outfitter StepRail with their reason; customers simply don't see them.

| # | State | Reached by | Customer | Outfitter |
|---|---|---|---|---|
| 01 | loading | Page open, snapshot fetching | 390 | 1280 |
| 02 | path | Start (live, saves to case) | 390 · 834 · 1280 | 1280 · 834 · 390 |
| 03 | type | Path › Towable | 390 | 1280 |
| 04 | type-motor | Path › Motorhome | 390 | 1280 |
| 05 | camping | Type › Next | 390 | 1280 |
| 06 | trade-now | Camping › "I have a camper now" | 390 | 1280 |
| 07 | trade-why | Trade-now › Next | 390 | 1280 |
| 08 | campstyle | Next | 390 | 1280 |
| 09 | activities | Next (chips + Other) | 390 | 1280 |
| 10 | sleep | 2 adults, 2 children, 1 pet, bunks required | 390 | 1280 |
| 11 | bedroom | Next | 390 | 1280 |
| 12 | tow | Towing › Yes · vehicle lookup (make/model/engine) | 390 | 1280 |
| 13 | length | Hard limit 32 ft | 390 | 1280 |
| 14 | garage | Toy hauler path | 390 | 1280 |
| 15 | bath | Two bathrooms · must-have | 390 | 1280 |
| 16 | inside | Next | 390 | 1280 |
| 17 | outside | Next | 390 | 1280 |
| 18 | size | Slide-outs | 390 | 1280 |
| 19 | build | Sidewall · required | 390 | 1280 |
| 20 | brand | Brand tier | 390 | 1280 |
| 21 | budget | Monthly payment, store American Fork | 390 | 1280 |
| 22 | trade-overlay | "Add trade-in" on any step's action bar | 390 | 1280 |
| 23 | results | See matches | 390 · 1280 | 1280 · 390 |
| 24 | results-sent | Send to my outfitter / Save matches to case | 390 | 1280 |
| 25 | zero | Answers that leave 0 units → recovery | 390 | 1280 |
| 26 | error | Snapshot fetch fails → Try again | 390 | 1280 |
| 27 | no-access | Receptionist opens Discovery (outfitter layer only) | — | 1280 |
