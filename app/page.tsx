import { Suspense } from "react";
import BriefApp from "@/components/BriefApp";
import { fetchIndex, fetchBrief } from "@/lib/github";
import { getTodayIST } from "@/lib/dates";

// Always fetch fresh — daily brief data lives on GitHub raw CDN
export const dynamic = "force-dynamic";

export default async function Home() {
  const index = await fetchIndex();
  const todaySlug = getTodayIST();

  // Pick today if available, else latest
  const defaultSlug =
    index.find((e) => e.date === todaySlug)?.date ?? index[0]?.date ?? todaySlug;

  const defaultContent = await fetchBrief(defaultSlug);

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
