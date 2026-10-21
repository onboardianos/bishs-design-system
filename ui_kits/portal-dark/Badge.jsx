export function Badge({ type = "gold", children }) {
  const types = {
    gold:    { bg: "rgba(139,117,46,0.15)", color: "#B89E4A", border: "rgba(139,117,46,0.28)" },
    success: { bg: "rgba(47,158,68,0.12)",  color: "#51CF66", border: "rgba(47,158,68,0.3)" },
    warning: { bg: "rgba(245,159,0,0.12)",  color: "#FFD43B", border: "rgba(245,159,0,0.3)" },
    danger:  { bg: "rgba(224,49,49,0.12)",  color: "#FF8787", border: "rgba(224,49,49,0.3)" },
    info:    { bg: "rgba(28,126,214,0.12)", color: "#74C0FC", border: "rgba(28,126,214,0.3)" },
    neutral: { bg: "rgba(255,255,255,0.06)",color: "#A2A59C", border: "rgba(255,255,255,0.13)" },
  };
  const t = types[type] || types.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 600,
      letterSpacing: 1, textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 9999,
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
    }}>{children}</span>
  );
}
Object.assign(window, { Badge });
