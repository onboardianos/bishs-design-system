import { makeSpecId } from '../spec-ready/SpecLint.jsx';
// Kit family "Avatar" (tone × size). Source kit: tone=gold, size=default → 32px, #B89E4A fill, Bebas Neue 13px, #020000 initials.
// Nexus canon (Zach, 2026-10-23): avatars contrast with the surface they sit on.
//   theme="light" (white / cream surface) → INK fill, white initials.
//   theme="dark"  (black / dark-green surface) → WHITE fill, ink initials.
// `tone` overrides the theme default. Gold is reserved for the signed-in user's own avatar in the header.
const TONES = {
  ink:   { bg: '#0A0A09', color: '#FFFFFF' },
  white: { bg: '#FFFFFF', color: '#0A0A09' },
  gold:  { bg: '#B89E4A', color: '#020000' },
  olive: { bg: '#545750', color: '#FFFFFF' },
  cream: { bg: '#E7DDB4', color: '#0A0A09' },
};
const SIZES = { sm: { d: 28, fs: 12, lh: '18px', ls: '0.3px' }, default: { d: 32, fs: 13, lh: '19.500px', ls: '0.325px' }, lg: { d: 44, fs: 17, lh: '26px', ls: '0.425px' } };
export function Avatar({ initials = 'ZM', name, tone, theme = 'light', size = 'default', src, specId }) {
  const t = TONES[tone || (theme === 'dark' ? 'white' : 'ink')] || TONES.ink, s = SIZES[size] || SIZES.default;
  const label = name || initials;
  return (
    <span data-spec-id={specId || makeSpecId('info', `avatar ${label}`)} role="img" aria-label={label} style={{
      position: 'relative', width: s.d, height: s.d, flex: `0 0 ${s.d}px`, overflow: 'hidden', borderRadius: 9999,
      backgroundColor: t.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : (
        <span aria-hidden="true" style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: s.fs, lineHeight: s.lh, letterSpacing: s.ls, color: t.color, textAlign: 'center' }}>{initials}</span>
      )}
    </span>
  );
}
Object.assign(window, { Avatar });
