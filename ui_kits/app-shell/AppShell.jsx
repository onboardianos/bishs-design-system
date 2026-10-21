import { NavConfig, NavIcon, SHELL_THEME } from './NavConfig.jsx';

// REQUIRED navigation shell for every Bish's screen (SKILL.md Step 0A).
// Bands are measured from this component's own container (RF05), never the viewport:
//   ≤640 phone · 641–1023 portrait tablet (drawer) · ≥1024 desktop / landscape tablet (side panel)
const FONT = { display: 'var(--font-display)', ui: 'var(--font-ui)', body: 'var(--font-body)', mono: 'var(--font-mono)' };
const SCRIM = 'rgba(2,0,0,0.6)';
const PANEL_KEY = 'bishs.shell.panel';
const WF = 'M73.5 35.5C73.5 35.5 11.5 58.7 7 61C2.5 63.3 0 57.5 2.5 55C5 52.5 15.5 41.3 15.5 30.5C15.5 19.7 4.7 10.7 3.25 9C0.4 5.8 2 0.3 7 2C12 3.7 61 22 71.5 26C77 28.1 80 31.7 73.5 35.5Z';
// Mobile Action glyph — the tap-hand from the Figma nav (assets/icon-action-tap.svg), inlined so it ships in the bundle.
const TAP_PATHS = [["M9.37256 10.318C9.4113 9.95286 9.59831 9.57211 9.84672 9.31494C10.143 9.00471 10.5459 8.83303 10.9643 8.83876C11.4499 8.84676 11.7855 9.05791 12.1107 9.41531C12.3253 9.74779 12.3912 9.887 12.4778 10.2928C12.5376 12.0795 12.5179 14.1756 12.4965 15.9739C13.7471 15.6892 14.244 16.1436 14.8894 17.1678C14.9728 17.3001 16.1279 16.9204 17.0021 18.3828C17.5487 18.5838 17.9171 18.7532 18.18 19.3438C18.1994 19.3872 18.2158 19.432 18.2289 19.478C18.3946 20.2605 17.9072 21.9492 17.813 22.826C17.7824 23.1116 17.6374 23.9927 17.562 24.2653C17.3793 25.4635 17.197 26.652 16.1909 27.4177C15.8885 27.648 15.5441 27.8103 15.1793 27.8945C14.4205 28.0672 11.6479 27.9941 10.7709 27.9132C9.93269 27.8359 9.14572 27.1963 8.60428 26.519C8.04048 25.7476 7.51236 24.9229 6.94411 24.1452C6.2015 23.1289 5.39702 22.1249 4.67416 21.0981C4.31119 20.2455 4.81367 19.3518 5.66298 19.1741C6.17985 19.066 6.53348 19.2557 6.94386 19.5411C7.73193 20.0458 8.51691 20.764 9.29132 21.3123L9.36343 21.259C9.32304 20.8173 9.34114 19.9871 9.34114 19.518L9.34338 16.4261L9.34694 12.5904C9.34774 11.898 9.3274 10.9928 9.37256 10.318Z","#AC8B36"],["M8.60449 26.519C9.1357 26.8424 9.28511 26.3992 9.63539 26.2195C10.6973 25.6746 11.8298 25.2006 12.9314 24.7425C13.1759 24.6407 13.6052 24.6437 13.8666 24.5525C14.8571 24.2602 15.8585 24.0268 16.8912 23.9944C16.9603 23.9923 17.3286 24.1796 17.5014 24.2054L17.489 24.2359L17.5622 24.2652C17.3795 25.4635 17.1972 26.652 16.1911 27.4177C15.8887 27.648 15.5443 27.8103 15.1795 27.8945C14.4207 28.0672 11.6481 27.9941 10.7711 27.9132C9.9329 27.8358 9.14593 27.1962 8.60449 26.519Z","#886A24"],["M12.4964 15.9736C13.747 15.6889 14.244 16.1434 14.8893 17.1675C14.9727 17.2998 16.1279 16.9202 17.0021 18.3825C17.5486 18.5836 17.917 18.753 18.18 19.3436C18.1994 19.387 18.2158 19.4318 18.2289 19.4777C17.9861 19.8099 17.0617 19.1335 16.8431 18.9099C16.6223 18.6841 16.6111 18.5975 16.5542 18.2837C15.7553 18 15.4182 17.9722 14.5863 17.8281C14.5088 17.6053 14.4838 17.3393 14.4517 17.1019C13.9005 16.8852 13.4869 16.5981 12.868 16.6348C12.6485 16.6478 12.3785 16.7229 12.194 16.6145L12.1772 16.5112C12.2251 16.3165 12.3777 16.1371 12.4964 15.9736Z","#E6C757"],["M6.94399 19.541C7.73206 20.0458 8.51704 20.7639 9.29145 21.3122C9.42572 21.4511 9.40644 21.3921 9.43376 21.5676C9.3987 21.7153 9.28951 21.8277 9.17752 21.9233C8.01641 21.2223 7.16453 19.9667 5.83887 19.9187C6.15536 19.8728 6.67984 19.7022 6.94399 19.541Z","#E0C460"],["M9.37256 10.318C9.4113 9.95286 9.5983 9.57211 9.84671 9.31494C10.143 9.00471 10.5459 8.83303 10.9643 8.83876C11.4499 8.84676 11.7855 9.05791 12.1107 9.41531C11.8433 9.65298 11.6472 9.38946 11.6242 9.6286L11.4544 9.69019C10.9037 9.44559 10.551 9.64663 10.0797 9.96885C9.92753 10.1461 9.65637 10.5098 9.41857 10.4936L9.37256 10.318Z","#F1D66F"],["M10.0799 9.96869C9.87068 9.46049 11.2249 8.96348 11.6244 9.62844L11.4546 9.69003C10.9039 9.44544 10.5512 9.64647 10.0799 9.96869Z","#FDF9AF"],["M4.67416 21.0981C4.31119 20.2455 4.81367 19.3518 5.66298 19.1741C6.17985 19.066 6.53348 19.2557 6.94386 19.541C6.67971 19.7022 6.15524 19.8728 5.83874 19.9188C4.91373 20.052 5.11765 20.899 4.67416 21.0981Z","#F1D66F"],["M12.1109 9.41528C12.3256 9.74776 12.3914 9.88698 12.478 10.2928L12.4165 10.4041C12.0439 10.2845 12.1456 9.79879 11.4546 9.69017L11.6244 9.62857C11.6475 9.38944 11.8435 9.65295 12.1109 9.41528Z","#E0C460"],["M9.36328 21.2591C9.38819 21.128 9.40789 21.0135 9.42599 20.8811C9.79772 21.081 9.71056 21.97 9.17725 21.9234C9.28923 21.8278 9.39842 21.7154 9.43348 21.5677C9.40616 21.3922 9.42545 21.4512 9.29117 21.3123L9.36328 21.2591Z","#CDAB4B"],["M10.2409 0.105382C11.8502 -0.324262 13.2529 0.591601 13.6424 2.2739C13.6481 2.29912 13.6532 2.32448 13.6577 2.35001C13.7581 3.2391 13.6563 3.92804 13.1124 4.65757C12.6691 5.25165 12.0168 5.63351 11.3025 5.71713C10.6056 5.80444 9.9044 5.59515 9.35539 5.13597C8.61435 4.51493 8.20536 3.46873 8.35249 2.48159C8.47416 1.30519 9.23034 0.51371 10.2409 0.105382Z","#CDAB4B"],["M12.0121 0.496338C12.5679 0.704521 12.9483 1.23142 13.1935 1.77461C13.285 1.97387 13.3535 2.18396 13.3975 2.40032C13.6287 3.67815 12.7231 5.13099 11.4855 5.35081C10.045 5.60664 9.06905 4.98564 8.73145 3.49052C8.88889 3.20072 9.10922 3.02669 9.38597 2.87628C10.1871 2.44086 10.9224 1.91423 11.6528 1.36167C11.835 1.22378 12.1643 1.01053 12.2856 0.821446C12.254 0.681917 12.1237 0.594923 12.0121 0.496338Z","#A78536"],["M10.2416 0.105382C11.851 -0.324262 13.2536 0.591601 13.6431 2.2739C13.6488 2.29912 13.6539 2.32448 13.6584 2.35001L13.6004 2.43794C13.5406 2.42635 13.4555 2.40721 13.3977 2.40046C13.3536 2.1841 13.2852 1.97401 13.1936 1.77476C12.9484 1.23156 12.568 0.704664 12.0122 0.49648C11.2587 0.110711 11.0066 0.21831 10.2354 0.370762L10.4927 0.176168L10.4656 0.136689L10.2416 0.105382Z","#E0C460"],["M8.35303 2.48143C8.4747 1.30503 9.23088 0.513553 10.2414 0.105225L10.4654 0.136532L10.4926 0.176011L10.2352 0.370605C9.53211 0.704239 9.07386 0.995287 8.74835 1.81683C8.69097 1.9616 8.55454 2.40465 8.53695 2.54538L8.41363 2.60085L8.35303 2.48143Z","#F1D66F"],["M10.7942 0.486348C11.0448 0.453752 11.6222 0.504288 11.788 0.718288C11.655 0.926294 10.8995 0.755857 10.5117 0.894498C10.1028 1.04069 10.1572 0.976341 9.77234 1.25216C9.58698 1.39737 9.25902 1.7648 9.0625 1.9574C9.42268 1.07342 9.88165 0.649013 10.7942 0.486348Z","#FDF9AF"],["M2.02188 4.16688C2.82467 3.99698 3.46951 4.05129 4.16889 4.5431C4.78003 4.97475 5.20208 5.64437 5.34172 6.4037C5.47734 7.15969 5.32062 7.94122 4.90618 8.57559C4.48252 9.2242 3.83713 9.63706 3.10108 9.76567C2.81016 9.92442 2.22737 9.80022 1.92394 9.70532C0.606818 9.29335 -0.350581 7.61869 0.122854 6.1984C0.325169 5.17991 1.12094 4.48657 2.02188 4.16688Z","#B3903C"],["M2.02207 4.16688C2.82486 3.99698 3.4697 4.05129 4.16909 4.5431C4.78022 4.97475 5.20227 5.64437 5.34191 6.4037C5.47754 7.15969 5.32081 7.94122 4.90637 8.57559C4.48271 9.2242 3.83732 9.63706 3.10127 9.76567L3.08917 9.74169L3.12986 9.70305C3.61395 9.61623 4.20914 9.26737 4.53874 8.89545C4.62218 8.80131 5.14607 8.05562 5.15237 7.97835C5.17893 7.65284 5.35295 7.09952 5.33929 6.76402C5.26363 6.66219 5.29391 6.66894 5.20422 6.65713C5.09545 6.8662 5.16785 7.34079 5.11773 7.57899C4.95293 8.36207 3.95184 9.60798 3.1233 9.4696C3.18098 9.46436 3.2851 9.45188 3.34169 9.43439C4.59245 9.04764 5.35012 7.63783 5.04461 6.3024C4.83253 5.40532 4.1904 4.68921 3.35036 4.41303C2.99871 4.299 2.91803 4.40469 2.57205 4.17767L2.55438 4.16582C2.41833 4.1703 2.24261 4.17852 2.19694 4.33812L2.0935 4.35753L2.13118 4.40309C1.30361 4.70835 0.9466 4.91693 0.486402 5.72608C0.386767 5.90122 0.238202 5.98054 0.188976 6.1674L0.123047 6.1984C0.325362 5.17991 1.12113 4.48657 2.02207 4.16688Z","#E0C460"],["M2.38595 4.61434C2.40219 4.61261 2.41843 4.61101 2.43471 4.6095C2.70634 4.58476 3.21619 4.59436 3.4303 4.78202L3.42256 4.85765C3.19047 4.9978 2.31583 4.71213 1.47148 5.35781C1.26654 5.52359 0.990936 5.80042 0.800293 5.98787C1.15633 5.15825 1.51833 4.79162 2.38595 4.61434Z","#FDF9AF"],["M16.6689 6.45589C16.9718 4.88804 18.4948 3.64871 20.0119 4.17938C20.5508 4.33432 21.0294 4.66364 21.3798 5.12055C21.6138 5.42297 21.829 5.81793 21.9046 6.20415C22.0932 6.93705 22.0004 7.71836 21.6461 8.38012C21.2977 9.03069 20.7156 9.5075 20.0298 9.70396C19.3156 9.91227 18.6418 9.814 18.0002 9.42934C17.3692 9.04473 16.9095 8.41285 16.722 7.67248C16.6121 7.2396 16.6098 6.89366 16.6689 6.45589Z","#B89640"],["M21.9046 6.20435C22.0932 6.93725 22.0004 7.71856 21.6461 8.38032C21.2977 9.03089 20.7156 9.5077 20.0298 9.70416C19.3156 9.91247 18.6418 9.8142 18.0002 9.42954C17.3692 9.04493 16.9095 8.41305 16.722 7.67268C16.6121 7.2398 16.6098 6.89386 16.6689 6.45609L16.8718 6.44899C16.7273 7.20205 17.2848 8.65298 17.9344 9.07588C17.9077 8.99683 17.8232 8.88377 17.7741 8.81116L17.7986 8.72528C18.215 8.24643 19.5886 7.64022 20.1616 7.28754C20.4273 7.12394 20.9859 7.0468 21.3234 6.93037C21.4976 6.96962 21.4365 7.03233 21.6189 7.1751L21.7065 7.14641C21.7468 6.77689 21.7726 6.59074 21.6605 6.22766C21.774 6.24675 21.7933 6.2381 21.9046 6.20435Z","#90712D"],["M21.9046 6.20435C22.0932 6.93725 22.0004 7.71856 21.6461 8.38032C21.2977 9.03089 20.7156 9.5077 20.0298 9.70416C19.3156 9.91247 18.6418 9.8142 18.0002 9.42954C17.3692 9.04493 16.9095 8.41305 16.722 7.67268C16.6121 7.2398 16.6098 6.89386 16.6689 6.45609L16.8718 6.44899C16.7273 7.20205 17.2848 8.65298 17.9344 9.07588C17.9369 9.07974 17.9394 9.0836 17.9419 9.08742C18.613 9.72152 20.0906 9.54971 20.7039 9.00225C21.3876 8.392 21.6018 7.9902 21.7065 7.14641C21.7468 6.77689 21.7726 6.59074 21.6605 6.22766C21.774 6.24675 21.7933 6.2381 21.9046 6.20435Z","#D2B454"],["M16.6689 6.45589C16.9718 4.88804 18.4948 3.64871 20.012 4.17938C20.5508 4.33432 21.0294 4.66364 21.3798 5.12055C21.2887 5.17691 21.2397 5.21839 21.1344 5.23011C20.7322 4.69242 20.0717 4.37477 19.4444 4.24612C19.2487 4.29684 18.9383 4.26211 18.884 4.29009C18.1662 4.65947 17.4395 4.87192 17.1404 5.76313C17.0601 5.96936 17.0082 6.29407 16.8718 6.44879L16.6689 6.45589Z","#F1D66F"],["M21.3801 5.12061C21.6142 5.42302 21.8293 5.81798 21.9049 6.2042C21.7936 6.23795 21.7744 6.24661 21.6609 6.22751C21.5134 5.90795 21.3046 5.54346 21.1348 5.23016C21.24 5.21844 21.289 5.17696 21.3801 5.12061Z","#E0C460"],["M18.9954 4.61186C19.2169 4.58712 19.9369 4.60116 20.0647 4.80623C19.8286 5.02081 19.1027 4.85783 18.6936 5.02432C18.3221 5.17548 18.3489 5.15057 18.0146 5.4076C17.7689 5.60943 17.6423 5.892 17.3442 6.14388C17.6395 5.24147 18.1129 4.82066 18.9954 4.61186Z","#FDF9AF"]];

