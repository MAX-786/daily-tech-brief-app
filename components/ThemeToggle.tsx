"use client";

import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "44px",
        height: "24px",
        borderRadius: "999px",
        border: "1px solid var(--border)",
        backgroundColor: isDark ? "var(--accent)" : "var(--sidebar-bg)",
        cursor: "pointer",
        padding: "2px",
        transition: "background-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      {/* Track icons */}
      <span
        style={{
          position: "absolute",
          left: "5px",
          fontSize: "10px",
          lineHeight: 1,
          opacity: isDark ? 0 : 1,
          transition: "opacity 0.15s",
          userSelect: "none",
        }}
      >
        ☀️
      </span>
      <span
        style={{
          position: "absolute",
          right: "5px",
          fontSize: "10px",
          lineHeight: 1,
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.15s",
          userSelect: "none",
        }}
      >
        🌙
      </span>

      {/* Thumb */}
      <span
        style={{
          position: "absolute",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          backgroundColor: isDark ? "#111110" : "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transform: isDark ? "translateX(20px)" : "translateX(0px)",
          transition: "transform 0.2s ease, background-color 0.2s ease",
          left: "2px",
        }}
      />
    </button>
  );
}
