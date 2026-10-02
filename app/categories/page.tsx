import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { PageHeader } from "@/components/page-header";
import { categories } from "@/lib/content/categories";
import { getCategoryCount } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Categories",
  description: "Browse HomeFixHero guides, cost breakdowns, and reviews by category.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Browse by trade" title="Start where the trouble is" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} count={getCategoryCount(category.slug)} />
        ))}
      </div>
    </div>
  );
}
