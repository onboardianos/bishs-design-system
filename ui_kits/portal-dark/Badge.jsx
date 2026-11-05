import { makeSpecId } from '../spec-ready/SpecLint.jsx';
const DARK = {
  gold:    { bg: "rgba(139,117,46,0.15)", color: "#B89E4A", border: "rgba(139,117,46,0.28)" },
  success: { bg: "rgba(47,158,68,0.12)",  color: "#51CF66", border: "rgba(47,158,68,0.3)" },
  warning: { bg: "rgba(245,159,0,0.12)",  color: "#FFD43B", border: "rgba(245,159,0,0.3)" },
  danger:  { bg: "rgba(224,49,49,0.12)",  color: "#FF8787", border: "rgba(224,49,49,0.3)" },
  info:    { bg: "rgba(28,126,214,0.12)", color: "#74C0FC", border: "rgba(28,126,214,0.3)" },
  neutral: { bg: "rgba(255,255,255,0.06)",color: "#A2A59C", border: "rgba(255,255,255,0.13)" },
};
// Light: semantic *-light fill + *-dark text (AA on cream/white). Warning text deepens to #7A4C00 for AA on #FFF3BF.
const LIGHT = {
  gold:    { bg: "rgba(139,117,46,0.12)", color: "#5E4F1F", border: "rgba(139,117,46,0.35)" },
  success: { bg: "#D3F9D8", color: "#1B7A2E", border: "rgba(27,122,46,0.25)" },
  warning: { bg: "#FFF3BF", color: "#7A4C00", border: "rgba(199,124,0,0.3)" },
  danger:  { bg: "#FFE3E3", color: "#B02525", border: "rgba(176,37,37,0.25)" },
  info:    { bg: "#D0EBFF", color: "#1864AB", border: "rgba(24,100,171,0.25)" },
  neutral: { bg: "#EFEDE4", color: "#3D3D38", border: "rgba(0,0,0,0.12)" },
};
export function Badge({ type = "gold", theme = "dark", children , specId }) {
  const map = theme === "light" ? LIGHT : DARK;
  const t = map[type] || map.neutral;
  return (
    <span data-spec-id={specId || makeSpecId("badge", children)} style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 600,
      letterSpacing: 1, textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 9999,
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
    }}>{children}</span>
  );
}
Object.assign(window, { Badge });
