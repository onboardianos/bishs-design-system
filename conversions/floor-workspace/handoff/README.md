# Floor Workspace — handoff package (reference example)

| | |
|---|---|
| Build | `FLOOR-WORKSPACE` · v1.0.0 · 2026-10-22 |
| Roles | Sales manager · Receptionist (both reach it via `NavConfig` › Sales Floor). See `roles-permissions.md` |
| Surface | Desktop, tablet and phone. One fluid implementation, light page with a dark ups-rotation band |
| Source | `Floor Workspace - Full App (standalone).html` › Home › Floor Workspace (design A) |
| Prototype | `../index.html`. Use **Prototype** to walk the flow (switch the **Role** between Sales manager and Receptionist) and **Canvas** to see every state as an artboard, including the Receptionist posture section. Review at Fill, 1920, 1280, 834 and 390. |
| Standard | `documents/design-conversion-process.md` · `documents/handoff-package-standard.md` |

**This is the reference example.** Every future conversion and new build ships a package with the same files at the same depth.

## Contents

**Design (what to build)**
1. `conversion-report.md`: before/after from the source app
2. `requirements.md`: every frame, section and element family, with acceptance criteria
3. `state-map.md`: 17 states, triggers, transitions, data states
4. `roles-permissions.md`: roles reaching the build, matrices A/B/C, approvals, audit
5. `component-map.md`: element → DS component → shadcn primitive
6. `floor-workspace.manifest.json`: **generated** by **Export handoff** in the prototype. Every stamped ID × role × state × width

**Engineering (how to build it)**
7. `engineering.md`: stack, structure, layout, permissions and stamping rules, definition of done
8. `data-contract.md`: entities, derived values, events
9. `types.ts.tpl`: TypeScript domain types (rename to `.ts`)
10. `api-contract.md`: endpoints, permissions, live updates, audit, errors
11. `build-plan.md`: epics and tickets FW-01…FW-52, with suggested order
12. `test-plan.md`: automated suites + 10 acceptance scenarios

**Governance**
13. `qa-gates.md`: G1–G12 results
15. `intake.md`: business rules BR-01…BR-11 with sources
16. `floor-workspace.jira-tickets.csv`: **generated** by Export handoff (epics, stories with stamps and acceptance criteria, spikes)
14. `decisions.md`: open questions, decisions, retired IDs

**Alongside this folder** (in the zip)
- `prototype/`: the clickable reference (`index.html`); open it in a browser
- `design-system/`: tokens, the shadcn theme, the AppShell / NavConfig reference, SpecLint, assets and canon docs

## Production stack
Tailwind CSS v4 (CSS-first, `shadcn/globals.css`) · tw-animate-css · shadcn v4 new-york on Radix · Lucide (`lucide-react`) · **SVAR React Kanban** for Floor traffic · **dnd-kit** for ups-rotation reordering · AppShell and NavConfig from this design system.