const bandOf = (w) => (w <= 640 ? 'ph' : w <= 1023 ? 'tab' : 'dt');

function useContainerWidth(ref) {
  const [w, setW] = React.useState(1440);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setW(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return w;
}

function TapIcon({ size = 28 }) {
  return (
    <svg width={size * 22 / 28} height={size} viewBox="0 0 22 28" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      {TAP_PATHS.map((p, i) => <path key={i} d={p[0]} fill={p[1]} />)}
    </svg>
  );
}

function Wordmark({ src, height = 24 }) {
  if (src) return <img src={src} alt="Bish's OS" style={{ height, width: 'auto', display: 'block', flexShrink: 0 }} />;
  return (
    <span aria-label="Bish's OS" style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(height * 0.12), flexShrink: 0, fontFamily: FONT.display, fontSize: height * 1.15, lineHeight: 1, letterSpacing: 1, color: 'currentColor' }}>
      BISHS
      <svg width={height * 0.42} height={height * 0.33} viewBox="0 0 80 63" aria-hidden="true"><path d={WF} fill="var(--accent-gold)" /></svg>
      <span style={{ color: 'var(--accent-gold)' }}>OS</span>
    </span>
  );
}

function IconBtn({ spec, label, onClick, children, T, cls = 'nav', expanded }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" data-spec-id={spec} data-bos-class={cls} aria-label={label} aria-expanded={expanded}
      onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', width: 44, height: 44, flex: '0 0 44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8, background: h ? T.hover : 'transparent', color: T.text, cursor: 'pointer', padding: 0 }}>
      {children}
    </button>
  );
}

