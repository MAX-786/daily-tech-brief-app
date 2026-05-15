"use client";

import { useState } from "react";
import { Link2, Check, ShieldAlert, Code2, Bot, Wrench, TrendingUp, Lightbulb, Hash } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map section text → icon
function getSectionIcon(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (t.includes("security"))                    return ShieldAlert;
  if (t.includes("js") || t.includes("react") || t.includes("frontend")) return Code2;
  if (t.includes("ai") || t.includes("llm"))    return Bot;
  if (t.includes("dev") || t.includes("tool") || t.includes("oss")) return Wrench;
  if (t.includes("industry"))                    return TrendingUp;
  if (t.includes("signal"))                      return Lightbulb;
  return Hash;
}

function slugify(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")  // strip emoji
    .replace(/[^a-z0-9\s-]/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (typeof children === "object" && children !== null) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return childrenToText(el.props?.children);
  }
  return "";
}

interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  const [copied, setCopied] = useState(false);
  const text = childrenToText(children);
  // Strip leading emoji from display text
  const displayText = text.replace(/^[\u{1F000}-\u{1FFFF}\u2600-\u26FF\u2700-\u27BF\s]*/gu, "").trim();
  const id = slugify(text);
  const Icon = getSectionIcon(text);

  const copyLink = () => {
    const url = `${window.location.href.split("#")[0]}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <h2 id={id} className="section-heading">
      <Icon size={14} strokeWidth={2.5} className="section-icon" aria-hidden />
      <span className="section-text">{displayText}</span>
      <button
        onClick={copyLink}
        className="anchor-btn"
        title="Copy link to section"
        aria-label="Copy link to section"
      >
        {copied
          ? <Check size={12} strokeWidth={2.5} />
          : <Link2 size={12} strokeWidth={2.5} />}
      </button>
    </h2>
  );
}
