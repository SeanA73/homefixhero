import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { PageHeader } from "@/components/page-header";
import { getAllCostGuides } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Cost Guides",
  description:
    "Know a fair price before you call a contractor. Real-world cost breakdowns for common home repairs and replacements.",
  path: "/cost-guides",
});

export default function CostGuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Know before you hire" title="Cost guides">
        What things actually cost — so you can spot a fair quote from an inflated one.
      </PageHeader>
      <div className="mt-10">
        <CardGrid items={getAllCostGuides()} />
      </div>
    </div>
  );
}
