# Component selection guide: what to use, when, and why

**Read this during pass 2 (Map to the system) of every conversion and before building any new screen.**
Each component here exists so every Bish's screen looks and behaves the same way. If a part of your design matches a row below, use that component. Don't restyle it, copy it, or hand-build a lookalike.

Load every component from the bundle: `const { Button, CustomerCard, … } = window.BishSRVDesignSystem_26feec`. Previews for all of them are in the design system › **Components**.

## 1 · How to choose (decision order)

1. **Is it navigation chrome** (header, side panel, drawer, tab bar, Action overlay)? Use **AppShell**. Nav buttons come from **NavConfig**, which the admin owns. Never hardcode them.
2. **Does it match a row in section 3?** Use that component, with `theme="light"` on white or cream surfaces and `theme="dark"` on black or dark-green ones.
3. **Is it a pattern** (a kanban board, drag and drop)? Use the pattern in `boards-and-dnd.md` (SVAR React Kanban, dnd-kit). The cards inside a board are still `CustomerCard`.
4. **Otherwise** it's a *custom block*. Build it from tokens, stamp it, and list it in `component-map.md` **with the reason no component fits**. If a second build needs the same block, it becomes a promotion candidate (section 6).

## 2 · Rules every component follows

| Rule | What it means for you |
|---|---|
| **Theme by surface** | Pass `theme="light"` or `theme="dark"`. Never make a local light copy |
| **Gold has three jobs** | The COMMIT button fill (one per frame), ACTION outlines, and gold-lo for the current nav item. Selections, chips, progress bars, avatars and cards are **never** gold |
| **Avatars contrast with the surface** | Ink fill on light, white fill on dark. Gold only for the signed-in user's own avatar in the header |
| **Components stamp themselves** | Each one writes its own `data-spec-id`. Pass `specId` or `instance` when a label repeats (for example, one card per customer) |
| **44px targets** | Built in. Don't shrink the controls |

## 3 · The components

### Navigation shell (`ui_kits/app-shell/`)
| Component | Use it for | Why |
|---|---|---|
| **AppShell** | Every screen. It is the header, side panel, drawer and mobile tab bar | One nav for every role at every width (RF04). Hand-built headers drift |
| **ActionOverlay** | The mobile centre Action button's overlay | Part of AppShell. Each role's actions come from NavConfig |
| **NavConfig** / **NavIcon** | Which nav buttons each role sees | Navigation is data the admin controls, not code |
| **RolesNavAdmin** | Admin › Roles & Navigation | The only place nav is edited |

