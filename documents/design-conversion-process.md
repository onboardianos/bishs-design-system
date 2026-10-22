# Design conversion process (REQUIRED — Step 0D)

Any design that enters this system goes through this process: a screenshot, a Figma frame, an HTML export, a standalone app, or a screen someone else built. It comes out as a Bish's OS design that meets every canon rule, and it ships with a complete dev handoff package.

**Reference example:** `conversions/floor-workspace/` is the Floor Workspace, converted from `Floor Workspace - Full App (standalone).html`. Match its structure, depth and documentation on every conversion.

---

## Inputs accepted

| Input | How to read it |
|---|---|
| HTML / standalone bundle | Unpack it, read the source modules, then inventory routes, components, data and overlays |
| Figma / `.fig` | Read the frames and components; record the `data-component` names verbatim |
| Screenshots | Inventory what's visible; list every behaviour you can't see as an open question |
| Code repo | Read the components, styles and data; never copy bundler-only source |
| Live product | Walk it; capture every state reachable by clicking |

Nothing is invented. Anything the source doesn't show goes in `decisions.md` as an open question.

---

## Pass 0 · Business intake (before any design work)
Fill in `documents/business-intake.md` as `<build>/handoff/intake.md`: outcome, roles, business rules (BR-##), data, approvals, notifications and edge cases, **each with a source**. Extract rows from whatever you were given (brief, transcript, Jira epic, SOP, source app) using the intake skills. Don't invent rules: a blank becomes an open question.

## The six passes (in order)

### Pass 1 · Inventory (as-is)
- List every screen, state, overlay, drawer, toast and empty or error view.
- List every interactive element, data field, colour, font, spacing value and icon.
- Note the source's stamping, if it has any.
- Run `SpecLint.run()` on the source if it renders, and record the **before** coverage.
- Output: section 1 of `conversion-report.md`.

### Pass 2 · Map to the system
Each source part becomes exactly one of these:
1. **A DS component.** Button, Badge, Card, StatTile, UnitRow, Input, TabBar or Header, mapped to its shadcn primitive.
2. **A shell part.** The AppShell header, side panel, drawer, mobile tab bar or ActionOverlay. Delete any hand-built chrome.
3. **A screen block** built from DS tokens, stamped and documented in the component map as *custom*.

Role navigation moves into `NavConfig`. Kanban boards map to SVAR React Kanban, and other drag-and-drop to dnd-kit (`boards-and-dnd.md`).

### Pass 3 · Restructure
- Organise every screen as frame › canvas › sections (S01–S99) › layers, with layers nested at most one level deep.
- Every overlay is its own **frame**, with at most one COMMIT.
- Set up the **Canvas ⇄ Prototype** harness, with one artboard per state in a 1:1 match (`prototype-canvas-architecture-guide.md`).

### Pass 4 · Re-skin to canon
- Tokens only, with no raw hex. Bebas Neue / Barlow Condensed / Source Sans 3 / JetBrains Mono, and `clamp()` display type.
- **Gold rule:** gold has three jobs only: the COMMIT fill, ACTION outlines, and gold-lo on the current nav item. High-salience cards use ink with a gold accent edge. Avatars are ink.
- WCAG AA on every surface (`CHANGES-wcag.md`).
- Lucide icons only.
- Copy in the Bish's voice (README › Content fundamentals). Text the user supplied stays verbatim.

### Pass 5 · Make it fluid
One implementation, sized by its container and built mobile-first, across three bands: ≤640 · 641–1023 · ≥1024.
- Nothing is cut; content moves behind tabs or disclosure.
- No page-level horizontal scroll.
- 44px touch targets.
- No hover-only affordances.
- It must survive 200% text zoom (RF01–RF12).

### Pass 6 · Stamp and wire behaviour
- **Stamping:** every meaningful element gets a `data-spec-id` (`<class>-<slug>[#<instance>]`) plus `data-bos-*` attributes. Existing published IDs are never renamed; IDs from a source system are retired and the mapping is logged.
- **Reachable states:** every state can be reached by clicking stamped elements.
- **HIG behaviour:** loading and feedback timing, forms disabled until valid with reasons required, modal discipline, error grammar, and the reduced-motion contract (`hig-adoptions-2026-08-05.md`).
- **Drag:** every drag has a stamped "Move to…" alternative and undo.
- **Data states:** every module has all six: loading, empty, error, partial, stale and permission.
- **Roles:** apply `documents/roles-and-permissions.md`. Find every role that reaches the build, build each one's posture, and stamp every gated element with `data-bos-perm` and `data-bos-access`. Prefer hidden over disabled; a disabled control must say who *can* do it.

---

## Gates (all must pass before handoff)

| # | Gate | Evidence |
|---|---|---|
| G1 | Every screen mounts in `AppShell`; nav comes from `NavConfig` | `component-map.md` |
| G2 | `SpecLint` passes for **every state × width**: 100% stamped, no duplicate or invalid IDs, ≤1 commit per frame, no nested layers | `gates` block in the manifest |
| G3 | Shrink test, 1440 → 375, with no broken width | `qa-gates.md` |
| G4 | 200% text zoom keeps all content and function | `qa-gates.md` |
| G5 | WCAG AA contrast on every surface | `qa-gates.md` |
| G6 | Gold appears only in its three jobs | `qa-gates.md` |
| G7 | Lucide icons only (the Action tap-hand is the one exception) | `qa-gates.md` |
| G8 | All six data states exist for every module | `state-map.md` |
| G9 | Canvas ⇄ Prototype match 1:1 | `state-map.md` |
| G10 | Every element family has a filled requirement row (no TODOs) | `requirements.md` |
| G12 | Every generated ticket traces to a source (spec, intake BR-##, confirmed precedent, or canon). No story is **Ready** while it carries the `needs-rule` label | `<build>.jira-tickets.csv` |
| G11 | Every role that reaches the build has a designed posture and a matrix row. Gated elements carry `data-bos-perm` + `data-bos-access`. Nothing with access `hidden` is rendered. | `roles-permissions.md` and the manifest `perm` / `access` / `viewRole` fields |

A gate that fails is listed in `decisions.md` with an owner and a fix. Nothing ships with a silent gap.

---

## Deliverables

Every conversion produces the full **handoff package** in `<build>/handoff/`, as defined in `handoff-package-standard.md`:

1. `README.md`: index, version, owners, how to run
2. `conversion-report.md`: before/after
3. `requirements.md`: every frame, section, layer and component family
4. `<build>.manifest.json`: generated, never hand-written
5. `state-map.md`: screens, states, triggers, transitions
6. `component-map.md`: each element → DS component → shadcn primitive → props
7. `data-contract.md`: entities, fields, sources, events
8. `qa-gates.md`: results for G1–G10
9. `decisions.md`: open questions, decisions and retired IDs
10. `roles-permissions.md`: who sees and does what, in matrices A/B/C, plus approvals and audit

**Generating the manifest and requirements:**
1. Write requirement text once per element family in `<build>-requirements` (an object keyed by family: `purpose`, `behaviour`, `acceptance`, and optional `target` and `event`). The reference is `conversions/floor-workspace/fw-requirements.babel`.
2. Open the build's prototype and click **Export handoff**. It runs `SpecLint.snapshot()` for every role × state × width, then `SpecLint.manifest()` and `SpecLint.requirements(manifest, spec)`.
3. The generated `requirements.md` shows "**n of n families complete**". Any family without text is marked TODO, so gaps are visible. Gate G10 needs 0 TODO.

4. **Jira tickets.** The same export writes `<build>.jira-tickets.csv` using `SpecLint.tickets(manifest, spec, { intake, ruleMap, precedents, questions })`:
   - **Epics:** Shell & navigation, Screen, Overlays.
   - **Stories:** one per screen section or overlay frame. Each lists its stamp IDs and element descriptions, plus acceptance criteria built from the spec, the linked intake rules (BR-##) and any matched precedents (P-###), which are marked "confirm". The canon Definition of Done is appended.
   - **Spikes:** one per open question.
   - **Blocked stories:** a story with an element that has no spec, rule or precedent is labelled `needs-rule` and set to **Blocked**.
   - **Import:** Jira › System › External system import › CSV. Map Issue Id and Parent Id for the hierarchy.
5. **Grow the precedent library.** After approval, add the build's confirmed, reusable rules to `documents/precedents/`.

What the generator does:
- Records shared AppShell elements **once** (`BUILD::shell::<id>`, states `all`).
- Writes **every** instance and option in full (no truncation).
- Strips styling code from labels.
- Lists each element's destination (`data-bos-target`) and tracked event.
- Includes each state's label and status (MVP / draft).
