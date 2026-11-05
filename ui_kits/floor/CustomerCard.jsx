import { makeSpecId } from '../spec-ready/SpecLint.jsx';
import { Avatar } from '../portal-dark/Avatar.jsx';
// CustomerCard — the floor-traffic kanban card (original cust-card-v2 anatomy):
// party tile · name / interest · ⋮  |  outfitter + avatar (dashed red "?" when unassigned)  |  phase clock ▏ total.
// Optional `flag` row on top and `cta` bar on the bottom turn it into a Needs-action card (Action Hub rail).
// CTA tones: neutral (ink on hover), danger, info. Never gold — the card's CTA is an ACTION, the alert owns the COMMIT.
const T = {
  light: { card: '#FFFFFF', line: 'rgba(0,0,0,0.08)', lineMid: 'rgba(0,0,0,0.14)', well: '#FAFAF6', inset: '#EFEDE4', ink: '#0A0A09', sub: '#6B6B63', mid: '#3D3D38', phase: '#545750', tile: '#0A0A09', tileFg: '#F7F6F1', shadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)', shadowHi: '0 2px 4px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.08)', danger: '#B02525', dangerBg: '#FDECEC', info: '#1864AB', infoBg: '#E7F1FB', focus: '#0A0A09' },
  dark: { card: '#1C2E2E', line: 'rgba(255,255,255,0.07)', lineMid: 'rgba(255,255,255,0.14)', well: '#162424', inset: '#243838', ink: '#FFFFFF', sub: '#A2A59C', mid: '#E7DDB4', phase: '#E7DDB4', tile: '#E7DDB4', tileFg: '#0A0A09', shadow: 'none', shadowHi: '0 8px 20px rgba(0,0,0,0.3)', danger: '#FF8787', dangerBg: 'rgba(255,135,135,0.12)', info: '#74C0FC', infoBg: 'rgba(116,192,252,0.12)', focus: '#E7DDB4' },
};
const PARTY = { couple: 'M5 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm10 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM2 16c0-2 1.5-4 3-4s3 2 3 4v2H2v-2Zm10 0c0-2 1.5-4 3-4s3 2 3 4v2h-6v-2Z', family: 'M5 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM3 17v-3c0-1.5 1-3 2-3s2 1.5 2 3v3H3Zm10 0v-3c0-1.5 1-3 2-3s2 1.5 2 3v3h-4Zm-4 1v-2c0-1 .8-2 1-2s1 1 1 2v2H9Z', single: 'M10 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-5 9c0-3 2-5 5-5s5 2 5 5v1H5v-1Z' };
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const inits = (n) => { const w = String(n || '?').match(/[A-Za-z]+/g) || ['?']; return (w.length > 1 ? w[0][0] + w[w.length - 1][0] : w[0].slice(0, 2)).toUpperCase(); };
const Svg = ({ d, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d.map((p) => <path key={p} d={p} />)}</svg>;
const DOTS = ['M12 5h.01', 'M12 12h.01', 'M12 19h.01'], ARROW = ['M5 12h14', 'm12 5 7 7-7 7'], X = ['M18 6 6 18', 'm6 6 12 12'];

export function CustomerCard({ customer, interest, partyType = 'single', meta, outfitter, phaseTime, totalTime, phaseLabel = 'Current phase', onOpen, onMenu, onAssign, selected = false, flag, cta, onDismiss, theme = 'light', controlProps = {}, rootProps = {}, instance, specId }) {
  const c = T[theme] || T.light;
  const [hov, setHov] = React.useState(null);
  const inst = slug(instance || customer);
  const unassigned = !outfitter;
  const flagColor = flag ? (flag.tone === 'danger' ? c.danger : flag.tone === 'info' ? c.info : '#8A742D') : null;
  const ctaTone = cta && cta.tone;
  const ctaBg = ctaTone === 'danger' ? (hov === 'cta' ? c.danger : c.dangerBg) : ctaTone === 'info' ? (hov === 'cta' ? c.info : c.infoBg) : (hov === 'cta' ? c.ink : c.inset);
  const ctaFg = hov === 'cta' ? (theme === 'dark' ? '#0A0A09' : '#FFFFFF') : ctaTone === 'danger' ? c.danger : ctaTone === 'info' ? c.info : c.ink;
  const iconBtn = (k) => ({ width: 44, height: 44, flex: '0 0 44px', border: 'none', borderRadius: 8, background: hov === k ? (theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)') : 'transparent', color: c.mid, display: 'grid', placeItems: 'center', cursor: 'pointer' });
  return (
    <div {...rootProps} data-spec-id={specId || makeSpecId(flag ? 'card-hub-action' : 'card-case', customer, inst)} data-bos-level="component"
      role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} aria-label={onOpen ? `${customer}, ${outfitter ? outfitter.name : 'unassigned'}. Open details` : undefined}
      onClick={onOpen} onKeyDown={onOpen ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(e); } } : undefined}
      onMouseEnter={() => setHov((h) => h || 'card')} onMouseLeave={() => setHov(null)}
      style={{ position: 'relative', boxSizing: 'border-box', width: '100%', background: c.card, border: `1px solid ${c.line}`, borderLeft: flagColor ? `3px solid ${flagColor}` : unassigned ? `3px solid ${c.danger}` : `1px solid ${c.line}`, borderRadius: 10, overflow: 'hidden', cursor: onOpen ? 'pointer' : 'default', boxShadow: selected ? `0 0 0 2px ${c.focus}` : hov ? c.shadowHi : c.shadow, transition: 'box-shadow 150ms cubic-bezier(0.2,0,0,1)' }}>
      {flag && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 4px 0 12px' }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, flex: '0 0 6px', transform: 'rotate(45deg)', background: flagColor }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: flagColor }}>{flag.label}</span>
          {flag.from && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: c.sub, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>from {flag.from}</span>}
          {onDismiss && <button type="button" {...(controlProps.dismiss || {})} data-spec-id={makeSpecId('btn-action', 'dismiss hub card', inst)} data-bos-class="action" aria-label={`Dismiss ${customer}`} onClick={(e) => { e.stopPropagation(); onDismiss(); }} onMouseEnter={() => setHov('x')} onMouseLeave={() => setHov('card')} style={{ ...iconBtn('x'), marginLeft: 'auto' }}><Svg d={X} size={16} /></button>}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 4px 10px 12px' }}>
        <span aria-hidden="true" style={{ width: 32, height: 32, flex: '0 0 32px', borderRadius: 7, background: c.tile, color: c.tileFg, display: 'grid', placeItems: 'center' }}>
          <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d={PARTY[partyType] || PARTY.single} /></svg>
        </span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, lineHeight: 1.2, color: c.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer}</span>
          {interest && <span style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: c.sub, marginTop: 2 }}>{interest}</span>}
          {meta && <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase', color: c.sub, marginTop: 3 }}>{meta}</span>}
        </span>
        {onMenu && <button type="button" {...(controlProps.menu || {})} data-spec-id={makeSpecId('btn-action', 'case menu', inst)} data-bos-class="action" aria-label={`Actions for ${customer}`} aria-haspopup="dialog" onClick={(e) => { e.stopPropagation(); onMenu(e); }} onMouseEnter={() => setHov('m')} onMouseLeave={() => setHov('card')} style={iconBtn('m')}><Svg d={DOTS} /></button>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, margin: '0 12px', padding: '10px 0', borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: unassigned ? c.danger : c.ink }}>{unassigned ? 'Unassigned' : outfitter.name}</span>
          <span style={{ display: 'block', fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: c.sub }}>{unassigned ? 'Awaiting outfitter' : (outfitter.role || 'Assigned outfitter')}</span>
        </span>
        {unassigned ? (
          onAssign ? <button type="button" {...(controlProps.assign || {})} data-spec-id={makeSpecId('btn-action', 'assign', inst)} data-bos-class="action" aria-label={`Assign an outfitter to ${customer}`} onClick={(e) => { e.stopPropagation(); onAssign(e); }} style={{ width: 44, height: 44, margin: -7, border: 'none', background: 'transparent', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px dashed ${c.danger}`, background: c.dangerBg, color: c.danger, display: 'grid', placeItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700 }}>?</span></button>
            : <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px dashed ${c.danger}`, background: c.dangerBg, color: c.danger, display: 'grid', placeItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700 }}>?</span>
        ) : <Avatar initials={outfitter.initials || inits(outfitter.name)} name={outfitter.name} src={outfitter.src} tone={outfitter.tone} theme={theme} specId={makeSpecId('info', 'avatar outfitter', inst)} />}
      </div>
      <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1px auto', alignItems: 'center', gap: 12, margin: '10px 12px 12px', padding: '8px 10px', border: `1px solid ${c.line}`, borderRadius: 8, background: c.well }}>
        <div><dt style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: c.sub }}>{phaseLabel}</dt><dd style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: c.phase }}>{phaseTime}</dd></div>
        <i aria-hidden="true" style={{ display: 'block', width: 1, height: 28, background: c.lineMid }} />
        <div style={{ textAlign: 'right' }}><dt style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: c.mid }}>Total</dt><dd style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: c.ink }}>{totalTime}</dd></div>
      </dl>
      {cta && <button type="button" {...(controlProps.cta || {})} data-spec-id={makeSpecId('btn-action', cta.label, inst)} data-bos-class="action" disabled={cta.disabled} onClick={(e) => { e.stopPropagation(); cta.onClick && cta.onClick(e); }} onMouseEnter={() => setHov('cta')} onMouseLeave={() => setHov('card')}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', minHeight: 48, border: 'none', borderTop: `1px solid ${c.line}`, background: ctaBg, color: ctaFg, fontFamily: "'Bebas Neue', sans-serif", fontSize: 19, letterSpacing: 1.5, cursor: cta.disabled ? 'not-allowed' : 'pointer', opacity: cta.disabled ? 0.5 : 1, transition: 'background 150ms cubic-bezier(0.2,0,0,1)' }}>{cta.label}<Svg d={ARROW} /></button>}
    </div>
  );
}
Object.assign(window, { CustomerCard });