function Avatar({ initials, size = 36, T }) {
  return (
    <span aria-hidden="true" style={{ width: size, height: size, flex: `0 0 ${size}px`, borderRadius: '50%', background: T.ink, color: T.onInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.ui, fontWeight: 700, fontSize: Math.round(size * 0.38), letterSpacing: 0.5 }}>
      {initials}
    </span>
  );
}

function CountBadge({ n, style }) {
  if (!n) return null;
  return (
    <span style={{ position: 'absolute', minWidth: 18, height: 18, padding: '0 5px', boxSizing: 'border-box', borderRadius: 9, background: 'var(--semantic-danger-dark)', color: 'var(--brand-white)', fontFamily: FONT.mono, fontSize: 11, lineHeight: '18px', textAlign: 'center', ...style }}>
      {n > 99 ? '99+' : n}
    </span>
  );
}

function NavItem({ item, current, expanded, onClick, T }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" data-spec-id={`nav-${item.id}`} data-bos-class="nav" data-bos-guide-safe="true"
      aria-current={current ? 'page' : undefined} title={expanded ? undefined : item.label}
      onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 44, padding: expanded ? '0 12px' : 0, justifyContent: expanded ? 'flex-start' : 'center', border: 'none', borderRadius: 8, background: current || h ? T.hover : 'transparent', color: current ? T.current : T.body, cursor: 'pointer', textAlign: 'left' }}>
      {current && <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 10, bottom: 10, width: 3, borderRadius: 2, background: T.current }} />}
      <NavIcon name={item.icon} size={20} stroke={current ? 1.9 : 1.5} />
      {expanded && (
        <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: current ? 600 : 500, letterSpacing: 0.5, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
      )}
    </button>
  );
}

