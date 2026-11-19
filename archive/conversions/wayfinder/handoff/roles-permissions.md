# Roles & permissions · Wayfinder Discovery

| Element | Customer | Outfitter | Sales manager | Receptionist |
|---|---|---|---|---|
| Open the questionnaire | act (welcome link) | act | act | hidden → no-permission state |
| Answer questions, must-have / required | act | act | act | — |
| Trade-in (overlay or steps) incl. voice note | act | act | act | — |
| Live count | read ("campers fit so far") | read (3 StatTiles) | read | — |
| Engine effect, data-gap notices, skip reasons | **hidden** | read | read | — |
| Case record (rapport answers) | — (answers only) | read | read | — |
| Scores, "Why it ranks", stock numbers | stock # only | read | read | — |
| Export decision record | hidden | act | act | — |
| Send to outfitter (COMMIT) | act | — | — | — |
| Save matches to case (COMMIT) | — | act | act | — |

Privacy firewall (RF11): the customer never sees scores, score components, QA flags, "needs verification" wording or engine notes. Rank group "needs verification" is shown to customers as "Your outfitter will confirm".
