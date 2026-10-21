# Prototype & Canvas — Architecture & Setup Guide

**Project:** Customer Buying Portal (Remix) · `Get Fitted - Fit Journey.html`
**Audience:** anyone extending or rebuilding the prototype shell (`getfitted/gf_prototype.jsx`).

---

## 1. The two modes: Canvas and Prototype

The file has a single top-center toggle with two modes:

- **CANVAS** — a Figma-style board (`design_doc_mode = canvas`). Every screen in the whole product lives here as an absolutely-positioned, always-on artboard, grouped into labeled `DCSection` rows. Nothing is hidden; you pan/zoom to see everything at once. This is the "map."
- **PROTOTYPE** — a single interactive frame with a left side-panel navigator. You drive one screen at a time through the real click-flow. This is the "walkthrough."

They render the **same underlying screen components**. Canvas mounts each component inside a `<DCArtboard>`; Prototype mounts one at a time inside a scaling `<GFFrame>` (desktop/tablet) or `<GFPhone>` (mobile). A change to a screen component shows up in both modes automatically — there is one source of truth per screen, never a canvas copy and a prototype copy.

---

## 2. Prototype anatomy

`GFPrototype()` renders two things:

1. **`GFSidePanel`** — the fixed left navigator (276px, collapsible).
2. **A centered stage** — a `GFFrame` or `GFPhone` holding the currently-selected screen, offset right by the panel width (`left: reserve`).

The stage auto-scales its fixed design size (e.g. 1920×1080, 1440×900, 1194×834, or a 390×844 phone) down to fit the viewport, so the screen is always fully visible.

---

## 3. The four side-panel controls

The panel has, top to bottom: **Layer**, **Device**, **Style/Variant**, a **prev/next counter**, and the **Screens list**. Each is a plain state value on `GFPrototype`.

### 3.1 LAYER — which product surface you're in
`const [layer, setLayer] = useState("customer")`

The Layer segmented control lists all nine surfaces:

| Layer value | Label | Flow constant | Stage |
|---|---|---|---|
| `customer` | Customer | `GF_FLOW` / `GF_MOBILE_FLOW` | GFFrame 1920×1080 / GFPhone |
| `visit` | Visit | `VISIT_FLOW` | GFFrame 1440×900 |
| `instore` | In Store | `INSTORE_FLOW` | GFFrame 1920×1080 (iframe) |
| `instorecx` | In Store · Mobile | `INSTORECX_FLOW` | GFPhone (story = full frame) |
| `walkthrough` | Walkthrough | `WK_FLOW` | GFFrame 1194×834 (iPad) |
| `worksheet` | Worksheet | `WS_FLOW` | GFFrame 1920×1080 |
| `purchase` | Purchase | `PZ_FLOW` / `PZ_MOBILE_FLOW` | GFFrame 1920×1080 / GFPhone |
| `scorecard` | Scorecard | `SCORECARD_FLOW` | GFFrame 1920×1080 (iframe) |
| `portal` | Portal | `PORTAL_FLOW` | GFFrame 1920×1080 (iframe) |

Changing Layer swaps **which flow array drives the Screens list** and **which render function draws the stage**. A `useEffect` guards against a stale screen id: if the current screen id isn't in the new layer's flow, it resets to that flow's first screen.

### 3.2 DEVICE — desktop vs mobile
`const [device, setDevice] = useState("desktop")`

Only shown for layers that have a mobile flow (currently **Customer** and **Purchase**). For those, `device === "mobile"` swaps to `GF_MOBILE_FLOW`/`PZ_MOBILE_FLOW` and renders inside `GFPhone` (390×844) instead of `GFFrame`. All the other layers hide the Device control (they are single-form-factor: In Store · Mobile and Walkthrough are always their own device; iframes and Worksheet are desktop-only).

### 3.3 STYLE / VARIANT — visual treatment of the same screens
Two independent controls that occupy the same slot depending on layer:

- **Style** (`style`, values `A`/`B`/`C` → **Sym / Edit / Type**): shown for **Customer (desktop)** and **Visit**. Key screens (Front door, Checkpoint, Matches; Visit confirmation) render in three design directions — Symmetric, Editorial, Type-first. `renderDesktopScreen` maps `A/B/C → Symmetric/Editorial/TypeFirst` and calls e.g. `FrontDoor_Editorial`. It's disabled (greyed) on screens that have no style variants (`!keyScreen`).
- **Variant** (`pvariant`, values `A`/`B`/`C` → **Rail / Side / Dots**): shown for **Purchase (desktop)** only. Maps through `PZ_STEP_VARIANT` (`A→A`, `B→side`, `C→dots`) to reskin the purchase step chrome.

