# QA gates · Wayfinder Discovery

| Gate | Check | Status |
|---|---|---|
| G1 | AppShell mounts every outfitter state; customer layer uses DS Header (Q-WF-1) | Pass, pending Q-WF-1 |
| G2 | Gold only on COMMIT fill, ACTION outline, current nav (StepRail current = gold-lo) | Pass, review |
| G3 | One COMMIT per frame: `btn-commit-continue` on questions, `btn-commit-send-to-outfitter` / `btn-commit-save-to-case` on matches, `btn-commit-save-trade-in` in the overlay frame | Pass |
| G4 | DS components used where a row fits; custom blocks listed | Pass |
| G5 | Shrink test 1440 → 375 | Pending sign-off |
| G6 | 200% text zoom | Pending sign-off |
| G7 | 44px targets, thumb-reach primary ≤1023 (sticky action bar) | Pass, review |
| G8 | WCAG AA tokens; no text below 11px | Pass, review |
| G9 | Six data states | Loading, error, empty (zero), partial (needs verification / data gap), no permission. Stale: not required (Q-OD-4) |
| G10 | SpecLint 100% stamped, no dup / invalid IDs | Pending first export |
| G11 | No horizontal page scroll ≥360 (StepRail scrolls inside itself) | Pass, review |
| G12 | Handoff package complete | This folder |
| G13 | Customer privacy firewall: no scores, engine notes or verification wording in any customer state | Pass, review |
