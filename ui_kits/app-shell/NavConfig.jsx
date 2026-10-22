// Global navigation catalog + per-role assignments, owned by Admin › Roles & Navigation.
// Every AppShell reads this; RolesNavAdmin publishes to it. Persisted under one localStorage key.
const NAV_KEY = 'bishs.navconfig.v1';

// Lucide is the ONLY icon set (README › Iconography). Keys are Lucide icon names, so the code library
// renders the same name with lucide-react: <Store />, <LayoutDashboard />, … Node data is Lucide's own
// 24×24 geometry (stroke 1.5 default here; 2 in lucide-react). Do not add non-Lucide glyphs.
export const NAV_ICONS = {"layout-dashboard":[["rect",{"x":3,"y":3,"width":7,"height":9,"rx":1}],["rect",{"x":14,"y":3,"width":7,"height":5,"rx":1}],["rect",{"x":14,"y":12,"width":7,"height":9,"rx":1}],["rect",{"x":3,"y":16,"width":7,"height":5,"rx":1}]],"calendar":[["path",{"d":"M8 2v4"}],["path",{"d":"M16 2v4"}],["rect",{"x":3,"y":4,"width":18,"height":18,"rx":2}],["path",{"d":"M3 10h18"}]],"store":[["path",{"d":"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"}],["path",{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}],["path",{"d":"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"}],["path",{"d":"M2 7h20"}],["path",{"d":"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"}]],"clipboard-check":[["rect",{"x":8,"y":2,"width":8,"height":4,"rx":1,"ry":1}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"m9 14 2 2 4-4"}]],"list-ordered":[["path",{"d":"M10 12h11"}],["path",{"d":"M10 18h11"}],["path",{"d":"M10 6h11"}],["path",{"d":"M4 10h2"}],["path",{"d":"M4 6h1v4"}],["path",{"d":"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"}]],"briefcase":[["path",{"d":"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{"x":2,"y":6,"width":20,"height":14,"rx":2}]],"users":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":9,"cy":7,"r":4}],["path",{"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{"d":"M16 3.13a4 4 0 0 1 0 7.75"}]],"package":[["path",{"d":"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{"d":"M12 22V12"}],["path",{"d":"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"}],["path",{"d":"m7.5 4.27 9 5.15"}]],"file-text":[["path",{"d":"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{"d":"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{"d":"M10 9H8"}],["path",{"d":"M16 13H8"}],["path",{"d":"M16 17H8"}]],"git-branch":[["line",{"x1":6,"y1":3,"x2":6,"y2":15}],["circle",{"cx":18,"cy":6,"r":3}],["circle",{"cx":6,"cy":18,"r":3}],["path",{"d":"M18 9a9 9 0 0 1-9 9"}]],"truck":[["path",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{"d":"M15 18H9"}],["path",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{"cx":17,"cy":18,"r":2}],["circle",{"cx":7,"cy":18,"r":2}]],"shield":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]],"wrench":[["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}]],"gem":[["path",{"d":"M6 3h12l4 6-10 13L2 9Z"}],["path",{"d":"M11 3 8 9l4 13 4-13-3-6"}],["path",{"d":"M2 9h20"}]],"chart-column":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M18 17V9"}],["path",{"d":"M13 17V5"}],["path",{"d":"M8 17v-3"}]],"credit-card":[["rect",{"x":2,"y":5,"width":20,"height":14,"rx":2}],["line",{"x1":2,"y1":10,"x2":22,"y2":10}]],"toggle-right":[["rect",{"x":2,"y":6,"width":20,"height":12,"rx":6,"ry":6}],["circle",{"cx":16,"cy":12,"r":2}]],"sliders-horizontal":[["line",{"x1":21,"y1":4,"x2":14,"y2":4}],["line",{"x1":10,"y1":4,"x2":3,"y2":4}],["line",{"x1":21,"y1":12,"x2":12,"y2":12}],["line",{"x1":8,"y1":12,"x2":3,"y2":12}],["line",{"x1":21,"y1":20,"x2":16,"y2":20}],["line",{"x1":12,"y1":20,"x2":3,"y2":20}],["line",{"x1":14,"y1":2,"x2":14,"y2":6}],["line",{"x1":8,"y1":10,"x2":8,"y2":14}],["line",{"x1":16,"y1":18,"x2":16,"y2":22}]],"folder":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]],"heart":[["path",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}]],"map-pin":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{"cx":12,"cy":10,"r":3}]],"message-square":[["path",{"d":"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]],"bell":[["path",{"d":"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}],["path",{"d":"M10.3 21a1.94 1.94 0 0 0 3.4 0"}]]};

