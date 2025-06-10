import { useState } from "react";

export default function ModernButton({
  children,
  onClick,
  primary = true,
  disabled = false,
  style = {},
  ...props
}) {
  const [hover, setHover] = useState(false);

  const baseStyle = {
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "6px 14px",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.3s ease",
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const primaryStyle = {
    background: "linear-gradient(90deg, #4b6cb7, #182848)",
    color: "#fff",
    boxShadow: hover
      ? "0 6px 20px rgba(75, 108, 183, 0.6)"
      : "0 4px 12px rgba(75, 108, 183, 0.4)",
  };

  const outlineStyle = {
    background: "transparent",
    border: "2px solid #4b6cb7",
    color: hover ? "#fff" : "#4b6cb7",
    backgroundColor: hover ? "#4b6cb7" : "transparent",
    boxShadow: hover ? "0 4px 12px rgba(75, 108, 183, 0.4)" : "none",
  };

  const combinedStyle = {
    ...baseStyle,
    ...(primary ? primaryStyle : outlineStyle),
  };

  return (
    <button
      onClick={onClick}
      style={combinedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
