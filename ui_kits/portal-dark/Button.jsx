import { makeSpecId } from '../spec-ready/SpecLint.jsx';
export function Button({ variant = "primary", size = "md", disabled = false, children, onClick , specId }) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: { fontSize: 12, padding: "6px 12px", height: 32 },
    md: { fontSize: 13, padding: "8px 16px", height: 40 },
    lg: { fontSize: 14, padding: "10px 24px", height: 48 },
  };
  const s = sizes[size];
  const variants = {
    primary: { bg: disabled ? "#4A4D46" : hover ? "#B89E4A" : "#8B752E", color: disabled ? "#A2A59C" : "#020000", border: "none" },
    secondary: { bg: hover ? "rgba(139,117,46,0.08)" : "transparent", color: disabled ? "#4A4D46" : "#B89E4A", border: `1px solid ${hover ? "#B89E4A" : "rgba(139,117,46,0.55)"}` },
    ghost: { bg: hover ? "rgba(255,255,255,0.06)" : "transparent", color: disabled ? "#4A4D46" : "#E7DDB4", border: "none" },
    danger: { bg: hover ? "#B02525" : "#E03131", color: "#fff", border: "none" },
  };
  const v = variants[variant];
  return (
    <button data-spec-id={specId || makeSpecId(variant === "primary" ? "btn-commit" : "btn-action", children)} data-bos-class={variant === "primary" ? "commit" : "action"}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: 0.5,
        fontSize: s.fontSize, padding: s.padding, height: s.height,
        background: v.bg, color: v.color, border: v.border, borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled && variant === "primary" ? 0.6 : 1,
        transition: "all 150ms cubic-bezier(0.2,0,0,1)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >{children}</button>
  );
}
Object.assign(window, { Button });
