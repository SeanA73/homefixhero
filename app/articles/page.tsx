import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { PageHeader } from "@/components/page-header";
import { getAllArticles } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Articles & How-To Guides",
  description:
    "Step-by-step home repair guides for plumbing, electrical, HVAC, and more — written to be followed without a trade background.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Repair guides" title="How-to guides">
        Practical, step-by-step guides for the repairs homeowners run into most often.
      </PageHeader>
      <div className="mt-10">
        <CardGrid items={getAllArticles()} />
      </div>
    </div>
  );
}
