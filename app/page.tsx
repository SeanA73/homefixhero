import Link from "next/link";
import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { ContentCard } from "@/components/content-card";
import { HeroSection } from "@/components/hero-section";
import { categories } from "@/lib/content/categories";
import {
  getAllArticles,
  getAllComparisons,
  getAllCostGuides,
  getAllProductReviews,
} from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    "Practical, no-nonsense home repair guides, cost breakdowns, and tool reviews for plumbing, electrical, HVAC, and more.",
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);
  const costGuides = getAllCostGuides().slice(0, 3);
  const productReviews = getAllProductReviews().slice(0, 3);
  const comparisons = getAllComparisons().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <HeroSection />

      <section className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </section>

      <ContentSection title="Latest Guides" href="/articles" items={articles} />
      <ContentSection title="Cost Guides" href="/cost-guides" items={costGuides} />
      <ContentSection title="Product Reviews" href="/product-reviews" items={productReviews} />
      <ContentSection title="Product Comparisons" href="/product-comparisons" items={comparisons} />
    </div>
  );
}

function ContentSection({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { slug: string; title: string; description: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-stone-900">{title}</h2>
        <Link href={href} className="text-sm font-medium text-amber-700 hover:underline">
          View all
        </Link>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <ContentCard
            key={item.slug}
            href={`${href}/${item.slug}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
