/* @ds-bundle: {"format":4,"namespace":"BishSRVDesignSystem_26feec","components":[{"name":"ActionOverlay","sourcePath":"ui_kits/app-shell/AppShell.jsx"},{"name":"AppShell","sourcePath":"ui_kits/app-shell/AppShell.jsx"},{"name":"NAV_ICONS","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"UI_ICONS","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"ICON_ALIASES","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"SHELL_THEME","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"NavIcon","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"NavConfig","sourcePath":"ui_kits/app-shell/NavConfig.jsx"},{"name":"RolesNavAdmin","sourcePath":"ui_kits/app-shell/RolesNavAdmin.jsx"},{"name":"Badge","sourcePath":"ui_kits/portal-dark/Badge.jsx"},{"name":"Button","sourcePath":"ui_kits/portal-dark/Button.jsx"},{"name":"Card","sourcePath":"ui_kits/portal-dark/Card.jsx"},{"name":"StatTile","sourcePath":"ui_kits/portal-dark/Card.jsx"},{"name":"UnitRow","sourcePath":"ui_kits/portal-dark/Card.jsx"},{"name":"Header","sourcePath":"ui_kits/portal-dark/Header.jsx"},{"name":"Input","sourcePath":"ui_kits/portal-dark/Input.jsx"},{"name":"TabBar","sourcePath":"ui_kits/portal-dark/TabBar.jsx"},{"name":"SpecLint","sourcePath":"ui_kits/spec-ready/SpecLint.jsx"}],"sourceHashes":{"ui_kits/app-shell/AppShell.jsx":"9d7541ff7bcf","ui_kits/app-shell/NavConfig.jsx":"33af27cfff46","ui_kits/app-shell/RolesNavAdmin.jsx":"e9de07efd3ef","ui_kits/portal-dark/Badge.jsx":"fed499103dd6","ui_kits/portal-dark/Button.jsx":"7b58d34a3f56","ui_kits/portal-dark/Card.jsx":"c1e568829999","ui_kits/portal-dark/Header.jsx":"3055117c2ad8","ui_kits/portal-dark/Input.jsx":"778247197f00","ui_kits/portal-dark/TabBar.jsx":"c914da019093","ui_kits/spec-ready/SpecLint.jsx":"b77760bf8d6f"},"inlinedExternals":[],"unexposedExports":[{"name":"makeSpecId","sourcePath":"ui_kits/spec-ready/SpecLint.jsx"}]} */

