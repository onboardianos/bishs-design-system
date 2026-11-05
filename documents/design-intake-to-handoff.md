# Design intake → handoff · the whole route on one page

**Use this when** a design that wasn't built in this system arrives: a screenshot, a Figma frame, an HTML export, a standalone app, a live product, or a screen someone else built. It explains the route from that raw design to a Bish's OS build a developer can start on.

This page is the map. The detail is in three companion docs. Read the one for the step you're on:

| Doc | What it covers |
|---|---|
| `business-intake.md` | **Pass 0.** The intake form: business rules and their sources |
| `design-conversion-process.md` | **Passes 1–6 and gates G1–G12.** How the design gets converted |
| `handoff-package-standard.md` | **The output.** Every file the build ships to dev |

The reference build is `conversions/floor-workspace/`. When you're unsure, do what it does.

---

## The ground rules

1. **Convert the design; never just restyle it.** A design that only gets new colours on its old structure hasn't been through the system.
2. **Never invent a business rule.** Anything without a source becomes an open question, and its ticket is labelled `needs-rule`.
3. **Stamp elements as you build them.** Tagging is never left for a later pass.
4. **Build one fluid screen.** Never fork a screen per device.
5. **Never rename a published ID.**
6. **Write every gap down** in `decisions.md`. Nothing ships with a silent gap.

---

## The route

| Step | What you do | Output (where it goes) | Done when |
|---|---|---|---|
| **0 · Business intake** | Fill in the intake form: outcome, roles, business rules (BR-##), data, approvals, notifications and edge cases. Each gets a source: the source design, a transcript, a document or a person | `handoff/intake.md` | Every rule has a source, or is logged as an open question with an owner |
| **1 · Inventory** | List everything in the original: every screen, state, overlay, drawer, toast and empty or error view. Then every interactive element, data field, colour, font, spacing value and icon. **Check the source files themselves**, not only what's on screen: hidden layers, extra scripts and overlay modules | Section 1 of `handoff/conversion-report.md` | You can point to every part of the source and its line in the list |
| **2 · Map to the system** | Each source part becomes exactly one thing: a DS component, (alerts → PhaseAlert, customer/kanban cards → CustomerCard, questions → QuestionCard + ChoiceChip), an AppShell element, a pattern (Kanban → SVAR, drag and drop → dnd-kit), or a *custom block* with a reason. Role navigation moves into `NavConfig` | `handoff/component-map.md` | Nothing is left unmapped |
| **3 · Restructure** | Organise each screen as frame › canvas › sections (S01–S99) › layers. Every overlay is its own frame with at most one COMMIT. Set up the Canvas ⇄ Prototype harness with one artboard per state | The prototype plus `handoff/state-map.md` | The canvas and the prototype match 1:1 |
| **4 · Re-skin to canon** | Tokens only. Brand fonts. Lucide icons. The gold rule (COMMIT fill · ACTION outline · gold-lo on the current nav item). WCAG AA contrast. Bish's voice | The prototype. Each canon change goes in the conversion report's change table | No raw hex values. Gold only in its three jobs |
| **5 · Make it fluid** | One implementation, mobile-first, sized by its container, across three bands (≤640 · 641–1023 · ≥1024). Content moves behind disclosure rather than being cut. Targets are at least 44px | The prototype | It passes the shrink test (1440 → 375) and the 200% text-zoom test |
| **6 · Stamp & wire** | Give every meaningful element a `data-spec-id` and `data-bos-*` attributes. Make every state reachable by clicking stamped elements. Give every role its own posture, with gated elements stamped `data-bos-perm` | The prototype plus `handoff/roles-permissions.md` | `SpecLint` reports 100% for every state × width |
| **7 · Gates** | Run gates G1–G12 (listed below) and record each result | `handoff/qa-gates.md` | Every gate passes, or its failure is in `decisions.md` with an owner and a fix |
| **8 · Export handoff** | Write requirement text for each element family, then click **Export handoff** in the prototype | `<build>.manifest.json`, `requirements.md`, `<build>.jira-tickets.csv` (all generated) | Requirements read "n of n families complete" (0 TODO) |
| **9 · Engineering set + dev zip** | Write the developer docs, then zip `handoff/` + `prototype/` + `design-system/` | The engineering set (listed below) and the dev zip | Every ticket traces to a requirement row and a stamp |
| **10 · Learn** | After approval, add the build's confirmed, reusable rules to the precedent library | `documents/precedents/P-###` | The next build can reuse them |

---

## Gates G1–G12 (detail in `design-conversion-process.md`)

| # | Gate |
|---|---|
| G1 | Every screen mounts in `AppShell`, and its nav comes from `NavConfig` |
| G2 | `SpecLint` passes for every state × width |
| G3 | Shrink test, 1440 → 375 |
| G4 | 200% text zoom |
| G5 | WCAG AA contrast |
| G6 | Gold only in its three jobs |
| G7 | Lucide icons only |
| G8 | All six data states for every module |
| G9 | Canvas ⇄ Prototype match 1:1 |
| G10 | Every element family has a filled requirement row |
| G11 | Every role has a designed posture, and gated elements are stamped |
| G12 | Every ticket traces to a source. No `needs-rule` story is marked Ready |

---

## What a finished conversion produces

Everything lives in `<build>/handoff/` unless a path says otherwise.

**The design**
- `<build>/index.html`: the Canvas ⇄ Prototype harness. It holds every state as a canvas artboard and as a prototype screen, with switchers for role, device width and layer.

**Handoff package** (`handoff-package-standard.md` §1–10)
1. `README.md`: the index, version, owners and how to run it
2. `intake.md`: business rules and their sources (pass 0)
3. `conversion-report.md`: inventory, original → converted changes, removed items, gate summary
4. `requirements.md`: generated skeleton with the filled text
5. `<build>.manifest.json`: generated, never edited by hand
6. `state-map.md`: states, triggers, transitions, data states
7. `component-map.md`: each element → DS component → shadcn primitive
8. `data-contract.md`: entities, derived values, events
9. `qa-gates.md`: results for G1–G12
10. `decisions.md`: open questions, decisions, retired IDs, failed gates
11. `roles-permissions.md`: matrices A/B/C, approvals, audit
12. `<build>.jira-tickets.csv`: generated epics, stories, spikes and blocked items

**Engineering set** (`handoff-package-standard.md` §11)
- `engineering.md`
- `types.ts.tpl`
- `api-contract.md`
- `build-plan.md`
- `test-plan.md`

**Dev zip:** `handoff/` + `prototype/` + `design-system/`

---

## Common misses

These come from the Floor Workspace conversion.
- **Overlays living outside the main code.** The original's Action Hub and alerts were in a separate script, and the first inventory missed them. In pass 1, read every script, layer and module in the source.
- **Rebuilding components from the data rather than the design.** Cards must keep the original's layout: they get re-skinned, not reinvented.
- **Turning modals into side drawers.** Keep the original overlay type unless the HIG modality rules say otherwise, and log the reason if you change it.
- **Gold creep.** Selected states, filter chips and progress bars in the source are often gold. In the converted build they become ink.
