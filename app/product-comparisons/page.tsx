import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { getCategory } from "@/lib/content/categories";
import { getAllComparisons } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product Comparisons",
  description: "Head-to-head comparisons to help you pick the right tool or product for the job.",
  path: "/product-comparisons",
});

export default function ComparisonsPage() {
  const comparisons = getAllComparisons();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Product Comparisons</h1>
      <p className="mt-2 text-stone-600">Side-by-side breakdowns to help you choose with confidence.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <ContentCard
            key={comparison.slug}
            href={`/product-comparisons/${comparison.slug}`}
            title={comparison.title}
            description={comparison.description}
            categoryName={getCategory(comparison.category)?.name}
          />
        ))}
      </div>
    </div>
  );
}
