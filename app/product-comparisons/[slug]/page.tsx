import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContentPage } from "@/components/content-page";
import { ProsCons } from "@/components/pros-cons";
import { getAllComparisons, getComparison } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

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

  return (
    <ContentPage
      item={comparison}
      schema={
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
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {comparison.items.map((item) => (
          <div key={item.name} className="rounded-xl border border-line bg-paper p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-semibold text-ink">{item.name}</h2>
              <span className="shrink-0 text-sm font-bold text-brand-ink">{item.rating.toFixed(1)} / 5</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-subtle">
              Best for: {item.bestFor}
            </p>
            <ProsCons pros={item.pros} cons={item.cons} className="mt-4" stacked />
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
