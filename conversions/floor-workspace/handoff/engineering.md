# Floor Workspace — engineering handoff

This is the build guide for the dev team. Read it after `README.md`. The design docs (`requirements.md`, `state-map.md`, `roles-permissions.md` …) say **what** to build. This file says **how**.

## 1 · Stack (required, no substitutes)
| Concern | Library | Notes |
|---|---|---|
| Framework | React 18 + TypeScript | The prototype is reference-only JSX; don't ship it |
| Styling | **Tailwind CSS v4**, CSS-first | Theme in `design-system/shadcn/globals.css` (`@theme inline`). No `tailwind.config.ts` |
| Animation | **tw-animate-css** | Never `tailwindcss-animate` |
| Primitives | **shadcn v4 "new-york"** on Radix | `components.json` provided; variants in `variants.ts` |
| Icons | **lucide-react** | The only icon set. The Action tap-hand SVG is the one exception |
| Kanban | **SVAR React Kanban** | Floor traffic board |
| Drag-and-drop | **dnd-kit** (`core`, `sortable`) | Ups-rotation reorder only. Never wrap SVAR in dnd-kit |
| Toasts | shadcn `sonner` | 6s, with an Undo action |
| Shell | **AppShell + NavConfig** (design system) | Port `ui_kits/app-shell/*.jsx` to TSX using shadcn `sidebar` / `sheet` / `dropdown-menu` |
| Server state | TanStack Query (recommended) | Live board updates via WebSocket / SSE (`api-contract.md` §3) |

## 2 · Project structure (suggested)
```
src/
  app/routes/floor.tsx                 // route, mounts <AppShell activeId="floor">
  features/floor/
    FloorWorkspace.tsx                 // S03 layout: rotation · schedule · board (container-query driven)
    rotation/  RotationBand.tsx  RepCard.tsx  RepMenu.tsx  dialogs/{Pause,Unpause,Bench,Unbench,MoveRep}.tsx
    schedule/  ScheduleRail.tsx  ScheduleItem.tsx  ScheduleItemSheet.tsx  ArrivalCheckInDialog.tsx
    board/     FloorBoard.tsx (SVAR)  CaseCard.tsx  PhaseHeader.tsx  CaseMenu.tsx  PhaseDetailSheet.tsx
    checkin/   CheckInDialog.tsx (4 steps)  OutfitterPicker.tsx
    case-dialogs/ {Assign,Move,Note,CustomerLeft}Dialog.tsx
    chat/      RepChatSheet.tsx
    api.ts  types.ts  permissions.ts  hooks.ts
  components/ui/                       // shadcn output + variants.ts
  design-system/                       // copied from this package (tokens, AppShell port, NavConfig)
```

## 3 · Layout rules (from the design)
- **Sizing:** `FloorWorkspace` root uses `container-type: inline-size`. **Never use viewport media queries.**
  - `@container (min-width: 980px)`: schedule rail (`minmax(280px,340px)`) beside the board.
  - `<980px`: Floor traffic / Today's schedule tabs.
  - `<600px`: the board shows one phase with phase tabs; overlays open as bottom sheets (`sheet side="bottom"`).
- **Scroll:** the board, rotation and phase tabs scroll inside their own regions. The page never scrolls horizontally.
- **Touch targets:** all at least 44×44px.
- **Theme:** the rotation band uses the dark surface stack inside a light page (scope `.dark` on that section only).

## 4 · Permissions
`permissions.ts` mirrors `roles-permissions.md` Matrix B. Use **one** helper everywhere:
```ts
type Access = 'hidden' | 'read' | 'act' | 'reason' | 'approve' | 'disabled';
can(role, 'case.move'): Access
```
- **hidden:** don't render.
- **read:** render without an affordance.
- **disabled:** render disabled with an inline note saying who can do it.
- **reason:** commit requires a reason.
- **approve:** creates a request instead of mutating.
- **Stamp:** put `data-bos-perm` and `data-bos-access` on every gated element.
- **Server:** the server enforces the same matrix (`api-contract.md` §4). UI gating is a convenience, not security.

## 5 · Stamping (spec-ready v2): keep every ID
Every `data-spec-id` in `floor-workspace.manifest.json` must exist in the built DOM with the same value, plus its `data-bos-*` attributes. QA runs `SpecLint.run()` (shipped in `design-system/spec-ready/`) in CI against the built app, for every role × state × width. **Don't rename IDs.**

## 6 · Definition of done (per ticket)
1. Matches `requirements.md` acceptance rows for the elements it touches
2. SpecLint passes for the touched states, both roles, at 390 / 834 / 1280
3. The role postures match `roles-permissions.md`
4. Keyboard: tab order, Escape closes the top overlay, focus returns to the trigger
5. Lighthouse a11y ≥ 95; no AA contrast failures
6. All six data states are implemented for any module touched (`state-map.md`)
7. Events fire with the payloads in `api-contract.md`
