import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { SearchBox } from "@/components/search-box";
import { getAllCards } from "@/lib/content/cards";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search every HomeFixHero repair guide, cost guide, and tool review.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Search" title="What needs fixing?">
        Find a repair guide, a fair price, or the right tool.
      </PageHeader>
      <div className="mt-8">
        {/* useSearchParams in SearchBox needs a Suspense boundary to keep this page static. */}
        <Suspense>
          <SearchBox entries={getAllCards()} />
        </Suspense>
      </div>
    </div>
  );
}
