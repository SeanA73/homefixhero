import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { CategoryIcon } from "@/components/category-icon";
import { PageHeader } from "@/components/page-header";
import { categories, getCategory } from "@/lib/content/categories";
import { getContentByCategory } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return pageMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const { articles, costGuides, productReviews, comparisons } = getContentByCategory(slug);
  const sections = [
    { title: "How-to guides", items: articles },
    { title: "Cost guides", items: costGuides },
    { title: "Tool reviews", items: productReviews },
    { title: "Comparisons", items: comparisons },
  ].filter((section) => section.items.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex items-start gap-5">
        <CategoryIcon slug={category.slug} className="hidden size-20 shrink-0 sm:flex" iconClassName="size-9" />
        <PageHeader eyebrow="Browse by trade" title={category.name}>
          {category.description}
        </PageHeader>
      </div>
      {sections.length === 0 && (
        <div className="mt-10">
          <CardGrid items={[]} />
        </div>
      )}
      {sections.map((section) => (
        <section key={section.title} className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold text-ink">{section.title}</h2>
          <CardGrid items={section.items} />
        </section>
      ))}
    </div>
  );
}
