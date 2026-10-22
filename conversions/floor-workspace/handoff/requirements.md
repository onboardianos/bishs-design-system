# Floor Workspace — requirements

Every row traces to a stamped `data-spec-id`. A family with `#{x}` is one row, and its instances are listed. The bands are **ph** (≤640), **tab** (641–1023) and **dt** (≥1024). The content breakpoints are *compact* (content width under 980px) and *single* (under 600px). Acceptance criteria use Given / When / Then.

---

## Frame `frame-app-shell` (AppShell, owned by the design system)

| ID / family | Level · class | Purpose | Behaviour | Responsive | Acceptance |
|---|---|---|---|---|---|
| `sec-header` | shell · S01 | Global header | Logo · search · bell · profile | dt/tab: full header. ph: menu, logo, search, profile | Given any width, the header shows search centred and the profile at far right |
| `sec-side-panel` / `sec-drawer` / `sec-tab-bar` | shell · S02–S04 | Role navigation from `NavConfig` (Manager) | `nav-floor` is the current item, shown in gold-lo | dt: panel (240px or 72px rail). tab: drawer. ph: tab bar + menu | Given role Manager, Sales Floor is the current item and nothing is hardcoded in the screen |
| `input-search`, `info-alerts`, `info-profile` | component · info | Global search, alerts, account | See the AppShell docs | — | Covered by AppShell acceptance |

## Section `sec-floor-workspace` · S03 (screen content)

Layout: at full width, the rotation band is on top, with the schedule rail (280–340px) beside the board. When *compact*, `nav-floor-views` tabs switch between the board and the schedule. The status footer is at the bottom. The board and schedule regions are at least 560px tall and scroll internally.

| ID / family | Level · class | Purpose | Content & data | Behaviour | States | Responsive | Acceptance |
|---|---|---|---|---|---|---|---|
| `nav-floor-views` | layer · nav | Switches views when there's no room for both | — | — | — | compact only | Given content width under 980px, Floor traffic and Today's schedule are tabs and nothing is cut |
| `nav-tab-floor-view#{board,schedule}` | component · nav | One view tab | Floor traffic count | Click or Enter selects it | selected: gold-lo text + bar | compact only | When a tab is selected, only that view shows and `aria-selected` is true |

## Section `sec-ups-rotation` · S10 (dark elevated band)

| ID / family | Level · class | Purpose | Content & data | Behaviour | States | Responsive | Acceptance |
|---|---|---|---|---|---|---|---|
| `sec-ups-rotation` | section | Live rotation order | `rotation[]`, count of customers on the floor | — | collapsed / expanded | full width at every band | Given 13 outfitters, they show in rotation order |
| `btn-action-toggle-benched` | component · action | Hide or show benched outfitters | Benched count | Toggles the filter | pressed/unpressed, label switches | — | When pressed, benched outfitters disappear and the label reads "Show benched · n" |
| `btn-action-collapse-rotation` | component · action | Collapse the band | — | Toggles `list-rotation` | expanded/collapsed (`aria-expanded`) | — | When collapsed, the list hides and the header stays visible |
| `list-rotation` | layer · L01 | Rotation cards | — | Scrolls horizontally inside its own region; drop target for reorder | — | scrolls at every width | No page-level horizontal scroll at 390px |
| `btn-action-rep#{mh,sr,jt,dc,lm,tv,ab,mp,rh,ks,cb,jw,kr}` | component · action | One outfitter | Photo or ink initials, state label, first name, chip (deal / pause reason / customer), delivery hexagon, unread count | Click or Enter opens `frame-rep-menu#{o}`. Dragging (dnd-kit in production) opens `frame-move-in-rotation` | **up_now**: ink + gold-hi edge, "Upfront". **available**: neutral chip. **with_customer**: info chip. **paused**: warning chip. **benched**: 72% opacity, muted chip | fixed 208px card | Given Mike is up now, his card is ink with a gold edge, and gold is not a fill. When the card is clicked, the rep menu opens anchored to it (bottom sheet on ph) |

## Section `sec-todays-schedule` · S11

| ID / family | Level · class | Purpose | Content & data | Behaviour | States | Responsive | Acceptance |
|---|---|---|---|---|---|---|---|
| `btn-action-filter-schedule#{delivery,sale}` | component · action | Filter by kind | Count per kind | Toggles the filter; a second click clears it | pressed: gold outline | wraps | When Deliveries is pressed, only deliveries and the now-line show |
| `list-schedule` | layer · L01 | Today's items in time order | `schedule[]` | Scrolls vertically | — | rail (dt) or tab (compact) | Items appear in time order with the now-line between 12:00 and 2:00 |
| `info-now-indicator` | component · info | Current time | 12:45 PM | — | — | — | Always visible, regardless of filter |
| `btn-action-open-schedule-item#{a1–a5,d1–d4}` | component · action | One appointment or delivery | Time, customer, kind · status, outfitter avatar; info bar for deliveries, olive for sales | Click opens `frame-schedule-item#{id}` | delay: danger text + `triangle-alert` | — | When an item is clicked, the detail sheet opens and the schedule stays behind it |

