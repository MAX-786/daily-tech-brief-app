"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

// Runs once on mount: reads localStorage (or system pref) and syncs Zustand.
// ThemeInit already applied the class before paint, this just syncs the store.
export default function ThemeSync() {
  const setTheme = useAppStore((s) => s.setTheme);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("theme"); } catch {}
    const resolved =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    // Set store without writing localStorage again (already persisted)
    useAppStore.setState({ theme: resolved as "light" | "dark" });
    // Ensure class is correct (ThemeInit handles pre-paint, this is a safety net)
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.classList.toggle("light", resolved === "light");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
