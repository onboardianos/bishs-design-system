# shadcn/ui layer: Bish's RV Nexus

This folder holds the production bridge from this design system to a **shadcn/ui + Radix + Tailwind + CVA** codebase. The React components in `ui_kits/` are reference implementations with inline styles, so they render without a build step. Production code installs shadcn primitives and styles them with the files here.

| File | Purpose |
|---|---|
| `globals.css` | Tailwind v4 theme, CSS-first (`@theme inline`, `@import "tw-animate-css"`). There is no `tailwind.config.ts`. It contains the shadcn CSS variables for light (`:root`) and dark (`.dark`), the Bish's extensions (gold, olive, cream, semantic and tint colours, scrim), fonts, radii, shadows, easing and the RF04 bands. |
| `variants.ts.tpl` | CVA recipes for button, badge, input, card, nav item, tab item and the Action FAB. Each one follows the gold rule and the action classes. |
| `components.json` | shadcn CLI config (new-york style, lucide icons, CSS variables). |

**Tailwind v4 only.** The theme lives in CSS, so `npx shadcn add` never overwrites brand tokens. Tailwind v3 and `tailwindcss-animate` aren't supported.

## Install in a code repo
```bash
npx shadcn@latest init            # then replace the generated globals.css with shadcn/globals.css
cp shadcn/components.json .       # adjust the css path / aliases to your repo
npm i tw-animate-css lucide-react @dnd-kit/core @dnd-kit/sortable   # + SVAR React Kanban for boards
npx shadcn@latest add button badge input card sheet dropdown-menu switch tabs dialog tooltip sidebar separator avatar
cp shadcn/variants.ts.tpl src/components/ui/variants.ts   # .tpl keeps it out of the in-browser bundle
```
Then point each generated component at the matching recipe. For example, in `button.tsx`, import `buttonVariants` from `./variants` and remove shadcn's default copy.

## Component → shadcn primitive map
| Nexus component | shadcn primitive(s) | Notes |
|---|---|---|
| Button | `button` | `variant`: commit · action · ghost · destructive · terminal · link. Allow at most one `commit` per screen. |
| Badge | `badge` | `tone` + `shape` (pill / chip) |
| Input | `input`, `label` | Use 16px text on mobile. Use `aria-invalid` for the error state. |
| Card / StatTile | `card` | Use `emphasis="hero"` for the ink-and-gold-edge card. Gold is never a card fill. |
| UnitRow | `card` or a table row | |
| TabBar (desktop tabs) | `tabs` | The active tab uses gold-lo text and an indicator, never a fill. |
| **AppShell** header | `input` (search), `dropdown-menu` (profile), `avatar`, `button size="icon"` (bell) | Logo left, search in the centre, bell, then the avatar on the right |
| **AppShell** side panel (≥1024) | `sidebar` (`collapsible="icon"`) | 240px expanded, 72px rail. Uses the `--sidebar-*` vars. |
| **AppShell** drawer (641–1023) and mobile menu (≤640) | `sheet` (`side="left"`) | Same nav data. On phones it shows the role's mobile menu. |
| **AppShell** mobile tab bar (≤640) | custom, with `tabItemVariants` and `actionFabVariants` | Two role slots, then Action, Alerts and Messenger |
| **ActionOverlay** | `dialog` (full-bleed, `bg-scrim`) | Pills use `button shape="pill"`. The terminal action uses `variant="terminal"`. |
| **RolesNavAdmin** toggles | `switch`, `table`, `select` | "Publish changes" is the screen's one `commit`. |

## Rules the recipes enforce
- **Gold:** gold has exactly three jobs: the COMMIT fill (`bg-primary`), the ACTION outline (`border-gold`) and gold-lo wayfinding on the current nav item. Hover surfaces use `accent`, which is never gold.
- **Contrast:** the primary uses near-black text on gold. On dark, semantic text uses the on-dark tints. Control edges use `--input` (3:1).
- **Touch targets:** use `min-h-11` (44px) for every touch target and `size="icon"` for icon buttons.
- **Breakpoints:** bands come from the container (`@container` / `@tab:` / `@dt:`), not the viewport, so screens work inside Canvas artboards (RF05).
- **Shell:** navigation is data. Read the catalog and role assignments from your `NavConfig` source, and never hardcode a role's nav.
