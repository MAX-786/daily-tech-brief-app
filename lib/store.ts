import { create } from "zustand";

type Theme = "light" | "dark";

interface AppStore {
  theme: Theme;
  sidebarCollapsed: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export const useAppStore = create<AppStore>((set, get) => ({
  // SSR-safe default — ThemeInit syncs on mount
  theme: "light",
  sidebarCollapsed: false,

  setTheme: (t) => {
    set({ theme: t });
    try {
      localStorage.setItem("theme", t);
    } catch {}
    applyTheme(t);
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
}));
