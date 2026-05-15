const DATA_REPO = "MAX-786/daily-tech-brief";
const BRANCH = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${DATA_REPO}/${BRANCH}`;

export interface BriefEntry {
  date: string;
  title: string;
  slug: string;
}

// Used server-side (ISR). Vercel's fetch cache dedupes within the same
// revalidation window — index.json fetched once per hour at most.
export async function fetchIndex(): Promise<BriefEntry[]> {
  try {
    const res = await fetch(`${RAW_BASE}/index.json`, {
      next: { revalidate: 3600 }, // 1 hour — matches page revalidate
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Today's brief: 1 hour TTL (new one arrives at 8 AM IST, stale for at most 1h).
// Past briefs: immutable after midnight, cache 24 hours.
export async function fetchBrief(slug: string, isToday = false): Promise<string> {
  if (!slug) return "";
  try {
    const res = await fetch(`${RAW_BASE}/briefs/${slug}.md`, {
      next: { revalidate: isToday ? 3600 : 86400 },
    });
    if (!res.ok) return "";
    return res.text();
  } catch {
    return "";
  }
}
