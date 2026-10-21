# spec-ready v2: proposal to merge BOS structure into the spec-ready contract

Status: **PROPOSAL, for Zach's evaluation.** Nothing in the project uses this yet.
Supersedes, if ratified: the `spec-ready-design` skill contract (v1).
Folds in: BOS primitives and tags from `FLOOR-V2-NOTES.md` (proposed slot SM-FLOOR-V2).

---

## 0. Why merge
| | spec-ready v1 | BOS (Floor v2) |
|---|---|---|
| Answers | "Is this element addressable, provable and stable over time?" | "Where does this element sit, and what kind of thing is it?" |
| Strength | Lifecycle: stable IDs, a generated manifest, a lint gate, capture, fingerprints | Structure: Frame › Canvas › Section › Layer, action classes, grid, overlay |
| Gap | No hierarchy, no action taxonomy, no grid model | No lifecycle. Its IDs change with the breakpoint and with resize |

v2 keeps **one stable address** (the v1 rules) and adds **structure as attributes**
(BOS). Structure can change. The address can't.

---

## 1. The address: `data-spec-id`, unchanged from v1 except the prefix
Format: `<class>-<slug>[#<instance>]`

- **`class`** is one of the action and element classes in §3. It replaces v1's free prefix
  taxonomy for interactive elements. Non-interactive elements keep their v1 prefixes
  (`screen-`, `sec-`, `card-`, `metric-`, `label-`, `row-`, `list-`, `img-`).
- **`slug`** comes from the visible or spoken label, in kebab case: `btn-commit-check-in`, not
  `btn-commit-c01`. This keeps v1 rule 2, so the align stage can match narration.
- **`#instance`** is used only for repeated elements, and is a stable domain key,
  never an index: `card-customer#jacksons`, not `card-customer#3`.
- **Scoped to the screen.** The manifest qualifies each ID with its screen
  (`SM-FLOOR-001::btn-commit-check-in`), so the same slug can exist on two screens.

**Explicitly excluded from the address** (this is the BOS conflict being resolved):
- breakpoint (`.dt` / `.tab` / `.ph`): the same element has the same ID at every width (RF01)
- grid locator (`@c2-3r94-98`): it moves on resize, so it can't be an address
- section and layer numbers: structure can reorganise without renaming the element

v1 rule 3 still applies in full: once an ID is in a manifest, it is never renamed or
reused, and removals are declared and changelogged.

---

## 2. Structure, carried as attributes rather than in the ID
| Attribute | On | Value | Source |
|---|---|---|---|
| `data-bos-level` | every stamped node | `frame` · `canvas` · `section` · `layer` · `component` · `shell` | BOS |
| `data-bos-section` | sections and their descendants | `S01`…`S99`. **S99 is reserved for the action bar** | BOS |
| `data-bos-layer` | layers and their descendants | `L01`…`L99` | BOS |
| `data-bos-type` | sections | `header` · `status` · `content` · `list` · `detail` · `action` · `nav`\* | BOS (\*`nav` is new and needs ratifying) |
| `data-bos-class` | interactive nodes | `commit` · `action` · `nav` · `info` | BOS |
| `data-bos-label` | sections and layers | human label ("Floor traffic") | BOS |
| `data-bos-bp` | frame only | `ph` · `tab` · `dt`, live | BOS (moved off the ID) |
| `data-bos-grid` | every stamped node | `c{a}-{b}r{a}-{b}`, live. Shell nodes are prefixed `vp:` | BOS (moved off the ID) |
| `data-bos-guide-safe` | info and nav nodes | `true`: safe for a guided walkthrough to click | BOS |
| `data-bos-role` | frame | the active role | BOS |
| `data-bos-ready` | frame | `true` once the first paint has finished | BOS |

**Numbering rules:**
- Section and layer numbers are **assigned once, in authoring order, and never
  renumbered.**
- If a section is removed, its number is retired, not reused. This is the same lifecycle
  rule as v1 rule 3, applied to structure.

**Nesting rules:**
- Frame › Canvas › Section › Layer › components.
- A Layer inside a Layer is a **lint error**.
- Shell elements (header, side panel, drawer, mobile tab bar) live outside the Canvas, at
  `data-bos-level="shell"` under the shell screen code `BOS-SHELL-001`.

---

