import { NavConfig, NavIcon, NAV_ICONS, SHELL_THEME } from './NavConfig.jsx';

// Admin › Roles & Navigation. Edits a draft of NavConfig; "Publish changes" (the screen's one COMMIT)
// pushes it to every AppShell. Nothing a role sees is hardcoded in a screen.
const FONT = { display: 'var(--font-display)', ui: 'var(--font-ui)', body: 'var(--font-body)', mono: 'var(--font-mono)' };
const clone = (o) => JSON.parse(JSON.stringify(o));
const srOnly = { position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, border: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' };

function Switch({ on, onChange, label, T, spec }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} data-spec-id={spec} data-bos-class="action" onClick={() => onChange(!on)}
      style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
      <span style={{ position: 'relative', width: 36, height: 20, boxSizing: 'border-box', borderRadius: 10, background: on ? T.text : 'transparent', border: `1.5px solid ${on ? T.text : T.input}`, transition: 'background var(--duration-fast) var(--ease-standard)' }}>
        <span style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 13, height: 13, borderRadius: '50%', background: on ? T.page : T.muted, transition: 'left var(--duration-fast) var(--ease-standard)' }} />
      </span>
    </button>
  );
}

function Btn({ kind = 'ghost', spec, onClick, disabled, children, T }) {
  const look = kind === 'commit'
    ? { background: disabled ? T.panel : 'var(--accent-gold)', color: disabled ? T.muted : 'var(--brand-black)', border: 'none' }
    : kind === 'action'
      ? { background: 'transparent', color: disabled ? T.muted : T.current, border: `1px solid ${disabled ? T.line : 'var(--accent-gold)'}` }
      : { background: 'transparent', color: disabled ? T.muted : T.body, border: 'none' };
  return (
    <button type="button" data-spec-id={spec} data-bos-class={kind === 'commit' ? 'commit' : 'action'} disabled={disabled} onClick={onClick}
      style={{ minHeight: 44, padding: '0 18px', borderRadius: 8, fontFamily: FONT.ui, fontSize: 15, fontWeight: 600, letterSpacing: 0.5, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, whiteSpace: 'nowrap', ...look }}>
      {children}
    </button>
  );
}

function Field({ label, children, grow, T }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: grow ? '1 1 220px' : '0 1 auto', minWidth: 0 }}>
      <span style={{ fontFamily: FONT.ui, fontSize: 13, fontWeight: 600, letterSpacing: 0.5, color: T.text }}>{label}</span>
      {children}
    </label>
  );
}

