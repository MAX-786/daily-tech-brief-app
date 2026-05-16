"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// rehype-raw intentionally removed — renders arbitrary HTML from markdown,
// which is an XSS vector if the upstream data repo is ever compromised.
import { ExternalLink, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/dates";
import SectionHeading, { childrenToText } from "./SectionHeading";

interface BriefContentProps {
  content: string;
  loading: boolean;
  slug: string;
}

export default function BriefContent({ content, loading, slug }: BriefContentProps) {
  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingTop: "2rem" }}>
        <style>{`
          @keyframes shimmer {
            0%   { background-position: -600px 0; }
            100% { background-position:  600px 0; }
          }
          .skel {
            border-radius: 6px;
            background: linear-gradient(90deg, var(--border) 25%, var(--bg-raised) 50%, var(--border) 75%);
            background-size: 600px 100%;
            animation: shimmer 1.4s infinite linear;
          }
        `}</style>
        {[
          { w: "52%", h: "1.7rem"  },
          { w: "36%", h: "0.82rem" },
          { w: "100%", h: "4.5rem" },
          { w: "100%", h: "4.5rem" },
          { w: "100%", h: "4.5rem" },
          { w: "88%", h: "0.82rem" },
          { w: "100%", h: "4.5rem" },
          { w: "100%", h: "4.5rem" },
        ].map((s, i) => (
          <div key={i} className="skel" style={{ width: s.w, height: s.h, opacity: 1 - i * 0.06 }} />
        ))}
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ paddingTop: "5rem", textAlign: "center", color: "var(--muted)" }}>
        <Newspaper size={40} strokeWidth={1.5} style={{ margin: "0 auto 1rem", display: "block", opacity: 0.4 }} />
        <p style={{ fontSize: "1rem", color: "var(--fg)" }}>No brief found for {formatDate(slug)}.</p>
        <p style={{ fontSize: "0.83rem", marginTop: "0.5rem" }}>Briefs are published at 8 AM IST daily.</p>
      </div>
    );
  }

  const stripped = content.replace(/^---[\s\S]*?---\s*\n/, "");

  return (
    <article className="brief-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // H1 — replace leading 🗞️ emoji with Newspaper icon
          h1: ({ children }) => {
            const text = childrenToText(children);
            // Strip the leading newspaper emoji if present
            const label = text.replace(/^🗞️?\s*/u, "").trim();
            return (
              <h1 className="brief-title">
                <Newspaper size={22} strokeWidth={1.8} className="brief-title-icon" aria-hidden />
                <span>{label}</span>
              </h1>
            );
          },

          // H2 — section heading with icon + anchor
          h2: ({ children }) => <SectionHeading>{children}</SectionHeading>,

          // H3 — story headline card top
          h3: ({ children }) => <h3>{children}</h3>,

          // Paragraphs — detect source line
          p: ({ children }) => {
            const arr = Array.isArray(children) ? children : [children];
            const first = arr[0];
            if (arr.length <= 3 && typeof first === "object" && first !== null) {
              const el = first as React.ReactElement<{ children?: React.ReactNode }>;
              if (el.type === "strong") {
                const text = typeof el.props?.children === "string" ? el.props.children : "";
                if (text.includes("·") || /\d{4}/.test(text)) {
                  return <p className="source-line">{children}</p>;
                }
              }
            }
            return <p>{children}</p>;
          },

          // Links — external link icon
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="story-link" {...props}>
              {children}
              <ExternalLink size={11} strokeWidth={2} className="ext-icon" />
            </a>
          ),

          hr: () => <hr />,
        }}
      >
        {stripped}
      </ReactMarkdown>
    </article>
  );
}
