# Wayfinder Discovery · handoff package

| | |
|---|---|
| Build | WAYFINDER · v0.2 (conversion of Wayfinder v2.1) |
| Date | 2026-10-28 |
| Source | `uploads/wayfinder_v2.1_figma_match.html` (Figma-matched discovery UI, inventory-connected) + `uploads/athena_init_raw_2026-10-27-25166a87.json` (Athena lookups) |
| Inventory | Snapshot **INV-2026-10-27-D4D7297F606E** · 7,809 units (3,283 new on the lot, 4,526 L-stock floorplans) · 32 rooftops |
| Audiences | **Customer** (welcome link, own device) and **Outfitter / Sales manager** (case mirror inside AppShell). Receptionist: no access |
| Owner | Zach McVicker |
| Supersedes | `conversions/outfitter-discovery/` (v2 source, 2026-09-16 snapshot). Kept as history; do not build from it |

## How to run
Open `../index.html`. **Prototype** mode: pick a **Layer** (Customer · welcome link, or Outfitter · case mirror), then walk the states from the side panel. Both layers' "Path · live walkthrough" states save to the same case answers, so answers given in the customer layer show up in the outfitter mirror. **Canvas** shows every state: customer at 390 (plus 834/1280 postures), outfitter at 1280 (plus 834/390).

## One questionnaire, two audiences
| | Customer | Outfitter mirror |
|---|---|---|
| Shell | Brand header only (no Dealer OS nav) | AppShell · Customers › Discovery |
| Copy | Second person ("How many people will you…") | Third person ("Who needs regular sleeping space?") |
| Progress | Dots + RV marker (Figma "Progress") | StepRail with skip reasons |
| Live counts | "1,044 campers fit so far" | 3 StatTiles: in play · verified · need verification |
| Tile hints | "128 campers fit" / "moves matching campers up" | "128 units remain" / "ranks 412 units higher" |
| Engine detail | Hidden (privacy firewall) | Step detail card + data-gap notices |
| Rapport answers | Asked, labelled "Shared with your outfitter" | Case record card |
| Matches | 3 groups, no scores, "Send to my outfitter" (COMMIT) | Scores + "Why it ranks", decision record export, "Save matches to case" (COMMIT) |

## Contents
| File | What |
|---|---|
| intake.md | Business rules with sources, open questions |
| state-map.md | Every state per layer and how to reach it |
| component-map.md | Source element → DS component, custom blocks |
| roles-permissions.md | What each role sees and does |
| data-contract.md | Snapshot, answers, trade-in, decision record |
| api-contract.md | Endpoints needed |
| requirements.md | Section acceptance (regenerate per-element via Export handoff) |
| engineering.md · test-plan.md · qa-gates.md | Build, test, ship gates |
| decisions.md | Every call made in this conversion |
| conversion-report.md | The six passes |

## Ship gate
Export handoff (side panel) renders every state of both layers at 1280 / 834 / 390, runs SpecLint and downloads `wayfinder.manifest.json`, `wayfinder.requirements.md`, `wayfinder.jira-tickets.csv`. Report the coverage line here once run.
