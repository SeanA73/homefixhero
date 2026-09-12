import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
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
    { title: "Articles", basePath: "/articles", items: articles },
    { title: "Cost Guides", basePath: "/cost-guides", items: costGuides },
    { title: "Product Reviews", basePath: "/product-reviews", items: productReviews },
    { title: "Product Comparisons", basePath: "/product-comparisons", items: comparisons },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{category.name}</h1>
      <p className="mt-2 text-stone-600">{category.description}</p>

      {sections.map(
        (section) =>
          section.items.length > 0 && (
            <section key={section.title} className="mt-10">
              <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {section.items.map((item) => (
                  <ContentCard
                    key={item.slug}
                    href={`${section.basePath}/${item.slug}`}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </section>
          )
      )}
    </div>
  );
}
