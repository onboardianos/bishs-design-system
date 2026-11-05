import { makeSpecId } from '../spec-ready/SpecLint.jsx';
import { Avatar } from '../portal-dark/Avatar.jsx';
// PhaseAlert — the floor interrupt card ("Pick me a winner" / "Start the deal").
// Anatomy (Floor Workspace rev 2 reference): ink head strip (eyebrow + dismiss) · white body · Bebas title ·
// person rows (customer, outfitter) · WAITING timer well · one COMMIT + Snooze ACTION.
// One alert = one frame = one COMMIT. Timer counts up from waitSeconds; past limitSeconds it turns danger (countdown-to-breach).
const ic = (d) => d.map((p) => <path key={p} d={p} />);
const Svg = ({ d, size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic(d)}</svg>;
const X = ['M18 6 6 18', 'm6 6 12 12'], ARROW = ['M5 12h14', 'm12 5 7 7-7 7'];
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const inits = (n) => { const w = String(n || '?').match(/[A-Za-z]+/g) || ['?']; return (w.length > 1 ? w[0][0] + w[w.length - 1][0] : w[0].slice(0, 2)).toUpperCase(); };

export function PhaseAlert({ eyebrow = 'New MCP', from, title = 'Pick me a winner', people = [], waitSeconds = 0, limitSeconds, ctaLabel = 'Do MCP now', snoozeLabel = 'Snooze 1 min', onCommit, onSnooze, onDismiss, live = true, avatarTone, instance, specId }) {
  const [t, setT] = React.useState(0);
  const [hov, setHov] = React.useState(null);
  React.useEffect(() => { if (!live) return undefined; const id = setInterval(() => setT((x) => x + 1), 1000); return () => clearInterval(id); }, [live]);
  const secs = waitSeconds + t;
  const breach = limitSeconds != null && secs >= limitSeconds;
  const key = instance || (people[0] && people[0].name) || title;
  const id = specId || makeSpecId('card-phase-alert', title, key);
  const inst = String(key).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return (
    <div data-spec-id={id} data-bos-level="frame" role="alertdialog" aria-label={`${title}${people[0] ? `: ${people[0].name}` : ''}`}
      style={{ width: '100%', maxWidth: 420, boxSizing: 'border-box', background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 14px 40px rgba(0,0,0,0.28)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#020000', minHeight: 56, padding: '0 6px 0 20px' }}>
        <span style={{ flex: 1, minWidth: 0, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#A2A59C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{eyebrow}{from ? ` · from ${from}` : ''}</span>
        {onDismiss && <button type="button" data-spec-id={makeSpecId('btn-action', 'dismiss alert', inst)} data-bos-class="action" aria-label="Dismiss for 1 minute" onClick={onDismiss}
          onMouseEnter={() => setHov('x')} onMouseLeave={() => setHov(null)}
          style={{ width: 44, height: 44, border: 'none', borderRadius: 8, background: hov === 'x' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#E7DDB4', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Svg d={X} /></button>}
      </div>
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: '0 0 6px', fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 32, letterSpacing: 0.5, lineHeight: 1.05, color: '#0A0A09' }}>{title}</h2>
        {people.map((p) => (
          <div key={`${p.role || 'c'}-${p.name}`} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0' }}>
            <Avatar initials={p.initials || inits(p.name)} name={p.name} src={p.src} tone={p.tone || avatarTone} theme="light" size="lg" specId={makeSpecId('info', `avatar ${p.role || 'customer'}`, inst)} />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, color: '#0A0A09', lineHeight: 1.15 }}>{p.name}</span>
              {p.role && <span style={{ display: 'block', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: '#3D3D38' }}>{p.role}</span>}
            </span>
          </div>
        ))}
        <div role="timer" aria-label={`Waiting ${clock(secs)}`} data-spec-id={makeSpecId('metric', 'waiting', inst)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 10, minHeight: 56, padding: '0 20px 0 24px', borderRadius: 12, border: `1px solid ${breach ? 'rgba(176,37,37,0.35)' : 'rgba(0,0,0,0.12)'}`, background: breach ? '#FDECEC' : '#F7F6F1' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: breach ? '#B02525' : '#5E4F1F' }}>{breach ? 'Over limit' : 'Waiting'}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: breach ? '#B02525' : '#0A0A09' }}>{clock(secs)}</span>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 20, flexWrap: 'wrap' }}>
          <button type="button" data-spec-id={makeSpecId('btn-commit', ctaLabel, inst)} data-bos-class="commit" onClick={onCommit}
            onMouseEnter={() => setHov('c')} onMouseLeave={() => setHov(null)}
            style={{ flex: '2 1 200px', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, border: 'none', borderRadius: 12, background: hov === 'c' ? '#5E4F1F' : '#8A742D', color: '#FFFFFF', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', transition: 'background 150ms cubic-bezier(0.2,0,0,1)' }}>{ctaLabel}<Svg d={ARROW} /></button>
          {onSnooze && <button type="button" data-spec-id={makeSpecId('btn-action', 'snooze alert', inst)} data-bos-class="action" onClick={onSnooze}
            onMouseEnter={() => setHov('s')} onMouseLeave={() => setHov(null)}
            style={{ flex: '1 1 120px', minHeight: 60, padding: '0 16px', borderRadius: 12, border: `1px solid ${hov === 's' ? '#0A0A09' : 'rgba(0,0,0,0.18)'}`, background: '#FFFFFF', color: '#0A0A09', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>{snoozeLabel}</button>}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { PhaseAlert });
