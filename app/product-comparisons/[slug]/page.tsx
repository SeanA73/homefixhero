import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { getCategory } from "@/lib/content/categories";
import { getAllComparisons, getComparison } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllComparisons().map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};

  return pageMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/product-comparisons/${comparison.slug}`,
    type: "article",
    publishedTime: comparison.publishedAt,
    modifiedTime: comparison.updatedAt,
    authors: [comparison.author],
  });
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const category = getCategory(comparison.category);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={articleSchema({
          title: comparison.title,
          description: comparison.description,
          path: `/product-comparisons/${comparison.slug}`,
          publishedAt: comparison.publishedAt,
          updatedAt: comparison.updatedAt,
          author: comparison.author,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Product Comparisons", path: "/product-comparisons" },
          { name: comparison.title, path: `/product-comparisons/${comparison.slug}` },
        ])}
      />
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {category.name}
        </span>
      )}
      <h1 className="mt-1 text-3xl font-bold text-stone-900 sm:text-4xl">{comparison.title}</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {comparison.items.map((item) => (
          <div key={item.name} className="rounded-lg border border-stone-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-900">{item.name}</h2>
              <span className="text-sm font-bold text-amber-700">{item.rating.toFixed(1)} / 5</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">
              Best for: {item.bestFor}
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-green-800">
              {item.pros.map((pro) => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
            <ul className="mt-2 list-inside list-disc text-sm text-red-800">
              {item.cons.map((con) => (
                <li key={con}>{con}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Prose markdown={comparison.body} />
      </div>
    </article>
  );
}
