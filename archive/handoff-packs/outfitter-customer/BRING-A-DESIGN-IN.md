# Bring a design into the Bish's RV design system

**Who this is for:** anyone handing a design to a Claude Design project so it can be converted into a Bish's OS build and delivered as a dev-ready zip.

**How to use it:** start a **new project**, link it to the **Bish's RV Design System**, attach this file, and paste the prompt at the bottom.

## 0 · Pre-flight (Claude confirms all of these in its first reply, before building anything)

- [ ] I read Tier 1 of `documents/bishify-reading-order.md` in the linked design system, in order (CLAUDE.md → SKILL.md → design-intake-to-handoff → README › Components → component-selection-guide), and I'll read each later tier before its pass.
- [ ] I'm using the DS components from `window.BishSRVDesignSystem_26feec`. I'm not hand-building buttons, badges, inputs, cards, tabs, headers or nav.
- [ ] **Light surfaces use the same components with `theme="light"`.** That applies to Button, Badge, Card, StatTile, UnitRow, Header, Input, TabBar, Avatar, PhaseAlert, CustomerCard, QuestionCard and ChoiceChip; AppShell and RolesNavAdmin already take `theme`. `ui_kits/portal-light/` is a reference page only, not a component set. If a component is missing a variant I need, I log it as a DS gap. I don't build a local fork.
- [ ] **Alerts, customer/kanban cards, question cards and answer chips use `PhaseAlert`, `CustomerCard`, `QuestionCard`, `ChoiceChip` / `ChoiceGroup`** from `ui_kits/floor/`. Never hand-built. Selected chips are ink, never gold.
- [ ] **Avatars contrast with their surface:** ink on light, white on dark (`Avatar theme`). Gold only for the signed-in user.
- [ ] I read `documents/component-selection-guide.md` in the linked design system and mapped every part of the source with it.
- [ ] Every screen mounts inside AppShell. Nav comes from NavConfig (admin-owned), never hardcoded.
- [ ] I start from `templates/prototype-canvas-shell/`.
- [ ] Gold is used only for the COMMIT fill (lighter gold, going darker on hover, near-black text), ACTION outlines and the current nav item.
- [ ] I stamp elements as I build them, and SpecLint must pass at 100% before I hand off.

---

## 1 · Set up the project (keeps it small)

| Do | Don't |
|---|---|
| Start a **new project for this one design** | Build inside the design system project |
| **Link** it to the Bish's RV Design System | Copy design-system folders into the project |
| Do one design, or one batch of related screens, per project | Mix several builds into one project |
| Keep one chat per phase: intake → build → handoff | Run the whole thing in one long chat |

---

## 2 · Bring in the source design in its smallest useful form

| Source | Send this | Not this |
|---|---|---|
| **Figma** | The `.fig` file, or PNGs of only the frames you need | A full-file screenshot dump |
| **HTML app / export** | The file once. Claude pulls out the scripts, styles and images it uses, then deletes the upload | Several copies or versions of the bundle |
| **Screenshots** | One per state or overlay, named after the state (`hub-mcp.png`) | Duplicates or crops of the same view |
| **Live product** | A URL plus screenshots of every overlay and pop-up | Only the main screen |
| **Business context** | Transcripts, rules docs, or the people who decide | Nothing. Claude will log open questions instead of guessing |

**Images:** never host images yourself (no CDN or web URLs, no base64). Put every image in `prototype/images/` and link it with a relative path (`images/unit-front.png`). PNG, JPEG, WebP or GIF, max 10 MB each; compress to ~200 KB at display size; name by content in lowercase-kebab. Atlas copies them into its own storage on import and rewrites the links. Full rule: `documents/handoff-package-standard.md` §12.

**Show everything:** include overlays, alerts, modals, empty views and error views. Anything not shown can't be inventoried.

---

## 3 · The process Claude must follow

The full route is in the design system at `documents/design-intake-to-handoff.md`. In short:

