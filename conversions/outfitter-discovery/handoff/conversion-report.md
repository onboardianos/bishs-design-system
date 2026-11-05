# Conversion report · Outfitter Discovery

## 1 · Inventory (pass 1)
One 5.1 MB HTML file with four parts:
| Part | Size | What it is | Converted to |
|---|---|---|---|
| `<style>` | 7 KB | Page CSS: gold-selected cards, gold primary button, gold pills | Deleted; re-skinned to tokens |
| `IMG` script | 1.1 MB | 24 base64 JPEG option photos | `images/*.jpg` (relative paths) |
| `BISH_SNAPSHOT` | 3.9 MB | Athena inventory snapshot INV-2026-09-16 (6,881 units, lookups, rooftops with tax rates) | `data/snapshot.json` (1.1 MB, columnar, unused fields dropped, values unchanged), fetched at load |
| Engine script | 36 KB | Decision engine spec v1.1: gates s9, previews s8, scoring s11, budget s10, zero-result recovery s16 | `data/engine.js`, **unchanged** |
| App script | 39 KB | 13 screens, option catalogue, skip rules, HTML-string rendering | `od-model.babel` (logic, unchanged) + `od-app.babel` (DS UI) |

Screens: Path · Type/Class · Budget · Towing · Sleeping · Bedroom · Length · Garage · Bathroom · Inside · Outside · Size & build · Matches. Hidden states found: skipped steps with reasons, required checkboxes, budget/tow/length/garage inline panels, sidewall sub-question, data-gap warnings, motorhome branch notes.

## 2 · Original → converted
| Group | Original | Converted |
|---|---|---|
| Shell | Hand-built header (brand + "units in play" pill + step) | AppShell, outfitter role, Cases active, phase arc = Discovery. Units in play → 3 StatTiles (S02) |
| Shell | Pill step nav | StepRail custom block (S03); current = gold-lo text + bar (nav job) |
| Gold rule | Selected cards gold border + gold check | ChoiceTile: ink border + ink check |
| Gold rule | Gold gradient "Continue" | Button primary = the one COMMIT (`btn-commit-continue`) |
| Gold rule | Gold effect pills, gold result text, gold seg buttons | Badge neutral; ink bold result text; ChoiceChip md |
| Tokens & type | System font stack, 34px bold titles | QuestionCard: Bebas question, Barlow overline, Source Sans body |
| Icons | Unicode glyph placeholders (⛟ ☀ ▦ ↔ $ ○) on SVG tiles | RV photos where one exists; Lucide icons otherwise |
| Responsive | One 850px media query | Container queries at 640 / 1024; tiles auto-fill; sticky action bar ≤1023; aside beside the question ≥1024 |
| Interaction | `<label>` with checkbox nested inside a `<button>` | Required checkbox in ChoiceTile `footer`, outside the button |
| Interaction | Results: "None — loosen a required card" | Engine s16 zero-result recovery: limiting combination + two changes with unlock counts + "Change <step>" ACTION |
| Data states | None | Loading skeleton, load error with retry, zero results, partial (needs verification + data-gap notices), no permission |
| Stamping | None | Every control stamped v2 (see component-map) |

## 3 · Removed
| Item | Why |
|---|---|
| "replaces Q001 + Q001B" kicker on every step | Spec trace, not UI. Moved to `trace` in the model and to requirements.md |
| Brand text header "DISCOVERY CONFIGURATOR · V2" | AppShell owns the header. Kept as the page Header title |
| `location.reload()` Start over | Replaced with a state reset (keeps the case and shell) |
| `ph()` SVG placeholder art | Replaced by photos / Lucide (no drawn imagery) |

## 4 · Gate summary
See `qa-gates.md`. Pending: SpecLint export at 100%, shrink test and 200% zoom sign-off.

## 5 · Open questions
See `intake.md` › Open questions (Q-OD-1 … Q-OD-6).
