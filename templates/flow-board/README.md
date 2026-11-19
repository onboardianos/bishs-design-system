# Requirements & Flow Board

One board per build that shows the screen flow and the requirements together. Each role gets a swimlane. Each screen state is a card with its screenshot, frame ID, artboard widths, data states, exits and requirement cards. Arrows connect screens and are labelled with the trigger's `data-spec-id`. A gate panel at the top reports G8, G9, G10, G12 and G2 from the same data.

The board is a view of the handoff, not a second copy of it. It reads `flow.json`, which is generated from the SpecLint manifest plus the build's requirement text, so it can't drift from the build.

## Files
| File | What it is |
|---|---|
| `FlowBoard.dc.html` | The board. Pannable canvas. Props: `src` (default `./flow.json`), `showRequirements`, `showDataStates`, `showTriggerLabels` |
| `flow.json` | The data. The example is the Floor Workspace reference build, taken from its `handoff/` files |
| `flow-from-manifest.js` | `BishFlowBoard.fromManifest(manifest, spec, reqText)`, `validate(flow)`, `download(flow)` |
| `ds-base.js` | Finds and loads the design system (same as the prototype shell) |

## Use it in a build
1. Copy this folder into `<build>/handoff/flow-board/`.
2. In the build's **Export handoff**, after `SpecLint.manifest()`, call `BishFlowBoard.fromManifest(manifest, spec, REQ)` and download `flow.json` into that folder. `spec` holds what the manifest can't know: roles, screen keys and columns, edges and questions. `REQ` is the same requirement-text map you pass to `SpecLint.requirements()`.
3. Run `BishFlowBoard.validate(flow)`. Fix every error before handoff.
4. Open `FlowBoard.dc.html` (served over http). Add `image` (a PNG of the artboard) or `src` (a URL that opens the prototype at that state) to each screen to show it in the card.

You can also write `flow.json` by hand for an early flow, before there's a manifest. The G2 row then reads "not checked".

## flow.json
```json
{
  "build": "Floor Workspace", "version": "1.0", "sources": ["handoff/state-map.md"],
  "columns": ["Screen", "Menu or step", "Dialog"],
  "roles": [{ "id": "manager", "label": "Sales manager", "via": "NavConfig › floor" }],
  "screens": [{
    "key": "manager-floor", "state": "floor", "num": "01", "label": "Floor workspace", "kind": "screen",
    "role": "manager", "col": 1, "frame": "frame-app-shell", "artboards": [1280, 390],
    "image": "shots/floor-1280.png",
    "modules": [{ "name": "Floor traffic", "states": { "loading": "todo", "empty": "built", "error": "todo", "partial": "todo", "stale": "todo", "permission": "n/a" } }],
    "exits": [{ "label": "commit + toast", "to": "manager-floor" }],
    "requirements": [{ "id": "btn-commit-new-check-in", "purpose": "…", "validation": "…", "acceptance": "Given … when … then …", "source": "BR-04" }],
    "elements": ["btn-commit-new-check-in", "card-case#jacksons"]
  }],
  "edges": [{ "from": "manager-floor", "to": "manager-case-menu", "trigger": "btn-action-case-menu#{case}", "kind": "overlay", "label": "", "open": "Q-01" }],
  "questions": [{ "id": "Q-01", "text": "…", "owner": null }]
}
```
- **key** is unique per role and state. The same state reached by two roles is two cards, one per lane.
- **col** is the step column. Several screens in one lane and column stack vertically.
- **kind** on an edge is `nav` (default) or `overlay`. Edges between lanes are drawn as handoffs automatically. An edge with `open` is drawn as an open question.
- **exits** are returns to an earlier screen. They're listed on the card instead of drawn, to keep the board readable.
- **source** is required on every requirement: a BR-## from the intake, a precedent, `requirements.md`, or canon. A requirement with no source shows **needs-rule** and fails G12.
- **elements** comes from the manifest. When it's present, every edge's trigger must be in its `from` screen, or G2 fails and the arrow turns red.

## Reading the board
- Solid grey: navigation. Dashed grey: opens an overlay. Thick blue: handoff to another role. Red dotted: open question, or trigger not stamped.
- Select a screen's title to show only its transitions. Escape shows everything again.
- Data states read `built/applicable`. A red ✕ means at least one module still lacks that state.

## Rules it follows
- No gold fills and no COMMIT on the board. Gold appears only as the overline text.
- Status uses colour, glyph and value together. Badges come from the design system.
- Every interactive element is stamped. Run the self-check with **Single-surface asset** ticked.
