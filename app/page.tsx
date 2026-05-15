import { Suspense } from "react";
import BriefApp from "@/components/BriefApp";
import { fetchIndex, fetchBrief } from "@/lib/github";
import { getTodayIST } from "@/lib/dates";

// ISR: Vercel builds this page once and caches it at the CDN edge.
// Revalidates in the background at most once per hour.
// New brief arrives at 8 AM IST — page updates within ~1 hour, zero
// repeated GitHub hits for all the visitors in between.
export const revalidate = 3600; // 1 hour

export default async function Home() {
  const index = await fetchIndex();
  const todaySlug = getTodayIST();

  const defaultSlug =
    index.find((e) => e.date === todaySlug)?.date ?? index[0]?.date ?? todaySlug;

  const defaultContent = await fetchBrief(defaultSlug, defaultSlug === todaySlug);

  return (
    <Suspense>
      <BriefApp
        index={index}
        defaultSlug={defaultSlug}
        defaultContent={defaultContent}
      />
    </Suspense>
  );
}
