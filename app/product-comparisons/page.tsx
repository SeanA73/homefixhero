import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { PageHeader } from "@/components/page-header";
import { getAllComparisons } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product Comparisons",
  description: "Head-to-head comparisons to help you pick the right tool or product for the job.",
  path: "/product-comparisons",
});

export default function ComparisonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Head-to-head" title="Product comparisons">
        Two options, one clear answer for your job.
      </PageHeader>
      <div className="mt-10">
        <CardGrid items={getAllComparisons()} />
      </div>
    </div>
  );
}
