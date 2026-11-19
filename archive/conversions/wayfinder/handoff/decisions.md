# Decisions · Wayfinder Discovery

| Date | ID | Decision | By |
|---|---|---|---|
| 2026-10-27 | D-OD-01 | Mounted as the **Discovery phase inside Cases** (activeId cases, phase arc Discovery). No new catalog item; see Q-OD-3 | Build, per "nav is data" |
| 2026-10-27 | D-OD-02 | Engine and snapshot carried over unchanged. Snapshot re-encoded columnar (3.9 → 1.1 MB), values identical | Build |
| 2026-10-27 | D-OD-03 | **ChoiceTile promoted** into `ui_kits/floor/` (second build to need it). Guide, README and card updated | Build, per selection guide §6 |
| 2026-10-27 | D-OD-04 | Selected tiles are ink, not gold. Continue is the single gold COMMIT. Effect pills are neutral Badges | Gold rule |
| 2026-10-27 | D-OD-05 | Results use Card, not UnitRow, because UnitRow has no slot for match reasons. Gap: propose a `details` slot on UnitRow | Build · gap |
| 2026-10-27 | D-OD-06 | Zero results show the engine's s16 recovery (two changes + "Change <step>"), replacing the source's "None — loosen…" line | Source engine s16 |
| 2026-10-27 | D-OD-07 | Copy speaks to the outfitter about the customer ("How do they want to set the budget?") because the outfitter runs the tool | Build · confirm with Q-OD-5 |
| 2026-10-27 | D-OD-08 | Spec trace ("replaces Q001…") moved out of the UI into the model + requirements | Build |
| 2026-10-27 | D-OD-09 | Glyph placeholders replaced with RV photos (6 classes) or Lucide icons; HTT, FD, AT and Class A/B/C tiles use icons until photos exist | Build · needs photos |
| 2026-10-27 | D-OD-10 | Results has no COMMIT until Q-OD-2 says where matches go | Build · `needs-rule` |
| 2026-10-27 | D-OD-11 | Q-OD-1…6 answered (see intake). Discovery opens from the customer screen (activeId customers); D-OD-01 superseded | Zach |
| 2026-10-27 | D-OD-12 | Matches is the destination; Start over stays the only action there (D-OD-10 closed) | Zach |
| 2026-10-27 | D-OD-13 | Answers + step persist to the case; "Path · live walkthrough" state resumes where you left off. Start over clears it | Zach (Q-OD-6) |
| 2026-10-27 | D-OD-14 | No stale-snapshot state: any inventory shown is usable | Zach (Q-OD-4) |

| 2026-10-28 | D-WF-01 | Rebuilt as **Wayfinder Discovery** from the v2.1 source with the 2026-10-27 snapshot (7,809 units). Outfitter Discovery is superseded, kept as history | Zach |
| 2026-10-28 | D-WF-02 | **One model, two layers.** Customer and outfitter render the same screens from `wf-model.babel`; only copy, chrome and what's revealed change. No device or audience forks | RF01 + dual-mode check |
| 2026-10-28 | D-WF-03 | Customer copy is the source's second-person copy; outfitter copy stays third person | Source copy |
| 2026-10-28 | D-WF-04 | Customer layer has no AppShell (no customer role). DS Header on the first step and on matches, a slim brand strip on question steps so the question stays above the fold on a phone. See Q-WF-1 | Build proposal |
| 2026-10-28 | D-WF-05 | Customer action bar is outside the scroll area, so Next is always on screen at every height | RF08 + earlier review ("CTA not always on screen") |
| 2026-10-28 | D-WF-06 | Progress dots: done = ink, current = gold-lo (current-nav job), track fill ink. The source's gold fill would put gold outside its three jobs | Gold rule |
| 2026-10-28 | D-WF-07 | Source Figma rapport icons (data-URI SVGs) replaced with Lucide (tent, caravan, award, mountain, plug, scale). Activities become ChoiceChips, not 14 icon tiles | Lucide-only rule · selection guide |
| 2026-10-28 | D-WF-08 | Trade-in overlay is a sanctioned modal job (focused sub-task, one at a time); "Save trade-in" is that frame's single COMMIT | HIG modality |
| 2026-10-28 | D-WF-09 | Customer never sees scores, engine notes, QA flags or "needs verification"; rank groups are relabelled | Privacy firewall (RF11) |
| 2026-10-28 | D-WF-10 | Results get a COMMIT: customer "Send to my outfitter", outfitter "Save matches to case". Decision record export is an ACTION | One gold action per frame |
| 2026-10-28 | D-WF-11 | Snapshot re-encoded columnar (4.7 MB → 1.5 MB), added subMake, status, baseRankGroup; values unchanged | Build |
| 2026-10-28 | D-WF-12 | **Layout + spacing pass** (review screenshot): RV art had baked-in captions ("TRAVEL TRAILERS New \| Used") that doubled the tile label and set uneven image heights → captions cropped off (`images/rv-*-art.png`), shown with ChoiceTile `imageFit="contain"` on a 2:1 panel. Tiles 2-up on phone, ≥196px columns above. Gaps between groups 24px, within groups 12px (L03). Step rail items single-line with the skip reason inline. Disabled Next states why ("Pick one to continue") | Zach (screenshot) · L03 · HIG forms |
| 2026-10-28 | D-WF-13 | **Compact density** (review: "sizing way too large, all options need to be viewable at once"). New `density="compact"` on QuestionCard, ChoiceTile, ChoiceGroup (DS). Outfitter: page Header and 3 StatTiles replaced by one status strip (AppShell already carries the page context); detail aside 272px. Customer: brand strip on every question step. Rule added to component-selection-guide: every option visible at 1280×800 with the action bar on screen | Zach (screenshot) |
