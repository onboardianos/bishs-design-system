# Component map · Wayfinder Discovery

| Source element | DS component | Notes |
|---|---|---|
| Header, brand, step counter | **AppShell** (outfitter, Cases, phase Discovery) + **Header** (light) | No hand-built header |
| Units-in-play pill | **StatTile** ×3 (light) | No naked numbers |
| Step title / subtitle / kicker | **QuestionCard** (light) | Overline "Step n of N · Topic" |
| Photo option cards | **ChoiceTile** (light) — **promoted this build** | Second build to need it (Floor check-in + Discovery) |
| Seg buttons (tow compare), credit tier select | **ChoiceChip** md in **ChoiceGroup** | Selection is state, not gold |
| Text / number fields | **Input** (light) | Digits only; helper text for rounding |
| Detail aside | **Card** (light) | Benefits list + effect Badges in footer |
| Effect pills | **Badge** neutral | Read-only |
| Back / Continue / Start over | **Button** ghost / primary (COMMIT) / secondary | One COMMIT per frame |
| Result cards | **Card** (light) + **Badge** | UnitRow has no slot for match reasons (gap D-OD-05) |

## Custom blocks (no DS component fits)
| Block | Stamp | Why no component fits | Promotion candidate? |
|---|---|---|---|
| StepRail | `nav-discovery-steps`, `nav-step#<id>` | TabBar can't show skipped steps with reasons or done checks | Yes, if a second stepper flow needs it |
| NumberStepper | `btn-action-increase#<id>` / `decrease` | No DS stepper | Yes |
| Notice | `info-notice#<step>` and others | No DS inline callout (Badge is a label, PhaseAlert is an interrupt) | Yes (strong: needed by every data-gap / error state) |
| Select (closest store) | `input-closest-store` | No DS Select; ~70 stores is too many for chips | Yes → shadcn Select |
| Required checkbox | `input-required#<id>`, `input-sidewall-required` | No DS Checkbox | Yes → shadcn Checkbox |
| Match-reason list | inside `card-match#<stock>` | Card body content | No |


## v2.1 additions
| Source element | DS component | Notes |
|---|---|---|
| Figma progress (dots + travel-trailer marker) | Custom **Progress** (stamped `nav-progress`, `nav-step#…`) | No DS stepper with a marker; ink + gold-lo only |
| Rapport tiles (camping today, camping style, brand tier) | **ChoiceTile** + Lucide icon | Hint "shared with your outfitter" / "no effect on matches" |
| Activities (14 options + Other) | **ChoiceChip** in **ChoiceGroup** + **Input** | Chips beat 14 identical icon tiles |
| Trade-in year / manufacturer / brand / model | Custom **Select** (native `<select>`, 44px, `--border-input-light`) | No DS select yet; candidate for promotion on the next build that needs it |
| Trade-in "what would you change" | **ChoiceChip** group | — |
| Trade-in note | native `<textarea>` styled as Input | — |
| Voice note | Custom **VoiceNote** + **Button** secondary/ghost | Record → stop → playback/delete; denied + unsupported states |
| Trade-in overlay | Custom modal frame `frame-trade-in` | Sanctioned modal job; bottom sheet ≤640 |
| Tow vehicle lookup | 3 × **Select** + **ChoiceChip** for multi-rating configs + **Input** override | — |
| Pets | **Stepper** (custom, existing) | — |
| Case record | **Card** (light) + definition list | Outfitter only |
| Why it ranks | native `<details>` inside match **Card** | Outfitter only |
| Customer brand strip | Logo image + overline | Used on question steps; DS Header on step 1 and matches |
