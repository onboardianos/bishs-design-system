# Data contract · Outfitter Discovery

## Inventory snapshot (`GET /inventory/snapshot` → `data/snapshot.json` in the prototype)
`{ cols: string[], meta, lookups, rows: any[][] }`, decoded to the source's `BISH_SNAPSHOT`:
- `meta`: inventorySnapshotId, specVersion, sourceDate, shopperClasses[]
- `lookups`: characteristicTypes{id→{name, group}}, classes{code→{description}}, conditions, statuses, rooftops{location→{storeName, salesTaxRate}}
- `units[]`: stocknumber, isLStock, year, manufacturer, make, model, class, condition, location, price, lengthIn, gvwr, slides, sleeps, floorplanId, sidewallConstruction (LAMINATE | STT | UNKNOWN), characteristicTypeIds[], qaFlags[], garageLength

## Answers (UI state → engine session)
path, type, motor, budget (cash | finance | skip), maxSpend, payment, down, tier (veryGood | good | fair), store, tow (yes | no), towRating, towMode (derived | raw), adults, children, childSetup, bedroom, lengthMode (hard | soft | none), lengthFt, garageFt, bath[], bathMust[], inside[], insideMust[], outside[], outsideMust[], size, build, buildMust. `buildSession()` in `od-model.babel` maps them to the engine session (gates, prefs, avoids, numericPriorities, lifestylePaths, budget, tow).

## Engine outputs
- `candidates()` → verified / probable / ineligible counts (StatTiles)
- `previewGate()` / `previewBoost()` → each tile's live line
- `rankResults()` → groups VERIFIED_AVAILABLE, VERIFIED_L_STOCK_EXAMPLE, PROBABLE_NEEDS_VERIFICATION with score.display + reasons
- `zeroResultRecovery()` → two actions {key, label, unlocked, verified, qualifier}