export const UI_ICONS = {"search":[["circle",{"cx":11,"cy":11,"r":8}],["path",{"d":"m21 21-4.3-4.3"}]],"menu":[["line",{"x1":4,"y1":12,"x2":20,"y2":12}],["line",{"x1":4,"y1":6,"x2":20,"y2":6}],["line",{"x1":4,"y1":18,"x2":20,"y2":18}]],"x":[["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]],"chevrons-left":[["path",{"d":"m11 17-5-5 5-5"}],["path",{"d":"m18 17-5-5 5-5"}]],"chevron-down":[["path",{"d":"m6 9 6 6 6-6"}]],"check":[["path",{"d":"M20 6 9 17l-5-5"}]],"trash-2":[["path",{"d":"M3 6h18"}],["path",{"d":"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{"d":"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{"x1":10,"y1":11,"x2":10,"y2":17}],["line",{"x1":14,"y1":11,"x2":14,"y2":17}]]};

// Pre-Lucide keys from NavConfig v1 (saved configs may still use them).
export const ICON_ALIASES = {"dashboard":"layout-dashboard","floor":"store","checkin":"clipboard-check","upq":"list-ordered","cases":"briefcase","inventory":"package","desking":"file-text","pipeline":"git-branch","chart":"chart-column","card":"credit-card","toggle":"toggle-right","settings":"sliders-horizontal","pin":"map-pin","message":"message-square","trash":"trash-2","chevronsLeft":"chevrons-left","chevronDown":"chevron-down"};

// Theme by surface role: the same shell, remapped onto DS tokens.
// `current` is the ONLY gold the nav may use (gold-lo wayfinding, decision D1 2026-10-21).
export const SHELL_THEME = {
  light: {
    page: 'var(--surface-light-page)', panel: 'var(--surface-light-inset)', card: 'var(--surface-light-card)',
    raised: 'var(--surface-light-raised)', text: 'var(--text-light-primary)', body: 'var(--text-light-secondary)',
    muted: 'var(--text-light-muted)', line: 'var(--border-light)', input: 'var(--border-input-light)',
    current: 'var(--accent-gold-lo)', hover: 'rgba(0,0,0,0.04)', ink: 'var(--text-light-primary)',
    onInk: 'var(--brand-white)', shadow: 'var(--shadow-sm)',
  },
  dark: {
    page: 'var(--surface-page)', panel: 'var(--surface-deep)', card: 'var(--surface-card)',
    raised: 'var(--surface-raised)', text: 'var(--text-primary)', body: 'var(--text-body)',
    muted: 'var(--text-muted)', line: 'var(--border-ghost)', input: 'var(--border-input)',
    current: 'var(--accent-gold-hi)', hover: 'rgba(255,255,255,0.06)', ink: 'var(--surface-raised)',
    onInk: 'var(--text-primary)', shadow: 'none',
  },
};

export function NavIcon({ name, size = 20, color = 'currentColor', stroke = 1.5 }) {
  const key = ICON_ALIASES[name] || name;
  const nodes = NAV_ICONS[key] || UI_ICONS[key] || NAV_ICONS['layout-dashboard'];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-lucide={key} style={{ flex: `0 0 ${size}px`, display: 'block' }}>
      {nodes.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

const CATALOG = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', group: 'Operate' },
  { id: 'my-day', label: 'My Day', icon: 'calendar', group: 'Operate' },
  { id: 'floor', label: 'Sales Floor', short: 'Floor', icon: 'store', group: 'Operate' },
  { id: 'check-in', label: 'New Check-In', short: 'Check-In', icon: 'clipboard-check', group: 'Operate' },
  { id: 'up-queue', label: 'Up Queue', short: 'Up Q', icon: 'list-ordered', group: 'Operate' },
  { id: 'cases', label: 'Cases', icon: 'briefcase', group: 'Operate' },
  { id: 'customers', label: 'Customers', icon: 'users', group: 'Operate' },
  { id: 'inventory', label: 'Inventory', icon: 'package', group: 'Operate' },
  { id: 'desking', label: 'Desking', icon: 'file-text', group: 'Operate' },
  { id: 'pipeline', label: 'Pipeline', icon: 'git-branch', group: 'Operate' },
  { id: 'deliveries', label: 'Deliveries', icon: 'truck', group: 'Operate' },
  { id: 'protection', label: 'Protection Ops', short: 'Protect', icon: 'shield', group: 'Operate' },
  { id: 'service', label: 'Service', icon: 'wrench', group: 'Operate' },
  { id: 'outfitting', label: 'Outfitting', icon: 'gem', group: 'Operate' },
  { id: 'my-case', label: 'My Case', icon: 'folder', group: 'My Purchase' },
  { id: 'saved-units', label: 'Saved Units', short: 'Saved', icon: 'heart', group: 'My Purchase' },
  { id: 'tours', label: 'Tours', icon: 'map-pin', group: 'My Purchase' },
  { id: 'my-deal', label: 'My Deal', icon: 'file-text', group: 'My Purchase' },
  { id: 'reports', label: 'Reporting', icon: 'chart-column', group: 'Manage' },
  { id: 'compensation', label: 'My Compensation', short: 'Comp', icon: 'credit-card', group: 'Manage' },
  { id: 'billing', label: 'Billing', icon: 'credit-card', group: 'Manage' },
  { id: 'users', label: 'Users', icon: 'users', group: 'Manage' },
  { id: 'roles-nav', label: 'Roles & Navigation', short: 'Roles', icon: 'toggle-right', group: 'Manage' },
  { id: 'settings', label: 'Settings', icon: 'sliders-horizontal', group: 'Manage' },
];

const ACTIONS = [
  { id: 'trade-appraisal', label: 'Trade Appraisal', kind: 'pill' },
  { id: 'inventory', label: 'Inventory', kind: 'pill' },
  { id: 'send-resource', label: 'Send Resource', kind: 'pill' },
  { id: 'my-compensation', label: 'My Compensation', kind: 'pill' },
  { id: 'new-check-in', label: 'New Check-In', kind: 'pill' },
  { id: 'customer-left', label: 'Customer Left', kind: 'terminal' },
];

const PHASES = [
  { id: 'discovery', label: 'Discovery' }, { id: 'mcp', label: 'MCP' }, { id: 'walk', label: 'Walk' },
  { id: 'deal', label: 'Deal' }, { id: 'delivery', label: 'Delivery' },
];

const ROLES = {
  admin: {
    label: 'Admin', title: 'Internal Admin', user: { name: 'Dana Reyes', short: 'Dana R.', initials: 'DR' },
    search: 'Search units, deals, customers, techs — all stores',
    nav: ['dashboard', 'inventory', 'desking', 'pipeline', 'protection', 'service', 'outfitting', 'reports', 'billing', 'users', 'roles-nav', 'settings'],
    mobile: ['dashboard', 'inventory'], actions: ['trade-appraisal', 'inventory', 'send-resource'], phaseArc: false,
  },
  manager: {
    label: 'Sales Manager', title: 'Sales Manager', user: { name: 'Marcus Hale', short: 'Marcus H.', initials: 'MH' },
    search: 'Search Idaho Falls units, deals and buyers',
    nav: ['my-day', 'floor', 'pipeline', 'inventory', 'desking', 'deliveries', 'customers', 'reports', 'settings'],
    mobile: ['floor', 'desking'], actions: ['trade-appraisal', 'inventory', 'send-resource', 'customer-left'], phaseArc: true,
  },
  outfitter: {
    label: 'Outfitter', title: 'Outfitter', user: { name: 'Sarah Ames', short: 'Sarah A.', initials: 'SA' }, status: 'Up',
    search: 'Search my customers, units and resources',
    nav: ['my-day', 'up-queue', 'cases', 'customers', 'inventory', 'compensation', 'settings'],
    mobile: ['up-queue', 'cases'], actions: ['trade-appraisal', 'inventory', 'send-resource', 'my-compensation', 'customer-left'], phaseArc: true,
  },
  receptionist: {
    label: 'Receptionist', title: 'Front Desk', user: { name: 'Tara Boyd', short: 'Tara B.', initials: 'TB' },
    search: 'Search today’s appointments and walk-ins',
    nav: ['check-in', 'floor', 'reports'], mobile: ['check-in', 'floor'], actions: ['new-check-in'], phaseArc: false,
  },
  tech: {
    label: 'Technician', title: 'Service Technician', user: { name: 'Ana Whitcomb', short: 'Ana W.', initials: 'AW' },
    search: 'Search work orders, units and parts',
    nav: ['dashboard', 'service', 'protection', 'inventory', 'settings'], mobile: ['service', 'inventory'], actions: ['send-resource'], phaseArc: false,
  },
  customer: {
    label: 'Customer', title: 'Customer', user: { name: 'Robert Jackson', short: 'Robert J.', initials: 'RJ' },
    search: 'Search units',
    nav: ['my-case', 'saved-units', 'tours', 'my-deal'], mobile: ['my-case', 'saved-units'], actions: [], phaseArc: false,
  },
};

const DEFAULTS = { version: 1, catalog: CATALOG, actions: ACTIONS, phases: PHASES, roles: ROLES };
const clone = (o) => JSON.parse(JSON.stringify(o));
let current = null;
const subs = new Set();

function load() {
  if (current) return current;
  try { const raw = window.localStorage.getItem(NAV_KEY); current = raw ? JSON.parse(raw) : clone(DEFAULTS); }
  catch (e) { current = clone(DEFAULTS); }
  return current;
}
function emit() { subs.forEach((f) => f(current)); }
function save(next) {
  current = clone(next);
  try { window.localStorage.setItem(NAV_KEY, JSON.stringify(current)); } catch (e) {}
  emit();
}
function reset() {
  try { window.localStorage.removeItem(NAV_KEY); } catch (e) {}
  current = clone(DEFAULTS); emit();
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== NAV_KEY) return;
    try { current = e.newValue ? JSON.parse(e.newValue) : clone(DEFAULTS); } catch (err) { current = clone(DEFAULTS); }
    emit();
  });
}
function useConfig() {
  const [c, setC] = React.useState(load);
  React.useEffect(() => { subs.add(setC); return () => { subs.delete(setC); }; }, []);
  return c;
}
function slug(label) {
  return String(label).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
}
function uniqueId(list, label) {
  const base = slug(label); let id = base; let n = 2;
  while (list.some((i) => i.id === id)) { id = `${base}-${n}`; n += 1; }
  return id;
}
// Resolves one role's nav: groups (catalog order), the two mobile slots, overlay actions, phase arc.
function navFor(cfg, role) {
  const r = cfg.roles[role] || cfg.roles[Object.keys(cfg.roles)[0]];
  const on = new Set(r.nav || []);
  const groups = [];
  cfg.catalog.forEach((it) => {
    if (!on.has(it.id)) return;
    let g = groups.find((x) => x.label === it.group);
    if (!g) { g = { label: it.group, items: [] }; groups.push(g); }
    g.items.push(it);
  });
  const items = groups.flatMap((g) => g.items);
  const slots = (r.mobile || []).map((id) => items.find((i) => i.id === id)).filter(Boolean).slice(0, 2);
  for (const it of items) { if (slots.length >= 2) break; if (!slots.includes(it)) slots.push(it); }
  const actions = (r.actions || []).map((id) => cfg.actions.find((a) => a.id === id)).filter(Boolean);
  // Mobile hamburger menu: admin-picked per role; defaults to every enabled button not already in a tab-bar slot.
  const menuIds = Array.isArray(r.menu) ? new Set(r.menu) : new Set(items.filter((i) => !slots.includes(i)).map((i) => i.id));
  const menuGroups = groups.map((g) => ({ label: g.label, items: g.items.filter((i) => menuIds.has(i.id)) })).filter((g) => g.items.length);
  return { role: r, groups, items, slots, menuGroups, actions, phases: r.phaseArc ? cfg.phases : [] };
}

export const NavConfig = { DEFAULTS, load, save, reset, useConfig, navFor, uniqueId, slug };

Object.assign(window, { NavConfig, NavIcon, NAV_ICONS, UI_ICONS, ICON_ALIASES, SHELL_THEME });
