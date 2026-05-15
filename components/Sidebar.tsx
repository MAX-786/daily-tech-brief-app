"use client";

import type { BriefEntry } from "@/lib/github";
import { formatShortDate, getTodayIST } from "@/lib/dates";

interface SidebarProps {
  index: BriefEntry[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  index,
  activeSlug,
  onSelect,
  isOpen,
  onClose,
}: SidebarProps) {
  const today = getTodayIST();

  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        // Mobile: slide in/out
        // We handle via CSS in a style tag below
        zIndex: 30,
      }}
      className={`sidebar${isOpen ? " sidebar-open" : ""}`}
    >
      <style>{`
        @media (max-width: 640px) {
          .sidebar {
            position: fixed;
            left: -220px;
            top: 0;
            height: 100vh;
            transition: left 0.22s ease;
          }
          .sidebar.sidebar-open {
            left: 0;
          }
          .mobile-header {
            display: flex !important;
          }
        }
        @media (min-width: 641px) {
          .sidebar {
            position: sticky !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>

      {/* Sidebar header */}
      <div
        style={{
          padding: "1.25rem 1rem 0.75rem",
          borderBottom: "1px solid var(--sidebar-border)",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          🗞️ Tech Brief
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--muted)",
            marginTop: "0.3rem",
            lineHeight: 1.4,
          }}
        >
          New brief every day
          <br />
          at 8 AM IST
        </div>
      </div>

      {/* Mobile close */}
      <button
        onClick={onClose}
        className="sidebar-close"
        style={{
          display: "none",
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted)",
          fontSize: "1rem",
        }}
      >
        ✕
      </button>

      {/* Archive list */}
      <nav style={{ padding: "0.5rem 0", flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontFamily: "var(--font-geist-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--muted)",
            padding: "0.5rem 1rem 0.35rem",
          }}
        >
          Archive
        </div>
        {index.length === 0 && (
          <div
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            No briefs yet
          </div>
        )}
        {index.map((entry) => {
          const isActive = entry.date === activeSlug;
          const isToday = entry.date === today;
          return (
            <button
              key={entry.date}
              onClick={() => onSelect(entry.date)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 1rem",
                background: isActive ? "var(--accent-light)" : "transparent",
                border: "none",
                borderLeft: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--border)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  color: isActive ? "var(--accent)" : "var(--fg)",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {formatShortDate(entry.date)}
              </span>
              {isToday && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    background: "var(--accent)",
                    color: "var(--bg)",
                    borderRadius: "4px",
                    padding: "0.1em 0.4em",
                    fontFamily: "var(--font-geist-mono)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  today
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "0.75rem 1rem",
          borderTop: "1px solid var(--sidebar-border)",
          fontSize: "0.65rem",
          color: "var(--muted)",
          lineHeight: 1.5,
        }}
      >
        Curated by{" "}
        <a
          href="https://github.com/MAX-786"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--link)" }}
        >
          Mohammad K. Hussain
        </a>
        <br />
        Powered by Hermes Agent
      </div>
    </aside>
  );
}