### 3.4 The counter + Screens list — moving between screens
`const idx = flow.findIndex(f => f.id === curId)`

- The **`‹  n / total  ›`** counter steps `curId` backward/forward through the active flow.
- The **Screens list** renders one button per entry in the active flow. Clicking sets `curId`. The active screen is gold-filled; **key screens** (`key: true`) show a gold dot and cream text; secondary screens are muted. Each row is numbered `01, 02, …`.

`curId` and its setter `setCur` are **computed per layer** — each layer stores its own current-screen state (`screen`, `pScreen`, `vScreen`, `wkState.screen`, `icxScreen`, `wsCurId`, `iScreen`), so switching layers and coming back remembers where you were.

---

## 4. How a screen actually renders (the flow → render map)

Each layer has:
1. **A flow array** — ordered `{ id, label, key? }` objects. This *is* the Screens list, in order.
2. **A render function** — a `switch (id)` that returns the screen component for the current id, wiring each screen's in-experience buttons to `nav.go(nextId)`.

Example (Customer): `GF_FLOW` lists `story → popup → front → welcome → discovery → checkpoint → match → next → deal → purchase → pickup → ownership`. `renderDesktopScreen(id, style, nav)` returns `<CustomerStory>`, `<CustomerEntryPopup>`, `FrontDoor_{Style}`, etc. So there are **two ways to move**: the panel Screens list (jump anywhere) and the real in-screen CTAs (`Enter Experience`, `Continue`…) which call `nav.go(...)`.

**Cross-layer jumps** exist too: `window.__gfGoLayer(layer, screen)` switches layer+screen (e.g. Customer "Next step → Book a walk-through" jumps to `visit/story`); the Worksheet "Proceed to Agreement" sets layer `purchase`, screen `sms`; the Portal iframe posts `gf-portal-nav` messages that the shell listens for.

**Iframe layers** (In Store, Scorecard, Portal) have a one-entry flow and render a live `<iframe>` of a self-contained sub-app rather than a React screen.

---

## 5. How Prototype connects back to Canvas

The Canvas is the same screens laid out as `DCSection` rows of `DCArtboard`s — **one artboard per meaningful state**, including every overlay/variant. The correspondence is intentional and should be kept 1:1:

- **A layer** in the panel = **a section (or set of sections)** on the canvas (e.g. "Customer", "Purchase · Confirm Deal", "In Store · Floor Workspace").
- **A screen** in the flow list = **an artboard** in that section, using the same label.
- **A style/variant** = **sibling artboards** on the canvas (e.g. the three Front-door directions sit side by side; the Purchase Rail/Side/Dots dashboards are three artboards).
- **Overlays/pop-ups** that the prototype shows conditionally = **their own standalone artboards** on the canvas (e.g. Floor Workspace's Check-in, Assign, Move-phase modals each get an artboard).

**Rule of thumb when adding a screen:** add it in three places — (1) the component itself, (2) the layer's **flow array** + **render switch** in `gf_prototype.jsx`, and (3) a matching **`DCArtboard`** in the canvas section of `Get Fitted - Fit Journey.html`. Missing #2 means it won't appear in the prototype nav; missing #3 means it won't appear on the canvas map.

---

## 6. Adding a new layer — checklist

1. Build the screen components (own file under `getfitted/` or `components/`), export to `window`.
2. Add a **flow constant** (`MYLAYER_FLOW = [{id,label,key}]`).
3. Add a **render function** (or iframe) and a `case` in the stage's ternary in `GFPrototype`.
4. Add per-layer **current-screen state** + include it in the `curId` / `setCur` ternaries.
5. Add the layer to the **`SegRow label="Layer"` options** array in `GFSidePanel`.
6. If it has no Device/Style, add it to the exclusion conditions on those `SegRow`s.
7. Mirror every screen as **`DCArtboard`s in a canvas section**.

---

## 7. Collapse / persistence details

- The panel collapses via the header chevron (`navOpen` state, persisted to `localStorage["gf-proto-nav"]`). Collapsed, a slim gold tab on the left edge re-expands it; the stage widens to fill the freed space (`reserve` → 0).
- Purchase tracks completed screens in `localStorage["gf-pz-done"]` for the dashboard progress meter; a **Reset progress** button (shown only on the Purchase layer) clears it.
