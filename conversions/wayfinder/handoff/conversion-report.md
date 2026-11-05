# Conversion report · Wayfinder Discovery (v2.1)

Builds on the Outfitter Discovery conversion (`../../outfitter-discovery/handoff/conversion-report.md`), which covered the v2 source. This report lists what v2.1 changed and how each change was converted.

## 0 · Business intake
11 new rules (BR-WF-01…11), each traced to the source script or snapshot metadata. 6 open questions (Q-WF-1…6), 4 marked `needs-rule`.

## 1 · Inventory
| Part | Size | What | Converted to |
|---|---|---|---|
| `<style>` | 22 KB | Figma-matched tokens (deltas vs colors_and_type.css) | Deleted; DS tokens |
| `IMG` | 1.25 MB | Option photos (same 24 as v2) | `images/*.jpg` (unchanged) |
| `BISH_SNAPSHOT` | 4.7 MB | INV-2026-10-27 · 7,809 units · 32 rooftops | `data/snapshot.json` + `.jsonp` (1.5 MB, columnar) |
| Engine | 36 KB | Spec v1.1, questionnaire 1.1.0 | `data/engine.js` (logic identical to v2) |
| App | 677 KB (159 KB without images) | 20 screens, trade-in overlay, voice note, tow lookup (875 rows), decision record | `wf-model.babel` + `wf-app.babel` + `data/tow-vehicles.js` |
| `athena_init_raw` JSON | 276 KB | Manufacturers, makes, reps, statuses, zones, conditions, buyer codes | Already folded into the snapshot lookups; reps/buyer codes out of scope (Q-WF-6) |

## 2 · Map to the system
See component-map.md (v2.1 additions). New custom blocks: Progress, Select, VoiceNote, trade-in modal. No new DS component promoted.

## 3 · Restructure
- One questionnaire, two layers (customer, outfitter mirror) sharing one answer state.
- Customer: brand header, progress, live count, question card, fixed action bar (Previous · Add trade-in · Next).
- Outfitter: AppShell › Customers › Discovery, StatTiles, StepRail, question + detail/case-record aside, sticky action bar.
- Sidewall split out of size into its own step (source change).

## 4 · Re-skin to canon
Gold only on COMMIT fills, ACTION outlines, current progress dot. Selected tiles/chips are ink. Figma rapport icons → Lucide. Source "Dealer OS" header → DS Header / AppShell.

## 5 · Make it fluid
Both layers are one implementation each across 360–1600 (container queries on `app`). Customer content column caps at 880px. Progress dots size with `cqi`, so 20 steps fit at 360 without horizontal scroll. Trade-in modal becomes a bottom sheet ≤640.

## 6 · Stamp and wire
Every control carries `data-spec-id`; new ids include `nav-progress`, `metric-campers-fit`, `btn-action-open-trade-in`, `frame-trade-in`, `input-trade-*`, `sec-voice-note#…`, `input-tow-make/model/engine`, `card-case-record`, `info-why-ranks#…`, `btn-commit-send-to-outfitter`, `btn-commit-save-to-case`, `btn-action-export-decision-record`. Every state is reachable by clicking stamped elements. Run Export handoff for the SpecLint coverage line.
