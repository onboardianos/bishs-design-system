# Test plan · Wayfinder Discovery

1. **Dual-mode:** answer Path → Type → Camping in the customer layer ("Path · live walkthrough"), switch to the outfitter layer's live state → the same answers and the case record show.
2. Walk both paths (towable, motorhome) end to end in each layer; skip reasons in the outfitter StepRail match the engine.
3. Camping › "I have a camper now" → trade-in steps appear; pick any other answer → they disappear.
4. Trade-in overlay from any step: Save disabled until something is entered; Remove clears it; Esc and scrim close it.
5. Voice note: record, stop, play, delete; deny the microphone → denied notice + Try again; unsupported browser → text-only notice.
6. Tow: Ford › F-150 › engine with one rating → rating prefills; a config with several ratings → pick chips; manual entry overrides.
7. Budget: cash 45,000 → $45,000 ceiling; finance 520/mo, $5,000 down, Good, American Fork → matches `solveFinanceCeiling`.
8. Bathroom › Two bathrooms › Must-have → live count drops to the preview count.
9. Zero results: recovery actions; each Change button opens the right step.
10. Customer firewall: on every customer state, no score, "verification", QA or engine wording is in the DOM.
11. Snapshot error: block the fetch → error notice + Try again.
12. Shrink test 1440 → 375 on c-path, c-tow, c-results, o-path, o-sleep, o-results; Next is visible at every width and height; then 200% zoom.
13. Export handoff → SpecLint 100% on every state of both layers at 1280 / 834 / 390.
