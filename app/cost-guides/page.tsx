import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { getCategory } from "@/lib/content/categories";
import { getAllCostGuides } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Cost Guides",
  description:
    "Know a fair price before you call a contractor. Real-world cost breakdowns for common home repairs and replacements.",
  path: "/cost-guides",
});

export default function CostGuidesPage() {
  const guides = getAllCostGuides();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Cost Guides</h1>
      <p className="mt-2 text-stone-600">
        What things actually cost — so you can spot a fair quote from an inflated one.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <ContentCard
            key={guide.slug}
            href={`/cost-guides/${guide.slug}`}
            title={guide.title}
            description={guide.description}
            categoryName={getCategory(guide.category)?.name}
            meta={`Avg. $${guide.costAverage.toLocaleString()}`}
          />
        ))}
      </div>
    </div>
  );
}
