import { makeSpecId } from '../spec-ready/SpecLint.jsx';
import { Badge } from './Badge.jsx';
// theme = surface role. dark: raised-surface elevation. light: white card + shadow on cream page.
const T = {
  dark:  { card: "#1C2E2E", head: "#243838", line: "rgba(255,255,255,0.07)", title: "#fff", sub: "#A2A59C", body: "#E7DDB4", over: "#B89E4A", id: "#B89E4A", hover: "rgba(255,255,255,0.03)", shadow: "none", up: "#51CF66", down: "#FF8787", flat: "#A2A59C" },
  light: { card: "#FFFFFF", head: "#FAFAF6", line: "rgba(0,0,0,0.08)", title: "#0A0A09", sub: "#6B6B63", body: "#3D3D38", over: "#5E4F1F", id: "#5E4F1F", hover: "rgba(0,0,0,0.03)", shadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)", up: "#1B7A2E", down: "#B02525", flat: "#6B6B63" },
};
const th = (t) => T[t] || T.dark;

export function Card({ title, subtitle, children, footer, theme = "dark", specId }) {
  const c = th(theme);
  return (
    <div data-spec-id={specId || makeSpecId("card", title || subtitle || "card")} style={{ background: c.card, border: `1px solid ${c.line}`, borderRadius: 8, overflow: "hidden", boxShadow: c.shadow }}>
      {(title || subtitle) && (
        <div style={{ background: c.head, padding: "16px 20px", borderBottom: `1px solid ${c.line}` }}>
          {title && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: c.title, letterSpacing: 0.5 }}>{title}</div>}
          {subtitle && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: c.sub, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{subtitle}</div>}
        </div>
      )}
      <div style={{ padding: "16px 20px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: c.body, lineHeight: 1.6 }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.line}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          {footer}
        </div>
      )}
    </div>
  );
}

export function StatTile({ label, value, delta, deltaType = "neutral", theme = "dark", specId }) {
  const c = th(theme);
  const deltaColors = { up: c.up, down: c.down, neutral: c.flat };
  return (
    <div data-spec-id={specId || makeSpecId("metric", label)} style={{ background: c.card, border: `1px solid ${c.line}`, borderRadius: 8, padding: "16px 20px", boxShadow: c.shadow }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: c.over, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 1, color: c.title, lineHeight: 1 }}>{value}</div>
      {delta && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: deltaColors[deltaType], marginTop: 6 }}>{delta}</div>}
    </div>
  );
}

export function UnitRow({ id, title, phase, status, statusType, onClick, theme = "dark", specId }) {
  const [hover, setHover] = React.useState(false);
  const c = th(theme);
  return (
    <div data-spec-id={specId || makeSpecId("row-unit", title, id)} data-bos-class={onClick ? "nav" : undefined} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
        padding: "12px 20px", borderBottom: `1px solid ${c.line}`,
        cursor: onClick ? "pointer" : "default",
        background: hover ? c.hover : "transparent",
        transition: "background 150ms cubic-bezier(0.2,0,0,1)",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "baseline", minWidth: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.id, flexShrink: 0 }}>{id}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 0.5, color: c.title }}>{title}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: c.sub, marginTop: 2 }}>{phase}</div>
        </div>
      </div>
      <Badge type={statusType} theme={theme}>{status}</Badge>
    </div>
  );
}

Object.assign(window, { Card, StatTile, UnitRow });
