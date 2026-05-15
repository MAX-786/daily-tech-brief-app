const DATA_REPO = "MAX-786/daily-tech-brief";
const BRANCH = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${DATA_REPO}/${BRANCH}`;

export interface BriefEntry {
  date: string;
  title: string;
  slug: string;
}

export async function fetchIndex(): Promise<BriefEntry[]> {
  try {
    const res = await fetch(`${RAW_BASE}/index.json`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchBrief(slug: string): Promise<string> {
  if (!slug) return "";
  try {
    const res = await fetch(`${RAW_BASE}/briefs/${slug}.md`, {
      cache: "no-store",
    });
    if (!res.ok) return "";
    return res.text();
  } catch {
    return "";
  }
}