## 3. Action classes and the gold rule
| Class | Meaning | Visual | Limit |
|---|---|---|---|
| `commit` | Completes the screen's job (Check in, Approve, Send to Lender) | Filled gold, near-black text | **At most one per screen.** It lives in S99 when present. |
| `action` | Changes state, but isn't the screen's job (Assign, Pause, Filter) | Gold outline | No limit |
| `nav` | Moves the user somewhere | Never gold *(see open decision D1)* | No limit |
| `info` | Reveals information; changes nothing (⋮ menus, tooltips, alert drawer) | Never gold | No limit |

The ≤1 COMMIT rule replaces RF11's "one gold primary action" and makes it something a lint can check.

---

## 4. Lifecycle: v1 rules 3–8, unchanged
- **The manifest is generated from the live page and never hand-written.** `--prev` enforces
  additive-only changes, bumps the version and writes the changelog.
- The manifest now also records each element's `bos-level`, `section`, `layer`, `type`
  and `class`, so structure changes show up in the changelog as moves, not
  renames.
- **Capture kit inlined**, and re-inlined on every rebuild.
- **Every state reachable by clicking stamped elements.** Every overlay, drawer, sheet
  and the mobile Action overlay must open from a stamped `action`, `nav` or `info` element.
- **Fingerprints:** build sha256 plus the manifest version travel with every handoff.

---

## 5. Lint gate: v1 coverage plus BOS structure
The build ships only when all of these pass:
1. 0 unstamped interactive elements. Coverage of semantic elements is reported.
2. Every `data-spec-id` is unique within its screen.
3. No breakpoint or grid token appears inside a `data-spec-id`.
4. Exactly 1 canvas per screen. No layer inside a layer.
5. At most one `commit` per screen.
6. Gold (`--accent-gold*`, `#8B752E`, `#B89E4A`, `#5E4F1F`) appears only on `commit`
   and `action` *(subject to D1)*.
7. Every overlay or drawer has a stamped trigger.
8. No horizontal overflow at 360, 834 or 1440 px (RF10).

Rules 1–3 and 7 come from v1 and the merge. Rules 4–6 and 8 come from BOS. All of them can be checked by machine.

---

## 6. Dev overlay
`?bos=1` outlines each level:
- canvas: solid
- section: dashed blue
- layer: dotted green
- component: red
- shell: olive

It also draws the band's column grid and labels every node with its `data-spec-id`
plus its section and layer. It is pointer-events-none, so the screen still works underneath it.

v1 has no equivalent. The overlay is for review only and never ships.

---

## 7. Grid model, GB11 (structure, not address)
| Band | Width | Cols | Margin | Gutter |
|---|---|---|---|---|
| `ph` | ≤640 | 4 | 16 | 16 |
| `tab` | 641–1023 | 8 | 24 | 16 |
| `dt` | ≥1024 | 12 | 32 | 24 |

- Rows are 8 px, measured from the top of the canvas.
- Bands are resolved from the **container** (RF05), not the viewport. This corrects
  FLOOR-V2 §6.4.

---

## 8. Worked example: one button, every attribute
```html
<button
  data-spec-id="btn-commit-check-in"
  data-bos-level="component"
  data-bos-section="S99"
  data-bos-class="commit"
  data-bos-grid="c9-12r93-99">Check in customer</button>
```
- **Manifest key:** `SM-FLOOR-001::btn-commit-check-in`
- **At 390 px:** the same ID, `data-bos-grid="c1-4r104-110"`, and the frame's `data-bos-bp="ph"`.
- **Compare BOS v0:** its address was `SM-FLOOR-001.dt/S99/btn-commit-checkin@c9-12r93-99`,
  which became a different address at 390 px.

---

## 9. Open decisions
- **D1. The gold rule for `nav`.** Your mobile tab bar design shows the active tab in gold,
  which breaks the strict rule in §3 (FLOOR-V2 §6.9 rendered it in ink). Options:
  - (a) Strict: no gold on nav, so the active tab is ink.
  - (b) A split rule: an active nav state may use `--accent-gold-lo`/`-hi` as a
    *wayfinding* colour, but never as a fill.
  - (c) The design as drawn.
- **D2. Section type `nav`.** Ratify it or reject it.
- **D3. Prefix taxonomy.** Replace v1's interactive prefixes with the four classes (§1), or
  keep both (`btn-` plus `data-bos-class`)?
- **D4. Manifest scope.** One manifest per screen, or one per build (which holds every
  screen plus the shell)?
- **D5. Migration.** v1-stamped builds (none exist in this design system yet) would
  need only additive `data-bos-*` attributes. No IDs change.