0. **Business intake:** write every rule with its source in `handoff/intake.md`. Unknown rules become open questions marked `needs-rule`. **Nothing is invented.**
1. **Inventory:** list everything in the source, including hidden layers, extra scripts and overlay modules.
2. **Map to the system:** match each part to a DS component, an AppShell element, a pattern, or a custom block with a reason.
3. **Restructure:** organise each screen as frame › sections › layers. Each overlay is its own frame, with at most one COMMIT. Build it in the Canvas ⇄ Prototype harness.
4. **Re-skin to canon:** tokens, brand fonts, Lucide icons, WCAG AA. Gold only for the COMMIT fill, ACTION outlines and the current nav item.
5. **Make it fluid:** one implementation across 360 → 1600px, sized by its container. It must pass the shrink test and the 200% zoom test.
6. **Stamp and wire:** every element gets a `data-spec-id`, every state is reachable by clicking, and every role gets a posture.
7. **Gates G1–G12:** record each result in `qa-gates.md`. A failed gate is logged with an owner and a fix.
8. **Export handoff:** generates the manifest, `requirements.md` and the Jira CSV.
9. **Engineering set and dev zip.**

**Keep the original's look.** Cards, overlays and modals keep their original layout and type, and get re-skinned. Any deliberate change goes in `decisions.md`.

---

## 4 · What gets delivered: `<build>-dev-handoff.zip`

```
<build>-dev-handoff.zip
├── prototype/               the build: Canvas ⇄ Prototype harness
│   ├── index.html           every state as an artboard + clickable prototype
│   ├── *.babel / *.jsx      screen and overlay source
│   └── images/              compressed images, linked by relative path
├── handoff/
│   ├── README.md            index, version, owners, how to run
│   ├── intake.md            business rules + sources, open questions
│   ├── conversion-report.md inventory, original → converted, removed items
│   ├── requirements.md      generated, 0 TODO
│   ├── <build>.manifest.json  generated, never hand-edited
│   ├── <build>.jira-tickets.csv  generated epics, stories, spikes, blocked items
│   ├── state-map.md         states, triggers, transitions, data states
│   ├── component-map.md     element → DS component → shadcn primitive
│   ├── data-contract.md     entities, derived values, events
│   ├── roles-permissions.md matrices A/B/C, approvals, audit
│   ├── qa-gates.md          G1–G12 results + evidence
│   ├── decisions.md         decisions, open questions, retired IDs
│   ├── engineering.md       stack, structure, definition of done
│   ├── types.ts.tpl         domain types
│   ├── api-contract.md      endpoints, permissions, live updates, errors
│   ├── build-plan.md        tickets → requirement rows → stamps
│   └── test-plan.md         automated suites + Given/When/Then
└── design-system/           a pointer to the DS: GitHub repo + commit, not a copy
```

**Done means:**
- SpecLint reports 100% for every state × width.
- `requirements.md` reads "n of n families complete".
- Every ticket traces to a source, and no `needs-rule` story is marked Ready.
- The zip opens and runs without anything else installed.

---

## 5 · Keep it lean while working

- Keep only the latest version of each handoff file, with no v2 or v3 copies. GitHub keeps the history.
- Build the zip and any standalone snapshot **only at handoff**, then delete them from the project after download or a push to GitHub.
- Delete the extracted pieces of the source (`uploads/…`) once the inventory is complete.
- Copy patterns from the reference build (`conversions/floor-workspace/` in the design system), not whole files.

---

## 6 · Prompt to paste

> Convert the attached design into the Bish's RV design system by following `BRING-A-DESIGN-IN.md` and the linked design system's `documents/design-intake-to-handoff.md`.
> - **First, reply with the section 0 pre-flight checklist ticked. Don't build until it's confirmed.**
> - Use the DS components as-is. On light surfaces pass `theme="light"`; never build local light copies.
> - Alerts → `PhaseAlert`. Customer / kanban cards → `CustomerCard`. Question screens → `QuestionCard` + `ChoiceChip`. Never hand-build them.
> - Start with business intake. Invent no rules: log every unknown as an open question marked `needs-rule`.
> - Inventory **every** screen, overlay, alert and modal in the source, including hidden layers and extra scripts.
> - Keep the original card and overlay layouts. Re-skin them; don't redesign them.
> - Build in the Canvas ⇄ Prototype shell inside AppShell, fluid and stamped, with SpecLint at 100%.
> - Deliver `<build>-dev-handoff.zip` with the structure in section 4.
> - Keep the project lean per section 5.
> - Build name: `__________` · Roles: `__________` · Source: `__________`
