// spec-ready v2 — stamping helpers + in-browser stamp linter (ratified 2026-10-21).
// Every Bish's component stamps itself; SpecLint proves coverage before anything ships.
const INTERACTIVE = [
  'button', 'a[href]', 'input:not([type="hidden"])', 'select', 'textarea', 'summary',
  '[role="button"]', '[role="link"]', '[role="tab"]', '[role="switch"]', '[role="menuitem"]',
  '[role="option"]', '[role="checkbox"]', '[role="radio"]', '[tabindex]:not([tabindex="-1"])',
].join(',');
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
export function makeSpecId(prefix, label, instance) {
  return `${prefix}-${slug(label)}${instance != null && instance !== '' ? `#${slug(instance)}` : ''}`;
}
makeSpecId.slug = slug;

function frameOf(el, root) {
  const f = el.closest('[data-bos-level="frame"]');
  return f && (root === document || root.contains(f)) ? f : root;
}

function run(root = document) {
  const scope = root || document;
  const skip = (el) => !!el.closest('[data-spec-lint-ignore]');
  const interactive = [...scope.querySelectorAll(INTERACTIVE)].filter((el) => !skip(el) && !el.closest('[aria-hidden="true"]'));
  const unstamped = interactive.filter((el) => !el.getAttribute('data-spec-id'));
  const stamped = [...scope.querySelectorAll('[data-spec-id]')].filter((el) => !skip(el));
  const seen = new Map();
  const duplicates = [];
  stamped.forEach((el) => {
    const key = `${(frameOf(el, scope).getAttribute && frameOf(el, scope).getAttribute('data-spec-id')) || 'root'}::${el.getAttribute('data-spec-id')}`;
    if (seen.has(key)) duplicates.push(el); else seen.set(key, el);
  });
  const invalid = stamped.filter((el) => { const id = el.getAttribute('data-spec-id'); return !ID_FORMAT.test(id) || FORBIDDEN.test(id); });
  const frames = scope.querySelectorAll('[data-bos-level="frame"]').length ? [...scope.querySelectorAll('[data-bos-level="frame"]')] : [scope];
  const commitViolations = frames.filter((f) => f.querySelectorAll('[data-bos-class="commit"]').length > 1);
  const nestedLayers = [...scope.querySelectorAll('[data-bos-level="layer"] [data-bos-level="layer"]')];
  // G11 · permissions: data-changing controls (commit) declare a permission; nothing rendered as hidden.
  const unpermitted = [...scope.querySelectorAll('[data-bos-class="commit"]')].filter((el) => !skip(el) && !el.closest('[data-bos-level="frame"][data-spec-id^="frame-artboard"]') && scope.querySelector('[data-bos-perm]') && !el.getAttribute('data-bos-perm') && !el.closest('[data-bos-level="frame"]:not([data-spec-id="frame-app-shell"])'));
  const hiddenRendered = [...scope.querySelectorAll('[data-bos-access="hidden"]')].filter((el) => !skip(el));
  const total = interactive.length;
  const coverage = total ? (total - unstamped.length) / total : 1;
  const pass = !unstamped.length && !duplicates.length && !invalid.length && !commitViolations.length && !nestedLayers.length && !hiddenRendered.length;
  const describe = (el) => {
    const t = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 48);
    return { tag: el.tagName.toLowerCase(), text: t, id: el.getAttribute('data-spec-id') || null, suggested: el.getAttribute('data-spec-id') ? null : makeSpecId(el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' ? 'input' : 'btn-action', t), el };
  };
  return {
    pass, coverage, interactive: total, stamped: stamped.length,
    unstamped: unstamped.map(describe), duplicates: duplicates.map(describe), invalid: invalid.map(describe),
    commitViolations: commitViolations.length, nestedLayers: nestedLayers.length,
    permPoints: scope.querySelectorAll('[data-bos-perm]').length, unpermittedCommits: unpermitted.length, hiddenRendered: hiddenRendered.length,
  };
}

let overlayEls = [];
function clear() {
  overlayEls.forEach((el) => { if (el.__speclintPrev !== undefined) { el.style.outline = el.__speclintPrev; delete el.__speclintPrev; } else if (el.remove) el.remove(); });
  overlayEls = [];
}
/** Outline every failing element and pin a coverage badge. Returns the report. */
function overlay(root = document) {
  clear();
  const r = run(root);
  const flag = (item, color) => { const el = item.el; el.__speclintPrev = el.style.outline; el.style.outline = `2px dashed ${color}`; el.title = item.id ? `spec-lint: ${item.id}` : `spec-lint: unstamped — suggest ${item.suggested}`; overlayEls.push(el); };
  r.unstamped.forEach((i) => flag(i, '#B02525'));
  r.duplicates.forEach((i) => flag(i, '#C77C00'));
  r.invalid.forEach((i) => flag(i, '#1864AB'));
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
  c.querySelectorAll('style,script,svg,[aria-hidden="true"]').forEach((n) => n.remove());
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
    id, family: inst ? `${base}#{instance}` : base, instance: inst || null,
    level: el.getAttribute('data-bos-level') || (el.matches(INTERACTIVE) ? 'component' : 'element'),
    class: el.getAttribute('data-bos-class') || null,
    type: el.getAttribute('data-bos-type') || null,
    section: sec ? sec.getAttribute('data-bos-section') : null,
    layer: lay ? lay.getAttribute('data-bos-layer') : null,
    frame: frame ? frame.getAttribute('data-spec-id') : null,
    tag: el.tagName.toLowerCase(), role: el.getAttribute('role'),
    perm: el.getAttribute('data-bos-perm'), access: el.getAttribute('data-bos-access'), viewRole: (el.closest('[data-bos-role]') || { getAttribute: () => null }).getAttribute('data-bos-role'),
    interactive: el.matches(INTERACTIVE), guideSafe: el.getAttribute('data-bos-guide-safe') === 'true',
    label,
    shared: el.getAttribute('data-bos-level') === 'shell' || !!el.closest('[data-bos-level="shell"]') || id === 'frame-app-shell' || (el.getAttribute('data-bos-level') === 'canvas' && !!el.closest('[data-spec-id="frame-app-shell"]')),
    target: el.getAttribute('data-bos-target'),
  };
}
/** Snapshot one state: every stamped node in root, plus lint. */
function snapshot(root = document, meta = {}) {
  const scope = root || document;
  const els = [...scope.querySelectorAll('[data-spec-id]')].filter((el) => !el.closest('[data-spec-lint-ignore]'));
  return { ...meta, lint: (({ pass, coverage, interactive, stamped, commitViolations, nestedLayers, unstamped, duplicates, invalid }) => ({ pass, coverage, interactive, stamped, commitViolations, nestedLayers, unstamped: unstamped.length, duplicates: duplicates.length, invalid: invalid.length }))(run(scope)), entries: els.map(entryOf) };
}
/** Merge snapshots (states × widths) into one per-build manifest. IDs scoped SCREEN::id (decision D4). */
function manifest(build, snaps, version = '1.0.0') {
  const map = new Map();
  snaps.forEach((sn) => sn.entries.forEach((e) => {
    const key = e.shared ? `${build}::shell::${e.id}` : `${build}::${e.id}`;
    const cur = map.get(key) || { key, ...e, states: [], widths: [] };
    if (!cur.states.includes(sn.state)) cur.states.push(sn.state);
    if (sn.width && !cur.widths.includes(sn.width)) cur.widths.push(sn.width);
    map.set(key, cur);
  }));
  const entries = [...map.values()].sort((a, b) => (a.frame || '').localeCompare(b.frame || '') || (a.section || '').localeCompare(b.section || '') || a.id.localeCompare(b.id));
  entries.forEach((e) => { if (e.shared) e.states = ['all']; });
  const stateMeta = []; snaps.forEach((s) => { if (!stateMeta.find((x) => x.id === s.state)) stateMeta.push({ id: s.state, label: s.label || s.state, status: s.status || 'draft' }); });
  return { build, version, generated: new Date().toISOString(), spec: 'spec-ready v2', states: stateMeta.map((x) => x.id), stateMeta, shared: entries.filter((e) => e.shared).length, gates: snaps.map((s) => ({ state: s.state, width: s.width, ...s.lint })), count: entries.length, entries };
}
/** Requirements: one row per element FAMILY. Filled from `spec` ({ [family]: { purpose, behaviour, acceptance, target?, event? } }); shared shell recorded once. */
function requirements(man, spec = {}) {
  const fam = new Map();
  man.entries.forEach((e) => { const k = `${e.shared ? 'SHELL' : e.frame}|${e.family}`; const c = fam.get(k) || { ...e, instances: [], states: new Set() }; if (e.instance && !c.instances.includes(e.instance)) c.instances.push(e.instance); e.states.forEach((x) => c.states.add(x)); fam.set(k, c); });
  const groups = {};
  fam.forEach((v) => { const g = v.shared ? '__shared' : (v.frame || 'root'); (groups[g] = groups[g] || []).push(v); });
  const cell = (x) => String(x == null ? '' : x).replace(/\|/g, '/').replace(/\n/g, ' ');
  const fill = (v) => {
    const r = spec[v.family] || spec[v.id] || {};
    if (!r.purpose && v.shared) return { purpose: 'Shared navigation shell (AppShell). Recorded once, not per screen.', behaviour: 'See design-system AppShell + NavConfig docs.', acceptance: 'Covered by AppShell acceptance.', target: v.target || (v.family.startsWith('nav-') ? `Screen: ${v.label}` : ''), event: '' };
    return { purpose: r.purpose || 'TODO', behaviour: r.behaviour || 'TODO', acceptance: r.acceptance || 'TODO', target: r.target || v.target || '', event: r.event || '' };
  };
  let todo = 0, total = 0;
  const table = (rows) => {
    let t = '| # | ID / family | Level · class · section | Label | Instances | States | Purpose | Behaviour | Acceptance | Goes to | Tracked event |\n|---|---|---|---|---|---|---|---|---|---|---|\n';
    rows.sort((x, y) => (x.section || '').localeCompare(y.section || '') || x.family.localeCompare(y.family)).forEach((v, i) => {
      const r = fill(v); total++; if (r.purpose === 'TODO' || r.behaviour === 'TODO' || r.acceptance === 'TODO') todo++;
      t += `| ${i + 1} | \`${v.family}\` | ${v.level}${v.class ? ' · ' + v.class : ''}${v.section ? ' · ' + v.section : ''} | ${cell(v.label)} | ${v.instances.length ? v.instances.join(', ') : '—'} | ${[...v.states].join(', ')} | ${cell(r.purpose)} | ${cell(r.behaviour)} | ${cell(r.acceptance)} | ${cell(r.target)} | ${cell(r.event)} |\n`;
    });
    return t;
  };
  let body = '';
  if (groups.__shared) body += `\n## Shared shell (recorded once, appears on every state)\n\n${table(groups.__shared)}`;
  Object.keys(groups).filter((g) => g !== '__shared').sort().forEach((g) => { body += `\n## Frame \`${g}\`\n\n${table(groups[g])}`; });
  const st = (man.stateMeta || man.states.map((id) => ({ id, label: id, status: 'draft' }))).map((x) => `| \`${x.id}\` | ${x.label} | ${x.status} |`).join('\n');
  return `# ${man.build} — requirements\n\nGenerated ${man.generated} from ${man.count} stamped elements (${man.shared || 0} shared shell) across ${man.states.length} role-states. **${total - todo} of ${total} families complete${todo ? `, ${todo} TODO` : ''}.** Do not rename IDs.\n\n## States\n\n| State | Label | Status |\n|---|---|---|\n${st}\n${body}`;
}

