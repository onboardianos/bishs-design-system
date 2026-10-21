// Global navigation catalog + per-role assignments, owned by Admin › Roles & Navigation.
// Every AppShell reads this; RolesNavAdmin publishes to it. Persisted under one localStorage key.
const NAV_KEY = 'bishs.navconfig.v1';

export const NAV_ICONS = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  floor: 'M3 21V9l9-6 9 6v12M9 21v-7h6v7',
  checkin: 'M9 2h6v4H9zM9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3M9 14l2 2 4-4',
  upq: 'M3 6h18M3 12h18M3 18h18',
  cases: 'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  inventory: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  desking: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8',
  pipeline: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9',
  truck: 'M1 4h14v12H1zM15 9h4l3 3v4h-7M5.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  gem: 'M6 3h12l4 6-10 12L2 9zM2 9h20',
  chart: 'M3 3v18h18M8 16v-5M13 16V7M18 16v-3',
  card: 'M2 5h20v14H2zM2 10h20',
  toggle: 'M8 6h8a6 6 0 0 1 0 12H8A6 6 0 0 1 8 6zM16 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  settings: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  pin: 'M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
};

export const UI_ICONS = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M18 6L6 18M6 6l12 12',
  chevronsLeft: 'M11 17l-5-5 5-5M18 17l-5-5 5-5',
  chevronDown: 'M6 9l6 6 6-6',
  check: 'M20 6L9 17l-5-5',
  trash: 'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14',
};

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
  const d = NAV_ICONS[name] || UI_ICONS[name] || NAV_ICONS.dashboard;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: `0 0 ${size}px`, display: 'block' }}>
      <path d={d} />
    </svg>
  );
}

const CATALOG = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', group: 'Operate' },
  { id: 'my-day', label: 'My Day', icon: 'calendar', group: 'Operate' },
  { id: 'floor', label: 'Sales Floor', short: 'Floor', icon: 'floor', group: 'Operate' },
  { id: 'check-in', label: 'New Check-In', short: 'Check-In', icon: 'checkin', group: 'Operate' },
  { id: 'up-queue', label: 'Up Queue', short: 'Up Q', icon: 'upq', group: 'Operate' },
  { id: 'cases', label: 'Cases', icon: 'cases', group: 'Operate' },
  { id: 'customers', label: 'Customers', icon: 'users', group: 'Operate' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory', group: 'Operate' },
  { id: 'desking', label: 'Desking', icon: 'desking', group: 'Operate' },
  { id: 'pipeline', label: 'Pipeline', icon: 'pipeline', group: 'Operate' },
  { id: 'deliveries', label: 'Deliveries', icon: 'truck', group: 'Operate' },
  { id: 'protection', label: 'Protection Ops', short: 'Protect', icon: 'shield', group: 'Operate' },
  { id: 'service', label: 'Service', icon: 'wrench', group: 'Operate' },
  { id: 'outfitting', label: 'Outfitting', icon: 'gem', group: 'Operate' },
  { id: 'my-case', label: 'My Case', icon: 'folder', group: 'My Purchase' },
  { id: 'saved-units', label: 'Saved Units', short: 'Saved', icon: 'heart', group: 'My Purchase' },
  { id: 'tours', label: 'Tours', icon: 'pin', group: 'My Purchase' },
  { id: 'my-deal', label: 'My Deal', icon: 'desking', group: 'My Purchase' },
  { id: 'reports', label: 'Reporting', icon: 'chart', group: 'Manage' },
  { id: 'compensation', label: 'My Compensation', short: 'Comp', icon: 'card', group: 'Manage' },
  { id: 'billing', label: 'Billing', icon: 'card', group: 'Manage' },
  { id: 'users', label: 'Users', icon: 'users', group: 'Manage' },
  { id: 'roles-nav', label: 'Roles & Navigation', short: 'Roles', icon: 'toggle', group: 'Manage' },
  { id: 'settings', label: 'Settings', icon: 'settings', group: 'Manage' },
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

Object.assign(window, { NavConfig, NavIcon, NAV_ICONS, UI_ICONS, SHELL_THEME });
