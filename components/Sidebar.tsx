"use client";

import type { BriefEntry } from "@/lib/github";
import { formatShortDate, getTodayIST } from "@/lib/dates";
import ThemeToggle from "./ThemeToggle";
import { useAppStore } from "@/lib/store";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarProps {
  index: BriefEntry[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  index, activeSlug, onSelect, mobileOpen, onMobileClose,
}: SidebarProps) {
  const today = getTodayIST();
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-item { transition: background 0.12s, border-color 0.12s; }
        .nav-item:hover { background: var(--border) !important; }
        .collapse-btn:hover { border-color: var(--accent) !important; color: var(--accent) !important; }

        @media (max-width: 640px) {
          .sidebar-root {
            position: fixed !important;
            left: -240px; top: 0; height: 100vh;
            transition: left 0.22s cubic-bezier(.4,0,.2,1);
          }
          .sidebar-root.mobile-open {
            left: 0;
            box-shadow: 4px 0 28px rgba(0,0,0,0.2);
          }
          .mobile-header { display: flex !important; }
          .collapse-btn { display: none !important; }
        }
        @media (min-width: 641px) {
          .mobile-header { display: none !important; }
          .sidebar-root { position: sticky !important; top: 0; }
        }
      `}</style>

      <aside
        className={`sidebar-root${mobileOpen ? " mobile-open" : ""}`}
        style={{
          width: collapsed ? "48px" : "224px",
          flexShrink: 0,
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
          display: "flex", flexDirection: "column",
          height: "100vh",
          overflowY: collapsed ? "hidden" : "auto",
          overflowX: "hidden",
          zIndex: 30,
          transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: collapsed ? "0.85rem 0" : "1rem 1rem 0.8rem",
          borderBottom: "1px solid var(--sidebar-border)",
          display: "flex",
          flexDirection: collapsed ? "column" : "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: "0.45rem",
          minHeight: "60px",
          flexShrink: 0,
        }}>
          {!collapsed && (
            <div style={{ animation: "fadeIn 0.18s ease", minWidth: 0 }}>
              <div style={{
                fontSize: "0.76rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--accent)", fontFamily: "var(--font-geist-mono)",
                whiteSpace: "nowrap",
              }}>
                🗞 Tech Brief
              </div>
              <div style={{ fontSize: "0.67rem", color: "var(--muted)", marginTop: "0.15rem", lineHeight: 1.4 }}>
                Daily · 8 AM IST
              </div>
            </div>
          )}

          <div style={{
            display: "flex",
            flexDirection: collapsed ? "column" : "row",
            gap: "0.3rem", alignItems: "center",
            flexShrink: 0,
          }}>
            <button
              onClick={toggleSidebar}
              className="collapse-btn"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              style={{
                width: "28px", height: "28px", borderRadius: "7px",
                border: "1px solid var(--border)", background: "transparent",
                cursor: "pointer", color: "var(--muted)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "border-color 0.15s, color 0.15s",
              }}
            >
              {collapsed
                ? <PanelLeftOpen size={14} strokeWidth={2} />
                : <PanelLeftClose size={14} strokeWidth={2} />}
            </button>
            {!collapsed && <ThemeToggle />}
          </div>
        </div>

        {/* Collapsed: dots + theme toggle */}
        {collapsed ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", paddingTop: "0.75rem", gap: "0.5rem",
          }}>
            <ThemeToggle />
            <div style={{ width: "1px", height: "10px", backgroundColor: "var(--divider)", margin: "0.2rem 0" }} />
            {index.slice(0, 12).map((entry) => (
              <button
                key={entry.date}
                onClick={() => onSelect(entry.date)}
                title={entry.title}
                style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  border: "none", cursor: "pointer", padding: 0,
                  backgroundColor: entry.date === activeSlug ? "var(--accent)" : "var(--border)",
                  transition: "background 0.15s", flexShrink: 0,
                }}
              />
            ))}
          </div>
        ) : (
          <>
            <nav style={{ padding: "0.35rem 0", flex: 1, animation: "fadeIn 0.18s ease" }}>
              <div style={{
                fontSize: "0.6rem", fontFamily: "var(--font-geist-mono)",
                textTransform: "uppercase", letterSpacing: "0.1em",
                color: "var(--muted)", padding: "0.5rem 1rem 0.3rem",
              }}>
                Archive
              </div>

              {index.length === 0 && (
                <div style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
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
                    className="nav-item"
                    style={{
                      width: "100%", textAlign: "left",
                      padding: "0.42rem 1rem",
                      background: isActive ? "var(--accent-light)" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "0.4rem",
                    }}
                  >
                    <span style={{
                      fontSize: "0.81rem",
                      color: isActive ? "var(--accent)" : "var(--fg)",
                      fontWeight: isActive ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}>
                      {formatShortDate(entry.date)}
                    </span>
                    {isToday && (
                      <span style={{
                        fontSize: "0.57rem", background: "var(--accent)", color: "var(--bg)",
                        borderRadius: "4px", padding: "0.1em 0.4em",
                        fontFamily: "var(--font-geist-mono)", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap",
                      }}>
                        today
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div style={{
              padding: "0.65rem 1rem",
              borderTop: "1px solid var(--sidebar-border)",
              fontSize: "0.63rem", color: "var(--muted)", lineHeight: 1.5, flexShrink: 0,
            }}>
              Curated by{" "}
              <a href="https://github.com/MAX-786" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--link)" }}>
                Mohammad K. Hussain
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