// ── Ticket generation: manifest + spec + intake + precedents → Jira CSV ──
const CANON_DOD = [
  'Every data-spec-id in the manifest for this story renders with the same value and data-bos-* attributes',
  'SpecLint passes for each role × state × width this story touches',
  'Role postures match roles-permissions.md (hidden / read / act / reason / approve / disabled)',
  'Keyboard: tab order, Escape closes the top overlay, focus returns to the trigger',
  'WCAG 2.2 AA; 44×44 targets; no horizontal page scroll at 360px+; survives 200% text zoom',
  'All six data states (loading, empty, error, partial, stale, permission) for any module touched',
  'Tracked events fire once per commit with the documented payload',
];
function matchPrecedents(fam, precedents) {
  return (precedents || []).filter((p) => {
    const m = p.match || {};
    if (m.family && m.family.some((rx) => new RegExp(rx).test(fam.family))) return true;
    if (m.perm && fam.perm && m.perm.includes(fam.perm)) return true;
    if (m.access && fam.access && m.access.includes(fam.access)) return true;
    return false;
  });
}
/** opts: { intake: { rules: { 'BR-01': { text, source } } }, ruleMap: { [family]: ['BR-01'] }, precedents: [], questions: [{ id, text }], component: 'Floor' } */
function tickets(man, spec = {}, opts = {}) {
  const rules = (opts.intake && opts.intake.rules) || {}, ruleMap = opts.ruleMap || {}, precedents = (opts.precedents || []).filter((p) => p.from !== man.build);
  const fams = new Map();
  man.entries.forEach((e) => {
    const k = e.shared ? 'SHELL|' + e.family : (e.frame || 'root') + '|' + e.family;
    const c = fams.get(k) || { ...e, instances: [], ids: [] };
    if (e.instance && !c.instances.includes(e.instance)) c.instances.push(e.instance);
    if (!c.ids.includes(e.id)) c.ids.push(e.id);
    if (!c.perm && e.perm) c.perm = e.perm; if (!c.access && e.access) c.access = e.access;
    fams.set(k, c);
  });
  // Story buckets: screen sections (main frame) and one story per overlay frame family
  const buckets = new Map();
  const frameFamily = (fr) => (fr || 'root').split('#')[0];
  fams.forEach((v) => {
    let key, epic;
    if (v.shared) { key = 'SHELL'; epic = 'Shell & navigation'; }
    else if ((!v.frame || v.frame === 'frame-app-shell') && !v.section) { key = 'SHELL'; epic = 'Shell & navigation'; }
    else if (!v.frame || v.frame === 'frame-app-shell') { key = 'SEC|' + v.section; epic = 'Screen'; }
    else { key = 'FRAME|' + frameFamily(v.frame); epic = 'Overlays'; }
    const b = buckets.get(key) || { key, epic, fams: [] };
    b.fams.push(v); buckets.set(key, b);
  });
  const secName = (b) => { const sec = b.fams.find((f) => f.level === 'section' && f.family.startsWith('sec-')); return sec ? sec.family.replace(/^sec-/, '').replace(/-/g, ' ') : b.key.split('|')[1]; };
  const title = (b) => b.key === 'SHELL' ? 'Mount AppShell (header, side panel, drawer, mobile tab bar) with role nav from NavConfig'
    : b.key.startsWith('SEC|') ? `Build ${secName(b)} section (${b.key.split('|')[1]})`
    : `Build overlay \`${b.key.split('|')[1]}\``;
  const rows = [];
  const epics = [...new Set([...buckets.values()].map((b) => b.epic))];
  const eid = (name) => 'E' + (epics.indexOf(name) + 1);
  epics.forEach((name) => rows.push({ id: eid(name), parent: '', type: 'Epic', summary: `${man.build} · ${name}`, description: `${name} for ${man.build}. Generated from the stamped manifest (${man.generated}).`, ac: '', labels: ['bishs-os', man.build.toLowerCase()], source: 'manifest', stamps: '', status: 'Ready' }));
  let n = 0;
  [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key)).forEach((b) => {
    n++;
    const ac = [], desc = [], sources = new Set(), stamps = [];
    let gaps = 0;
    b.fams.sort((x, y) => x.family.localeCompare(y.family)).forEach((v) => {
      const r = spec[v.family] || spec[v.id] || {};
      const pre = matchPrecedents(v, precedents);
      const brs = (ruleMap[v.family] || []).filter((id) => rules[id]);
      stamps.push(v.family + (v.instances.length ? ' (' + v.instances.join(', ') + ')' : ''));
      if (r.purpose) desc.push(`• ${v.family}: ${r.purpose}${r.behaviour ? '. ' + r.behaviour : ''}${r.target ? ' → ' + r.target : ''}${r.event ? ' [event: ' + r.event + ']' : ''}${v.perm ? ' [perm: ' + v.perm + ']' : ''}`);
      if (r.acceptance) { ac.push(`${v.family}: ${r.acceptance}`); sources.add('spec'); }
      brs.forEach((id) => { ac.push(`${id}: ${rules[id].text}`); sources.add(`intake ${id} (${rules[id].source})`); });
      pre.forEach((p) => { ac.push(`${p.id} (precedent: ${p.from}, confirm): ${p.acceptance}`); sources.add(`precedent ${p.id}`); });
      if (!b.key.startsWith('SHELL') && !r.acceptance && !brs.length && !pre.length) gaps++;
    });
    const blocked = gaps > 0;
    rows.push({
      id: `S${n}`, parent: eid(b.epic), type: 'Story', summary: title(b),
      description: desc.join('\n') || 'See requirements.md',
      ac: ac.concat(['— Definition of done —'], CANON_DOD).join('\n'),
      labels: ['bishs-os', man.build.toLowerCase(), ...(blocked ? ['needs-rule'] : [])],
      source: [...sources, 'canon'].join('; '), stamps: stamps.join('; '), status: blocked ? 'Blocked' : 'Ready',
    });
  });
  (opts.questions || []).forEach((q) => rows.push({ id: q.id, parent: eid(epics[0]), type: 'Spike', summary: `Decide: ${q.text}`.slice(0, 240), description: q.text, ac: 'Decision recorded in decisions.md with owner and date', labels: ['bishs-os', man.build.toLowerCase(), 'decision'], source: 'decisions.md', stamps: '', status: 'Ready' }));
  const esc = (x) => '"' + String(x == null ? '' : x).replace(/"/g, '""') + '"';
  const head = ['Issue Id', 'Parent Id', 'Issue Type', 'Summary', 'Description', 'Acceptance Criteria', 'Labels', 'Source', 'Stamp IDs', 'Status'];
  const csv = [head.join(',')].concat(rows.map((r) => [r.id, r.parent, r.type, r.summary, r.description, r.ac, r.labels.join(' '), r.source, r.stamps, r.status].map(esc).join(','))).join('\n');
  return { rows, csv, stories: rows.filter((r) => r.type === 'Story').length, blocked: rows.filter((r) => r.status === 'Blocked').length };
}
function download(name, text, type = 'application/json') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
}

export const SpecLint = { run, overlay, clear, makeSpecId, slug, INTERACTIVE, snapshot, manifest, requirements, tickets, download, CANON_DOD };

Object.assign(window, { SpecLint, makeSpecId });
