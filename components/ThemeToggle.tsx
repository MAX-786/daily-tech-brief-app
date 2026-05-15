"use client";

import { Sun, Moon } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function ThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        @keyframes icon-spin-in {
          from { transform: rotate(-60deg) scale(0.7); opacity: 0; }
          to   { transform: rotate(0deg)  scale(1);   opacity: 1; }
        }
        .theme-btn .icon-wrap { animation: icon-spin-in 0.22s ease forwards; display: flex; }
        .theme-btn:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
      `}</style>
      <button
        key={isDark ? "dark" : "light"}
        onClick={toggleTheme}
        className="theme-btn"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
        style={{
          width: "30px", height: "30px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "transparent",
          cursor: "pointer",
          color: "var(--muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.15s, color 0.15s",
        }}
      >
        <span className="icon-wrap">
          {isDark
            ? <Sun size={15} strokeWidth={2} />
            : <Moon size={15} strokeWidth={2} />}
        </span>
      </button>
    </>
  );
}
