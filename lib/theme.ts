"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.remove("dark", "light");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  // On mount: read persisted preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? "system";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  };

  // Resolved theme for UI (what the user is actually seeing)
  const resolved: "light" | "dark" =
    theme === "system" ? getSystemTheme() : theme;

  const toggle = () => setTheme(resolved === "dark" ? "light" : "dark");

  return { theme, resolved, toggle };
}
