# Floor Workspace — conversion report

**Source:** `uploads/Floor Workspace - Full App (standalone).html` › Home › **Floor Workspace** (design A, the screenshot posture).
**Output:** `conversions/floor-workspace/index.html` (Canvas ⇄ Prototype, 17 states, 3 device widths).
**Date:** 2026-10-22 · **Role shown:** Manager · **Scope:** Floor Workspace flow only. Bullpen, Outfitter Mobile, Decline flow and Customer Mobile are not converted.

## 1. Inventory of the original

| Area | Original |
|---|---|
| Chrome | Custom dark top bar: logo, tabs (Floor 18 · Bullpen 2 · Active Deals 12 · Team · Reports · Chat), clock, user pill. No side panel. Footer status bar. |
| Ups rotation | Horizontal strip of 13 outfitter cards. The Up Now card is a **gold fill**. Delivery badges are **gold-filled hexagons**. Paused chip is a gold pill. Hover for 1.2s or click opens a rep overlay. Drag to reorder opens Move in rotation. |
| Today's schedule | Left timeline with Deliveries / Sales filters, a now line at 12:45, gold and blue row bars. |
| Floor traffic | 8-phase kanban (Waiting · Assigned · Discovery · MCP · Demo · Worksheet · 2-Min · Delivery). Gold diamonds on most phase headers, gold "+1 more" pill, gold scrollbar. HTML5 drag between columns. Gold **New Check-in** button floats over the rotation. |
| Overlays (15) | Case click menu, New check-in (Lookup → Match → Assign → Sent), Assign, Manual move, Note, Customer left, Phase detail, Rep overlay, Pause, Unpause, Bench, Un-bench, Move in rotation, Rep chat, Appointment detail, Appointment check-in. |
| Stamping | Universal Stamping Standard v1.2 (`scr-`, `sec-`, `btn-` prefixes, `-N` index suffixes added by a sweep). Not spec-ready v2. |
| Responsive | Fixed desktop layout with viewport-sized regions. No tablet or phone posture. |

## 2. What changed

**Shell.** The custom top bar is removed. The screen mounts in `AppShell` (role `manager`, current item **Sales Floor**). The header has the logo, centred search, bell and avatar. The side panel collapses to a rail, becomes a drawer on portrait tablet, and on phones the header has a menu, search and profile, with the bottom tab bar. The original top tabs (Bullpen, Active Deals, Team, Reports, Chat) are role nav items in `NavConfig`, not per-screen tabs.

**Gold rule.** Gold now appears only on the single COMMIT (**New check-in**), ACTION outlines (Assign, Hide benched, rep actions), and gold-lo on the current nav item and current tabs.

| Original | Converted |
|---|---|
| Up Now card, gold fill | Ink card with a 4px gold-hi accent edge; "Up now" label in gold-hi |
| Delivery "D" hexagon, gold fill | Ink hexagon, white D, labelled "Delivery today: …" |
| Paused chip, gold | Warning chip |
| Phase header gold diamonds | Neutral diamonds; Waiting = danger, Demo = info, 2-Min = warning, Delivery = success |
| "+1 more" gold pill, gold scrollbars | Columns scroll inside their own region; neutral scrollbar |
| Sales row gold bar | Olive bar; deliveries keep the info bar |

**Tokens and type.** All colours come from `colors_and_type.css`. Bebas Neue for screen and panel titles, Barlow Condensed for labels, Source Sans 3 for body, JetBrains Mono for times and counts. Muted text uses the AA tokens.

**Icons.** Every glyph is Lucide (`plus`, `ellipsis-vertical`, `maximize-2`, `truck`, `handshake`, `user`, `users`, `user-plus`, `user-x`, `user-check`, `message-square`, `pause`, `play`, `arrow-right-left`, `sticky-note`, `log-out`, `send`, `eye`, `eye-off`, `calendar-check`, `chart-column`, `triangle-alert`, `x`, `check`). The original's custom clothing and party illustrations were dropped.

**Responsive (RF01–RF12).** One implementation, sized by its own container:
- **≥980px content width:** schedule rail beside the full 8-column board.
- **<980px:** "Floor traffic / Today's schedule" tabs, so nothing is cut.
- **<600px:** the board shows one phase at a time with phase tabs (boards rule 8). Overlays become bottom sheets.
- Rotation, board and phase tabs scroll inside their own regions. There's no page-level horizontal scroll. Every target is at least 44px.

**Interaction and HIG.**
- **Drag alternatives:** every drag has a stamped alternative. Cases have **Move to…** in the case menu; outfitters have **Move in rotation** in the rep menu.
- **Undo:** case moves show a 6-second toast with Undo.
- **Rep menu opens on click or Enter, not on a 1.2s hover.** Hover-only affordances are gone (RF08).
- **Form validation:** forms are disabled until valid. Reasons are required for Customer left, Pause, Bench (plus a coaching note), Un-bench, Move in rotation, and for any outfitter override.
- **Modal discipline:** dialogs handle confirmations and required forms. Sheets handle inspect-and-return (phase detail, schedule detail, chat). The case menu and rep menu are popovers, and bottom sheets on phones. Escape and the scrim close every overlay.
- **Role gating:** only a manager can bench or un-bench; non-managers see the reason.

**Stamping (spec-ready v2).** Every interactive element uses class-prefixed, label-derived IDs with stable domain instances, e.g. `btn-commit-new-check-in`, `btn-action-rep#mh`, `card-case#jacksons`, `list-phase#waiting`, `menuitem-left#jacksons`, `input-left-reason#got-a-call`. Sections: S03 floor workspace, S10 ups rotation, S11 today's schedule, S12 floor traffic, S13 status. Each overlay is its own frame (`frame-…`), so each frame has at most one COMMIT. The original v1.2 IDs are retired, not renamed. For example, `btn-check-in-cta` is replaced by `btn-commit-new-check-in`.

**Boards.** The converted board is a reference. In production, Floor traffic is built on **SVAR React Kanban** and rotation reordering on **dnd-kit**, per `documents/boards-and-dnd.md`.

## 3. Removed

- The custom top bar, its tab row and the clock (replaced by AppShell)
- The floating New Check-in pill overlapping the rotation (moved into the board header)
- Design B (left rail and messages dock). It was a variant, not the screenshot posture.
- Clothing pickers and party illustrations in check-in (not Lucide; replaced by party type and a notes field)

## 4. Gates

Run them in the Prototype panel. **Run SpecLint on this screen** reports coverage for the current state and width.

| Gate | Status |
|---|---|
| Mounts in AppShell, nav from NavConfig | Met |
| SpecLint pass (100%, no dup / invalid, ≤1 commit per frame, no nested layers) | Run per state in the prototype; record results here at review |
| Shrink test 1440 → 375 | Stage is resizable; run at review |
| 200% text zoom | Run at review |
| WCAG AA | Built on AA tokens |
| Gold rule | Met (see table) |
| Lucide only | Met |
| Six data states | **Gap:** loading, error, partial, stale and permission states aren't built yet. Empty states exist per column and per phase detail. |
| Canvas ⇄ Prototype 1:1 | Met: 17 prototype states, each with a canvas artboard; floor and 4 overlays also at phone width |

## 5. Open questions

1. **Phase colours.** The phase tones used here are a proposal; GB12 is still open.
2. **Receptionist role.** The original gates benching by role. The manager view is shown; a receptionist posture isn't built.
3. **Check-in matching.** The original had buyer and co-buyer pick from multiple matches with AF score and DOB. The conversion shows a single household match.
4. **Exits.** The original showed exits on the board. Here they only appear in phase detail.
