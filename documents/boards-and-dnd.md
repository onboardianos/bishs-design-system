# Boards & drag-and-drop

Applies to every Bish's surface that shows work moving through stages, or that lets people reorder things. In production code, **SVAR React Kanban** handles boards and **dnd-kit** handles everything else that drags. Don't hand-roll either, and don't mix them.

## When to use which

| Surface | Library |
|---|---|
| Any kanban board: Sales Floor phases, Desking queue, pipeline, service/protection queues, delivery board | **SVAR React Kanban** |
| Reordering a list (up queue, saved units), nav order in Roles & Navigation, dashboard tiles, sortable table rows | **dnd-kit** (`@dnd-kit/core` + `@dnd-kit/sortable`) |

SVAR runs its own drag-and-drop inside a board. **Never wrap a SVAR board in a dnd-kit `DndContext`**, and never use dnd-kit to drag cards between kanban columns.

## Board grammar → SVAR React Kanban

`preview/board-grammar-worked-example.html` defines the visual grammar. In code it maps like this:

| Board grammar | SVAR React Kanban |
|---|---|
| Phase column (Waiting · Assigned · Discovery · MCP · Demo · Worksheet …) | column (`columns[]`). The column id is the phase id from the shared data spine. |
| Case / deal / work-order card | card (`cards[]`). `column` = the current phase. |
| Swimlane (by rep, store or priority) | row (`rows[]`) |
| Card fields (customer, unit, timer, status chip) | a custom card template built from DS components (Badge, StatTile type, Lucide icons) |
| Phase count / WIP limit in the header | a column header template. Show the count in mono; over the limit uses the warning token, never gold. |
| Moving a card to another phase | SVAR's move event, which calls the phase state machine. If a move is illegal, the card snaps back and an inline error states the fix. |

Board styling comes from DS tokens through the shadcn/Tailwind v4 theme. Don't use SVAR's default theme colours. Gold follows the gold rule: no gold column or card fills. The current card may use the ink card + gold accent edge.

## Rules for every drag interaction (both libraries)

1. **Drag is never the only way.** Every draggable card or row also has a stamped **"Move to…"** action (a menu or select) that does the same thing. This covers WCAG 2.5.7 dragging movements and works for touch and keyboard users.
2. **Keyboard:** dnd-kit uses `KeyboardSensor` with `sortableKeyboardCoordinates`. SVAR boards keep their keyboard support switched on.
3. **Screen readers:** announce pick-up, the move target and the drop, e.g. "Jackson case moved to MCP". Use dnd-kit `announcements` and a live region for SVAR moves.
4. **Touch (≤1023px):** drag handles are at least 44×44px, and use a press delay (dnd-kit `TouchSensor` with `delay: 200, tolerance: 6`) so scrolling doesn't start a drag.
5. **Reduced motion:** with `prefers-reduced-motion`, drop animations are instant and the drag overlay doesn't scale or tilt.
6. **Undo:** a move that changes a case's phase shows an undo toast for 6 seconds, following HIG adoptions §5.
7. **Stamping:** every card, column, drag handle and "Move to…" control carries a `data-spec-id` (`card-case#jacksons`, `list-phase#mcp`, `btn-action-move-to#jacksons`), per SKILL.md Step 0C.
8. **Phones (≤640px):** boards collapse to one phase at a time, with phase tabs. Moving a card on a phone uses "Move to…" as the main path, not a sideways drag.

## Install (code repo)
```bash
npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
# plus SVAR React Kanban (see its docs for the current package name)
```
