/**
 * Returns today's date as YYYY-MM-DD in IST (UTC+5:30)
 */
export function getTodayIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 10);
}

/**
 * Format YYYY-MM-DD → "Thu, May 15, 2026"
 */
export function formatDate(slug: string): string {
  try {
    // Parse as local date to avoid timezone shifts
    const [y, m, d] = slug.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return slug;
  }
}

/**
 * "2026-05-15" → "May 15"
 */
export function formatShortDate(slug: string): string {
  try {
    const [y, m, d] = slug.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return slug;
  }
}
