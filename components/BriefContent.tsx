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

export default function BriefContent({
  content,
  loading,
  slug,
}: BriefContentProps) {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "2rem",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? "2rem" : i % 3 === 0 ? "1rem" : "0.875rem",
              borderRadius: "6px",
              backgroundColor: "var(--border)",
              opacity: 1 - i * 0.1,
              width: i % 2 === 0 ? "100%" : `${75 + Math.random() * 20}%`,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.15; }
          }
        `}</style>
      </div>
    );
  }

  if (!content) {
    return (
      <div
        style={{
          paddingTop: "4rem",
          textAlign: "center",
          color: "var(--muted)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗞️</div>
        <p style={{ fontSize: "1rem" }}>
          No brief found for {formatDate(slug)}.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Briefs are published at 8 AM IST daily.
        </p>
      </div>
    );
  }

  // Strip YAML frontmatter before rendering
  const stripped = content.replace(/^---[\s\S]*?---\s*\n/, "");

  return (
    <article className="brief-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // h3 with link: render as story headline
          h3: ({ children }) => (
            <h3 style={{ marginTop: "1.25rem", marginBottom: "0.15rem" }}>
              {children}
            </h3>
          ),
          // Paragraphs that start with bold (source line)
          p: ({ children }) => {
            const arr = Array.isArray(children) ? children : [children];
            const first = arr[0];
            // Detect source/date line: first child is a <strong> with source info
              if (
              arr.length <= 3 &&
              typeof first === "object" &&
              first !== null &&
              (first as React.ReactElement<{ children?: React.ReactNode }>).type === "strong"
            ) {
              const props = (first as React.ReactElement<{ children?: React.ReactNode }>).props;
              const text = typeof props?.children === "string" ? props.children : "";
              if (text.includes("·") || /\d{4}/.test(text)) {
                return (
                  <p className="source-line">
                    {children}
                  </p>
                );
              }
            }
            return <p>{children}</p>;
          },
          // Links open in new tab
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          // HR = section divider
          hr: () => (
            <hr
              style={{
                borderTop: "1px solid var(--divider)",
                margin: "1.25rem 0",
              }}
            />
          ),
        }}
      >
        {stripped}
      </ReactMarkdown>
    </article>
  );
}
