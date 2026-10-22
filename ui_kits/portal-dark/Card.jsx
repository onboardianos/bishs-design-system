import { makeSpecId } from '../spec-ready/SpecLint.jsx';
import { Badge } from './Badge.jsx';

export function Card({ title, subtitle, children, footer , specId }) {
  return (
    <div data-spec-id={specId || makeSpecId("card", title || subtitle || "card")} style={{ background: "#1C2E2E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden" }}>
      {(title || subtitle) && (
        <div style={{ background: "#243838", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {title && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: 0.5 }}>{title}</div>}
          {subtitle && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: "#A2A59C", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{subtitle}</div>}
        </div>
      )}
      <div style={{ padding: "16px 20px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#E7DDB4", lineHeight: 1.6 }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          {footer}
        </div>
      )}
    </div>
  );
}

export function StatTile({ label, value, delta, deltaType = "neutral" , specId }) {
  const deltaColors = { up: "#51CF66", down: "#FF8787", neutral: "#A2A59C" };
  return (
    <div data-spec-id={specId || makeSpecId("metric", label)} style={{ background: "#1C2E2E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "16px 20px" }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#B89E4A", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 1, color: "#fff", lineHeight: 1 }}>{value}</div>
      {delta && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: deltaColors[deltaType], marginTop: 6 }}>{delta}</div>}
    </div>
  );
}

export function UnitRow({ id, title, phase, status, statusType, onClick , specId }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div data-spec-id={specId || makeSpecId("row-unit", title, id)} data-bos-class={onClick ? "nav" : undefined} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)",
        cursor: onClick ? "pointer" : "default",
        background: hover ? "rgba(255,255,255,0.03)" : "transparent",
        transition: "background 150ms cubic-bezier(0.2,0,0,1)",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "baseline", minWidth: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#B89E4A", flexShrink: 0 }}>{id}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 0.5, color: "#fff" }}>{title}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#A2A59C", marginTop: 2 }}>{phase}</div>
        </div>
      </div>
      <Badge type={statusType}>{status}</Badge>
    </div>
  );
}

Object.assign(window, { Card, StatTile, UnitRow });
