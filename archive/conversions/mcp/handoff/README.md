# MCP · Your 3 + 1 · handoff package

**What it is.** The manager's MCP workspace: read the customer situation, set the deal, pick from matching units (all results, selected, AI shortlist), place up to four picks into the 3 + 1 (Slot 1, Slot 2, Target unit, Great idea), then compare & send to the customer. It opens from the Floor Workspace MCP Action Hub ("Do MCP now").

**Source.** Figma file "MVP – BISHS OS DESIGNS" (node 331-1051), page 1, 12 frames, MCP v2. Converted through the six passes in `documents/design-conversion-process.md`.

**Open the prototype:** `conversions/mcp/index.html` (Canvas ⇄ Prototype). Solo render for QA: `index.html?solo=1&state=<id>&w=<px>`.

| File | What |
|---|---|
| `intake.md` | Business intake: rules with sources, roles, open questions (`needs-rule`) |
| `conversion-report.md` | Six-pass report, frame → state map, canon changes |
| `requirements.md` | One row per frame, section, layer and component family |
| `decisions.md` | Decisions log |
| `mcp.manifest.json` | Generated: prototype › Export handoff |
| `mcp.requirements.md`, `mcp.jira-tickets.csv` | Generated: prototype › Export handoff |

**Ship gate.** SpecLint must pass on every state at 100%. Run **Export handoff** in the prototype panel to write the manifest, requirements skeleton and Jira CSV (tickets with no traced source come out `needs-rule` and Blocked).
