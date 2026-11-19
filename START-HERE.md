# START HERE — Bish's RV design system · release 2.2.0

You have the complete, current design system. Everything in this folder is canon unless this page says otherwise. Read this page first, then follow it.

## 1 · Is this the right material?
- `VERSION` must say **2.2.0**, and `colors_and_type.css` must contain `--ds-version: "2.2.0"`. If either is missing or different, stop: you have a stale copy.
- If you find another design-system folder in the project (for example a v1.x copy with no `ui_kits/app-shell/`), ignore it and tell the user.
- Open `selfcheck/index.html` and press **Check package**. It confirms every file in `release/files.json` is present and the versions agree.

## 2 · Which file wins
When two files disagree, the higher one wins:
1. `SKILL.md` — the rulebook: routing, steps 0–0E, hard rules.
2. `documents/` — the detailed standards that `SKILL.md` points to.
3. `COMPONENTS.md` and the `.d.ts` files in `ui_kits/` — what exists and its props.
4. `README.md` — brand context, voice, visual foundations.
5. `conversions/floor-workspace/` — a worked **example**. Copy its structure, never treat it as a rule.

`CLAUDE.md` is a short copy of the hard rules for this project. `starter-kit/CLAUDE.md` is the one to copy into a project that uses the system.

## 3 · Read in this order
1. `SKILL.md` — find your request type in the START HERE table and run every step.
2. `documents/bishify-reading-order.md` — what to read before each pass.
3. `COMPONENTS.md`, then `documents/component-selection-guide.md`.
4. `conversions/floor-workspace/` — open `index.html` and `handoff/`.

## 4 · Load the system in a page
Start from `templates/prototype-canvas-shell/`. Its `ds-base.js` finds this folder by itself, whether it sits at `../..` or at `_ds/bishs-rv-design-system/`.

By hand:
```html
<link rel="stylesheet" href="<ds>/colors_and_type.css">
<script src="<ds>/_ds_bundle.js"></script>
<script>const { AppShell, Button, QuestionCard } = window.BishSRVDesignSystem_26feec;</script>
```
Never load the `.jsx` files directly; they're sources for reading.

## 5 · Prove your build: self-check
A build is not done until the self-check passes. Serve the package (`npx serve`), open `selfcheck/index.html`, enter the page path and press **Run self-check**. Put its `qa-gates` output in `<build>/handoff/` and prove the manual gates it lists.

Everything else about it (how to run it on one page, every rule and threshold, the scoring, exemptions, limits and how to fix a failure) is in **`selfcheck/README.md`**.

## 5b · Show the flow and requirements: flow board
Every handoff includes a Requirements & Flow Board: `templates/flow-board/`. It draws role swimlanes, one card per screen state, arrows labelled with trigger IDs, and requirement cards, from `flow.json` generated off the SpecLint manifest. See `templates/flow-board/README.md`.

## 6 · What's in the package
```
START-HERE.md  VERSION  CHANGELOG.md  SKILL.md  CLAUDE.md  README.md  COMPONENTS.md
colors_and_type.css  styles.css      tokens (link one)
_ds_bundle.js                        compiled components → window.BishSRVDesignSystem_26feec
ui_kits/                             component sources + .d.ts + previews
templates/prototype-canvas-shell/    REQUIRED starting point for any build
templates/flow-board/                requirements & flow board for every handoff
documents/                           standards, process, gates, precedents
selfcheck/                           selfcheck.js, index.html harness, README.md (reference)
starter-kit/CLAUDE.md                copy to a consuming project's root
shadcn/                              production theme (Tailwind v4 @theme inline)
assets/  preview/  design-system-viewer.html
conversions/floor-workspace/         the reference build, prototype + handoff
release/                             release.json (allowlist) + files.json (contents)
```
**Deliberately left out:** scratch work, uploads, past reviews, other conversions and handoff packs, old exports. If a document mentions one of them, it is history, not something to copy.
