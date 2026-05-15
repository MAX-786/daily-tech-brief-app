"use client";

import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import BriefContent from "./BriefContent";
import ThemeToggle from "./ThemeToggle";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectBrief = useCallback(
    async (slug: string) => {
      if (slug === activeSlug) {
        setSidebarOpen(false);
        return;
      }
      setLoading(true);
      setSidebarOpen(false);
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
      }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 20,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        index={index}
        activeSlug={activeSlug}
        onSelect={selectBrief}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Mobile header */}
        <header
          className="mobile-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1rem",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open archive"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.35rem 0.6rem",
              cursor: "pointer",
              color: "var(--fg)",
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ☰
          </button>
          <span
            style={{
              fontSize: "0.85rem",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--muted)",
              flex: 1,
            }}
          >
            🗞️ Daily Tech Brief
          </span>
          <ThemeToggle />
        </header>

        <div
          style={{
            maxWidth: "720px",
            width: "100%",
            margin: "0 auto",
            padding: "2rem 1.5rem 4rem",
          }}
        >
          <BriefContent content={content} loading={loading} slug={activeSlug} />
        </div>
      </main>
    </div>
  );
}
