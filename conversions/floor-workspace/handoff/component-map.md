# Floor Workspace — component map

| Element family | DS component | shadcn primitive | Variant / props | Notes |
|---|---|---|---|---|
| Header, side panel, drawer, mobile tab bar | **AppShell** | `sidebar`, `sheet`, `dropdown-menu`, `avatar`, `input` | `role="manager"`, `activeId="floor"`, `theme="light"` | Nav comes from `NavConfig`; nothing is hardcoded |
| `btn-commit-new-check-in`, `btn-commit-*` (dialogs) | **Button** | `button` | `variant="commit"` | One per frame, near-black text on gold |
| `btn-action-*` with a visible label | **Button** | `button` | `variant="action"` (gold outline) | |
| Cancel buttons, `btn-action-collapse-rotation` | **Button** | `button` | `variant="ghost"` | |
| `btn-commit-bench-outfitter` | **Button** | `button` | `variant="destructive"` | Danger fill for a disciplinary action |
| `btn-action-case-menu#*`, close × | **Button** | `button` | `size="icon"` ghost, 44×44 | |
| Chips (deal, pause reason, Upfront) | **Badge** | `badge` | `tone` neutral / warning / info / muted / ink, `shape="pill"` | |
| `nav-tab-floor-view#*`, `nav-tab-phase#*`, `nav-tab-rep-stats#*` | **TabBar** | `tabs` | Current item: gold-lo text + 3px bar | |
| `input-*` text and textarea | **Input** | `input`, `textarea`, `label` | 16px text, `--border-input-light`, gold focus ring | |
| `input-*#{option}` choice groups | custom block · **ChoiceGroup** | `radio-group` | Card-style radio, 48px min height | **Promotion candidate** |
| `input-outfitter#*` | custom block · **OutfitterPicker** | `radio-group` | Avatar + name + queue meta | **Promotion candidate** |
| `input-pause-fulfilled` | custom | `checkbox` | 22px box | |
| `input-rotation-position` | Input | `select` | | |
| `btn-action-rep#*` | custom block · **RepCard** | `button` | Ink + gold edge when up now | **Promotion candidate**: shared by Floor, Bullpen and Outfitter surfaces |
| Delivery hexagon | custom block · **Hexagon** badge | — | Ink fill, white "D", `aria-label` | Uses the brand Hexagon shape |
| `card-case#*` | **Card** | `card` | Danger left edge when unassigned | Becomes the SVAR card template |
| `list-phase#*`, `list-board` | custom block · **PhaseColumn** | **SVAR React Kanban** column | Tone diamond, count, header template | Never wrap it in dnd-kit |
| `list-rotation` reorder | — | **dnd-kit** `SortableContext` (horizontal) | `KeyboardSensor`, `TouchSensor` delay 200 | Every drop opens Move in rotation (reason required) |
| `btn-action-open-schedule-item#*` | **UnitRow** pattern | `button` | Info bar for deliveries, olive for sales | |
| `info-now-indicator` | custom | — | Info token | |
| `metric-*` | **StatTile** | `card` | Compact | |
| `frame-*` dialogs | — | `dialog` | Max 520 / 640px; bottom sheet at ph | Each one is its own frame, ≤1 commit |
| `frame-*` sheets (phase, chat, schedule item) | — | `sheet side="right"`, `side="bottom"` at ph | 440px | Inspect-and-return |
| `frame-case-menu#*`, `frame-rep-menu#*` | — | `popover` / `dropdown-menu`; `sheet side="bottom"` at ph | Anchored | |
| `info-toast`, `btn-action-undo` | — | `sonner` toast | 6s, Undo action | |
| Icons | — | `lucide-react` | `plus`, `ellipsis-vertical`, `maximize-2`, `truck`, `handshake`, `user`, `users`, `user-plus`, `user-x`, `user-check`, `message-square`, `pause`, `play`, `arrow-right-left`, `sticky-note`, `log-out`, `send`, `eye`, `eye-off`, `calendar-check`, `chart-column`, `triangle-alert`, `x`, `check`, `circle-help` | |

**Promotion candidates** (D-05): ChoiceGroup, OutfitterPicker, RepCard, PhaseColumn and Hexagon badge. If more than one surface uses them, they move into `ui_kits/` with `.d.ts` files and cards.