## Section `sec-floor-traffic` · S12 (SVAR React Kanban in production)

| ID / family | Level · class | Purpose | Content & data | Behaviour | States | Responsive | Acceptance |
|---|---|---|---|---|---|---|---|
| `btn-commit-new-check-in` | component · **commit** | Start a check-in | — | Opens `frame-check-in` | hover: gold-hi | in the board header at every band | It's the screen's only gold fill, with near-black text. When clicked, check-in opens at step 1 |
| `list-board` | layer | All 8 phases | — | Columns scroll horizontally inside the region | — | not single | At 834px the columns scroll inside the board, not the page |
| `list-phase#{waiting,assigned,discovery,mcp,lotwalk,worksheet,twomin,delivery}` | layer | One phase column | Tone diamond (waiting: danger, demo: info, 2-min: warning, delivery: success, others: olive), label, count | Drop target; a drop moves the card and shows an Undo toast | drag-over: dashed gold-hi outline; empty: "No customers in {phase}" | min 244px column | When a card drops on MCP, it moves, the toast reads "{customer} moved to MCP" and Undo restores it |
| `btn-action-phase-detail#{phase}` | component · action | Open phase stats | — | Opens `frame-phase-detail#{phase}` | — | header button, or "{phase} detail" in single | When clicked, the sheet shows today's stats and exits for that phase |
| `card-case#{jacksons,whitmore,reyes,bakers,martinez,olsen,ashford} (plus new check-ins, keyed by case id)` | component | One customer on the floor | Party icon, customer, interest, outfitter or "Unassigned · Awaiting outfitter", in-phase time, on-floor time | Draggable; production uses SVAR's move event plus the phase state machine | unassigned: 3px danger left edge | full column width | Given a case is unassigned, it shows a danger edge and an Assign button |
| `btn-action-case-menu#{case}` | component · action | Case actions | — | Opens `frame-case-menu#{case}` | — | — | When clicked, the menu anchors to the button (bottom sheet on ph). Escape closes it |
| `btn-action-assign#{case}` | component · action | Quick assign | — | Opens `frame-assign-outfitter` | unassigned only | — | Clicking opens Assign directly, skipping the menu |
| `nav-phase-tabs`, `nav-tab-phase#{phase}` | layer / component · nav | One phase at a time | Label + count | Selects a phase | selected: gold-lo | **single only** | Given content under 600px, one column shows with phase tabs (boards rule 8) |

## Section `sec-status` · S13 and global feedback

| ID / family | Purpose | Acceptance |
|---|---|---|
| `sec-status` | Sync state, version, store, last refresh | Shows "Synced" with a success dot |
| `info-toast` | Result of an action (`role=status`) | Appears for 6s above the tab bar on ph |
| `btn-action-undo` | Reverse a case move | When Undo is clicked within 6s, the card returns to its previous phase and timer |

---

## Overlay frames

Every overlay is its own frame (`data-bos-level="frame"`) with at most one COMMIT, closed by Escape, the scrim or ×. Dialogs become bottom sheets at ph. Each overlay's commit is disabled until the form is valid.

