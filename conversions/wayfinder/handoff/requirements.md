# Requirements · Wayfinder Discovery

Regenerate the full per-element skeleton with **Export handoff** (prototype side panel). Section-level acceptance below.

## Frame `frame-wayfinder-outfitter`
Layout: Header (S01) · Units in play (S02) · StepRail (S03) · Step content (S04) + detail aside (S05, beside ≥1024, below otherwise) · Action bar (S99, sticky ≤1023).
Data states: loading skeleton · load error + retry · zero results · partial · no permission.

| Section | Acceptance |
|---|---|
| S02 units in play | Given any answer change, when the engine recomputes, then all three StatTiles update in the same frame |
| S03 StepRail | Given a step the engine skips, then it shows struck through with its reason and can't be clicked |
| S04 question | Given a tile is tapped, then its live line reflects the engine preview, the summary updates, and the detail aside shows that option |
| S04 required | Given a multi tile with a must-rule is selected, then a Required checkbox appears under it; checking it moves the tile from ranking to a hard gate |
| S04 budget | Given monthly payment + down + tier, then "Buying range up to $X" shows; with no store, the 6% note shows |
| S05 detail | Shows benefits, what the choice does, and what the step writes to the matches |
| S99 actions | Continue is disabled until the step is answered (`ok`); on the last question it reads "See matches" |
| Matches | Verified top 6 and needs-verification top 6, each with score, verified status, stock # and top 3 reasons |
| Zero results | Given 0 units in play, then the limiting combination and two recovery changes show, each with a "Change <step>" ACTION that opens that step |