### Portal primitives (`ui_kits/portal-dark/`)
| Component | Use it for | Don't use it for | Why |
|---|---|---|---|
| **Button** | Every clickable action. `primary` = the one COMMIT; `secondary` = ACTION (gold outline); `ghost` = cancel or close; `danger` = destructive | Picking an answer (use ChoiceChip) | Enforces the gold rule and the one-COMMIT-per-frame rule |
| **Badge** | A read-only status label (Active, Paused, Overdue) | Anything clickable | Status is shown with colour plus text, and it can't be mistaken for a control |
| **Input** | Text, number, email and phone fields, with label, helper and error text | Choices from a short list (use ChoiceChip) | Inline validation and the error grammar are built in |
| **TabBar** | Switching views on one screen | Moving between screens (that's AppShell nav) | Current tab = gold-lo text plus a bar, per canon |
| **Header** | A page or portal title band | The app header (that's AppShell) | Consistent title, eyebrow and meta row |
| **Card** | A general container with header, body and footer: summaries, settings, detail panels | A customer on the floor, an alert or a question (use the floor components) | The neutral container when nothing more specific fits |
| **StatTile** | One KPI: label, big number, change | A table of numbers | No naked numbers. Every value has a label and context |
| **UnitRow** | An RV unit in a list (stock #, title, phase, status) | Customers (use CustomerCard) | Inventory rows read the same everywhere |
| **Avatar** | A person's initials or photo | Brand marks or icons | Applies the contrast-with-surface rule automatically |

### Floor components (`ui_kits/floor/`)
| Component | Use it for | Don't use it for | Why |
|---|---|---|---|
| **PhaseAlert** | Any interrupt that asks a manager to act now: "Pick me a winner", "Start the deal", a new MCP or worksheet request | Toasts or confirmations (use a sonner toast); page content | One frame with one COMMIT, a live waiting timer that turns red past its limit, and Snooze. Every alert behaves the same so the floor learns it once |
| **CustomerCard** | A customer on the floor: kanban columns, Action Hub "Needs action" lists, phase detail, any list of active customers | RV units (UnitRow) or general content (Card) | Same anatomy everywhere: party, interest, outfitter (red "?" when unassigned), time in phase and total time. Add `flag` + `cta` for a needs-action card. Its button is an ACTION, never gold |
| **QuestionCard** | Any discovery, intake or survey question screen | General content (Card) | Gold-lo step overline, a large Bebas question and an optional hint, so every questionnaire reads the same |
| **ChoiceChip** | Answers to a question: single choice (radio) or `multi` (select all that apply). `size="md"` inside dialogs | Actions (Button) or status (Badge) | Selected = ink with a check. Selection is state, not a COMMIT, so it's never gold |
| **ChoiceGroup** | A labelled row of ChoiceChips | — | Handles the label, wrapping and radio-group semantics |
| **ChoiceTile** | An answer where a photo or picture carries the meaning: RV type, bed, bath, kitchen, party type. Shows a live effect line ("1,204 units remain") | Short text answers (ChoiceChip); actions (Button) | Same anatomy as the source configurator cards: media, label, effect line, ink check when selected. A Required checkbox goes in `footer`, outside the button |

### Tooling (`ui_kits/spec-ready/`)
| Component | Use it for | Why |
|---|---|---|
| **SpecLint** | `SpecLint.run(root)` on every state before you ship, or add `?speclint=1` | The ship gate: 100% stamped, no duplicate or invalid IDs, at most one COMMIT per frame |

## 4 · Look-alikes: how to tell them apart

| If it looks like… | It's a… | Because… |
|---|---|---|
| A pill you **tap** to answer | ChoiceChip | It changes an answer |
| A photo card you **tap** to answer | ChoiceTile | The picture is the answer |
| A pill that only **shows** status | Badge | It can't be clicked |
| A white card about **one customer** | CustomerCard | It has the outfitter row and the clocks |
| A white card with a **question** | QuestionCard | It has the step overline and the large question |
| A white card with **anything else** | Card | It's the general container |
| A pop-up asking a manager to **act now** | PhaseAlert | It has a timer and one COMMIT |
| A short "done" or "undo" message | sonner toast | It needs no decision |
| A list row for an **RV unit** | UnitRow | It's inventory, not people |

## 5 · Mapping a source design (pass 2 cheat sheet)

| You see in the source | Map it to |
|---|---|
| Any header, nav bar, sidebar or bottom tab bar | AppShell (delete the source version) |
| Gold or coloured "selected" pills on a question | ChoiceChip (ink when selected) |
| Photo / picture option cards on a question | ChoiceTile (ink border + check when selected) |
| Alert or notification cards with a CTA | PhaseAlert |
| Kanban or customer cards | CustomerCard |
| Stepper questionnaire pages | QuestionCard + ChoiceChip / ChoiceGroup, with the Button COMMIT for Next or Finish |
| KPI tiles | StatTile |
| Status chips | Badge |
| Any initials circle | Avatar |

Record each mapping in `component-map.md`. **An alert, customer card, question card or answer chip listed as a custom block fails review.**

## 6 · When nothing fits

1. Build a custom block from tokens, stamped, following the rules in section 2.
2. List it in `component-map.md` with the reason no component fits.
3. If a **second** build needs it, it becomes a promotion candidate. It moves into `ui_kits/` with a `.d.ts` file, a preview card and a row in this guide. Current candidates from the Floor Workspace: OutfitterPicker, RepCard, PhaseColumn, Hexagon badge. From Outfitter Discovery: StepRail (step list with skipped-step reasons), NumberStepper, Notice (inline warning callout), Select (no DS select yet).

## 7 · Change log
| Date | Change |
|---|---|
| 2026-10-27 | **ChoiceTile** promoted (second build: Floor Workspace check-in, Outfitter Discovery configurator) |
| 2026-10-23 | Guide created. Floor components (PhaseAlert, CustomerCard, QuestionCard, ChoiceChip, ChoiceGroup) promoted from the Floor Workspace. Avatar rule: contrast with the surface |


## Density (added 2026-10-28)
QuestionCard, ChoiceTile and ChoiceGroup take `density="compact"`. Use it on any in-app step or configurator: **every option on a step must be visible at once at 1280×800 with the action bar on screen** (no scrolling to see the last option). Comfortable density is for standalone, single-question moments (a check-in kiosk, a hero question). Never shrink below the 44px target or 14px body floor to make options fit; split the step instead.
