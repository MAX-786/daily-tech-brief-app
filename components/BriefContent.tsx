"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { formatDate } from "@/lib/dates";

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
          { w: "55%", h: "1.7rem" },
          { w: "38%", h: "0.85rem" },
          { w: "100%", h: "0.85rem" },
          { w: "88%", h: "0.85rem" },
          { w: "100%", h: "0.85rem" },
          { w: "72%", h: "0.85rem" },
          { w: "100%", h: "0.85rem" },
          { w: "60%", h: "0.85rem" },
        ].map((s, i) => (
          <div key={i} className="skel" style={{ width: s.w, height: s.h, opacity: 1 - i * 0.07 }} />
        ))}
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ paddingTop: "5rem", textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗞️</div>
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
        rehypePlugins={[rehypeRaw]}
        components={{
          h3: ({ children }) => (
            <h3>{children}</h3>
          ),
          // Paragraphs: detect source line (bold "Source · date") vs normal
          p: ({ children }) => {
            const arr = Array.isArray(children) ? children : [children];
            const first = arr[0];
            if (
              arr.length <= 3 &&
              typeof first === "object" &&
              first !== null
            ) {
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
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
          hr: () => <hr />,
        }}
      >
        {stripped}
      </ReactMarkdown>
    </article>
  );
}