(() => {

const __ds_ns = (window.BishSRVDesignSystem_26feec = window.BishSRVDesignSystem_26feec || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/app-shell/NavConfig.jsx
try { (() => {
// Global navigation catalog + per-role assignments, owned by Admin › Roles & Navigation.
// Every AppShell reads this; RolesNavAdmin publishes to it. Persisted under one localStorage key.
const NAV_KEY = 'bishs.navconfig.v1';

// Lucide is the ONLY icon set (README › Iconography). Keys are Lucide icon names, so the code library
// renders the same name with lucide-react: <Store />, <LayoutDashboard />, … Node data is Lucide's own
// 24×24 geometry (stroke 1.5 default here; 2 in lucide-react). Do not add non-Lucide glyphs.
const NAV_ICONS = {
  "layout-dashboard": [["rect", {
    "x": 3,
    "y": 3,
    "width": 7,
    "height": 9,
    "rx": 1
  }], ["rect", {
    "x": 14,
    "y": 3,
    "width": 7,
    "height": 5,
    "rx": 1
  }], ["rect", {
    "x": 14,
    "y": 12,
    "width": 7,
    "height": 9,
    "rx": 1
  }], ["rect", {
    "x": 3,
    "y": 16,
    "width": 7,
    "height": 5,
    "rx": 1
  }]],
  "calendar": [["path", {
    "d": "M8 2v4"
  }], ["path", {
    "d": "M16 2v4"
  }], ["rect", {
    "x": 3,
    "y": 4,
    "width": 18,
    "height": 18,
    "rx": 2
  }], ["path", {
    "d": "M3 10h18"
  }]],
  "store": [["path", {
    "d": "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"
  }], ["path", {
    "d": "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
  }], ["path", {
    "d": "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"
  }], ["path", {
    "d": "M2 7h20"
  }], ["path", {
    "d": "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"
  }]],
  "clipboard-check": [["rect", {
    "x": 8,
    "y": 2,
    "width": 8,
    "height": 4,
    "rx": 1,
    "ry": 1
  }], ["path", {
    "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
  }], ["path", {
    "d": "m9 14 2 2 4-4"
  }]],
  "list-ordered": [["path", {
    "d": "M10 12h11"
  }], ["path", {
    "d": "M10 18h11"
  }], ["path", {
    "d": "M10 6h11"
  }], ["path", {
    "d": "M4 10h2"
  }], ["path", {
    "d": "M4 6h1v4"
  }], ["path", {
    "d": "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"
  }]],
  "briefcase": [["path", {
    "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  }], ["rect", {
    "x": 2,
    "y": 6,
    "width": 20,
    "height": 14,
    "rx": 2
  }]],
  "users": [["path", {
    "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }], ["circle", {
    "cx": 9,
    "cy": 7,
    "r": 4
  }], ["path", {
    "d": "M22 21v-2a4 4 0 0 0-3-3.87"
  }], ["path", {
    "d": "M16 3.13a4 4 0 0 1 0 7.75"
  }]],
  "package": [["path", {
    "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
  }], ["path", {
    "d": "M12 22V12"
  }], ["path", {
    "d": "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"
  }], ["path", {
    "d": "m7.5 4.27 9 5.15"
  }]],
  "file-text": [["path", {
    "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }], ["path", {
    "d": "M14 2v4a2 2 0 0 0 2 2h4"
  }], ["path", {
    "d": "M10 9H8"
  }], ["path", {
    "d": "M16 13H8"
  }], ["path", {
    "d": "M16 17H8"
  }]],
  "git-branch": [["line", {
    "x1": 6,
    "y1": 3,
    "x2": 6,
    "y2": 15
  }], ["circle", {
    "cx": 18,
    "cy": 6,
    "r": 3
  }], ["circle", {
    "cx": 6,
    "cy": 18,
    "r": 3
  }], ["path", {
    "d": "M18 9a9 9 0 0 1-9 9"
  }]],
  "truck": [["path", {
    "d": "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
  }], ["path", {
    "d": "M15 18H9"
  }], ["path", {
    "d": "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
  }], ["circle", {
    "cx": 17,
    "cy": 18,
    "r": 2
  }], ["circle", {
    "cx": 7,
    "cy": 18,
    "r": 2
  }]],
  "shield": [["path", {
    "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }]],
  "wrench": [["path", {
    "d": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  }]],
  "gem": [["path", {
    "d": "M6 3h12l4 6-10 13L2 9Z"
  }], ["path", {
    "d": "M11 3 8 9l4 13 4-13-3-6"
  }], ["path", {
    "d": "M2 9h20"
  }]],
  "chart-column": [["path", {
    "d": "M3 3v16a2 2 0 0 0 2 2h16"
  }], ["path", {
    "d": "M18 17V9"
  }], ["path", {
    "d": "M13 17V5"
  }], ["path", {
    "d": "M8 17v-3"
  }]],
  "credit-card": [["rect", {
    "x": 2,
    "y": 5,
    "width": 20,
    "height": 14,
    "rx": 2
  }], ["line", {
    "x1": 2,
    "y1": 10,
    "x2": 22,
    "y2": 10
  }]],
  "toggle-right": [["rect", {
    "x": 2,
    "y": 6,
    "width": 20,
    "height": 12,
    "rx": 6,
    "ry": 6
  }], ["circle", {
    "cx": 16,
    "cy": 12,
    "r": 2
  }]],
  "sliders-horizontal": [["line", {
    "x1": 21,
    "y1": 4,
    "x2": 14,
    "y2": 4
  }], ["line", {
    "x1": 10,
    "y1": 4,
    "x2": 3,
    "y2": 4
  }], ["line", {
    "x1": 21,
    "y1": 12,
    "x2": 12,
    "y2": 12
  }], ["line", {
    "x1": 8,
    "y1": 12,
    "x2": 3,
    "y2": 12
  }], ["line", {
    "x1": 21,
    "y1": 20,
    "x2": 16,
    "y2": 20
  }], ["line", {
    "x1": 12,
    "y1": 20,
    "x2": 3,
    "y2": 20
  }], ["line", {
    "x1": 14,
    "y1": 2,
    "x2": 14,
    "y2": 6
  }], ["line", {
    "x1": 8,
    "y1": 10,
    "x2": 8,
    "y2": 14
  }], ["line", {
    "x1": 16,
    "y1": 18,
    "x2": 16,
    "y2": 22
  }]],
  "folder": [["path", {
    "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
  }]],
  "heart": [["path", {
    "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }]],
  "map-pin": [["path", {
    "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
  }], ["circle", {
    "cx": 12,
    "cy": 10,
    "r": 3
  }]],
  "message-square": [["path", {
    "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }]],
  "bell": [["path", {
    "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }], ["path", {
    "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  }]]
};
const UI_ICONS = {
  "search": [["circle", {
    "cx": 11,
    "cy": 11,
    "r": 8
  }], ["path", {
    "d": "m21 21-4.3-4.3"
  }]],
  "menu": [["line", {
    "x1": 4,
    "y1": 12,
    "x2": 20,
    "y2": 12
  }], ["line", {
    "x1": 4,
    "y1": 6,
    "x2": 20,
    "y2": 6
  }], ["line", {
    "x1": 4,
    "y1": 18,
    "x2": 20,
    "y2": 18
  }]],
  "x": [["path", {
    "d": "M18 6 6 18"
  }], ["path", {
    "d": "m6 6 12 12"
  }]],
  "chevrons-left": [["path", {
    "d": "m11 17-5-5 5-5"
  }], ["path", {
    "d": "m18 17-5-5 5-5"
  }]],
  "chevron-down": [["path", {
    "d": "m6 9 6 6 6-6"
  }]],
  "check": [["path", {
    "d": "M20 6 9 17l-5-5"
  }]],
  "trash-2": [["path", {
    "d": "M3 6h18"
  }], ["path", {
    "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }], ["path", {
    "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }], ["line", {
    "x1": 10,
    "y1": 11,
    "x2": 10,
    "y2": 17
  }], ["line", {
    "x1": 14,
    "y1": 11,
    "x2": 14,
    "y2": 17
  }]]
};

// Pre-Lucide keys from NavConfig v1 (saved configs may still use them).
const ICON_ALIASES = {
  "dashboard": "layout-dashboard",
  "floor": "store",
  "checkin": "clipboard-check",
  "upq": "list-ordered",
  "cases": "briefcase",
  "inventory": "package",
  "desking": "file-text",
  "pipeline": "git-branch",
  "chart": "chart-column",
  "card": "credit-card",
  "toggle": "toggle-right",
  "settings": "sliders-horizontal",
  "pin": "map-pin",
  "message": "message-square",
  "trash": "trash-2",
  "chevronsLeft": "chevrons-left",
  "chevronDown": "chevron-down"
};

// Theme by surface role: the same shell, remapped onto DS tokens.
// `current` is the ONLY gold the nav may use (gold-lo wayfinding, decision D1 2026-10-21).
const SHELL_THEME = {
  light: {
    page: 'var(--surface-light-page)',
    panel: 'var(--surface-light-inset)',
    card: 'var(--surface-light-card)',
    raised: 'var(--surface-light-raised)',
    text: 'var(--text-light-primary)',
    body: 'var(--text-light-secondary)',
    muted: 'var(--text-light-muted)',
    line: 'var(--border-light)',
    input: 'var(--border-input-light)',
    current: 'var(--accent-gold-lo)',
    hover: 'rgba(0,0,0,0.04)',
    ink: 'var(--text-light-primary)',
    onInk: 'var(--brand-white)',
    shadow: 'var(--shadow-sm)'
  },
  dark: {
    page: 'var(--surface-page)',
    panel: 'var(--surface-deep)',
    card: 'var(--surface-card)',
    raised: 'var(--surface-raised)',
    text: 'var(--text-primary)',
    body: 'var(--text-body)',
    muted: 'var(--text-muted)',
    line: 'var(--border-ghost)',
    input: 'var(--border-input)',
    current: 'var(--accent-gold-hi)',
    hover: 'rgba(255,255,255,0.06)',
    ink: 'var(--surface-raised)',
    onInk: 'var(--text-primary)',
    shadow: 'none'
  }
};
function NavIcon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 1.5
}) {
  const key = ICON_ALIASES[name] || name;
  const nodes = NAV_ICONS[key] || UI_ICONS[key] || NAV_ICONS['layout-dashboard'];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    "data-lucide": key,
    style: {
      flex: `0 0 ${size}px`,
      display: 'block'
    }
  }, nodes.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
const CATALOG = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'layout-dashboard',
  group: 'Operate'
}, {
  id: 'my-day',
  label: 'My Day',
  icon: 'calendar',
  group: 'Operate'
}, {
  id: 'floor',
  label: 'Sales Floor',
  short: 'Floor',
  icon: 'store',
  group: 'Operate'
}, {
  id: 'check-in',
  label: 'New Check-In',
  short: 'Check-In',
  icon: 'clipboard-check',
  group: 'Operate'
}, {
  id: 'up-queue',
  label: 'Up Queue',
  short: 'Up Q',
  icon: 'list-ordered',
  group: 'Operate'
}, {
  id: 'cases',
  label: 'Cases',
  icon: 'briefcase',
  group: 'Operate'
}, {
  id: 'customers',
  label: 'Customers',
  icon: 'users',
  group: 'Operate'
}, {
  id: 'inventory',
  label: 'Inventory',
  icon: 'package',
  group: 'Operate'
}, {
  id: 'desking',
  label: 'Desking',
  icon: 'file-text',
  group: 'Operate'
}, {
  id: 'pipeline',
  label: 'Pipeline',
  icon: 'git-branch',
  group: 'Operate'
}, {
  id: 'deliveries',
  label: 'Deliveries',
  icon: 'truck',
  group: 'Operate'
}, {
  id: 'protection',
  label: 'Protection Ops',
  short: 'Protect',
  icon: 'shield',
  group: 'Operate'
}, {
  id: 'service',
  label: 'Service',
  icon: 'wrench',
  group: 'Operate'
}, {
  id: 'outfitting',
  label: 'Outfitting',
  icon: 'gem',
  group: 'Operate'
}, {
  id: 'my-case',
  label: 'My Case',
  icon: 'folder',
  group: 'My Purchase'
}, {
  id: 'saved-units',
  label: 'Saved Units',
  short: 'Saved',
  icon: 'heart',
  group: 'My Purchase'
}, {
  id: 'tours',
  label: 'Tours',
  icon: 'map-pin',
  group: 'My Purchase'
}, {
  id: 'my-deal',
  label: 'My Deal',
  icon: 'file-text',
  group: 'My Purchase'
}, {
  id: 'reports',
  label: 'Reporting',
  icon: 'chart-column',
  group: 'Manage'
}, {
  id: 'compensation',
  label: 'My Compensation',
  short: 'Comp',
  icon: 'credit-card',
  group: 'Manage'
}, {
  id: 'billing',
  label: 'Billing',
  icon: 'credit-card',
  group: 'Manage'
}, {
  id: 'users',
  label: 'Users',
  icon: 'users',
  group: 'Manage'
}, {
  id: 'roles-nav',
  label: 'Roles & Navigation',
  short: 'Roles',
  icon: 'toggle-right',
  group: 'Manage'
}, {
  id: 'settings',
  label: 'Settings',
  icon: 'sliders-horizontal',
  group: 'Manage'
}];
const ACTIONS = [{
  id: 'trade-appraisal',
  label: 'Trade Appraisal',
  kind: 'pill'
}, {
  id: 'inventory',
  label: 'Inventory',
  kind: 'pill'
}, {
  id: 'send-resource',
  label: 'Send Resource',
  kind: 'pill'
}, {
  id: 'my-compensation',
  label: 'My Compensation',
  kind: 'pill'
}, {
  id: 'new-check-in',
  label: 'New Check-In',
  kind: 'pill'
}, {
  id: 'customer-left',
  label: 'Customer Left',
  kind: 'terminal'
}];
const PHASES = [{
  id: 'discovery',
  label: 'Discovery'
}, {
  id: 'mcp',
  label: 'MCP'
}, {
  id: 'walk',
  label: 'Walk'
}, {
  id: 'deal',
  label: 'Deal'
}, {
  id: 'delivery',
  label: 'Delivery'
}];
const ROLES = {
  admin: {
    label: 'Admin',
    title: 'Internal Admin',
    user: {
      name: 'Dana Reyes',
      short: 'Dana R.',
      initials: 'DR'
    },
    search: 'Search units, deals, customers, techs — all stores',
    nav: ['dashboard', 'inventory', 'desking', 'pipeline', 'protection', 'service', 'outfitting', 'reports', 'billing', 'users', 'roles-nav', 'settings'],
    mobile: ['dashboard', 'inventory'],
    actions: ['trade-appraisal', 'inventory', 'send-resource'],
    phaseArc: false
  },
  manager: {
    label: 'Sales Manager',
    title: 'Sales Manager',
    user: {
      name: 'Marcus Hale',
      short: 'Marcus H.',
      initials: 'MH'
    },
    search: 'Search Idaho Falls units, deals and buyers',
    nav: ['my-day', 'floor', 'pipeline', 'inventory', 'desking', 'deliveries', 'customers', 'reports', 'settings'],
    mobile: ['floor', 'desking'],
    actions: ['trade-appraisal', 'inventory', 'send-resource', 'customer-left'],
    phaseArc: true
  },
  outfitter: {
    label: 'Outfitter',
    title: 'Outfitter',
    user: {
      name: 'Sarah Ames',
      short: 'Sarah A.',
      initials: 'SA'
    },
    status: 'Up',
    search: 'Search my customers, units and resources',
    nav: ['my-day', 'up-queue', 'cases', 'customers', 'inventory', 'compensation', 'settings'],
    mobile: ['up-queue', 'cases'],
    actions: ['trade-appraisal', 'inventory', 'send-resource', 'my-compensation', 'customer-left'],
    phaseArc: true
  },
  receptionist: {
    label: 'Receptionist',
    title: 'Front Desk',
    user: {
      name: 'Tara Boyd',
      short: 'Tara B.',
      initials: 'TB'
    },
    search: 'Search today’s appointments and walk-ins',
    nav: ['check-in', 'floor', 'reports'],
    mobile: ['check-in', 'floor'],
    actions: ['new-check-in'],
    phaseArc: false
  },
  tech: {
    label: 'Technician',
    title: 'Service Technician',
    user: {
      name: 'Ana Whitcomb',
      short: 'Ana W.',
      initials: 'AW'
    },
    search: 'Search work orders, units and parts',
    nav: ['dashboard', 'service', 'protection', 'inventory', 'settings'],
    mobile: ['service', 'inventory'],
    actions: ['send-resource'],
    phaseArc: false
  },
  customer: {
    label: 'Customer',
    title: 'Customer',
    user: {
      name: 'Robert Jackson',
      short: 'Robert J.',
      initials: 'RJ'
    },
    search: 'Search units',
    nav: ['my-case', 'saved-units', 'tours', 'my-deal'],
    mobile: ['my-case', 'saved-units'],
    actions: [],
    phaseArc: false
  }
};
const DEFAULTS = {
  version: 1,
  catalog: CATALOG,
  actions: ACTIONS,
  phases: PHASES,
  roles: ROLES
};
const clone = o => JSON.parse(JSON.stringify(o));
let current = null;
const subs = new Set();
function load() {
  if (current) return current;
  try {
    const raw = window.localStorage.getItem(NAV_KEY);
    current = raw ? JSON.parse(raw) : clone(DEFAULTS);
  } catch (e) {
    current = clone(DEFAULTS);
  }
  return current;
}
function emit() {
  subs.forEach(f => f(current));
}
function save(next) {
  current = clone(next);
  try {
    window.localStorage.setItem(NAV_KEY, JSON.stringify(current));
  } catch (e) {}
  emit();
}
function reset() {
  try {
    window.localStorage.removeItem(NAV_KEY);
  } catch (e) {}
  current = clone(DEFAULTS);
  emit();
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => {
    if (e.key !== NAV_KEY) return;
    try {
      current = e.newValue ? JSON.parse(e.newValue) : clone(DEFAULTS);
    } catch (err) {
      current = clone(DEFAULTS);
    }
    emit();
  });
}
function useConfig() {
  const [c, setC] = React.useState(load);
  React.useEffect(() => {
    subs.add(setC);
    return () => {
      subs.delete(setC);
    };
  }, []);
  return c;
}
function slug(label) {
  return String(label).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
}
function uniqueId(list, label) {
  const base = slug(label);
  let id = base;
  let n = 2;
  while (list.some(i => i.id === id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  return id;
}
// Resolves one role's nav: groups (catalog order), the two mobile slots, overlay actions, phase arc.
function navFor(cfg, role) {
  const r = cfg.roles[role] || cfg.roles[Object.keys(cfg.roles)[0]];
  const on = new Set(r.nav || []);
  const groups = [];
  cfg.catalog.forEach(it => {
    if (!on.has(it.id)) return;
    let g = groups.find(x => x.label === it.group);
    if (!g) {
      g = {
        label: it.group,
        items: []
      };
      groups.push(g);
    }
    g.items.push(it);
  });
  const items = groups.flatMap(g => g.items);
  const slots = (r.mobile || []).map(id => items.find(i => i.id === id)).filter(Boolean).slice(0, 2);
  for (const it of items) {
    if (slots.length >= 2) break;
    if (!slots.includes(it)) slots.push(it);
  }
  const actions = (r.actions || []).map(id => cfg.actions.find(a => a.id === id)).filter(Boolean);
  // Mobile hamburger menu: admin-picked per role; defaults to every enabled button not already in a tab-bar slot.
  const menuIds = Array.isArray(r.menu) ? new Set(r.menu) : new Set(items.filter(i => !slots.includes(i)).map(i => i.id));
  const menuGroups = groups.map(g => ({
    label: g.label,
    items: g.items.filter(i => menuIds.has(i.id))
  })).filter(g => g.items.length);
  return {
    role: r,
    groups,
    items,
    slots,
    menuGroups,
    actions,
    phases: r.phaseArc ? cfg.phases : []
  };
}
const NavConfig = {
  DEFAULTS,
  load,
  save,
  reset,
  useConfig,
  navFor,
  uniqueId,
  slug
};
Object.assign(window, {
  NavConfig,
  NavIcon,
  NAV_ICONS,
  UI_ICONS,
  ICON_ALIASES,
  SHELL_THEME
});
Object.assign(__ds_scope, { NAV_ICONS, UI_ICONS, ICON_ALIASES, SHELL_THEME, NavIcon, NavConfig });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-shell/NavConfig.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-shell/RolesNavAdmin.jsx
try { (() => {
// Admin › Roles & Navigation. Edits a draft of NavConfig; "Publish changes" (the screen's one COMMIT)
// pushes it to every AppShell. Nothing a role sees is hardcoded in a screen.
const FONT = {
  display: 'var(--font-display)',
  ui: 'var(--font-ui)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)'
};
const clone = o => JSON.parse(JSON.stringify(o));
const srOnly = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap'
};
function Switch({
  on,
  onChange,
  label,
  T,
  spec
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    "aria-label": label,
    "data-spec-id": spec,
    "data-bos-class": "action",
    onClick: () => onChange(!on),
    style: {
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 36,
      height: 20,
      boxSizing: 'border-box',
      borderRadius: 10,
      background: on ? T.text : 'transparent',
      border: `1.5px solid ${on ? T.text : T.input}`,
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 18 : 2,
      width: 13,
      height: 13,
      borderRadius: '50%',
      background: on ? T.page : T.muted,
      transition: 'left var(--duration-fast) var(--ease-standard)'
    }
  })));
}
function Btn({
  kind = 'ghost',
  spec,
  onClick,
  disabled,
  children,
  T
}) {
  const look = kind === 'commit' ? {
    background: disabled ? T.panel : 'var(--accent-gold)',
    color: disabled ? T.muted : 'var(--brand-black)',
    border: 'none'
  } : kind === 'action' ? {
    background: 'transparent',
    color: disabled ? T.muted : T.current,
    border: `1px solid ${disabled ? T.line : 'var(--accent-gold)'}`
  } : {
    background: 'transparent',
    color: disabled ? T.muted : T.body,
    border: 'none'
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": spec,
    "data-bos-class": kind === 'commit' ? 'commit' : 'action',
    disabled: disabled,
    onClick: onClick,
    style: {
      minHeight: 44,
      padding: '0 18px',
      borderRadius: 8,
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: 0.5,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      whiteSpace: 'nowrap',
      ...look
    }
  }, children);
}
function Field({
  label,
  children,
  grow,
  T
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      flex: grow ? '1 1 220px' : '0 1 auto',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 0.5,
      color: T.text
    }
  }, label), children);
}
function Section({
  spec,
  title,
  sub,
  children,
  T
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-spec-id": spec,
    "data-bos-level": "section",
    style: {
      background: T.card,
      border: `1px solid ${T.line}`,
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: T.shadow
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: `1px solid ${T.line}`,
      background: T.raised
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: FONT.display,
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: 0.5,
      lineHeight: 1,
      margin: 0,
      color: T.text
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      lineHeight: 1.5,
      color: T.body,
      textWrap: 'pretty'
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, children));
}
function RemoveBtn({
  label,
  onClick,
  T,
  spec
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    "data-spec-id": spec,
    "data-bos-class": "action",
    onClick: onClick,
    style: {
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: 8,
      background: 'transparent',
      color: T.muted,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "trash",
    size: 18
  }));
}
function RolesNavAdmin({
  theme = 'light'
}) {
  const T = __ds_scope.SHELL_THEME[theme] || __ds_scope.SHELL_THEME.light;
  const live = __ds_scope.NavConfig.useConfig();
  const [draft, setDraft] = React.useState(() => clone(live));
  const [navForm, setNavForm] = React.useState({
    label: '',
    icon: 'layout-dashboard',
    group: 'Operate'
  });
  const [actForm, setActForm] = React.useState({
    label: '',
    kind: 'pill'
  });
  const [toast, setToast] = React.useState('');
  const dirty = JSON.stringify(draft) !== JSON.stringify(live);
  const dirtyRef = React.useRef(dirty);
  dirtyRef.current = dirty;
  React.useEffect(() => {
    if (!dirtyRef.current) setDraft(clone(live));
  }, [live]);
  const roleKeys = Object.keys(draft.roles);
  const groups = [...new Set(draft.catalog.map(i => i.group))];
  const edit = fn => setDraft(d => {
    const n = clone(d);
    fn(n);
    return n;
  });
  const toggleNav = (rk, id, on) => edit(n => {
    const r = n.roles[rk];
    r.nav = on ? [...r.nav, id] : r.nav.filter(x => x !== id);
    if (!on) {
      r.mobile = (r.mobile || []).filter(x => x !== id);
      if (Array.isArray(r.menu)) r.menu = r.menu.filter(x => x !== id);
    }
  });
  const menuOf = r => Array.isArray(r.menu) ? r.menu : __ds_scope.NavConfig.navFor(draft, Object.keys(draft.roles).find(k => draft.roles[k] === r)).menuGroups.flatMap(g => g.items.map(i => i.id));
  const toggleMenu = (rk, id, on) => edit(n => {
    const base = menuOf(draft.roles[rk]);
    n.roles[rk].menu = on ? [...new Set([...base, id])] : base.filter(x => x !== id);
  });
  const toggleAct = (rk, id, on) => edit(n => {
    const r = n.roles[rk];
    r.actions = on ? [...(r.actions || []), id] : (r.actions || []).filter(x => x !== id);
  });
  const setSlot = (rk, i, id) => edit(n => {
    const m = [...(n.roles[rk].mobile || [])];
    m[i] = id;
    n.roles[rk].mobile = m.filter((x, j) => x && m.indexOf(x) === j);
  });
  const addNav = () => {
    const label = navForm.label.trim();
    if (!label) return;
    const id = __ds_scope.NavConfig.uniqueId(draft.catalog, label);
    edit(n => {
      n.catalog.push({
        id,
        label,
        icon: navForm.icon,
        group: navForm.group,
        custom: true
      });
    });
    setNavForm(f => ({
      ...f,
      label: ''
    }));
  };
  const removeNav = id => edit(n => {
    n.catalog = n.catalog.filter(i => i.id !== id);
    Object.values(n.roles).forEach(r => {
      r.nav = r.nav.filter(x => x !== id);
      r.mobile = (r.mobile || []).filter(x => x !== id);
      if (Array.isArray(r.menu)) r.menu = r.menu.filter(x => x !== id);
    });
  });
  const addAction = () => {
    const label = actForm.label.trim();
    if (!label) return;
    const id = __ds_scope.NavConfig.uniqueId(draft.actions, label);
    edit(n => {
      n.actions.push({
        id,
        label,
        kind: actForm.kind,
        custom: true
      });
    });
    setActForm(f => ({
      ...f,
      label: ''
    }));
  };
  const removeAction = id => edit(n => {
    n.actions = n.actions.filter(a => a.id !== id);
    Object.values(n.roles).forEach(r => {
      r.actions = (r.actions || []).filter(x => x !== id);
    });
  });
  const publish = () => {
    __ds_scope.NavConfig.save(draft);
    setToast('Published. Every shell now uses this navigation.');
    window.setTimeout(() => setToast(''), 2800);
  };
  const th = {
    fontFamily: FONT.ui,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: T.muted,
    padding: '10px 12px',
    textAlign: 'left',
    borderBottom: `1px solid ${T.line}`,
    background: T.raised,
    whiteSpace: 'nowrap'
  };
  const td = {
    padding: '0 12px',
    borderBottom: `1px solid ${T.line}`,
    fontSize: 14,
    color: T.text,
    height: 48
  };
  const stick = {
    position: 'sticky',
    left: 0,
    background: T.card,
    zIndex: 1
  };
  const groupRow = {
    ...td,
    height: 36,
    fontFamily: FONT.ui,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: T.muted,
    background: T.page
  };
  const ctl = {
    height: 44,
    padding: '0 12px',
    boxSizing: 'border-box',
    borderRadius: 8,
    border: `1px solid ${T.input}`,
    background: T.card,
    color: T.text,
    fontFamily: FONT.body,
    fontSize: 15,
    minWidth: 0
  };
  const chip = {
    fontFamily: FONT.ui,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: T.body,
    border: `1px solid ${T.line}`,
    borderRadius: 4,
    padding: '1px 6px'
  };
  const tableWrap = {
    position: 'relative',
    overflowX: 'auto',
    border: `1px solid ${T.line}`,
    borderRadius: 8
  };
  const tableMin = 280 + roleKeys.length * 104;
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": "screen-roles-navigation",
    style: {
      padding: 'clamp(16px, 3vw, 32px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      maxWidth: 1280,
      margin: '0 auto',
      color: T.text,
      fontFamily: FONT.body
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: '1 1 320px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: T.muted
    }
  }, "Admin \xB7 Settings"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: FONT.display,
      fontWeight: 400,
      fontSize: 'clamp(32px, 5vw, 44px)',
      letterSpacing: 1,
      lineHeight: 1,
      margin: '6px 0 8px',
      color: T.text
    }
  }, "Roles & Navigation"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.55,
      color: T.body,
      maxWidth: 680,
      textWrap: 'pretty'
    }
  }, "Switch nav buttons on for each role. Published changes apply to the desktop side panel, the tablet drawer, the mobile tab bar, the mobile hamburger menu and the Action overlay for every user in that role.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, dirty && /*#__PURE__*/React.createElement("span", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: FONT.ui,
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 0.5,
      color: T.text,
      border: '1px solid var(--semantic-warning-dark)',
      borderRadius: 999,
      padding: '4px 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--semantic-warning-dark)'
    }
  }), "Unpublished changes"), /*#__PURE__*/React.createElement(Btn, {
    kind: "ghost",
    spec: "btn-action-discard-nav",
    disabled: !dirty,
    onClick: () => setDraft(clone(live)),
    T: T
  }, "Discard"), /*#__PURE__*/React.createElement(Btn, {
    kind: "commit",
    spec: "btn-commit-publish-nav",
    disabled: !dirty,
    onClick: publish,
    T: T
  }, "Publish changes"))), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      padding: '12px 16px',
      borderRadius: 8,
      border: '1px solid var(--semantic-success-dark)',
      background: theme === 'dark' ? 'transparent' : 'var(--semantic-success-light)',
      color: theme === 'dark' ? 'var(--semantic-success)' : 'var(--semantic-success-dark)',
      fontWeight: 600,
      fontSize: 14
    }
  }, toast), /*#__PURE__*/React.createElement(Section, {
    spec: "sec-nav-buttons",
    title: "Navigation buttons",
    sub: "Every module in the OS. A button appears for a role only where its switch is on. Add a button here, then switch it on for the roles that need it.",
    T: T
  }, /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      minWidth: tableMin,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      ...stick,
      background: T.raised
    }
  }, "Button"), roleKeys.map(k => /*#__PURE__*/React.createElement("th", {
    key: k,
    style: {
      ...th,
      textAlign: 'center'
    }
  }, draft.roles[k].label)), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      width: 52,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: srOnly
  }, "Remove")))), /*#__PURE__*/React.createElement("tbody", null, groups.map(g => /*#__PURE__*/React.createElement(React.Fragment, {
    key: g
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: roleKeys.length + 2,
    style: {
      ...groupRow,
      ...stick,
      background: T.page
    }
  }, g)), draft.catalog.filter(i => i.group === g).map(it => /*#__PURE__*/React.createElement("tr", {
    key: it.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...stick
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: it.icon,
    size: 18,
    color: T.body
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: 0.3,
      whiteSpace: 'nowrap'
    }
  }, it.label), it.custom && /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "Custom"))), roleKeys.map(k => /*#__PURE__*/React.createElement("td", {
    key: k,
    style: {
      ...td,
      padding: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    on: draft.roles[k].nav.includes(it.id),
    onChange: on => toggleNav(k, it.id, on),
    label: `${it.label} for ${draft.roles[k].label}`,
    T: T,
    spec: `btn-action-toggle-nav#${it.id}-${k}`
  }))), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      padding: 0
    }
  }, it.custom && /*#__PURE__*/React.createElement(RemoveBtn, {
    label: `Remove ${it.label}`,
    onClick: () => removeNav(it.id),
    T: T,
    spec: `btn-action-remove-nav#${it.id}`
  }))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "New button label",
    grow: true,
    T: T
  }, /*#__PURE__*/React.createElement("input", {
    "data-spec-id": "input-new-nav-label",
    value: navForm.label,
    onChange: e => setNavForm({
      ...navForm,
      label: e.target.value
    }),
    onKeyDown: e => {
      if (e.key === 'Enter') addNav();
    },
    placeholder: "e.g. Service Bay",
    style: ctl
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Icon",
    T: T
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${T.line}`,
      borderRadius: 8,
      color: T.text
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: navForm.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("select", {
    "data-spec-id": "input-new-nav-icon",
    value: navForm.icon,
    onChange: e => setNavForm({
      ...navForm,
      icon: e.target.value
    }),
    style: ctl
  }, Object.keys(__ds_scope.NAV_ICONS).map(k => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, k))))), /*#__PURE__*/React.createElement(Field, {
    label: "Group",
    T: T
  }, /*#__PURE__*/React.createElement("select", {
    "data-spec-id": "input-new-nav-group",
    value: navForm.group,
    onChange: e => setNavForm({
      ...navForm,
      group: e.target.value
    }),
    style: ctl
  }, groups.map(g => /*#__PURE__*/React.createElement("option", {
    key: g,
    value: g
  }, g)))), /*#__PURE__*/React.createElement(Btn, {
    kind: "action",
    spec: "btn-action-add-nav-button",
    disabled: !navForm.label.trim(),
    onClick: addNav,
    T: T
  }, "Add nav button"))), /*#__PURE__*/React.createElement(Section, {
    spec: "sec-mobile-tab-bar",
    title: "Mobile tab bar",
    sub: "Each role picks the two buttons left of the center Action. Alerts and Messenger are fixed on the right for every role. Only buttons switched on above can fill a slot.",
    T: T
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
      gap: 12
    }
  }, roleKeys.map(k => {
    const r = draft.roles[k];
    const enabled = draft.catalog.filter(i => r.nav.includes(i.id));
    const resolved = __ds_scope.NavConfig.navFor(draft, k).slots;
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      "data-spec-id": `card-mobile-slots#${k}`,
      style: {
        border: `1px solid ${T.line}`,
        borderRadius: 10,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: T.card
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT.ui,
        fontSize: 16,
        fontWeight: 600
      }
    }, r.label), [0, 1].map(i => /*#__PURE__*/React.createElement(Field, {
      key: i,
      label: `Slot ${i + 1}`,
      T: T
    }, /*#__PURE__*/React.createElement("select", {
      "data-spec-id": `input-mobile-slot#${k}-${i + 1}`,
      value: (r.mobile || [])[i] || '',
      onChange: e => setSlot(k, i, e.target.value),
      style: ctl
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Auto (first enabled)"), enabled.map(it => /*#__PURE__*/React.createElement("option", {
      key: it.id,
      value: it.id
    }, it.label))))), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        alignItems: 'center',
        justifyItems: 'center',
        padding: '10px 4px',
        borderRadius: 8,
        background: T.page,
        color: T.muted
      }
    }, [0, 1].map(i => /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
      key: i,
      name: resolved[i] ? resolved[i].icon : 'layout-dashboard',
      size: 20,
      color: resolved[i] ? T.body : T.line
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'var(--brand-black)'
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
      name: "bell",
      size: 20
    }), /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
      name: "message",
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: srOnly
    }, "Tab bar preview: ", resolved.map(s => s.label).join(', '), ", Action, Alerts, Messenger"));
  }))), /*#__PURE__*/React.createElement(Section, {
    spec: "sec-mobile-menu",
    title: "Mobile hamburger menu",
    sub: "Buttons a role reaches from the \u2630 menu at the top left of the phone header. Only buttons switched on for the role above can be added.",
    T: T
  }, /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      minWidth: tableMin,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      ...stick,
      background: T.raised
    }
  }, "Button"), roleKeys.map(k => /*#__PURE__*/React.createElement("th", {
    key: k,
    style: {
      ...th,
      textAlign: 'center'
    }
  }, draft.roles[k].label)))), /*#__PURE__*/React.createElement("tbody", null, draft.catalog.filter(it => roleKeys.some(k => draft.roles[k].nav.includes(it.id))).map(it => /*#__PURE__*/React.createElement("tr", {
    key: it.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...stick
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: it.icon,
    size: 18,
    color: T.body
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, it.label))), roleKeys.map(k => {
    const r = draft.roles[k];
    const enabled = r.nav.includes(it.id);
    return /*#__PURE__*/React.createElement("td", {
      key: k,
      style: {
        ...td,
        padding: 0,
        textAlign: 'center'
      }
    }, enabled ? /*#__PURE__*/React.createElement(Switch, {
      on: menuOf(r).includes(it.id),
      onChange: on => toggleMenu(k, it.id, on),
      label: `${it.label} in ${r.label} mobile menu`,
      T: T,
      spec: `btn-action-toggle-menu#${it.id}-${k}`
    }) : /*#__PURE__*/React.createElement("span", {
      "aria-label": `Not enabled for ${r.label}`,
      style: {
        color: T.line,
        fontFamily: FONT.mono,
        fontSize: 13
      }
    }, "\u2014"));
  }))))))), /*#__PURE__*/React.createElement(Section, {
    spec: "sec-action-overlay-config",
    title: "Action overlay",
    sub: "What a role sees when it taps the center Action button on mobile. Pills are everyday actions; a terminal action ends the visit. The phase arc moves the current case between phases.",
    T: T
  }, /*#__PURE__*/React.createElement("div", {
    style: tableWrap
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      minWidth: tableMin,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      ...stick,
      background: T.raised
    }
  }, "Action"), roleKeys.map(k => /*#__PURE__*/React.createElement("th", {
    key: k,
    style: {
      ...th,
      textAlign: 'center'
    }
  }, draft.roles[k].label)), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      width: 52,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: srOnly
  }, "Remove")))), /*#__PURE__*/React.createElement("tbody", null, draft.actions.map(a => /*#__PURE__*/React.createElement("tr", {
    key: a.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...stick
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, a.label), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, a.kind === 'terminal' ? 'Terminal' : 'Pill'), a.custom && /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "Custom"))), roleKeys.map(k => /*#__PURE__*/React.createElement("td", {
    key: k,
    style: {
      ...td,
      padding: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    on: (draft.roles[k].actions || []).includes(a.id),
    onChange: on => toggleAct(k, a.id, on),
    label: `${a.label} for ${draft.roles[k].label}`,
    T: T,
    spec: `btn-action-toggle-action#${a.id}-${k}`
  }))), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      padding: 0
    }
  }, a.custom && /*#__PURE__*/React.createElement(RemoveBtn, {
    label: `Remove ${a.label}`,
    onClick: () => removeAction(a.id),
    T: T,
    spec: `btn-action-remove-action#${a.id}`
  })))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...stick,
      background: T.page
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 600
    }
  }, "Phase arc")), roleKeys.map(k => /*#__PURE__*/React.createElement("td", {
    key: k,
    style: {
      ...td,
      padding: 0,
      textAlign: 'center',
      background: T.page
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    on: !!draft.roles[k].phaseArc,
    onChange: on => edit(n => {
      n.roles[k].phaseArc = on;
    }),
    label: `Phase arc for ${draft.roles[k].label}`,
    T: T,
    spec: `btn-action-toggle-phase-arc#${k}`
  }))), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      background: T.page
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "New action label",
    grow: true,
    T: T
  }, /*#__PURE__*/React.createElement("input", {
    "data-spec-id": "input-new-action-label",
    value: actForm.label,
    onChange: e => setActForm({
      ...actForm,
      label: e.target.value
    }),
    onKeyDown: e => {
      if (e.key === 'Enter') addAction();
    },
    placeholder: "e.g. Book Tour",
    style: ctl
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Type",
    T: T
  }, /*#__PURE__*/React.createElement("select", {
    "data-spec-id": "input-new-action-kind",
    value: actForm.kind,
    onChange: e => setActForm({
      ...actForm,
      kind: e.target.value
    }),
    style: ctl
  }, /*#__PURE__*/React.createElement("option", {
    value: "pill"
  }, "Pill"), /*#__PURE__*/React.createElement("option", {
    value: "terminal"
  }, "Terminal"))), /*#__PURE__*/React.createElement(Btn, {
    kind: "action",
    spec: "btn-action-add-action",
    disabled: !actForm.label.trim(),
    onClick: addAction,
    T: T
  }, "Add action"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Btn, {
    kind: "ghost",
    spec: "btn-action-reset-nav-defaults",
    onClick: () => setDraft(clone(__ds_scope.NavConfig.DEFAULTS)),
    T: T
  }, "Reset draft to defaults")));
}
Object.assign(window, {
  RolesNavAdmin
});
Object.assign(__ds_scope, { RolesNavAdmin });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-shell/RolesNavAdmin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spec-ready/SpecLint.jsx
try { (() => {
// spec-ready v2 — stamping helpers + in-browser stamp linter (ratified 2026-10-21).
// Every Bish's component stamps itself; SpecLint proves coverage before anything ships.
const INTERACTIVE = ['button', 'a[href]', 'input:not([type="hidden"])', 'select', 'textarea', 'summary', '[role="button"]', '[role="link"]', '[role="tab"]', '[role="switch"]', '[role="menuitem"]', '[role="option"]', '[role="checkbox"]', '[role="radio"]', '[tabindex]:not([tabindex="-1"])'].join(',');
const ID_FORMAT = /^[a-z][a-z0-9-]*(#[A-Za-z0-9._-]+)?$/;
const FORBIDDEN = /(\.(ph|tab|dt)\/)|(@c\d)|(^S\d{2}\/)/;
function textOf(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  if (node.props) return textOf(node.props.children);
  return '';
}
function slug(label) {
  const s = textOf(label).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'item';
}
/** Build a spec-ready v2 address: `<prefix>-<slug>[#<instance>]`. */
function makeSpecId(prefix, label, instance) {
  return `${prefix}-${slug(label)}${instance != null && instance !== '' ? `#${slug(instance)}` : ''}`;
}
makeSpecId.slug = slug;
function frameOf(el, root) {
  const f = el.closest('[data-bos-level="frame"]');
  return f && (root === document || root.contains(f)) ? f : root;
}
function run(root = document) {
  const scope = root || document;
  const skip = el => !!el.closest('[data-spec-lint-ignore]');
  const interactive = [...scope.querySelectorAll(INTERACTIVE)].filter(el => !skip(el) && !el.closest('[aria-hidden="true"]'));
  const unstamped = interactive.filter(el => !el.getAttribute('data-spec-id'));
  const stamped = [...scope.querySelectorAll('[data-spec-id]')].filter(el => !skip(el));
  const seen = new Map();
  const duplicates = [];
  stamped.forEach(el => {
    const key = `${frameOf(el, scope).getAttribute && frameOf(el, scope).getAttribute('data-spec-id') || 'root'}::${el.getAttribute('data-spec-id')}`;
    if (seen.has(key)) duplicates.push(el);else seen.set(key, el);
  });
  const invalid = stamped.filter(el => {
    const id = el.getAttribute('data-spec-id');
    return !ID_FORMAT.test(id) || FORBIDDEN.test(id);
  });
  const frames = scope.querySelectorAll('[data-bos-level="frame"]').length ? [...scope.querySelectorAll('[data-bos-level="frame"]')] : [scope];
  const commitViolations = frames.filter(f => f.querySelectorAll('[data-bos-class="commit"]').length > 1);
  const nestedLayers = [...scope.querySelectorAll('[data-bos-level="layer"] [data-bos-level="layer"]')];
  // G11 · permissions: data-changing controls (commit) declare a permission; nothing rendered as hidden.
  const unpermitted = [...scope.querySelectorAll('[data-bos-class="commit"]')].filter(el => !skip(el) && !el.closest('[data-bos-level="frame"][data-spec-id^="frame-artboard"]') && scope.querySelector('[data-bos-perm]') && !el.getAttribute('data-bos-perm') && !el.closest('[data-bos-level="frame"]:not([data-spec-id="frame-app-shell"])'));
  const hiddenRendered = [...scope.querySelectorAll('[data-bos-access="hidden"]')].filter(el => !skip(el));
  const total = interactive.length;
  const coverage = total ? (total - unstamped.length) / total : 1;
  const pass = !unstamped.length && !duplicates.length && !invalid.length && !commitViolations.length && !nestedLayers.length && !hiddenRendered.length;
  const describe = el => {
    const t = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 48);
    return {
      tag: el.tagName.toLowerCase(),
      text: t,
      id: el.getAttribute('data-spec-id') || null,
      suggested: el.getAttribute('data-spec-id') ? null : makeSpecId(el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' ? 'input' : 'btn-action', t),
      el
    };
  };
  return {
    pass,
    coverage,
    interactive: total,
    stamped: stamped.length,
    unstamped: unstamped.map(describe),
    duplicates: duplicates.map(describe),
    invalid: invalid.map(describe),
    commitViolations: commitViolations.length,
    nestedLayers: nestedLayers.length,
    permPoints: scope.querySelectorAll('[data-bos-perm]').length,
    unpermittedCommits: unpermitted.length,
    hiddenRendered: hiddenRendered.length
  };
}
let overlayEls = [];
function clear() {
  overlayEls.forEach(el => {
    if (el.__speclintPrev !== undefined) {
      el.style.outline = el.__speclintPrev;
      delete el.__speclintPrev;
    } else if (el.remove) el.remove();
  });
  overlayEls = [];
}
/** Outline every failing element and pin a coverage badge. Returns the report. */
function overlay(root = document) {
  clear();
  const r = run(root);
  const flag = (item, color) => {
    const el = item.el;
    el.__speclintPrev = el.style.outline;
    el.style.outline = `2px dashed ${color}`;
    el.title = item.id ? `spec-lint: ${item.id}` : `spec-lint: unstamped — suggest ${item.suggested}`;
    overlayEls.push(el);
  };
  r.unstamped.forEach(i => flag(i, '#B02525'));
  r.duplicates.forEach(i => flag(i, '#C77C00'));
  r.invalid.forEach(i => flag(i, '#1864AB'));
  const b = document.createElement('div');
  b.setAttribute('data-spec-lint-ignore', '');
  b.setAttribute('role', 'status');
  b.style.cssText = `position:fixed;right:12px;bottom:12px;z-index:9999;padding:10px 14px;border-radius:8px;font:600 13px/1.4 'Barlow Condensed',sans-serif;letter-spacing:.5px;color:#fff;background:${r.pass ? '#1B7A2E' : '#B02525'};box-shadow:0 10px 15px -3px rgb(0 0 0/.2)`;
  b.textContent = `SPEC-LINT · ${Math.round(r.coverage * 100)}% stamped · ${r.unstamped.length} unstamped · ${r.duplicates.length} dup · ${r.invalid.length} invalid · ${r.commitViolations} commit>1`;
  document.body.appendChild(b);
  overlayEls.push(b);
  return r;
}

// ── Handoff generation (Step 0D): manifest + requirements skeleton from the live, stamped design ──
function cleanText(el) {
  const c = el.cloneNode(true);
  c.querySelectorAll('style,script,svg,[aria-hidden="true"]').forEach(n => n.remove());
  return c.textContent || '';
}
function entryOf(el) {
  const id = el.getAttribute('data-spec-id');
  const [base, inst] = id.split('#');
  const label = (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.getAttribute('title') || cleanText(el) || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  const sec = el.closest('[data-bos-section]');
  const lay = el.closest('[data-bos-layer]');
  const frame = el.closest('[data-bos-level="frame"]');
  return {
    id,
    family: inst ? `${base}#{instance}` : base,
    instance: inst || null,
    level: el.getAttribute('data-bos-level') || (el.matches(INTERACTIVE) ? 'component' : 'element'),
    class: el.getAttribute('data-bos-class') || null,
    type: el.getAttribute('data-bos-type') || null,
    section: sec ? sec.getAttribute('data-bos-section') : null,
    layer: lay ? lay.getAttribute('data-bos-layer') : null,
    frame: frame ? frame.getAttribute('data-spec-id') : null,
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role'),
    perm: el.getAttribute('data-bos-perm'),
    access: el.getAttribute('data-bos-access'),
    viewRole: (el.closest('[data-bos-role]') || {
      getAttribute: () => null
    }).getAttribute('data-bos-role'),
    interactive: el.matches(INTERACTIVE),
    guideSafe: el.getAttribute('data-bos-guide-safe') === 'true',
    label,
    shared: el.getAttribute('data-bos-level') === 'shell' || !!el.closest('[data-bos-level="shell"]') || id === 'frame-app-shell' || el.getAttribute('data-bos-level') === 'canvas' && !!el.closest('[data-spec-id="frame-app-shell"]'),
    target: el.getAttribute('data-bos-target')
  };
}
/** Snapshot one state: every stamped node in root, plus lint. */
function snapshot(root = document, meta = {}) {
  const scope = root || document;
  const els = [...scope.querySelectorAll('[data-spec-id]')].filter(el => !el.closest('[data-spec-lint-ignore]'));
  return {
    ...meta,
    lint: (({
      pass,
      coverage,
      interactive,
      stamped,
      commitViolations,
      nestedLayers,
      unstamped,
      duplicates,
      invalid
    }) => ({
      pass,
      coverage,
      interactive,
      stamped,
      commitViolations,
      nestedLayers,
      unstamped: unstamped.length,
      duplicates: duplicates.length,
      invalid: invalid.length
    }))(run(scope)),
    entries: els.map(entryOf)
  };
}
/** Merge snapshots (states × widths) into one per-build manifest. IDs scoped SCREEN::id (decision D4). */
function manifest(build, snaps, version = '1.0.0') {
  const map = new Map();
  snaps.forEach(sn => sn.entries.forEach(e => {
    const key = e.shared ? `${build}::shell::${e.id}` : `${build}::${e.id}`;
    const cur = map.get(key) || {
      key,
      ...e,
      states: [],
      widths: []
    };
    if (!cur.states.includes(sn.state)) cur.states.push(sn.state);
    if (sn.width && !cur.widths.includes(sn.width)) cur.widths.push(sn.width);
    map.set(key, cur);
  }));
  const entries = [...map.values()].sort((a, b) => (a.frame || '').localeCompare(b.frame || '') || (a.section || '').localeCompare(b.section || '') || a.id.localeCompare(b.id));
  entries.forEach(e => {
    if (e.shared) e.states = ['all'];
  });
  const stateMeta = [];
  snaps.forEach(s => {
    if (!stateMeta.find(x => x.id === s.state)) stateMeta.push({
      id: s.state,
      label: s.label || s.state,
      status: s.status || 'draft'
    });
  });
  return {
    build,
    version,
    generated: new Date().toISOString(),
    spec: 'spec-ready v2',
    states: stateMeta.map(x => x.id),
    stateMeta,
    shared: entries.filter(e => e.shared).length,
    gates: snaps.map(s => ({
      state: s.state,
      width: s.width,
      ...s.lint
    })),
    count: entries.length,
    entries
  };
}
/** Requirements: one row per element FAMILY. Filled from `spec` ({ [family]: { purpose, behaviour, acceptance, target?, event? } }); shared shell recorded once. */
function requirements(man, spec = {}) {
  const fam = new Map();
  man.entries.forEach(e => {
    const k = `${e.shared ? 'SHELL' : e.frame}|${e.family}`;
    const c = fam.get(k) || {
      ...e,
      instances: [],
      states: new Set()
    };
    if (e.instance && !c.instances.includes(e.instance)) c.instances.push(e.instance);
    e.states.forEach(x => c.states.add(x));
    fam.set(k, c);
  });
  const groups = {};
  fam.forEach(v => {
    const g = v.shared ? '__shared' : v.frame || 'root';
    (groups[g] = groups[g] || []).push(v);
  });
  const cell = x => String(x == null ? '' : x).replace(/\|/g, '/').replace(/\n/g, ' ');
  const fill = v => {
    const r = spec[v.family] || spec[v.id] || {};
    if (!r.purpose && v.shared) return {
      purpose: 'Shared navigation shell (AppShell). Recorded once, not per screen.',
      behaviour: 'See design-system AppShell + NavConfig docs.',
      acceptance: 'Covered by AppShell acceptance.',
      target: v.target || (v.family.startsWith('nav-') ? `Screen: ${v.label}` : ''),
      event: ''
    };
    return {
      purpose: r.purpose || 'TODO',
      behaviour: r.behaviour || 'TODO',
      acceptance: r.acceptance || 'TODO',
      target: r.target || v.target || '',
      event: r.event || ''
    };
  };
  let todo = 0,
    total = 0;
  const table = rows => {
    let t = '| # | ID / family | Level · class · section | Label | Instances | States | Purpose | Behaviour | Acceptance | Goes to | Tracked event |\n|---|---|---|---|---|---|---|---|---|---|---|\n';
    rows.sort((x, y) => (x.section || '').localeCompare(y.section || '') || x.family.localeCompare(y.family)).forEach((v, i) => {
      const r = fill(v);
      total++;
      if (r.purpose === 'TODO' || r.behaviour === 'TODO' || r.acceptance === 'TODO') todo++;
      t += `| ${i + 1} | \`${v.family}\` | ${v.level}${v.class ? ' · ' + v.class : ''}${v.section ? ' · ' + v.section : ''} | ${cell(v.label)} | ${v.instances.length ? v.instances.join(', ') : '—'} | ${[...v.states].join(', ')} | ${cell(r.purpose)} | ${cell(r.behaviour)} | ${cell(r.acceptance)} | ${cell(r.target)} | ${cell(r.event)} |\n`;
    });
    return t;
  };
  let body = '';
  if (groups.__shared) body += `\n## Shared shell (recorded once, appears on every state)\n\n${table(groups.__shared)}`;
  Object.keys(groups).filter(g => g !== '__shared').sort().forEach(g => {
    body += `\n## Frame \`${g}\`\n\n${table(groups[g])}`;
  });
  const st = (man.stateMeta || man.states.map(id => ({
    id,
    label: id,
    status: 'draft'
  }))).map(x => `| \`${x.id}\` | ${x.label} | ${x.status} |`).join('\n');
  return `# ${man.build} — requirements\n\nGenerated ${man.generated} from ${man.count} stamped elements (${man.shared || 0} shared shell) across ${man.states.length} role-states. **${total - todo} of ${total} families complete${todo ? `, ${todo} TODO` : ''}.** Do not rename IDs.\n\n## States\n\n| State | Label | Status |\n|---|---|---|\n${st}\n${body}`;
}

// ── Ticket generation: manifest + spec + intake + precedents → Jira CSV ──
const CANON_DOD = ['Every data-spec-id in the manifest for this story renders with the same value and data-bos-* attributes', 'SpecLint passes for each role × state × width this story touches', 'Role postures match roles-permissions.md (hidden / read / act / reason / approve / disabled)', 'Keyboard: tab order, Escape closes the top overlay, focus returns to the trigger', 'WCAG 2.2 AA; 44×44 targets; no horizontal page scroll at 360px+; survives 200% text zoom', 'All six data states (loading, empty, error, partial, stale, permission) for any module touched', 'Tracked events fire once per commit with the documented payload'];
function matchPrecedents(fam, precedents) {
  return (precedents || []).filter(p => {
    const m = p.match || {};
    if (m.family && m.family.some(rx => new RegExp(rx).test(fam.family))) return true;
    if (m.perm && fam.perm && m.perm.includes(fam.perm)) return true;
    if (m.access && fam.access && m.access.includes(fam.access)) return true;
    return false;
  });
}
/** opts: { intake: { rules: { 'BR-01': { text, source } } }, ruleMap: { [family]: ['BR-01'] }, precedents: [], questions: [{ id, text }], component: 'Floor' } */
function tickets(man, spec = {}, opts = {}) {
  const rules = opts.intake && opts.intake.rules || {},
    ruleMap = opts.ruleMap || {},
    precedents = (opts.precedents || []).filter(p => p.from !== man.build);
  const fams = new Map();
  man.entries.forEach(e => {
    const k = e.shared ? 'SHELL|' + e.family : (e.frame || 'root') + '|' + e.family;
    const c = fams.get(k) || {
      ...e,
      instances: [],
      ids: []
    };
    if (e.instance && !c.instances.includes(e.instance)) c.instances.push(e.instance);
    if (!c.ids.includes(e.id)) c.ids.push(e.id);
    if (!c.perm && e.perm) c.perm = e.perm;
    if (!c.access && e.access) c.access = e.access;
    fams.set(k, c);
  });
  // Story buckets: screen sections (main frame) and one story per overlay frame family
  const buckets = new Map();
  const frameFamily = fr => (fr || 'root').split('#')[0];
  fams.forEach(v => {
    let key, epic;
    if (v.shared) {
      key = 'SHELL';
      epic = 'Shell & navigation';
    } else if ((!v.frame || v.frame === 'frame-app-shell') && !v.section) {
      key = 'SHELL';
      epic = 'Shell & navigation';
    } else if (!v.frame || v.frame === 'frame-app-shell') {
      key = 'SEC|' + v.section;
      epic = 'Screen';
    } else {
      key = 'FRAME|' + frameFamily(v.frame);
      epic = 'Overlays';
    }
    const b = buckets.get(key) || {
      key,
      epic,
      fams: []
    };
    b.fams.push(v);
    buckets.set(key, b);
  });
  const secName = b => {
    const sec = b.fams.find(f => f.level === 'section' && f.family.startsWith('sec-'));
    return sec ? sec.family.replace(/^sec-/, '').replace(/-/g, ' ') : b.key.split('|')[1];
  };
  const title = b => b.key === 'SHELL' ? 'Mount AppShell (header, side panel, drawer, mobile tab bar) with role nav from NavConfig' : b.key.startsWith('SEC|') ? `Build ${secName(b)} section (${b.key.split('|')[1]})` : `Build overlay \`${b.key.split('|')[1]}\``;
  const rows = [];
  const epics = [...new Set([...buckets.values()].map(b => b.epic))];
  const eid = name => 'E' + (epics.indexOf(name) + 1);
  epics.forEach(name => rows.push({
    id: eid(name),
    parent: '',
    type: 'Epic',
    summary: `${man.build} · ${name}`,
    description: `${name} for ${man.build}. Generated from the stamped manifest (${man.generated}).`,
    ac: '',
    labels: ['bishs-os', man.build.toLowerCase()],
    source: 'manifest',
    stamps: '',
    status: 'Ready'
  }));
  let n = 0;
  [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key)).forEach(b => {
    n++;
    const ac = [],
      desc = [],
      sources = new Set(),
      stamps = [];
    let gaps = 0;
    b.fams.sort((x, y) => x.family.localeCompare(y.family)).forEach(v => {
      const r = spec[v.family] || spec[v.id] || {};
      const pre = matchPrecedents(v, precedents);
      const brs = (ruleMap[v.family] || []).filter(id => rules[id]);
      stamps.push(v.family + (v.instances.length ? ' (' + v.instances.join(', ') + ')' : ''));
      if (r.purpose) desc.push(`• ${v.family}: ${r.purpose}${r.behaviour ? '. ' + r.behaviour : ''}${r.target ? ' → ' + r.target : ''}${r.event ? ' [event: ' + r.event + ']' : ''}${v.perm ? ' [perm: ' + v.perm + ']' : ''}`);
      if (r.acceptance) {
        ac.push(`${v.family}: ${r.acceptance}`);
        sources.add('spec');
      }
      brs.forEach(id => {
        ac.push(`${id}: ${rules[id].text}`);
        sources.add(`intake ${id} (${rules[id].source})`);
      });
      pre.forEach(p => {
        ac.push(`${p.id} (precedent: ${p.from}, confirm): ${p.acceptance}`);
        sources.add(`precedent ${p.id}`);
      });
      if (!b.key.startsWith('SHELL') && !r.acceptance && !brs.length && !pre.length) gaps++;
    });
    const blocked = gaps > 0;
    rows.push({
      id: `S${n}`,
      parent: eid(b.epic),
      type: 'Story',
      summary: title(b),
      description: desc.join('\n') || 'See requirements.md',
      ac: ac.concat(['— Definition of done —'], CANON_DOD).join('\n'),
      labels: ['bishs-os', man.build.toLowerCase(), ...(blocked ? ['needs-rule'] : [])],
      source: [...sources, 'canon'].join('; '),
      stamps: stamps.join('; '),
      status: blocked ? 'Blocked' : 'Ready'
    });
  });
  (opts.questions || []).forEach(q => rows.push({
    id: q.id,
    parent: eid(epics[0]),
    type: 'Spike',
    summary: `Decide: ${q.text}`.slice(0, 240),
    description: q.text,
    ac: 'Decision recorded in decisions.md with owner and date',
    labels: ['bishs-os', man.build.toLowerCase(), 'decision'],
    source: 'decisions.md',
    stamps: '',
    status: 'Ready'
  }));
  const esc = x => '"' + String(x == null ? '' : x).replace(/"/g, '""') + '"';
  const head = ['Issue Id', 'Parent Id', 'Issue Type', 'Summary', 'Description', 'Acceptance Criteria', 'Labels', 'Source', 'Stamp IDs', 'Status'];
  const csv = [head.join(',')].concat(rows.map(r => [r.id, r.parent, r.type, r.summary, r.description, r.ac, r.labels.join(' '), r.source, r.stamps, r.status].map(esc).join(','))).join('\n');
  return {
    rows,
    csv,
    stories: rows.filter(r => r.type === 'Story').length,
    blocked: rows.filter(r => r.status === 'Blocked').length
  };
}
function download(name, text, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {
    type
  }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
const SpecLint = {
  run,
  overlay,
  clear,
  makeSpecId,
  slug,
  INTERACTIVE,
  snapshot,
  manifest,
  requirements,
  tickets,
  download,
  CANON_DOD
};
Object.assign(window, {
  SpecLint,
  makeSpecId
});
Object.assign(__ds_scope, { makeSpecId, SpecLint });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spec-ready/SpecLint.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-shell/AppShell.jsx
try { (() => {
// REQUIRED navigation shell for every Bish's screen (SKILL.md Step 0A).
// Bands are measured from this component's own container (RF05), never the viewport:
//   ≤640 phone · 641–1023 portrait tablet (drawer) · ≥1024 desktop / landscape tablet (side panel)
const FONT = {
  display: 'var(--font-display)',
  ui: 'var(--font-ui)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)'
};
const SCRIM = 'rgba(2,0,0,0.6)';
const PANEL_KEY = 'bishs.shell.panel';
const WF = 'M73.5 35.5C73.5 35.5 11.5 58.7 7 61C2.5 63.3 0 57.5 2.5 55C5 52.5 15.5 41.3 15.5 30.5C15.5 19.7 4.7 10.7 3.25 9C0.4 5.8 2 0.3 7 2C12 3.7 61 22 71.5 26C77 28.1 80 31.7 73.5 35.5Z';
// Mobile Action glyph — the tap-hand from the Figma nav (assets/icon-action-tap.svg), inlined so it ships in the bundle.
const TAP_PATHS = [["M9.37256 10.318C9.4113 9.95286 9.59831 9.57211 9.84672 9.31494C10.143 9.00471 10.5459 8.83303 10.9643 8.83876C11.4499 8.84676 11.7855 9.05791 12.1107 9.41531C12.3253 9.74779 12.3912 9.887 12.4778 10.2928C12.5376 12.0795 12.5179 14.1756 12.4965 15.9739C13.7471 15.6892 14.244 16.1436 14.8894 17.1678C14.9728 17.3001 16.1279 16.9204 17.0021 18.3828C17.5487 18.5838 17.9171 18.7532 18.18 19.3438C18.1994 19.3872 18.2158 19.432 18.2289 19.478C18.3946 20.2605 17.9072 21.9492 17.813 22.826C17.7824 23.1116 17.6374 23.9927 17.562 24.2653C17.3793 25.4635 17.197 26.652 16.1909 27.4177C15.8885 27.648 15.5441 27.8103 15.1793 27.8945C14.4205 28.0672 11.6479 27.9941 10.7709 27.9132C9.93269 27.8359 9.14572 27.1963 8.60428 26.519C8.04048 25.7476 7.51236 24.9229 6.94411 24.1452C6.2015 23.1289 5.39702 22.1249 4.67416 21.0981C4.31119 20.2455 4.81367 19.3518 5.66298 19.1741C6.17985 19.066 6.53348 19.2557 6.94386 19.5411C7.73193 20.0458 8.51691 20.764 9.29132 21.3123L9.36343 21.259C9.32304 20.8173 9.34114 19.9871 9.34114 19.518L9.34338 16.4261L9.34694 12.5904C9.34774 11.898 9.3274 10.9928 9.37256 10.318Z", "#AC8B36"], ["M8.60449 26.519C9.1357 26.8424 9.28511 26.3992 9.63539 26.2195C10.6973 25.6746 11.8298 25.2006 12.9314 24.7425C13.1759 24.6407 13.6052 24.6437 13.8666 24.5525C14.8571 24.2602 15.8585 24.0268 16.8912 23.9944C16.9603 23.9923 17.3286 24.1796 17.5014 24.2054L17.489 24.2359L17.5622 24.2652C17.3795 25.4635 17.1972 26.652 16.1911 27.4177C15.8887 27.648 15.5443 27.8103 15.1795 27.8945C14.4207 28.0672 11.6481 27.9941 10.7711 27.9132C9.9329 27.8358 9.14593 27.1962 8.60449 26.519Z", "#886A24"], ["M12.4964 15.9736C13.747 15.6889 14.244 16.1434 14.8893 17.1675C14.9727 17.2998 16.1279 16.9202 17.0021 18.3825C17.5486 18.5836 17.917 18.753 18.18 19.3436C18.1994 19.387 18.2158 19.4318 18.2289 19.4777C17.9861 19.8099 17.0617 19.1335 16.8431 18.9099C16.6223 18.6841 16.6111 18.5975 16.5542 18.2837C15.7553 18 15.4182 17.9722 14.5863 17.8281C14.5088 17.6053 14.4838 17.3393 14.4517 17.1019C13.9005 16.8852 13.4869 16.5981 12.868 16.6348C12.6485 16.6478 12.3785 16.7229 12.194 16.6145L12.1772 16.5112C12.2251 16.3165 12.3777 16.1371 12.4964 15.9736Z", "#E6C757"], ["M6.94399 19.541C7.73206 20.0458 8.51704 20.7639 9.29145 21.3122C9.42572 21.4511 9.40644 21.3921 9.43376 21.5676C9.3987 21.7153 9.28951 21.8277 9.17752 21.9233C8.01641 21.2223 7.16453 19.9667 5.83887 19.9187C6.15536 19.8728 6.67984 19.7022 6.94399 19.541Z", "#E0C460"], ["M9.37256 10.318C9.4113 9.95286 9.5983 9.57211 9.84671 9.31494C10.143 9.00471 10.5459 8.83303 10.9643 8.83876C11.4499 8.84676 11.7855 9.05791 12.1107 9.41531C11.8433 9.65298 11.6472 9.38946 11.6242 9.6286L11.4544 9.69019C10.9037 9.44559 10.551 9.64663 10.0797 9.96885C9.92753 10.1461 9.65637 10.5098 9.41857 10.4936L9.37256 10.318Z", "#F1D66F"], ["M10.0799 9.96869C9.87068 9.46049 11.2249 8.96348 11.6244 9.62844L11.4546 9.69003C10.9039 9.44544 10.5512 9.64647 10.0799 9.96869Z", "#FDF9AF"], ["M4.67416 21.0981C4.31119 20.2455 4.81367 19.3518 5.66298 19.1741C6.17985 19.066 6.53348 19.2557 6.94386 19.541C6.67971 19.7022 6.15524 19.8728 5.83874 19.9188C4.91373 20.052 5.11765 20.899 4.67416 21.0981Z", "#F1D66F"], ["M12.1109 9.41528C12.3256 9.74776 12.3914 9.88698 12.478 10.2928L12.4165 10.4041C12.0439 10.2845 12.1456 9.79879 11.4546 9.69017L11.6244 9.62857C11.6475 9.38944 11.8435 9.65295 12.1109 9.41528Z", "#E0C460"], ["M9.36328 21.2591C9.38819 21.128 9.40789 21.0135 9.42599 20.8811C9.79772 21.081 9.71056 21.97 9.17725 21.9234C9.28923 21.8278 9.39842 21.7154 9.43348 21.5677C9.40616 21.3922 9.42545 21.4512 9.29117 21.3123L9.36328 21.2591Z", "#CDAB4B"], ["M10.2409 0.105382C11.8502 -0.324262 13.2529 0.591601 13.6424 2.2739C13.6481 2.29912 13.6532 2.32448 13.6577 2.35001C13.7581 3.2391 13.6563 3.92804 13.1124 4.65757C12.6691 5.25165 12.0168 5.63351 11.3025 5.71713C10.6056 5.80444 9.9044 5.59515 9.35539 5.13597C8.61435 4.51493 8.20536 3.46873 8.35249 2.48159C8.47416 1.30519 9.23034 0.51371 10.2409 0.105382Z", "#CDAB4B"], ["M12.0121 0.496338C12.5679 0.704521 12.9483 1.23142 13.1935 1.77461C13.285 1.97387 13.3535 2.18396 13.3975 2.40032C13.6287 3.67815 12.7231 5.13099 11.4855 5.35081C10.045 5.60664 9.06905 4.98564 8.73145 3.49052C8.88889 3.20072 9.10922 3.02669 9.38597 2.87628C10.1871 2.44086 10.9224 1.91423 11.6528 1.36167C11.835 1.22378 12.1643 1.01053 12.2856 0.821446C12.254 0.681917 12.1237 0.594923 12.0121 0.496338Z", "#A78536"], ["M10.2416 0.105382C11.851 -0.324262 13.2536 0.591601 13.6431 2.2739C13.6488 2.29912 13.6539 2.32448 13.6584 2.35001L13.6004 2.43794C13.5406 2.42635 13.4555 2.40721 13.3977 2.40046C13.3536 2.1841 13.2852 1.97401 13.1936 1.77476C12.9484 1.23156 12.568 0.704664 12.0122 0.49648C11.2587 0.110711 11.0066 0.21831 10.2354 0.370762L10.4927 0.176168L10.4656 0.136689L10.2416 0.105382Z", "#E0C460"], ["M8.35303 2.48143C8.4747 1.30503 9.23088 0.513553 10.2414 0.105225L10.4654 0.136532L10.4926 0.176011L10.2352 0.370605C9.53211 0.704239 9.07386 0.995287 8.74835 1.81683C8.69097 1.9616 8.55454 2.40465 8.53695 2.54538L8.41363 2.60085L8.35303 2.48143Z", "#F1D66F"], ["M10.7942 0.486348C11.0448 0.453752 11.6222 0.504288 11.788 0.718288C11.655 0.926294 10.8995 0.755857 10.5117 0.894498C10.1028 1.04069 10.1572 0.976341 9.77234 1.25216C9.58698 1.39737 9.25902 1.7648 9.0625 1.9574C9.42268 1.07342 9.88165 0.649013 10.7942 0.486348Z", "#FDF9AF"], ["M2.02188 4.16688C2.82467 3.99698 3.46951 4.05129 4.16889 4.5431C4.78003 4.97475 5.20208 5.64437 5.34172 6.4037C5.47734 7.15969 5.32062 7.94122 4.90618 8.57559C4.48252 9.2242 3.83713 9.63706 3.10108 9.76567C2.81016 9.92442 2.22737 9.80022 1.92394 9.70532C0.606818 9.29335 -0.350581 7.61869 0.122854 6.1984C0.325169 5.17991 1.12094 4.48657 2.02188 4.16688Z", "#B3903C"], ["M2.02207 4.16688C2.82486 3.99698 3.4697 4.05129 4.16909 4.5431C4.78022 4.97475 5.20227 5.64437 5.34191 6.4037C5.47754 7.15969 5.32081 7.94122 4.90637 8.57559C4.48271 9.2242 3.83732 9.63706 3.10127 9.76567L3.08917 9.74169L3.12986 9.70305C3.61395 9.61623 4.20914 9.26737 4.53874 8.89545C4.62218 8.80131 5.14607 8.05562 5.15237 7.97835C5.17893 7.65284 5.35295 7.09952 5.33929 6.76402C5.26363 6.66219 5.29391 6.66894 5.20422 6.65713C5.09545 6.8662 5.16785 7.34079 5.11773 7.57899C4.95293 8.36207 3.95184 9.60798 3.1233 9.4696C3.18098 9.46436 3.2851 9.45188 3.34169 9.43439C4.59245 9.04764 5.35012 7.63783 5.04461 6.3024C4.83253 5.40532 4.1904 4.68921 3.35036 4.41303C2.99871 4.299 2.91803 4.40469 2.57205 4.17767L2.55438 4.16582C2.41833 4.1703 2.24261 4.17852 2.19694 4.33812L2.0935 4.35753L2.13118 4.40309C1.30361 4.70835 0.9466 4.91693 0.486402 5.72608C0.386767 5.90122 0.238202 5.98054 0.188976 6.1674L0.123047 6.1984C0.325362 5.17991 1.12113 4.48657 2.02207 4.16688Z", "#E0C460"], ["M2.38595 4.61434C2.40219 4.61261 2.41843 4.61101 2.43471 4.6095C2.70634 4.58476 3.21619 4.59436 3.4303 4.78202L3.42256 4.85765C3.19047 4.9978 2.31583 4.71213 1.47148 5.35781C1.26654 5.52359 0.990936 5.80042 0.800293 5.98787C1.15633 5.15825 1.51833 4.79162 2.38595 4.61434Z", "#FDF9AF"], ["M16.6689 6.45589C16.9718 4.88804 18.4948 3.64871 20.0119 4.17938C20.5508 4.33432 21.0294 4.66364 21.3798 5.12055C21.6138 5.42297 21.829 5.81793 21.9046 6.20415C22.0932 6.93705 22.0004 7.71836 21.6461 8.38012C21.2977 9.03069 20.7156 9.5075 20.0298 9.70396C19.3156 9.91227 18.6418 9.814 18.0002 9.42934C17.3692 9.04473 16.9095 8.41285 16.722 7.67248C16.6121 7.2396 16.6098 6.89366 16.6689 6.45589Z", "#B89640"], ["M21.9046 6.20435C22.0932 6.93725 22.0004 7.71856 21.6461 8.38032C21.2977 9.03089 20.7156 9.5077 20.0298 9.70416C19.3156 9.91247 18.6418 9.8142 18.0002 9.42954C17.3692 9.04493 16.9095 8.41305 16.722 7.67268C16.6121 7.2398 16.6098 6.89386 16.6689 6.45609L16.8718 6.44899C16.7273 7.20205 17.2848 8.65298 17.9344 9.07588C17.9077 8.99683 17.8232 8.88377 17.7741 8.81116L17.7986 8.72528C18.215 8.24643 19.5886 7.64022 20.1616 7.28754C20.4273 7.12394 20.9859 7.0468 21.3234 6.93037C21.4976 6.96962 21.4365 7.03233 21.6189 7.1751L21.7065 7.14641C21.7468 6.77689 21.7726 6.59074 21.6605 6.22766C21.774 6.24675 21.7933 6.2381 21.9046 6.20435Z", "#90712D"], ["M21.9046 6.20435C22.0932 6.93725 22.0004 7.71856 21.6461 8.38032C21.2977 9.03089 20.7156 9.5077 20.0298 9.70416C19.3156 9.91247 18.6418 9.8142 18.0002 9.42954C17.3692 9.04493 16.9095 8.41305 16.722 7.67268C16.6121 7.2398 16.6098 6.89386 16.6689 6.45609L16.8718 6.44899C16.7273 7.20205 17.2848 8.65298 17.9344 9.07588C17.9369 9.07974 17.9394 9.0836 17.9419 9.08742C18.613 9.72152 20.0906 9.54971 20.7039 9.00225C21.3876 8.392 21.6018 7.9902 21.7065 7.14641C21.7468 6.77689 21.7726 6.59074 21.6605 6.22766C21.774 6.24675 21.7933 6.2381 21.9046 6.20435Z", "#D2B454"], ["M16.6689 6.45589C16.9718 4.88804 18.4948 3.64871 20.012 4.17938C20.5508 4.33432 21.0294 4.66364 21.3798 5.12055C21.2887 5.17691 21.2397 5.21839 21.1344 5.23011C20.7322 4.69242 20.0717 4.37477 19.4444 4.24612C19.2487 4.29684 18.9383 4.26211 18.884 4.29009C18.1662 4.65947 17.4395 4.87192 17.1404 5.76313C17.0601 5.96936 17.0082 6.29407 16.8718 6.44879L16.6689 6.45589Z", "#F1D66F"], ["M21.3801 5.12061C21.6142 5.42302 21.8293 5.81798 21.9049 6.2042C21.7936 6.23795 21.7744 6.24661 21.6609 6.22751C21.5134 5.90795 21.3046 5.54346 21.1348 5.23016C21.24 5.21844 21.289 5.17696 21.3801 5.12061Z", "#E0C460"], ["M18.9954 4.61186C19.2169 4.58712 19.9369 4.60116 20.0647 4.80623C19.8286 5.02081 19.1027 4.85783 18.6936 5.02432C18.3221 5.17548 18.3489 5.15057 18.0146 5.4076C17.7689 5.60943 17.6423 5.892 17.3442 6.14388C17.6395 5.24147 18.1129 4.82066 18.9954 4.61186Z", "#FDF9AF"]];
const bandOf = w => w <= 640 ? 'ph' : w <= 1023 ? 'tab' : 'dt';
function useContainerWidth(ref) {
  const [w, setW] = React.useState(1440);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setW(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(entries => setW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return w;
}
function TapIcon({
  size = 28
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size * 22 / 28,
    height: size,
    viewBox: "0 0 22 28",
    fill: "none",
    "aria-hidden": "true",
    style: {
      display: 'block'
    }
  }, TAP_PATHS.map((p, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: p[0],
    fill: p[1]
  })));
}
function Wordmark({
  src,
  height = 24
}) {
  if (src) return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "Bish's OS",
    style: {
      height,
      width: 'auto',
      display: 'block',
      flexShrink: 0
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "Bish's OS",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(height * 0.12),
      flexShrink: 0,
      fontFamily: FONT.display,
      fontSize: height * 1.15,
      lineHeight: 1,
      letterSpacing: 1,
      color: 'currentColor'
    }
  }, "BISHS", /*#__PURE__*/React.createElement("svg", {
    width: height * 0.42,
    height: height * 0.33,
    viewBox: "0 0 80 63",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: WF,
    fill: "var(--accent-gold)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-gold)'
    }
  }, "OS"));
}
function IconBtn({
  spec,
  label,
  onClick,
  children,
  T,
  cls = 'nav',
  expanded
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": spec,
    "data-bos-class": cls,
    "aria-label": label,
    "aria-expanded": expanded,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      width: 44,
      height: 44,
      flex: '0 0 44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: 8,
      background: h ? T.hover : 'transparent',
      color: T.text,
      cursor: 'pointer',
      padding: 0
    }
  }, children);
}
function Avatar({
  initials,
  size = 36,
  T
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      flex: `0 0 ${size}px`,
      borderRadius: '50%',
      background: T.ink,
      color: T.onInk,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT.ui,
      fontWeight: 700,
      fontSize: Math.round(size * 0.38),
      letterSpacing: 0.5
    }
  }, initials);
}
function CountBadge({
  n,
  style
}) {
  if (!n) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      boxSizing: 'border-box',
      borderRadius: 9,
      background: 'var(--semantic-danger-dark)',
      color: 'var(--brand-white)',
      fontFamily: FONT.mono,
      fontSize: 11,
      lineHeight: '18px',
      textAlign: 'center',
      ...style
    }
  }, n > 99 ? '99+' : n);
}
function NavItem({
  item,
  current,
  expanded,
  onClick,
  T
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": `nav-${item.id}`,
    "data-bos-class": "nav",
    "data-bos-guide-safe": "true",
    "aria-current": current ? 'page' : undefined,
    "aria-label": item.label,
    "data-bos-target": `screen:${item.id}`,
    title: expanded ? undefined : item.label,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      minHeight: 44,
      padding: expanded ? '0 12px' : 0,
      justifyContent: expanded ? 'flex-start' : 'center',
      border: 'none',
      borderRadius: 8,
      background: current || h ? T.hover : 'transparent',
      color: current ? T.current : T.body,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, current && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      top: 10,
      bottom: 10,
      width: 3,
      borderRadius: 2,
      background: T.current
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: item.icon,
    size: 20,
    stroke: current ? 1.9 : 1.5
  }), expanded && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: current ? 600 : 500,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.label));
}
function NavGroups({
  groups,
  activeId,
  expanded,
  onPick,
  T
}) {
  return groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, expanded ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: T.muted,
      padding: '0 12px 6px'
    }
  }, g.label) : /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: 1,
      background: T.line,
      margin: '4px 8px 8px'
    }
  }), g.items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    item: it,
    current: it.id === activeId,
    expanded: expanded,
    onClick: () => onPick(it.id),
    T: T
  }))));
}
function MenuRow({
  spec,
  label,
  on,
  onClick,
  T
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "menuitem",
    "data-spec-id": spec,
    "data-bos-class": "action",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      width: '100%',
      minHeight: 44,
      padding: '0 16px',
      border: 'none',
      background: h ? T.hover : 'transparent',
      color: on ? T.current : T.text,
      fontFamily: FONT.body,
      fontSize: 15,
      fontWeight: on ? 600 : 400,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, label, on && /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "check",
    size: 18,
    stroke: 2
  }));
}
function ProfileMenu({
  roleKey,
  cfg,
  onRoleChange,
  onClose,
  T
}) {
  const r = cfg.roles[roleKey];
  return /*#__PURE__*/React.createElement("div", {
    role: "menu",
    "data-spec-id": "list-profile-menu",
    style: {
      position: 'absolute',
      right: 8,
      top: 'calc(100% + 6px)',
      zIndex: 60,
      width: 272,
      maxWidth: 'calc(100% - 16px)',
      background: T.card,
      border: `1px solid ${T.line}`,
      borderRadius: 12,
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      color: T.text
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: `1px solid ${T.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 16,
      fontWeight: 600
    }
  }, r.user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: T.muted,
      marginTop: 2
    }
  }, r.title)), onRoleChange && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0',
      borderBottom: `1px solid ${T.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: T.muted,
      padding: '4px 16px 6px'
    }
  }, "View as role"), Object.keys(cfg.roles).map(k => /*#__PURE__*/React.createElement(MenuRow, {
    key: k,
    spec: `menuitem-role#${k}`,
    label: cfg.roles[k].label,
    on: k === roleKey,
    T: T,
    onClick: () => {
      onRoleChange(k);
      onClose();
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(MenuRow, {
    spec: "menuitem-my-profile",
    label: "My profile",
    onClick: onClose,
    T: T
  }), /*#__PURE__*/React.createElement(MenuRow, {
    spec: "menuitem-sign-out",
    label: "Sign out",
    onClick: onClose,
    T: T
  })));
}
function TabItem({
  spec,
  icon,
  label,
  current,
  onClick,
  T,
  badge = 0,
  dim,
  target
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": spec,
    "data-bos-class": "nav",
    "data-bos-guide-safe": "true",
    "data-bos-target": target || `screen:${spec.replace('nav-tab-', '')}`,
    "aria-current": current ? 'page' : undefined,
    "aria-label": badge ? `${label}, ${badge} new` : label,
    onClick: onClick,
    disabled: dim,
    style: {
      position: 'relative',
      minWidth: 0,
      minHeight: 56,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4,
      padding: '0 0 4px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: current ? T.current : T.muted,
      opacity: dim ? 0.35 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: icon,
    size: 24,
    stroke: current ? 1.9 : 1.6
  }), /*#__PURE__*/React.createElement(CountBadge, {
    n: badge,
    style: {
      top: -6,
      right: -12
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: current ? 700 : 600,
      letterSpacing: 1,
      textTransform: 'uppercase',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label));
}
function PhaseArc({
  phases,
  currentPhase,
  onPick
}) {
  const n = phases.length;
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": "list-phase-arc",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 400,
      height: 184,
      flexShrink: 0
    }
  }, phases.map((p, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const ang = Math.PI * (0.92 - 0.84 * t);
    const cur = p.id === currentPhase;
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      type: "button",
      "data-spec-id": `btn-action-phase#${p.id}`,
      "data-bos-class": "action",
      "aria-pressed": cur,
      "aria-label": cur ? `${p.label}, current phase` : `Move to ${p.label}`,
      onClick: () => onPick(p.id),
      style: {
        position: 'absolute',
        left: `${50 + 42 * Math.cos(ang)}%`,
        top: 150 - 104 * Math.sin(ang),
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: cur ? 60 : 48,
        height: cur ? 60 : 48,
        borderRadius: '50%',
        boxSizing: 'border-box',
        background: cur ? 'var(--brand-white)' : 'rgba(255,255,255,0.12)',
        border: cur ? '4px solid var(--accent-gold-hi)' : '2px solid var(--accent-gold-hi)',
        boxShadow: cur ? 'var(--shadow-lg)' : 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT.display,
        fontSize: 20,
        letterSpacing: 0.5,
        lineHeight: 1,
        color: 'var(--brand-white)'
      }
    }, p.label));
  }));
}
function ActionOverlay({
  actions = [],
  phases = [],
  currentPhase,
  onAction,
  onPhase,
  onClose,
  bottomInset = 100
}) {
  const pills = actions.filter(a => a.kind !== 'terminal');
  const terms = actions.filter(a => a.kind === 'terminal');
  const run = (fn, id) => {
    if (fn) fn(id);
    if (onClose) onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Actions",
    "data-spec-id": "sec-action-overlay",
    "data-bos-level": "layer",
    "data-bos-type": "action",
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 75,
      background: SCRIM,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 20,
      padding: `24px 16px ${bottomInset}px`,
      boxSizing: 'border-box',
      overflowY: 'auto'
    }
  }, pills.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 12,
      width: '100%',
      maxWidth: 400
    }
  }, pills.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    type: "button",
    "data-spec-id": `btn-action-${a.id}`,
    "data-bos-class": "action",
    onClick: () => run(onAction, a.id),
    style: {
      minHeight: 52,
      padding: '0 14px',
      borderRadius: 999,
      border: '1.5px solid var(--accent-gold)',
      background: 'var(--surface-light-card)',
      color: 'var(--accent-gold-lo)',
      fontFamily: FONT.ui,
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: 0.5,
      cursor: 'pointer'
    }
  }, a.label))), terms.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    type: "button",
    "data-spec-id": `btn-action-${a.id}`,
    "data-bos-class": "action",
    onClick: () => run(onAction, a.id),
    style: {
      minHeight: 52,
      padding: '0 40px',
      borderRadius: 999,
      border: '1.5px solid var(--brand-white)',
      background: 'var(--brand-black)',
      color: 'var(--brand-white)',
      fontFamily: FONT.ui,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 0.5,
      cursor: 'pointer'
    }
  }, a.label)), phases.length > 0 && /*#__PURE__*/React.createElement(PhaseArc, {
    phases: phases,
    currentPhase: currentPhase,
    onPick: id => run(onPhase, id)
  }), !pills.length && !terms.length && !phases.length && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.body,
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--brand-white)',
      textAlign: 'center',
      maxWidth: 300,
      marginBottom: 24
    }
  }, "No actions are switched on for this role. An admin can add them in Roles & Navigation."));
}
function AppShell({
  role = 'outfitter',
  activeId,
  onNavigate,
  onRoleChange,
  onAction,
  onPhase,
  currentPhase,
  alerts = 0,
  logoSrc,
  logoSrcDark,
  theme = 'light',
  height = '100vh',
  children
}) {
  const T = __ds_scope.SHELL_THEME[theme] || __ds_scope.SHELL_THEME.light;
  const cfg = __ds_scope.NavConfig.useConfig();
  const nav = __ds_scope.NavConfig.navFor(cfg, role);
  const r = nav.role;
  const rootRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const w = useContainerWidth(rootRef);
  const band = bandOf(w);
  const logo = theme === 'dark' ? logoSrcDark : logoSrc;
  const [pref, setPref] = React.useState(() => {
    try {
      return window.localStorage.getItem(PANEL_KEY) || 'expanded';
    } catch (e) {
      return 'expanded';
    }
  });
  const [drawer, setDrawer] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [qFocus, setQFocus] = React.useState(false);
  const expanded = pref !== 'collapsed';
  const togglePanel = () => {
    const v = expanded ? 'collapsed' : 'expanded';
    setPref(v);
    try {
      window.localStorage.setItem(PANEL_KEY, v);
    } catch (e) {}
  };
  const pick = id => {
    setDrawer(false);
    setActionsOpen(false);
    setMenu(false);
    if (onNavigate) onNavigate(id);
  };
  React.useEffect(() => {
    if (band === 'dt') setDrawer(false);
    if (band !== 'ph') setActionsOpen(false);
  }, [band]);
  React.useEffect(() => {
    let t;
    try {
      if (/[?&]speclint=1\b/.test(window.location.search)) t = setTimeout(() => __ds_scope.SpecLint.overlay(rootRef.current), 600);
    } catch (e) {}
    return () => {
      clearTimeout(t);
      __ds_scope.SpecLint.clear();
    };
  }, []);
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'Escape') {
        setDrawer(false);
        setMenu(false);
        setActionsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && searchRef.current) {
        e.preventDefault();
        searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  const menuEl = menu && /*#__PURE__*/React.createElement(ProfileMenu, {
    roleKey: role,
    cfg: cfg,
    onRoleChange: onRoleChange,
    onClose: () => setMenu(false),
    T: T
  });
  const bell = /*#__PURE__*/React.createElement(IconBtn, {
    spec: "info-alerts",
    cls: "info",
    label: alerts ? `Notifications, ${alerts} new` : 'Notifications',
    T: T,
    onClick: () => pick('alerts')
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "bell",
    size: 22
  }), /*#__PURE__*/React.createElement(CountBadge, {
    n: alerts,
    style: {
      top: 5,
      right: 3
    }
  }));
  const showProfileText = band === 'dt' && w >= 1180;
  const header = band === 'ph' ? /*#__PURE__*/React.createElement("header", {
    "data-spec-id": "sec-header",
    "data-bos-level": "shell",
    "data-bos-section": "S01",
    "data-bos-type": "header",
    style: {
      position: 'relative',
      zIndex: menu ? 56 : 'auto',
      flexShrink: 0,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 8px 0 4px',
      background: T.page,
      color: T.text
    }
  }, /*#__PURE__*/React.createElement(IconBtn, {
    spec: "btn-nav-open-menu",
    label: "Open menu",
    expanded: drawer,
    onClick: () => setDrawer(true),
    T: T
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "menu",
    size: 22
  })), /*#__PURE__*/React.createElement(Wordmark, {
    src: logo,
    height: w < 380 ? 15 : 18
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      width: '100%',
      maxWidth: 280,
      height: 44,
      padding: '0 10px',
      boxSizing: 'border-box',
      border: `1px solid ${qFocus ? 'var(--accent-gold-hi)' : T.input}`,
      borderRadius: 999,
      background: T.card
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "search",
    size: 16,
    color: T.muted
  }), /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    "data-spec-id": "input-search",
    type: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    onFocus: () => setQFocus(true),
    onBlur: () => setQFocus(false),
    placeholder: "Search",
    "aria-label": "Global search",
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: FONT.body,
      fontSize: 16,
      color: T.text
    }
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": "info-profile",
    "data-bos-class": "info",
    "aria-haspopup": "menu",
    "aria-expanded": menu,
    "aria-label": `Account: ${r.user.name}${r.status ? ', status ' + r.status : ''}`,
    onClick: () => setMenu(m => !m),
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      minHeight: 44,
      flexShrink: 0,
      padding: w >= 480 ? '4px 4px 4px 10px' : 4,
      border: `1px solid ${T.line}`,
      borderRadius: 999,
      background: T.card,
      color: T.text,
      cursor: 'pointer'
    }
  }, r.status && w >= 420 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: T.body
    }
  }, r.status), w >= 480 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, r.user.short || r.user.name), /*#__PURE__*/React.createElement(Avatar, {
    initials: r.user.initials,
    size: 34,
    T: T
  }), r.status && w < 420 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 2,
      bottom: 2,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--semantic-success-dark)',
      border: `2px solid ${T.card}`
    }
  })), menuEl) : /*#__PURE__*/React.createElement("header", {
    "data-spec-id": "sec-header",
    "data-bos-level": "shell",
    "data-bos-section": "S01",
    "data-bos-type": "header",
    style: {
      position: 'relative',
      zIndex: menu ? 56 : 'auto',
      flexShrink: 0,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 12px',
      background: T.card,
      borderBottom: '1px solid var(--border-gold)',
      color: T.text
    }
  }, /*#__PURE__*/React.createElement(IconBtn, {
    spec: band === 'tab' ? 'btn-nav-open-drawer' : 'btn-nav-toggle-panel',
    T: T,
    label: band === 'tab' ? 'Open navigation' : expanded ? 'Collapse navigation' : 'Expand navigation',
    expanded: band === 'tab' ? drawer : expanded,
    onClick: band === 'tab' ? () => setDrawer(true) : togglePanel
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "menu",
    size: 22
  })), /*#__PURE__*/React.createElement(Wordmark, {
    src: logo,
    height: 24
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      maxWidth: band === 'dt' ? 576 : 400,
      height: 44,
      padding: '0 12px',
      boxSizing: 'border-box',
      border: `1px solid ${qFocus ? 'var(--accent-gold-hi)' : T.input}`,
      boxShadow: qFocus ? '0 0 0 3px rgba(139,117,46,0.15)' : 'none',
      borderRadius: 8,
      background: T.card
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "search",
    size: 18,
    color: T.muted
  }), /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    "data-spec-id": "input-search",
    type: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    onFocus: () => setQFocus(true),
    onBlur: () => setQFocus(false),
    placeholder: r.search || 'Search',
    "aria-label": "Global search",
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: FONT.body,
      fontSize: 15,
      color: T.text
    }
  }), band === 'dt' && /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: FONT.mono,
      fontSize: 11,
      color: T.muted,
      border: `1px solid ${T.line}`,
      borderRadius: 4,
      padding: '2px 6px'
    }
  }, "\u2318K"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0
    }
  }, bell, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": "info-profile",
    "data-bos-class": "info",
    "aria-haspopup": "menu",
    "aria-expanded": menu,
    "aria-label": `Account: ${r.user.name}`,
    onClick: () => setMenu(m => !m),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minHeight: 44,
      padding: '4px 8px 4px 4px',
      border: 'none',
      borderRadius: 999,
      background: menu ? T.hover : 'transparent',
      color: T.text,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: r.user.initials,
    T: T
  }), showProfileText && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 15,
      fontWeight: 600
    }
  }, r.user.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: T.muted
    }
  }, r.title)), band === 'dt' && /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "chevronDown",
    size: 16,
    color: T.muted
  }))), menuEl);
  const panel = band === 'dt' && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    "data-spec-id": "sec-side-panel",
    "data-bos-level": "shell",
    "data-bos-section": "S02",
    "data-bos-type": "nav",
    style: {
      width: expanded ? 240 : 72,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: T.panel,
      borderRight: `1px solid ${T.line}`,
      transition: 'width var(--duration-normal) var(--ease-standard)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(NavGroups, {
    groups: nav.groups,
    activeId: activeId,
    expanded: expanded,
    onPick: pick,
    T: T
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderTop: `1px solid ${T.line}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": "btn-nav-collapse-panel",
    "data-bos-class": "nav",
    "aria-label": expanded ? 'Collapse navigation' : 'Expand navigation',
    "aria-expanded": expanded,
    onClick: togglePanel,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      minHeight: 44,
      padding: expanded ? '0 12px' : 0,
      justifyContent: expanded ? 'flex-start' : 'center',
      border: 'none',
      borderRadius: 8,
      background: 'transparent',
      color: T.muted,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      transform: expanded ? 'none' : 'rotate(180deg)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "chevronsLeft",
    size: 20
  })), expanded && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 1.5,
      textTransform: 'uppercase'
    }
  }, "Collapse"))));
  const drawerGroups = band === 'ph' ? nav.menuGroups : nav.groups;
  const drawerEl = band !== 'dt' && drawer && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    onClick: () => setDrawer(false),
    style: {
      position: 'absolute',
      inset: 0,
      background: SCRIM
    }
  }), /*#__PURE__*/React.createElement("nav", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": band === 'ph' ? 'Menu' : 'Navigation',
    "data-spec-id": "sec-drawer",
    "data-bos-level": "shell",
    "data-bos-section": "S03",
    "data-bos-type": "nav",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 'min(300px, 86%)',
      display: 'flex',
      flexDirection: 'column',
      background: T.panel,
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px 0 16px',
      borderBottom: `1px solid ${T.line}`,
      color: T.text
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    src: logo,
    height: 22
  }), /*#__PURE__*/React.createElement(IconBtn, {
    spec: "btn-nav-close-drawer",
    label: "Close navigation",
    onClick: () => setDrawer(false),
    T: T
  }, /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "x",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, drawerGroups.length ? /*#__PURE__*/React.createElement(NavGroups, {
    groups: drawerGroups,
    activeId: activeId,
    expanded: true,
    onPick: pick,
    T: T
  }) : /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 12px',
      fontSize: 14,
      lineHeight: 1.5,
      color: T.body
    }
  }, "No menu buttons are switched on for this role. An admin can add them in Roles & Navigation."))));
  const slots = nav.slots.slice(0, 2);
  const tabbar = band === 'ph' && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Tab bar",
    "data-spec-id": "sec-tab-bar",
    "data-bos-level": "shell",
    "data-bos-section": "S04",
    "data-bos-type": "nav",
    style: {
      position: 'relative',
      zIndex: 80,
      flexShrink: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
      alignItems: 'end',
      padding: '8px 4px 10px',
      background: actionsOpen ? 'transparent' : T.page,
      borderTop: `1px solid ${actionsOpen ? 'transparent' : T.line}`
    }
  }, slots.map(s => /*#__PURE__*/React.createElement(TabItem, {
    key: s.id,
    target: `screen:${s.id}`,
    spec: `nav-tab-${s.id}`,
    icon: s.icon,
    label: s.short || s.label,
    current: s.id === activeId,
    onClick: () => pick(s.id),
    T: T,
    dim: actionsOpen
  })), slots.length < 2 && Array.from({
    length: 2 - slots.length
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: `gap${i}`
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-spec-id": "btn-action-open-actions",
    "data-bos-class": "action",
    "aria-label": actionsOpen ? 'Close actions' : 'Open actions',
    "aria-expanded": actionsOpen,
    onClick: () => setActionsOpen(o => !o),
    style: {
      position: 'relative',
      minWidth: 0,
      minHeight: 56,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4,
      padding: '0 0 4px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -30,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 62,
      height: 62,
      boxSizing: 'border-box',
      borderRadius: '50%',
      background: 'var(--brand-black)',
      border: '4px solid var(--surface-light-card)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, actionsOpen ? /*#__PURE__*/React.createElement(__ds_scope.NavIcon, {
    name: "x",
    size: 24,
    color: "var(--brand-white)",
    stroke: 2.2
  }) : /*#__PURE__*/React.createElement(TapIcon, {
    size: 28
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.ui,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: actionsOpen ? 'var(--brand-white)' : T.text
    }
  }, "Action")), /*#__PURE__*/React.createElement(TabItem, {
    spec: "nav-tab-alerts",
    icon: "bell",
    label: "Alerts",
    current: activeId === 'alerts',
    badge: alerts,
    onClick: () => pick('alerts'),
    T: T,
    dim: actionsOpen
  }), /*#__PURE__*/React.createElement(TabItem, {
    spec: "nav-tab-messenger",
    icon: "message",
    label: "Messenger",
    current: activeId === 'messenger',
    onClick: () => pick('messenger'),
    T: T,
    dim: actionsOpen
  }));
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    "data-spec-id": "frame-app-shell",
    "data-bos-level": "frame",
    "data-bos-bp": band,
    "data-bos-role": role,
    "data-bos-ready": "true",
    style: {
      position: 'relative',
      height,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: T.page,
      color: T.text,
      fontFamily: FONT.body,
      colorScheme: theme
    }
  }, /*#__PURE__*/React.createElement("style", null, '.bos-shell-canvas :is(h1,h2,h3,h4,h5,h6,p){color:inherit}'), menu && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    onClick: () => setMenu(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50
    }
  }), header, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex'
    }
  }, panel, /*#__PURE__*/React.createElement("main", {
    "data-spec-id": "canvas",
    "data-bos-level": "canvas",
    className: "bos-shell-canvas",
    style: {
      flex: 1,
      minWidth: 0,
      minHeight: 0,
      overflow: 'auto',
      position: 'relative',
      background: T.page,
      color: T.text
    }
  }, children)), tabbar, drawerEl, band === 'ph' && actionsOpen && /*#__PURE__*/React.createElement(ActionOverlay, {
    actions: nav.actions,
    phases: nav.phases,
    currentPhase: currentPhase,
    onAction: onAction,
    onPhase: onPhase,
    onClose: () => setActionsOpen(false)
  }));
}
Object.assign(window, {
  AppShell,
  ActionOverlay
});
Object.assign(__ds_scope, { ActionOverlay, AppShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-shell/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/Badge.jsx
try { (() => {
function Badge({
  type = "gold",
  children,
  specId
}) {
  const types = {
    gold: {
      bg: "rgba(139,117,46,0.15)",
      color: "#B89E4A",
      border: "rgba(139,117,46,0.28)"
    },
    success: {
      bg: "rgba(47,158,68,0.12)",
      color: "#51CF66",
      border: "rgba(47,158,68,0.3)"
    },
    warning: {
      bg: "rgba(245,159,0,0.12)",
      color: "#FFD43B",
      border: "rgba(245,159,0,0.3)"
    },
    danger: {
      bg: "rgba(224,49,49,0.12)",
      color: "#FF8787",
      border: "rgba(224,49,49,0.3)"
    },
    info: {
      bg: "rgba(28,126,214,0.12)",
      color: "#74C0FC",
      border: "rgba(28,126,214,0.3)"
    },
    neutral: {
      bg: "rgba(255,255,255,0.06)",
      color: "#A2A59C",
      border: "rgba(255,255,255,0.13)"
    }
  };
  const t = types[type] || types.neutral;
  return /*#__PURE__*/React.createElement("span", {
    "data-spec-id": specId || __ds_scope.makeSpecId("badge", children),
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: "uppercase",
      padding: "4px 10px",
      borderRadius: 9999,
      background: t.bg,
      color: t.color,
      border: `1px solid ${t.border}`
    }
  }, children);
}
Object.assign(window, {
  Badge
});
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/Badge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/Button.jsx
try { (() => {
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
  specId
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: 12,
      padding: "6px 12px",
      height: 32
    },
    md: {
      fontSize: 13,
      padding: "8px 16px",
      height: 40
    },
    lg: {
      fontSize: 14,
      padding: "10px 24px",
      height: 48
    }
  };
  const s = sizes[size];
  const variants = {
    primary: {
      bg: disabled ? "#4A4D46" : hover ? "#B89E4A" : "#8B752E",
      color: disabled ? "#A2A59C" : "#020000",
      border: "none"
    },
    secondary: {
      bg: hover ? "rgba(139,117,46,0.08)" : "transparent",
      color: disabled ? "#4A4D46" : "#B89E4A",
      border: `1px solid ${hover ? "#B89E4A" : "rgba(139,117,46,0.55)"}`
    },
    ghost: {
      bg: hover ? "rgba(255,255,255,0.06)" : "transparent",
      color: disabled ? "#4A4D46" : "#E7DDB4",
      border: "none"
    },
    danger: {
      bg: hover ? "#B02525" : "#E03131",
      color: "#fff",
      border: "none"
    }
  };
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("button", {
    "data-spec-id": specId || __ds_scope.makeSpecId(variant === "primary" ? "btn-commit" : "btn-action", children),
    "data-bos-class": variant === "primary" ? "commit" : "action",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => !disabled && setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 600,
      letterSpacing: 0.5,
      fontSize: s.fontSize,
      padding: s.padding,
      height: s.height,
      background: v.bg,
      color: v.color,
      border: v.border,
      borderRadius: 8,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled && variant === "primary" ? 0.6 : 1,
      transition: "all 150ms cubic-bezier(0.2,0,0,1)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, children);
}
Object.assign(window, {
  Button
});
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/Button.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/Card.jsx
try { (() => {
function Card({
  title,
  subtitle,
  children,
  footer,
  specId
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": specId || __ds_scope.makeSpecId("card", title || subtitle || "card"),
    style: {
      background: "#1C2E2E",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8,
      overflow: "hidden"
    }
  }, (title || subtitle) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#243838",
      padding: "16px 20px",
      borderBottom: "1px solid rgba(255,255,255,0.07)"
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 22,
      color: "#fff",
      letterSpacing: 0.5
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      color: "#A2A59C",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginTop: 2
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px",
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 13,
      color: "#E7DDB4",
      lineHeight: 1.6
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      justifyContent: "flex-end",
      gap: 8
    }
  }, footer));
}
function StatTile({
  label,
  value,
  delta,
  deltaType = "neutral",
  specId
}) {
  const deltaColors = {
    up: "#51CF66",
    down: "#FF8787",
    neutral: "#A2A59C"
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": specId || __ds_scope.makeSpecId("metric", label),
    style: {
      background: "#1C2E2E",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8,
      padding: "16px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "#B89E4A",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 40,
      letterSpacing: 1,
      color: "#fff",
      lineHeight: 1
    }
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: deltaColors[deltaType],
      marginTop: 6
    }
  }, delta));
}
function UnitRow({
  id,
  title,
  phase,
  status,
  statusType,
  onClick,
  specId
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": specId || __ds_scope.makeSpecId("row-unit", title, id),
    "data-bos-class": onClick ? "nav" : undefined,
    role: onClick ? "button" : undefined,
    tabIndex: onClick ? 0 : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      cursor: onClick ? "pointer" : "default",
      background: hover ? "rgba(255,255,255,0.03)" : "transparent",
      transition: "background 150ms cubic-bezier(0.2,0,0,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "baseline",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: "#B89E4A",
      flexShrink: 0
    }
  }, id), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.5,
      color: "#fff"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 12,
      color: "#A2A59C",
      marginTop: 2
    }
  }, phase))), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    type: statusType
  }, status));
}
Object.assign(window, {
  Card,
  StatTile,
  UnitRow
});
Object.assign(__ds_scope, { Card, StatTile, UnitRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/Header.jsx
try { (() => {
function Header({
  eyebrow = "Nexus Portal · Dealer Ops",
  title = "Inventory",
  titleAccent = "Dashboard",
  meta = [["Location", "Coeur d'Alene"], ["Units", "284"], ["Updated", "2 min ago"]],
  specId
}) {
  return /*#__PURE__*/React.createElement("header", {
    "data-spec-id": specId || "sec-page-header",
    "data-bos-level": "section",
    "data-bos-type": "header",
    style: {
      background: "linear-gradient(135deg, #020000 0%, #203232 65%, #2A4040 100%)",
      borderBottom: "2px solid #8B752E",
      padding: "40px 32px 32px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -80,
      right: -80,
      width: 320,
      height: 320,
      border: "1px solid rgba(139,117,46,0.10)",
      borderRadius: "50%",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -120,
      right: -120,
      width: 480,
      height: 480,
      border: "1px solid rgba(139,117,46,0.05)",
      borderRadius: "50%",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: 1100,
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "#B89E4A",
      marginBottom: 10,
      fontWeight: 600
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 48,
      letterSpacing: 2,
      lineHeight: 1,
      color: "#fff",
      margin: 0,
      fontWeight: 400
    }
  }, title, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#B89E4A"
    }
  }, titleAccent)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: "flex",
      gap: 24,
      flexWrap: "wrap"
    }
  }, meta.map(([k, v]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      color: "#A2A59C"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "#E7DDB4",
      fontWeight: 500
    }
  }, k), " ", v)))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-tag-gold.png",
    alt: "Bish's RV",
    style: {
      height: 64,
      opacity: 0.95
    }
  })));
}
Object.assign(window, {
  Header
});
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/Input.jsx
try { (() => {
function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  helper,
  disabled,
  specId
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "#E03131" : focus ? "#B89E4A" : "rgba(255,255,255,0.30)";
  const shadow = focus ? error ? "0 0 0 3px rgba(224,49,49,0.15)" : "0 0 0 3px rgba(139,117,46,0.15)" : "none";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0.5,
      color: error ? "#FF8787" : "#E7DDB4",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    "data-spec-id": specId || __ds_scope.makeSpecId("input", label || placeholder || "field"),
    value: value || "",
    onChange: e => onChange?.(e.target.value),
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 14,
      width: "100%",
      boxSizing: "border-box",
      padding: "10px 12px",
      background: disabled ? "#0A1414" : "#111E1E",
      color: disabled ? "#4A4D46" : "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: 8,
      outline: "none",
      boxShadow: shadow,
      transition: "border-color 150ms cubic-bezier(0.2,0,0,1), box-shadow 150ms cubic-bezier(0.2,0,0,1)",
      cursor: disabled ? "not-allowed" : "text"
    }
  }), (error || helper) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 12,
      color: error ? "#FF8787" : "#A2A59C",
      marginTop: 4
    }
  }, "          ", error || helper));
}
Object.assign(window, {
  Input
});
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-dark/TabBar.jsx
try { (() => {
function TabBar({
  tabs,
  active,
  onChange,
  specId
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-spec-id": specId || "nav-tabs",
    "data-bos-type": "nav",
    style: {
      background: "#020000",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 32px",
      position: "sticky",
      top: 0,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      display: "flex",
      gap: 0,
      overflowX: "auto"
    }
  }, tabs.map(tab => /*#__PURE__*/React.createElement("button", {
    "data-spec-id": __ds_scope.makeSpecId("nav-tab", tab),
    "data-bos-class": "nav",
    "aria-current": active === tab ? "page" : undefined,
    key: tab,
    onClick: () => onChange(tab),
    style: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 12,
      fontWeight: active === tab ? 600 : 400,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      padding: "14px 18px 12px",
      border: "none",
      cursor: "pointer",
      background: "transparent",
      color: active === tab ? "#B89E4A" : "#A2A59C",
      borderBottom: active === tab ? "2px solid #8B752E" : "2px solid transparent",
      transition: "all 150ms cubic-bezier(0.2,0,0,1)",
      whiteSpace: "nowrap",
      flexShrink: 0
    }
  }, tab))));
}
Object.assign(window, {
  TabBar
});
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-dark/TabBar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ActionOverlay = __ds_scope.ActionOverlay;

__ds_ns.AppShell = __ds_scope.AppShell;

__ds_ns.NAV_ICONS = __ds_scope.NAV_ICONS;

__ds_ns.UI_ICONS = __ds_scope.UI_ICONS;

__ds_ns.ICON_ALIASES = __ds_scope.ICON_ALIASES;

__ds_ns.SHELL_THEME = __ds_scope.SHELL_THEME;

__ds_ns.NavIcon = __ds_scope.NavIcon;

__ds_ns.NavConfig = __ds_scope.NavConfig;

__ds_ns.RolesNavAdmin = __ds_scope.RolesNavAdmin;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.UnitRow = __ds_scope.UnitRow;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.SpecLint = __ds_scope.SpecLint;

})();
