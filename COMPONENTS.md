# Components — release 2.2.0

All 21 are on `window.BishSRVDesignSystem_26feec` once `_ds_bundle.js` loads. Props come from the `.d.ts` next to each source; the `.d.ts` wins if this page is out of date. Which one to choose and why: `documents/component-selection-guide.md`.

Common props: `theme="dark" | "light"` (default dark; never make a local light copy) and `specId` (auto-derived from the label; pass it when a label repeats or the spoken name differs). Repeating items also take `instance` — a stable domain key, never an index.

## Navigation shell · `ui_kits/app-shell/`
| Component | Use for | Key props |
|---|---|---|
| **AppShell** | Every screen. Header, side panel, drawer, mobile tab bar | `role`, `activeId`, `onNavigate`, `onAction`, `onPhase`, `currentPhase`, `alerts`, `onSearch`, `height`, `children` |
| **ActionOverlay** | Mobile centre Action overlay (AppShell mounts it) | `actions`, `phases`, `currentPhase`, `onAction`, `onPhase`, `onClose` |
| **NavConfig** | Nav as data: `load`, `save`, `useConfig`, `navFor(cfg, role)`. Admin-owned. Screens read it, never write it | — |
| **NavIcon** | A Lucide icon by name from the nav catalog | `name`, `size`, `color`, `stroke` |
| **RolesNavAdmin** | Admin › Roles & Navigation, the only place nav is edited | `theme` |

## Portal primitives · `ui_kits/portal-dark/`
| Component | Use for | Key props |
|---|---|---|
| **Button** | Every action. `primary` = the one COMMIT · `secondary` = ACTION · `ghost` · `danger` | `variant`, `size`, `disabled`, `onClick` |
| **Badge** | Read-only status | `type`: gold · success · warning · danger · info · neutral |
| **Input** | Text fields with label, helper, inline error | `label`, `value`, `onChange`, `placeholder`, `error`, `helper`, `disabled` |
| **TabBar** | Switching views within one screen | `tabs`, `active`, `onChange` |
| **Header** | Page or portal title band (not the app header) | `eyebrow`, `title`, `titleAccent`, `meta`, `logoSrc` |
| **Card** | General container | `title`, `subtitle`, `children`, `footer` |
| **StatTile** | One KPI with label and context | `label`, `value`, `delta`, `deltaType` |
| **UnitRow** | One RV unit in a list | `id`, `title`, `phase`, `status`, `statusType`, `onClick` |
| **Avatar** | A person | `initials`, `name`, `src`, `size`, `tone` |

## Floor components · `ui_kits/floor/`
| Component | Use for | Key props |
|---|---|---|
| **PhaseAlert** | Interrupt asking a manager to act now | `eyebrow`, `from`, `title`, `people`, `waitSeconds`, `limitSeconds`, `ctaLabel`, `onCommit`, `onSnooze`, `live` |
| **CustomerCard** | A customer on the floor, kanban, needs-action lists | `customer`, `interest`, `partyType`, `outfitter`, `phaseTime`, `totalTime`, `flag`, `cta`, `onOpen`, `onAssign` |
| **QuestionCard** | Any question / intake / survey screen | `overline`, `title`, `hint`, `density`, `children` |
| **ChoiceChip** | A text answer (radio, or `multi`) | `label`, `selected`, `multi`, `size`, `onClick` |
| **ChoiceGroup** | A labelled row of ChoiceChips | `label`, `multi`, `density` |
| **ChoiceTile** | A picture answer, with live effect line | `label`, `image`, `hint`, `hintTone`, `selected`, `multi`, `wide`, `footer`, `density` |

## Tooling · `ui_kits/spec-ready/`
| Component | Use for |
|---|---|
| **SpecLint** | `run(root)` ship gate · `overlay()` · `snapshot` → `manifest` → `requirements` → `tickets` for the handoff |

Bundle-internal helpers (not on the namespace): `makeSpecId`, `navIcons`, `uiIcons`, `iconAliases`, `shellTheme`.

## Intentional additions
The design-system checker compares names against the original brand kit and will report these 19 as "named after nothing in the kit". They are deliberate and published; **never rename them**: ActionOverlay, AppShell, NavIcon, NavConfig, RolesNavAdmin, ChoiceChip, ChoiceGroup, QuestionCard, ChoiceTile, CustomerCard, PhaseAlert, SpecLint, StatTile, UnitRow, Header, TabBar, Avatar, Badge, Card. Reasons: `README.md` › Intentional additions.

## Not components — don't import
Promotion candidates still built inline in their builds: OutfitterPicker, RepCard, PhaseColumn, Hexagon badge, StepRail, NumberStepper, Notice, Select. Build them from tokens, stamp them, and list them in `component-map.md` with the reason.
