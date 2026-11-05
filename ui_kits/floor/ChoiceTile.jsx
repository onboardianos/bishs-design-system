import { makeSpecId } from '../spec-ready/SpecLint.jsx';
// ChoiceTile — a photo (or icon) answer card with a live hint line. Promoted from the Floor Workspace check-in
// and the Outfitter Discovery configurator (second build → promotion, component-selection-guide §6).
// Unselected: hairline border. Selected: 2px ink border + ink check. Never gold — selection is state, not a COMMIT.
// `footer` renders OUTSIDE the button (e.g. a "Required" checkbox) so no control is nested inside another.
const T = {
  light: { card: '#FFFFFF', line: 'rgba(0,0,0,0.12)', lineHi: 'rgba(0,0,0,0.32)', sel: '#0A0A09', onSel: '#FFFFFF', fg: '#0A0A09', media: '#F1EFE8', mediaFg: '#3D3D38', shadow: '0 1px 2px rgba(0,0,0,0.04)', shadowHi: '0 10px 22px rgba(0,0,0,0.08)',
    tone: { neutral: '#5E5E57', gate: '#7A4C00', rank: '#1B7A2E', avoid: '#B02525' } },
  dark: { card: '#1C2E2E', line: 'rgba(255,255,255,0.12)', lineHi: 'rgba(255,255,255,0.32)', sel: '#E7DDB4', onSel: '#0A0A09', fg: '#FFFFFF', media: '#203232', mediaFg: '#E7DDB4', shadow: 'none', shadowHi: '0 10px 22px rgba(0,0,0,0.3)',
    tone: { neutral: '#A2A59C', gate: '#FFD43B', rank: '#51CF66', avoid: '#FF8787' } },
};
const CHECK = 'M20 6 9 17l-5-5';

export function ChoiceTile({ label, hint, hintTone = 'neutral', image, imageFit = 'cover', icon, selected = false, multi = false, disabled = false, wide = false, onClick, footer, theme = 'light', instance, specId, density = 'comfortable' }) {
  const c = T[theme] || T.light;
  const k = density === 'compact';
  const [hov, setHov] = React.useState(false);
  const id = specId || makeSpecId('input-choice-tile', label, instance);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, background: c.card, borderRadius: k ? 10 : 14, overflow: 'hidden', boxSizing: 'border-box',
      border: `${selected ? 2 : 1.5}px solid ${selected ? c.sel : hov && !disabled ? c.lineHi : c.line}`, boxShadow: hov && !disabled ? c.shadowHi : c.shadow,
      transition: 'box-shadow 150ms cubic-bezier(0.2,0,0,1), border-color 150ms', opacity: disabled ? 0.45 : 1 }}>
      <button type="button" role={multi ? 'checkbox' : 'radio'} aria-checked={selected} disabled={disabled} data-spec-id={id} onClick={onClick}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', padding: 0, margin: 0, border: 'none', background: 'transparent', color: c.fg, cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'center', font: 'inherit' }}>
        <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', aspectRatio: k ? (image ? '2.2 / 1' : '2.6 / 1') : wide ? '1.6 / 1' : imageFit === 'contain' ? '2 / 1' : '1.34 / 1', background: c.media, color: c.mediaFg, overflow: 'hidden', padding: image && imageFit === 'contain' ? (k ? '6% 8%' : '8% 10%') : 0, boxSizing: 'border-box' }}>
          {image ? <img src={image} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: imageFit === 'contain' ? 'contain' : 'cover', display: 'block' }} /> : icon}
        </span>
        <span style={{ display: 'block', padding: k ? '7px 8px 0' : '11px 10px 2px', fontFamily: "'Source Sans 3', sans-serif", fontSize: k ? 14 : 16, fontWeight: 700, lineHeight: 1.25, textWrap: 'pretty' }}>{label}</span>
        {hint && <span style={{ display: 'block', padding: k ? '1px 8px 8px' : '2px 10px 12px', fontFamily: "'Source Sans 3', sans-serif", fontSize: k ? 12 : 13, fontWeight: 700, color: c.tone[hintTone] || c.tone.neutral }}>{hint}</span>}
        {!hint && <span style={{ display: 'block', height: k ? 8 : 10 }} />}
      </button>
      {selected && (
        <span aria-hidden="true" style={{ position: 'absolute', top: k ? 6 : 9, right: k ? 6 : 9, width: k ? 26 : 32, height: k ? 26 : 32, borderRadius: '50%', background: c.sel, color: c.onSel, display: 'grid', placeItems: 'center', border: `3px solid ${c.card}`, boxShadow: '0 3px 9px rgba(0,0,0,0.17)', pointerEvents: 'none' }}>
          <svg width={k ? 14 : 18} height={k ? 14 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d={CHECK} /></svg>
        </span>
      )}
      {footer && <div style={{ display: 'flex', justifyContent: 'center', padding: '0 10px 10px', marginTop: -4 }}>{footer}</div>}
    </div>
  );
}
Object.assign(window, { ChoiceTile });