function Section({ spec, title, sub, children, T }) {
  return (
    <section data-spec-id={spec} data-bos-level="section" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, overflow: 'hidden', boxShadow: T.shadow }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.line}`, background: T.raised }}>
        <h2 style={{ fontFamily: FONT.display, fontWeight: 400, fontSize: 24, letterSpacing: 0.5, lineHeight: 1, margin: 0, color: T.text }}>{title}</h2>
        {sub && <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: T.body, textWrap: 'pretty' }}>{sub}</p>}
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </section>
  );
}

function RemoveBtn({ label, onClick, T, spec }) {
  return (
    <button type="button" aria-label={label} data-spec-id={spec} data-bos-class="action" onClick={onClick}
      style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8, background: 'transparent', color: T.muted, cursor: 'pointer' }}>
      <NavIcon name="trash" size={18} />
    </button>
  );
}

export function RolesNavAdmin({ theme = 'light' }) {
  const T = SHELL_THEME[theme] || SHELL_THEME.light;
  const live = NavConfig.useConfig();
  const [draft, setDraft] = React.useState(() => clone(live));
  const [navForm, setNavForm] = React.useState({ label: '', icon: 'layout-dashboard', group: 'Operate' });
  const [actForm, setActForm] = React.useState({ label: '', kind: 'pill' });
  const [toast, setToast] = React.useState('');
  const dirty = JSON.stringify(draft) !== JSON.stringify(live);
  const dirtyRef = React.useRef(dirty);
  dirtyRef.current = dirty;
  React.useEffect(() => { if (!dirtyRef.current) setDraft(clone(live)); }, [live]);

  const roleKeys = Object.keys(draft.roles);
  const groups = [...new Set(draft.catalog.map((i) => i.group))];
  const edit = (fn) => setDraft((d) => { const n = clone(d); fn(n); return n; });

  const toggleNav = (rk, id, on) => edit((n) => {
    const r = n.roles[rk];
    r.nav = on ? [...r.nav, id] : r.nav.filter((x) => x !== id);
    if (!on) { r.mobile = (r.mobile || []).filter((x) => x !== id); if (Array.isArray(r.menu)) r.menu = r.menu.filter((x) => x !== id); }
  });
  const menuOf = (r) => (Array.isArray(r.menu) ? r.menu : NavConfig.navFor(draft, Object.keys(draft.roles).find((k) => draft.roles[k] === r)).menuGroups.flatMap((g) => g.items.map((i) => i.id)));
  const toggleMenu = (rk, id, on) => edit((n) => {
    const base = menuOf(draft.roles[rk]);
    n.roles[rk].menu = on ? [...new Set([...base, id])] : base.filter((x) => x !== id);
  });
  const toggleAct = (rk, id, on) => edit((n) => {
    const r = n.roles[rk];
    r.actions = on ? [...(r.actions || []), id] : (r.actions || []).filter((x) => x !== id);
  });
  const setSlot = (rk, i, id) => edit((n) => {
    const m = [...(n.roles[rk].mobile || [])];
    m[i] = id;
    n.roles[rk].mobile = m.filter((x, j) => x && m.indexOf(x) === j);
  });
  const addNav = () => {
    const label = navForm.label.trim();
    if (!label) return;
    const id = NavConfig.uniqueId(draft.catalog, label);
    edit((n) => { n.catalog.push({ id, label, icon: navForm.icon, group: navForm.group, custom: true }); });
    setNavForm((f) => ({ ...f, label: '' }));
  };
  const removeNav = (id) => edit((n) => {
    n.catalog = n.catalog.filter((i) => i.id !== id);
    Object.values(n.roles).forEach((r) => { r.nav = r.nav.filter((x) => x !== id); r.mobile = (r.mobile || []).filter((x) => x !== id); if (Array.isArray(r.menu)) r.menu = r.menu.filter((x) => x !== id); });
  });
  const addAction = () => {
    const label = actForm.label.trim();
    if (!label) return;
    const id = NavConfig.uniqueId(draft.actions, label);
    edit((n) => { n.actions.push({ id, label, kind: actForm.kind, custom: true }); });
    setActForm((f) => ({ ...f, label: '' }));
  };
  const removeAction = (id) => edit((n) => {
    n.actions = n.actions.filter((a) => a.id !== id);
    Object.values(n.roles).forEach((r) => { r.actions = (r.actions || []).filter((x) => x !== id); });
  });
  const publish = () => {
    NavConfig.save(draft);
    setToast('Published. Every shell now uses this navigation.');
    window.setTimeout(() => setToast(''), 2800);
  };

  const th = { fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.muted, padding: '10px 12px', textAlign: 'left', borderBottom: `1px solid ${T.line}`, background: T.raised, whiteSpace: 'nowrap' };
  const td = { padding: '0 12px', borderBottom: `1px solid ${T.line}`, fontSize: 14, color: T.text, height: 48 };
  const stick = { position: 'sticky', left: 0, background: T.card, zIndex: 1 };
  const groupRow = { ...td, height: 36, fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.muted, background: T.page };
  const ctl = { height: 44, padding: '0 12px', boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${T.input}`, background: T.card, color: T.text, fontFamily: FONT.body, fontSize: 15, minWidth: 0 };
  const chip = { fontFamily: FONT.ui, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: T.body, border: `1px solid ${T.line}`, borderRadius: 4, padding: '1px 6px' };
  const tableWrap = { position: 'relative', overflowX: 'auto', border: `1px solid ${T.line}`, borderRadius: 8 };
  const tableMin = 280 + roleKeys.length * 104;

  return (
    <div data-spec-id="screen-roles-navigation" style={{ padding: 'clamp(16px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1280, margin: '0 auto', color: T.text, fontFamily: FONT.body }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ minWidth: 0, flex: '1 1 320px' }}>
          <div style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.muted }}>Admin · Settings</div>
          <h1 style={{ fontFamily: FONT.display, fontWeight: 400, fontSize: 'clamp(32px, 5vw, 44px)', letterSpacing: 1, lineHeight: 1, margin: '6px 0 8px', color: T.text }}>Roles &amp; Navigation</h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: T.body, maxWidth: 680, textWrap: 'pretty' }}>
            Switch nav buttons on for each role. Published changes apply to the desktop side panel, the tablet drawer, the mobile tab bar, the mobile hamburger menu and the Action overlay for every user in that role.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {dirty && <span role="status" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FONT.ui, fontSize: 13, fontWeight: 600, letterSpacing: 0.5, color: T.text, border: '1px solid var(--semantic-warning-dark)', borderRadius: 999, padding: '4px 10px' }}><span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--semantic-warning-dark)' }} />Unpublished changes</span>}
          <Btn kind="ghost" spec="btn-action-discard-nav" disabled={!dirty} onClick={() => setDraft(clone(live))} T={T}>Discard</Btn>
          <Btn kind="commit" spec="btn-commit-publish-nav" disabled={!dirty} onClick={publish} T={T}>Publish changes</Btn>
        </div>
      </div>
      {toast && <div role="status" style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid var(--semantic-success-dark)', background: theme === 'dark' ? 'transparent' : 'var(--semantic-success-light)', color: theme === 'dark' ? 'var(--semantic-success)' : 'var(--semantic-success-dark)', fontWeight: 600, fontSize: 14 }}>{toast}</div>}

      <Section spec="sec-nav-buttons" title="Navigation buttons" sub="Every module in the OS. A button appears for a role only where its switch is on. Add a button here, then switch it on for the roles that need it." T={T}>
        <div style={tableWrap}>
          <table style={{ width: '100%', minWidth: tableMin, borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={{ ...th, ...stick, background: T.raised }}>Button</th>
              {roleKeys.map((k) => <th key={k} style={{ ...th, textAlign: 'center' }}>{draft.roles[k].label}</th>)}
              <th style={{ ...th, width: 52, position: 'relative' }}><span style={srOnly}>Remove</span></th>
            </tr></thead>
            <tbody>
              {groups.map((g) => (
                <React.Fragment key={g}>
                  <tr><td colSpan={roleKeys.length + 2} style={{ ...groupRow, ...stick, background: T.page }}>{g}</td></tr>
                  {draft.catalog.filter((i) => i.group === g).map((it) => (
                    <tr key={it.id}>
                      <td style={{ ...td, ...stick }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                          <NavIcon name={it.icon} size={18} color={T.body} />
                          <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 500, letterSpacing: 0.3, whiteSpace: 'nowrap' }}>{it.label}</span>
                          {it.custom && <span style={chip}>Custom</span>}
                        </span>
                      </td>
                      {roleKeys.map((k) => (
                        <td key={k} style={{ ...td, padding: 0, textAlign: 'center' }}>
                          <Switch on={draft.roles[k].nav.includes(it.id)} onChange={(on) => toggleNav(k, it.id, on)} label={`${it.label} for ${draft.roles[k].label}`} T={T} spec={`btn-action-toggle-nav#${it.id}-${k}`} />
                        </td>
                      ))}
                      <td style={{ ...td, padding: 0 }}>{it.custom && <RemoveBtn label={`Remove ${it.label}`} onClick={() => removeNav(it.id)} T={T} spec={`btn-action-remove-nav#${it.id}`} />}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
          <Field label="New button label" grow T={T}>
            <input data-spec-id="input-new-nav-label" value={navForm.label} onChange={(e) => setNavForm({ ...navForm, label: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') addNav(); }} placeholder="e.g. Service Bay" style={ctl} />
          </Field>
          <Field label="Icon" T={T}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.line}`, borderRadius: 8, color: T.text }}><NavIcon name={navForm.icon} size={20} /></span>
              <select data-spec-id="input-new-nav-icon" value={navForm.icon} onChange={(e) => setNavForm({ ...navForm, icon: e.target.value })} style={ctl}>
                {Object.keys(NAV_ICONS).map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </span>
          </Field>
          <Field label="Group" T={T}>
            <select data-spec-id="input-new-nav-group" value={navForm.group} onChange={(e) => setNavForm({ ...navForm, group: e.target.value })} style={ctl}>
              {groups.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Btn kind="action" spec="btn-action-add-nav-button" disabled={!navForm.label.trim()} onClick={addNav} T={T}>Add nav button</Btn>
        </div>
      </Section>

      <Section spec="sec-mobile-tab-bar" title="Mobile tab bar" sub="Each role picks the two buttons left of the center Action. Alerts and Messenger are fixed on the right for every role. Only buttons switched on above can fill a slot." T={T}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
          {roleKeys.map((k) => {
            const r = draft.roles[k];
            const enabled = draft.catalog.filter((i) => r.nav.includes(i.id));
            const resolved = NavConfig.navFor(draft, k).slots;
            return (
              <div key={k} data-spec-id={`card-mobile-slots#${k}`} style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: T.card }}>
                <div style={{ fontFamily: FONT.ui, fontSize: 16, fontWeight: 600 }}>{r.label}</div>
                {[0, 1].map((i) => (
                  <Field key={i} label={`Slot ${i + 1}`} T={T}>
                    <select data-spec-id={`input-mobile-slot#${k}-${i + 1}`} value={(r.mobile || [])[i] || ''} onChange={(e) => setSlot(k, i, e.target.value)} style={ctl}>
                      <option value="">Auto (first enabled)</option>
                      {enabled.map((it) => <option key={it.id} value={it.id}>{it.label}</option>)}
                    </select>
                  </Field>
                ))}
                <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center', justifyItems: 'center', padding: '10px 4px', borderRadius: 8, background: T.page, color: T.muted }}>
                  {[0, 1].map((i) => <NavIcon key={i} name={resolved[i] ? resolved[i].icon : 'layout-dashboard'} size={20} color={resolved[i] ? T.body : T.line} />)}
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-black)' }} />
                  <NavIcon name="bell" size={20} />
                  <NavIcon name="message" size={20} />
                </div>
                <span style={srOnly}>Tab bar preview: {resolved.map((s) => s.label).join(', ')}, Action, Alerts, Messenger</span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section spec="sec-mobile-menu" title="Mobile hamburger menu" sub="Buttons a role reaches from the ☰ menu at the top left of the phone header. Only buttons switched on for the role above can be added." T={T}>
        <div style={tableWrap}>
          <table style={{ width: '100%', minWidth: tableMin, borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={{ ...th, ...stick, background: T.raised }}>Button</th>
              {roleKeys.map((k) => <th key={k} style={{ ...th, textAlign: 'center' }}>{draft.roles[k].label}</th>)}
            </tr></thead>
            <tbody>
              {draft.catalog.filter((it) => roleKeys.some((k) => draft.roles[k].nav.includes(it.id))).map((it) => (
                <tr key={it.id}>
                  <td style={{ ...td, ...stick }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <NavIcon name={it.icon} size={18} color={T.body} />
                      <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>{it.label}</span>
                    </span>
                  </td>
                  {roleKeys.map((k) => {
                    const r = draft.roles[k];
                    const enabled = r.nav.includes(it.id);
                    return (
                      <td key={k} style={{ ...td, padding: 0, textAlign: 'center' }}>
                        {enabled
                          ? <Switch on={menuOf(r).includes(it.id)} onChange={(on) => toggleMenu(k, it.id, on)} label={`${it.label} in ${r.label} mobile menu`} T={T} spec={`btn-action-toggle-menu#${it.id}-${k}`} />
                          : <span aria-label={`Not enabled for ${r.label}`} style={{ color: T.line, fontFamily: FONT.mono, fontSize: 13 }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section spec="sec-action-overlay-config" title="Action overlay" sub="What a role sees when it taps the center Action button on mobile. Pills are everyday actions; a terminal action ends the visit. The phase arc moves the current case between phases." T={T}>
        <div style={tableWrap}>
          <table style={{ width: '100%', minWidth: tableMin, borderCollapse: 'collapse' }}>
            <thead><tr>
              <th style={{ ...th, ...stick, background: T.raised }}>Action</th>
              {roleKeys.map((k) => <th key={k} style={{ ...th, textAlign: 'center' }}>{draft.roles[k].label}</th>)}
              <th style={{ ...th, width: 52, position: 'relative' }}><span style={srOnly}>Remove</span></th>
            </tr></thead>
            <tbody>
              {draft.actions.map((a) => (
                <tr key={a.id}>
                  <td style={{ ...td, ...stick }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>{a.label}</span>
                      <span style={chip}>{a.kind === 'terminal' ? 'Terminal' : 'Pill'}</span>
                      {a.custom && <span style={chip}>Custom</span>}
                    </span>
                  </td>
                  {roleKeys.map((k) => (
                    <td key={k} style={{ ...td, padding: 0, textAlign: 'center' }}>
                      <Switch on={(draft.roles[k].actions || []).includes(a.id)} onChange={(on) => toggleAct(k, a.id, on)} label={`${a.label} for ${draft.roles[k].label}`} T={T} spec={`btn-action-toggle-action#${a.id}-${k}`} />
                    </td>
                  ))}
                  <td style={{ ...td, padding: 0 }}>{a.custom && <RemoveBtn label={`Remove ${a.label}`} onClick={() => removeAction(a.id)} T={T} spec={`btn-action-remove-action#${a.id}`} />}</td>
                </tr>
              ))}
              <tr>
                <td style={{ ...td, ...stick, background: T.page }}><span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 600 }}>Phase arc</span></td>
                {roleKeys.map((k) => (
                  <td key={k} style={{ ...td, padding: 0, textAlign: 'center', background: T.page }}>
                    <Switch on={!!draft.roles[k].phaseArc} onChange={(on) => edit((n) => { n.roles[k].phaseArc = on; })} label={`Phase arc for ${draft.roles[k].label}`} T={T} spec={`btn-action-toggle-phase-arc#${k}`} />
                  </td>
                ))}
                <td style={{ ...td, background: T.page }} />
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
          <Field label="New action label" grow T={T}>
            <input data-spec-id="input-new-action-label" value={actForm.label} onChange={(e) => setActForm({ ...actForm, label: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') addAction(); }} placeholder="e.g. Book Tour" style={ctl} />
          </Field>
          <Field label="Type" T={T}>
            <select data-spec-id="input-new-action-kind" value={actForm.kind} onChange={(e) => setActForm({ ...actForm, kind: e.target.value })} style={ctl}>
              <option value="pill">Pill</option>
              <option value="terminal">Terminal</option>
            </select>
          </Field>
          <Btn kind="action" spec="btn-action-add-action" disabled={!actForm.label.trim()} onClick={addAction} T={T}>Add action</Btn>
        </div>
      </Section>

      <div><Btn kind="ghost" spec="btn-action-reset-nav-defaults" onClick={() => setDraft(clone(NavConfig.DEFAULTS))} T={T}>Reset draft to defaults</Btn></div>
    </div>
  );
}

Object.assign(window, { RolesNavAdmin });