function NavGroups({ groups, activeId, expanded, onPick, T }) {
  return groups.map((g) => (
    <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {expanded
        ? <div style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.muted, padding: '0 12px 6px' }}>{g.label}</div>
        : <div aria-hidden="true" style={{ height: 1, background: T.line, margin: '4px 8px 8px' }} />}
      {g.items.map((it) => <NavItem key={it.id} item={it} current={it.id === activeId} expanded={expanded} onClick={() => onPick(it.id)} T={T} />)}
    </div>
  ));
}

function MenuRow({ spec, label, on, onClick, T }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" role="menuitem" data-spec-id={spec} data-bos-class="action" onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', minHeight: 44, padding: '0 16px', border: 'none', background: h ? T.hover : 'transparent', color: on ? T.current : T.text, fontFamily: FONT.body, fontSize: 15, fontWeight: on ? 600 : 400, cursor: 'pointer', textAlign: 'left' }}>
      {label}
      {on && <NavIcon name="check" size={18} stroke={2} />}
    </button>
  );
}

function ProfileMenu({ roleKey, cfg, onRoleChange, onClose, T }) {
  const r = cfg.roles[roleKey];
  return (
    <div role="menu" data-spec-id="list-profile-menu" style={{ position: 'absolute', right: 8, top: 'calc(100% + 6px)', zIndex: 60, width: 272, maxWidth: 'calc(100% - 16px)', background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', color: T.text }}>
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ fontFamily: FONT.ui, fontSize: 16, fontWeight: 600 }}>{r.user.name}</div>
        <div style={{ fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: T.muted, marginTop: 2 }}>{r.title}</div>
      </div>
      {onRoleChange && (
        <div style={{ padding: '8px 0', borderBottom: `1px solid ${T.line}` }}>
          <div style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.muted, padding: '4px 16px 6px' }}>View as role</div>
          {Object.keys(cfg.roles).map((k) => (
            <MenuRow key={k} spec={`menuitem-role#${k}`} label={cfg.roles[k].label} on={k === roleKey} T={T} onClick={() => { onRoleChange(k); onClose(); }} />
          ))}
        </div>
      )}
      <div style={{ padding: '8px 0' }}>
        <MenuRow spec="menuitem-my-profile" label="My profile" onClick={onClose} T={T} />
        <MenuRow spec="menuitem-sign-out" label="Sign out" onClick={onClose} T={T} />
      </div>
    </div>
  );
}

