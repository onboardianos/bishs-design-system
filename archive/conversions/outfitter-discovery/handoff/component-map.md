# Component map · Outfitter Discovery

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
