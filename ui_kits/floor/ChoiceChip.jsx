import { makeSpecId } from '../spec-ready/SpecLint.jsx';
// ChoiceChip — pill pickers for discovery / intake questions (light reference: Payment method, Camping type).
// Unselected: outlined pill. Selected: ink fill + check. Never gold — selection is state, not a COMMIT.
// QuestionCard — the white question surface: gold-lo overline (STEP n · TOPIC) · Bebas question · hint · body.
const T = {
  light: { bg: '#FFFFFF', line: 'rgba(0,0,0,0.28)', lineHi: '#0A0A09', fg: '#0A0A09', onSel: '#FFFFFF', sel: '#0A0A09', hover: 'rgba(0,0,0,0.03)', card: '#FFFFFF', cardLine: 'rgba(0,0,0,0.08)', over: '#5E4F1F', hint: '#3D3D38', shadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)' },
  dark: { bg: 'transparent', line: 'rgba(255,255,255,0.28)', lineHi: '#E7DDB4', fg: '#FFFFFF', onSel: '#0A0A09', sel: '#E7DDB4', hover: 'rgba(255,255,255,0.05)', card: '#1C2E2E', cardLine: 'rgba(255,255,255,0.07)', over: '#C9B26A', hint: '#E7DDB4', shadow: 'none' },
};
const CHECK = 'M20 6 9 17l-5-5';

export function ChoiceChip({ label, selected = false, multi = false, disabled = false, size = 'lg', onClick, theme = 'light', instance, specId }) {
  const c = T[theme] || T.light;
  const [hov, setHov] = React.useState(false);
  return (
    <button type="button" role={multi ? 'checkbox' : 'radio'} aria-checked={selected} disabled={disabled}
      data-spec-id={specId || makeSpecId('input-choice', label, instance)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'md' ? 8 : 10, minHeight: size === 'md' ? 44 : 56, padding: size === 'md' ? '0 18px' : '0 28px', borderRadius: 9999, boxSizing: 'border-box', textAlign: 'left',
        border: `1.5px solid ${selected ? c.sel : hov ? c.lineHi : c.line}`, background: selected ? c.sel : hov ? c.hover : c.bg, color: selected ? c.onSel : c.fg,
        fontFamily: "'Source Sans 3', sans-serif", fontSize: size === 'md' ? 15 : 'clamp(16px, 1.6vw, 20px)', fontWeight: 400, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'background 150ms cubic-bezier(0.2,0,0,1), border-color 150ms' }}>
      {selected && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={CHECK} /></svg>}
      {label}
    </button>
  );
}

export function ChoiceGroup({ label, children, theme = 'light', multi = false, density = 'comfortable' }) {
  const c = T[theme] || T.light;
  const k = density === 'compact';
  return (
    <div role="group" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: k ? 8 : 16 }}>
      {label && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: k ? 13 : 15, fontWeight: 700, letterSpacing: k ? 2 : 4, textTransform: 'uppercase', color: c.over }}>{label}</div>}
      <div role={multi ? undefined : 'radiogroup'} aria-label={label} style={{ display: 'flex', flexWrap: 'wrap', gap: k ? 8 : 16 }}>{children}</div>
    </div>
  );
}

// density="compact": for screens where every option must be visible at once (configurators, in-app steps).
export function QuestionCard({ overline, title, hint, children, theme = 'light', specId, density = 'comfortable' }) {
  const c = T[theme] || T.light;
  const k = density === 'compact';
  return (
    <section data-spec-id={specId || makeSpecId('card-question', title)} data-bos-level="section" aria-label={title}
      style={{ background: c.card, border: `1px solid ${c.cardLine}`, borderRadius: k ? 12 : 16, boxShadow: c.shadow, padding: k ? 'clamp(14px, 2vw, 20px)' : 'clamp(20px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: k ? 14 : 20 }}>
      <div>
        {overline && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: k ? 13 : 15, fontWeight: 700, letterSpacing: k ? 2.5 : 4, textTransform: 'uppercase', color: c.over }}>{overline}</div>}
        <h2 style={{ margin: overline ? (k ? '6px 0 0' : '14px 0 0') : 0, fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: k ? 'clamp(26px, 2.6vw, 34px)' : 'clamp(32px, 4.4vw, 60px)', lineHeight: 1, letterSpacing: 0.5, color: c.fg, textWrap: 'pretty' }}>{title}</h2>
        {hint && <p style={{ margin: k ? '6px 0 0' : '14px 0 0', fontFamily: "'Source Sans 3', sans-serif", fontSize: k ? 15 : 'clamp(15px, 1.6vw, 20px)', color: c.hint }}>{hint}</p>}
      </div>
      {children}
    </section>
  );
}
Object.assign(window, { ChoiceChip, ChoiceGroup, QuestionCard });