function TabItem({ spec, icon, label, current, onClick, T, badge = 0, dim }) {
  return (
    <button type="button" data-spec-id={spec} data-bos-class="nav" data-bos-guide-safe="true"
      aria-current={current ? 'page' : undefined} aria-label={badge ? `${label}, ${badge} new` : label}
      onClick={onClick} disabled={dim}
      style={{ position: 'relative', minWidth: 0, minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 4, padding: '0 0 4px', border: 'none', background: 'transparent', cursor: 'pointer', color: current ? T.current : T.muted, opacity: dim ? 0.35 : 1 }}>
      <span style={{ position: 'relative', display: 'flex' }}>
        <NavIcon name={icon} size={24} stroke={current ? 1.9 : 1.6} />
        <CountBadge n={badge} style={{ top: -6, right: -12 }} />
      </span>
      <span style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: current ? 700 : 600, letterSpacing: 1, textTransform: 'uppercase', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </button>
  );
}

function PhaseArc({ phases, currentPhase, onPick }) {
  const n = phases.length;
  return (
    <div data-spec-id="list-phase-arc" style={{ position: 'relative', width: '100%', maxWidth: 400, height: 184, flexShrink: 0 }}>
      {phases.map((p, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const ang = Math.PI * (0.92 - 0.84 * t);
        const cur = p.id === currentPhase;
        return (
          <button key={p.id} type="button" data-spec-id={`btn-action-phase#${p.id}`} data-bos-class="action"
            aria-pressed={cur} aria-label={cur ? `${p.label}, current phase` : `Move to ${p.label}`} onClick={() => onPick(p.id)}
            style={{ position: 'absolute', left: `${50 + 42 * Math.cos(ang)}%`, top: 150 - 104 * Math.sin(ang), transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
            <span style={{ width: cur ? 60 : 48, height: cur ? 60 : 48, borderRadius: '50%', boxSizing: 'border-box', background: cur ? 'var(--brand-white)' : 'rgba(255,255,255,0.12)', border: cur ? '4px solid var(--accent-gold-hi)' : '2px solid var(--accent-gold-hi)', boxShadow: cur ? 'var(--shadow-lg)' : 'none' }} />
            <span style={{ fontFamily: FONT.display, fontSize: 20, letterSpacing: 0.5, lineHeight: 1, color: 'var(--brand-white)' }}>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ActionOverlay({ actions = [], phases = [], currentPhase, onAction, onPhase, onClose, bottomInset = 100 }) {
  const pills = actions.filter((a) => a.kind !== 'terminal');
  const terms = actions.filter((a) => a.kind === 'terminal');
  const run = (fn, id) => { if (fn) fn(id); if (onClose) onClose(); };
  return (
    <div role="dialog" aria-modal="true" aria-label="Actions" data-spec-id="sec-action-overlay" data-bos-level="layer" data-bos-type="action"
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{ position: 'absolute', inset: 0, zIndex: 75, background: SCRIM, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 20, padding: `24px 16px ${bottomInset}px`, boxSizing: 'border-box', overflowY: 'auto' }}>
      {pills.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, width: '100%', maxWidth: 400 }}>
          {pills.map((a) => (
            <button key={a.id} type="button" data-spec-id={`btn-action-${a.id}`} data-bos-class="action" onClick={() => run(onAction, a.id)}
              style={{ minHeight: 52, padding: '0 14px', borderRadius: 999, border: '1.5px solid var(--accent-gold)', background: 'var(--surface-light-card)', color: 'var(--accent-gold-lo)', fontFamily: FONT.ui, fontSize: 17, fontWeight: 600, letterSpacing: 0.5, cursor: 'pointer' }}>
              {a.label}
            </button>
          ))}
        </div>
      )}
      {terms.map((a) => (
        <button key={a.id} type="button" data-spec-id={`btn-action-${a.id}`} data-bos-class="action" onClick={() => run(onAction, a.id)}
          style={{ minHeight: 52, padding: '0 40px', borderRadius: 999, border: '1.5px solid var(--brand-white)', background: 'var(--brand-black)', color: 'var(--brand-white)', fontFamily: FONT.ui, fontSize: 18, fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer' }}>
          {a.label}
        </button>
      ))}
      {phases.length > 0 && <PhaseArc phases={phases} currentPhase={currentPhase} onPick={(id) => run(onPhase, id)} />}
      {!pills.length && !terms.length && !phases.length && (
        <div style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.5, color: 'var(--brand-white)', textAlign: 'center', maxWidth: 300, marginBottom: 24 }}>
          No actions are switched on for this role. An admin can add them in Roles &amp; Navigation.
        </div>
      )}
    </div>
  );
}

export function AppShell({
  role = 'outfitter', activeId, onNavigate, onRoleChange, onAction, onPhase, currentPhase,
  alerts = 0, logoSrc, logoSrcDark, theme = 'light', height = '100vh', children,
}) {
  const T = SHELL_THEME[theme] || SHELL_THEME.light;
  const cfg = NavConfig.useConfig();
  const nav = NavConfig.navFor(cfg, role);
  const r = nav.role;
  const rootRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const w = useContainerWidth(rootRef);
  const band = bandOf(w);
  const logo = theme === 'dark' ? logoSrcDark : logoSrc;

  const [pref, setPref] = React.useState(() => { try { return window.localStorage.getItem(PANEL_KEY) || 'expanded'; } catch (e) { return 'expanded'; } });
  const [drawer, setDrawer] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [qFocus, setQFocus] = React.useState(false);
  const expanded = pref !== 'collapsed';

  const togglePanel = () => {
    const v = expanded ? 'collapsed' : 'expanded';
    setPref(v);
    try { window.localStorage.setItem(PANEL_KEY, v); } catch (e) {}
  };
  const pick = (id) => { setDrawer(false); setActionsOpen(false); setMenu(false); if (onNavigate) onNavigate(id); };

  React.useEffect(() => { if (band === 'dt') setDrawer(false); if (band !== 'ph') setActionsOpen(false); }, [band]);
  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') { setDrawer(false); setMenu(false); setActionsOpen(false); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && searchRef.current) { e.preventDefault(); searchRef.current.focus(); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const menuEl = menu && <ProfileMenu roleKey={role} cfg={cfg} onRoleChange={onRoleChange} onClose={() => setMenu(false)} T={T} />;
  const bell = (
    <IconBtn spec="info-alerts" cls="info" label={alerts ? `Notifications, ${alerts} new` : 'Notifications'} T={T} onClick={() => pick('alerts')}>
      <NavIcon name="bell" size={22} />
      <CountBadge n={alerts} style={{ top: 5, right: 3 }} />
    </IconBtn>
  );
  const showProfileText = band === 'dt' && w >= 1180;

  const header = band === 'ph' ? (
    <header data-spec-id="sec-header" data-bos-level="shell" data-bos-section="S01" data-bos-type="header"
      style={{ position: 'relative', zIndex: menu ? 56 : 'auto', flexShrink: 0, height: 60, display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px 0 4px', background: T.page, color: T.text }}>
      <IconBtn spec="btn-nav-open-menu" label="Open menu" expanded={drawer} onClick={() => setDrawer(true)} T={T}>
        <NavIcon name="menu" size={22} />
      </IconBtn>
      <Wordmark src={logo} height={w < 380 ? 15 : 18} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', maxWidth: 280, height: 44, padding: '0 10px', boxSizing: 'border-box', border: `1px solid ${qFocus ? 'var(--accent-gold-hi)' : T.input}`, borderRadius: 999, background: T.card }}>
          <NavIcon name="search" size={16} color={T.muted} />
          <input ref={searchRef} data-spec-id="input-search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
            onFocus={() => setQFocus(true)} onBlur={() => setQFocus(false)} placeholder="Search" aria-label="Global search"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT.body, fontSize: 16, color: T.text }} />
        </label>
      </div>
      <button type="button" data-spec-id="info-profile" data-bos-class="info" aria-haspopup="menu" aria-expanded={menu} aria-label={`Account: ${r.user.name}${r.status ? ', status ' + r.status : ''}`} onClick={() => setMenu((m) => !m)}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, flexShrink: 0, padding: w >= 480 ? '4px 4px 4px 10px' : 4, border: `1px solid ${T.line}`, borderRadius: 999, background: T.card, color: T.text, cursor: 'pointer' }}>
        {r.status && w >= 420 && <span style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.body }}>{r.status}</span>}
        {w >= 480 && <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>{r.user.short || r.user.name}</span>}
        <Avatar initials={r.user.initials} size={34} T={T} />
        {r.status && w < 420 && <span aria-hidden="true" style={{ position: 'absolute', right: 2, bottom: 2, width: 10, height: 10, borderRadius: '50%', background: 'var(--semantic-success-dark)', border: `2px solid ${T.card}` }} />}
      </button>
      {menuEl}
    </header>
  ) : (
    <header data-spec-id="sec-header" data-bos-level="shell" data-bos-section="S01" data-bos-type="header"
      style={{ position: 'relative', zIndex: menu ? 56 : 'auto', flexShrink: 0, height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px', background: T.card, borderBottom: '1px solid var(--border-gold)', color: T.text }}>
      <IconBtn spec={band === 'tab' ? 'btn-nav-open-drawer' : 'btn-nav-toggle-panel'} T={T}
        label={band === 'tab' ? 'Open navigation' : expanded ? 'Collapse navigation' : 'Expand navigation'}
        expanded={band === 'tab' ? drawer : expanded} onClick={band === 'tab' ? () => setDrawer(true) : togglePanel}>
        <NavIcon name="menu" size={22} />
      </IconBtn>
      <Wordmark src={logo} height={24} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', maxWidth: band === 'dt' ? 576 : 400, height: 44, padding: '0 12px', boxSizing: 'border-box', border: `1px solid ${qFocus ? 'var(--accent-gold-hi)' : T.input}`, boxShadow: qFocus ? '0 0 0 3px rgba(139,117,46,0.15)' : 'none', borderRadius: 8, background: T.card }}>
          <NavIcon name="search" size={18} color={T.muted} />
          <input ref={searchRef} data-spec-id="input-search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
            onFocus={() => setQFocus(true)} onBlur={() => setQFocus(false)} placeholder={r.search || 'Search'} aria-label="Global search"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT.body, fontSize: 15, color: T.text }} />
          {band === 'dt' && <kbd style={{ fontFamily: FONT.mono, fontSize: 11, color: T.muted, border: `1px solid ${T.line}`, borderRadius: 4, padding: '2px 6px' }}>⌘K</kbd>}
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {bell}
        <button type="button" data-spec-id="info-profile" data-bos-class="info" aria-haspopup="menu" aria-expanded={menu} aria-label={`Account: ${r.user.name}`} onClick={() => setMenu((m) => !m)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '4px 8px 4px 4px', border: 'none', borderRadius: 999, background: menu ? T.hover : 'transparent', color: T.text, cursor: 'pointer' }}>
          <Avatar initials={r.user.initials} T={T} />
          {showProfileText && (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
              <span style={{ fontFamily: FONT.ui, fontSize: 15, fontWeight: 600 }}>{r.user.name}</span>
              <span style={{ fontFamily: FONT.ui, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: T.muted }}>{r.title}</span>
            </span>
          )}
          {band === 'dt' && <NavIcon name="chevronDown" size={16} color={T.muted} />}
        </button>
      </div>
      {menuEl}
    </header>
  );

  const panel = band === 'dt' && (
    <nav aria-label="Primary" data-spec-id="sec-side-panel" data-bos-level="shell" data-bos-section="S02" data-bos-type="nav"
      style={{ width: expanded ? 240 : 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: T.panel, borderRight: `1px solid ${T.line}`, transition: 'width var(--duration-normal) var(--ease-standard)', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <NavGroups groups={nav.groups} activeId={activeId} expanded={expanded} onPick={pick} T={T} />
      </div>
      <div style={{ padding: 12, borderTop: `1px solid ${T.line}` }}>
        <button type="button" data-spec-id="btn-nav-collapse-panel" data-bos-class="nav" aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'} aria-expanded={expanded} onClick={togglePanel}
          style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 44, padding: expanded ? '0 12px' : 0, justifyContent: expanded ? 'flex-start' : 'center', border: 'none', borderRadius: 8, background: 'transparent', color: T.muted, cursor: 'pointer' }}>
          <span style={{ display: 'flex', transform: expanded ? 'none' : 'rotate(180deg)' }}><NavIcon name="chevronsLeft" size={20} /></span>
          {expanded && <span style={{ fontFamily: FONT.ui, fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>Collapse</span>}
        </button>
      </div>
    </nav>
  );

  const drawerGroups = band === 'ph' ? nav.menuGroups : nav.groups;
  const drawerEl = band !== 'dt' && drawer && (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70 }}>
      <div aria-hidden="true" onClick={() => setDrawer(false)} style={{ position: 'absolute', inset: 0, background: SCRIM }} />
      <nav role="dialog" aria-modal="true" aria-label={band === 'ph' ? 'Menu' : 'Navigation'} data-spec-id="sec-drawer" data-bos-level="shell" data-bos-section="S03" data-bos-type="nav"
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 'min(300px, 86%)', display: 'flex', flexDirection: 'column', background: T.panel, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 0 16px', borderBottom: `1px solid ${T.line}`, color: T.text }}>
          <Wordmark src={logo} height={22} />
          <IconBtn spec="btn-nav-close-drawer" label="Close navigation" onClick={() => setDrawer(false)} T={T}><NavIcon name="x" size={22} /></IconBtn>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {drawerGroups.length
            ? <NavGroups groups={drawerGroups} activeId={activeId} expanded onPick={pick} T={T} />
            : <p style={{ margin: '4px 12px', fontSize: 14, lineHeight: 1.5, color: T.body }}>No menu buttons are switched on for this role. An admin can add them in Roles &amp; Navigation.</p>}
        </div>
      </nav>
    </div>
  );

  const slots = nav.slots.slice(0, 2);
  const tabbar = band === 'ph' && (
    <nav aria-label="Tab bar" data-spec-id="sec-tab-bar" data-bos-level="shell" data-bos-section="S04" data-bos-type="nav"
      style={{ position: 'relative', zIndex: 80, flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', alignItems: 'end', padding: '8px 4px 10px', background: actionsOpen ? 'transparent' : T.page, borderTop: `1px solid ${actionsOpen ? 'transparent' : T.line}` }}>
      {slots.map((s) => <TabItem key={s.id} spec={`nav-tab-${s.id}`} icon={s.icon} label={s.short || s.label} current={s.id === activeId} onClick={() => pick(s.id)} T={T} dim={actionsOpen} />)}
      {slots.length < 2 && Array.from({ length: 2 - slots.length }).map((_, i) => <span key={`gap${i}`} />)}
      <button type="button" data-spec-id="btn-action-open-actions" data-bos-class="action" aria-label={actionsOpen ? 'Close actions' : 'Open actions'} aria-expanded={actionsOpen} onClick={() => setActionsOpen((o) => !o)}
        style={{ position: 'relative', minWidth: 0, minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 4, padding: '0 0 4px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
        <span style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 62, height: 62, boxSizing: 'border-box', borderRadius: '50%', background: 'var(--brand-black)', border: '4px solid var(--surface-light-card)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {actionsOpen ? <NavIcon name="x" size={24} color="var(--brand-white)" stroke={2.2} /> : <TapIcon size={28} />}
        </span>
        <span style={{ fontFamily: FONT.ui, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: actionsOpen ? 'var(--brand-white)' : T.text }}>Action</span>
      </button>
      <TabItem spec="nav-tab-alerts" icon="bell" label="Alerts" current={activeId === 'alerts'} badge={alerts} onClick={() => pick('alerts')} T={T} dim={actionsOpen} />
      <TabItem spec="nav-tab-messenger" icon="message" label="Messenger" current={activeId === 'messenger'} onClick={() => pick('messenger')} T={T} dim={actionsOpen} />
    </nav>
  );

  return (
    <div ref={rootRef} data-spec-id="frame-app-shell" data-bos-level="frame" data-bos-bp={band} data-bos-role={role} data-bos-ready="true"
      style={{ position: 'relative', height, width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: T.page, color: T.text, fontFamily: FONT.body, colorScheme: theme }}>
      <style>{'.bos-shell-canvas :is(h1,h2,h3,h4,h5,h6,p){color:inherit}'}</style>
      {menu && <div aria-hidden="true" onClick={() => setMenu(false)} style={{ position: 'absolute', inset: 0, zIndex: 50 }} />}
      {header}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {panel}
        <main data-spec-id="canvas" data-bos-level="canvas" className="bos-shell-canvas" style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'auto', position: 'relative', background: T.page, color: T.text }}>
          {children}
        </main>
      </div>
      {tabbar}
      {drawerEl}
      {band === 'ph' && actionsOpen && (
        <ActionOverlay actions={nav.actions} phases={nav.phases} currentPhase={currentPhase} onAction={onAction} onPhase={onPhase} onClose={() => setActionsOpen(false)} />
      )}
    </div>
  );
}

Object.assign(window, { AppShell, ActionOverlay });
