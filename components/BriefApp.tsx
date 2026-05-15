"use client";

import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import BriefContent from "./BriefContent";
import ThemeToggle from "./ThemeToggle";
import { useAppStore } from "@/lib/store";
import type { BriefEntry } from "@/lib/github";

interface BriefAppProps {
  index: BriefEntry[];
  defaultSlug: string;
  defaultContent: string;
}

export default function BriefApp({
  index,
  defaultSlug,
  defaultContent,
}: BriefAppProps) {
  const [activeSlug, setActiveSlug] = useState(defaultSlug);
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);

  const selectBrief = useCallback(
    async (slug: string) => {
      setMobileOpen(false);
      if (slug === activeSlug) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/MAX-786/daily-tech-brief/main/briefs/${slug}.md`
        );
        const text = res.ok ? await res.text() : "";
        setContent(text);
        setActiveSlug(slug);
      } finally {
        setLoading(false);
      }
    },
    [activeSlug]
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 20, backdropFilter: "blur(2px)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        index={index}
        activeSlug={activeSlug}
        onSelect={selectBrief}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Mobile header */}
        <header
          className="mobile-header"
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            position: "sticky", top: 0, zIndex: 10,
          }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open archive"
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: "7px", padding: "0.3rem 0.55rem",
              cursor: "pointer", color: "var(--fg)", fontSize: "1rem", lineHeight: 1,
            }}
          >
            ☰
          </button>
          <span style={{ fontSize: "0.85rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)", flex: 1 }}>
            🗞️ Daily Tech Brief
          </span>
          <ThemeToggle />
        </header>

        {/* Desktop collapsed: show a slim toggle bar */}
        {sidebarCollapsed && (
          <div className="desktop-only" />
        )}

        <div style={{ maxWidth: "740px", width: "100%", margin: "0 auto", padding: "2.5rem 1.75rem 5rem" }}>
          <BriefContent content={content} loading={loading} slug={activeSlug} />
        </div>
      </main>
    </div>
  );
}
