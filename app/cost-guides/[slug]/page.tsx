import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContentPage } from "@/components/content-page";
import { averagePosition, formatPrice } from "@/lib/content/cost";
import { getAllCostGuides, getCostGuide } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCostGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCostGuide(slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/cost-guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    authors: [guide.author],
  });
}

export default async function CostGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getCostGuide(slug);
  if (!guide) notFound();

  const price = (value: number) => formatPrice(guide.currency, value);
  const position = averagePosition(guide);

  return (
    <ContentPage
      item={guide}
      schema={
        <JsonLd
          data={articleSchema({
            title: guide.title,
            description: guide.description,
            path: `/cost-guides/${guide.slug}`,
            publishedAt: guide.publishedAt,
            updatedAt: guide.updatedAt,
            author: guide.author,
          })}
        />
      }
    >
      <div className="rounded-xl border border-brand/40 bg-brand-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink">
          Typical cost{guide.unit ? ` per ${guide.unit}` : ""}
        </p>
        <p className="mt-1 text-4xl font-bold text-ink">{price(guide.costAverage)}</p>
        <p className="mt-1 text-sm text-subtle">
          Most jobs fall between {price(guide.costLow)} and {price(guide.costHigh)}.
        </p>
        <div
          className="relative mt-6 h-2 rounded-full bg-brand/30"
          role="img"
          aria-label={`Average ${price(guide.costAverage)} within range ${price(guide.costLow)} to ${price(guide.costHigh)}`}
        >
          <span
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-brand-deep shadow"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-subtle">
          <span>{price(guide.costLow)}</span>
          <span>{price(guide.costHigh)}</span>
        </div>
      </div>
    </ContentPage>
  );
}