| Frame | Kind | Elements | Validation (commit enabled when) | Commit → effect | Acceptance |
|---|---|---|---|---|---|
| `frame-case-menu#{case}` | popover / sheet | `menuitem-{assign,move,note,message,left}#{case}` | — | Routes to the matching frame; `message` is disabled with no outfitter | "Customer left" is in danger text; when Message is chosen, the chat sheet opens |
| `frame-check-in` | dialog, 4 steps | `input-look-up-by#{phone,email,walk-in}`, `input-lookup-{phone,email}`, `card-lookup-match`, `input-party#{single,couple,family}`, `input-buyer-{first,last}-name`, `input-cobuyer-{first,last}-name`, `input-unit-type#{travel-trailer,fifth-wheel,toy-hauler,motorhome,truck-camper,destination}`, `input-check-in-notes`, `input-outfitter#{o}`, `input-override-reason#{up-outfitter-is-not-up-front,customer-asked-for-this-outfitter,outfitter-taking-up-out-of-turn}`, `info-check-in-sent` | Lookup: walk-in, or lookup done. Party: buyer first + last name and a unit type. Assign: an outfitter, plus a reason when it's not the up outfitter | `btn-commit-check-in`: Look up → Continue → **Assign & send link** (adds the card to Assigned) → Done | With a 10-digit phone, the McVicker match prefills the names. Picking Sarah while Mike is up requires an override reason |
| `frame-assign-outfitter` | dialog | `input-outfitter#{o}`, `input-override-reason#{up-outfitter-is-not-up-front,customer-asked-for-this-outfitter,outfitter-taking-up-out-of-turn}` | An outfitter, plus a reason if it's not the up outfitter | `btn-commit-assign-outfitter`: sets the outfitter, Waiting → Assigned, toast "notification sent" | Assigning Mike to Jacksons moves the card to Assigned |
| `frame-move-case` | dialog | `input-phase#{phase}` (current marked) | A phase other than the current one | `btn-commit-move-case`: moves the card, Undo toast | The current phase can't be committed |
| `frame-add-note` | dialog | `input-case-note` | Note is not empty | `btn-commit-add-note`: saves, toast | An empty note keeps Save disabled |
| `frame-customer-left` | dialog | `input-left-reason#{just-researching,out-of-budget,no-spouse-decision-maker,coming-back-later,got-a-call,no-available-outfitter,not-sure-no-contact-before-leaving}`, `input-left-note` | A reason | `btn-commit-customer-left`: removes the card and logs an exit for the phase | The exit appears in that phase's detail |
| `frame-phase-detail#{phase}` | sheet | `metric-phase-{checked-in-today,entered-phase,currently-in-phase,conversion,exits,avg-time-in-phase}#{phase}` | — | none (inspect) | Exits list with outfitter and note, or an empty message |
| `frame-rep-menu#{o}` | popover / sheet | `nav-tab-rep-stats#{today,week,month}`, `metric-rep-{demos,write-ups,sold,goal,gross-unit,avg-time}`, `btn-action-rep-{message,pause/unpause,bench/unbench,move}#{o}`, `btn-action-close-rep-menu#{o}` | — | Routes to the matching frame. Bench is **Manager-only**; Pause and Move are disabled when benched | A non-manager sees Bench disabled with "Only a manager can bench or un-bench" |
| `frame-pause-outfitter` | dialog | `input-pause-reason#{lunch,checkin,break,unavailable,other}`, `input-pause-duration#{15-min,30-min,1-hour,rest-of-day}`, `input-pause-detail` | A reason, plus detail for Other | `btn-commit-pause-outfitter`: state → paused, chip shows the reason | Sarah paused for lunch shows a warning chip "Lunch" |
| `frame-unpause-outfitter` | dialog | `input-pause-fulfilled` (checkbox) | Fulfillment confirmed | `btn-commit-unpause-outfitter`: state → available | Unchecked keeps commit disabled |
| `frame-bench-outfitter` | dialog (danger commit) | `input-bench-reason#{performance-review,absence,training,admin-work,disciplinary}`, `input-bench-duration#{rest-of-today,1-day,1-week,indefinite}`, `input-coaching-note` | A reason and a coaching note | `btn-commit-bench-outfitter`: state → benched | A warning explains that customers move to Waiting |
| `frame-unbench-outfitter` | dialog | bench history, `input-unbench-note` | Note | `btn-commit-unbench-outfitter`: state → available | Shows the history before commit |
| `frame-move-in-rotation` | dialog | `input-rotation-position`, `input-move-reason#{not-prepared,not-up-front,nowhere-to-be-found,on-their-phone-let-customer-walk-by,returning-customer,other}`, `input-move-rep-detail` | A new position, a reason, and detail for Other | `btn-commit-move-in-rotation`: reorders the rotation | Opened by drag (prefilled position) or from the rep menu; the forward/back note updates |
| `frame-chat#{o}` | sheet | `input-chat#{o}`, `btn-action-send-chat#{o}` | Message not empty | Send appends the message (action, not commit) | Opening it clears that outfitter's unread badge |
| `frame-schedule-item#{id}` | sheet | `btn-action-message-outfitter#{id}`, `btn-commit-check-in-arrival#{id}` | — | Customer arrived → `frame-schedule-check-in` | Shows scheduled time, type, outfitter, unit, status, to-dos and notes |
| `frame-schedule-check-in` | dialog | — | — | `btn-commit-schedule-check-in`: toast, outfitter notified | The toast names the customer and the outfitter |

Every dialog also has `btn-action-close-{frame}` / `btn-action-close#{frame}` and `btn-action-cancel…`, with the same behaviour everywhere: close with no change.
