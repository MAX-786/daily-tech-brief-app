"use client";

import { useAppStore } from "@/lib/store";

export default function ThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        @keyframes spin-in {
          from { transform: rotate(-90deg) scale(0.6); opacity: 0; }
          to   { transform: rotate(0deg)  scale(1);   opacity: 1; }
        }
        .theme-btn { position: relative; overflow: hidden; }
        .theme-btn .icon {
          display: inline-block;
          animation: spin-in 0.25s ease forwards;
        }
        .theme-btn:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
      `}</style>
      <button
        key={isDark ? "moon" : "sun"}
        onClick={toggleTheme}
        className="theme-btn"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "transparent",
          cursor: "pointer",
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          flexShrink: 0,
          transition: "border-color 0.15s, color 0.15s",
        }}
      >
        <span className="icon">{isDark ? "☀️" : "🌙"}</span>
      </button>
    </>
  );
}
