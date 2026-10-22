repo: onboardianos/bishs-design-system
branch: main
direction: this project is the source of truth; the repo is its published mirror

## Last sync
date: 2026-10-21
status: initial commit pending (repo created empty)

### Updated in this project
- Navigation foundation: AppShell, ActionOverlay, NavConfig, RolesNavAdmin (ui_kits/app-shell/)
- shadcn/ui layer: globals.css (Tailwind v4, CSS-first), variants.ts, components.json
- Required libraries: Tailwind v4, tw-animate-css, shadcn v4 new-york, Lucide only, SVAR React Kanban, dnd-kit
- Gold rule and spec-ready v2 decisions (documents/decisions-2026-10-21.md)
- Prototype & Canvas Shell template mounts AppShell with Desktop/Tablet/Mobile

## Screen map
| Screen / artifact | Repo path |
|---|---|
| Tokens + type | colors_and_type.css, styles.css |
| App shell + admin nav | ui_kits/app-shell/ |
| Portal primitives | ui_kits/portal-dark/, ui_kits/portal-light/ |
| Templates | templates/prototype-canvas-shell/ |
| Design-system cards | preview/ |
| Code bridge | shadcn/ |
| Canon docs | README.md, SKILL.md, CLAUDE.md, documents/ |
