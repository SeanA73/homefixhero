import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { PageHeader } from "@/components/page-header";
import { getAllProductReviews } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Product Reviews",
  description:
    "Hands-on reviews of the tools and products worth buying for home repair and maintenance.",
  path: "/product-reviews",
});

export default function ProductReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Tool bench" title="Tool reviews">
        Honest tests of the tools worth making room for.
      </PageHeader>
      <div className="mt-10">
        <CardGrid items={getAllProductReviews()} />
      </div>
    </div>
  );
}
