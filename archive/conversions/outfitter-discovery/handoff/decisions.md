# Decisions · Outfitter Discovery

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
