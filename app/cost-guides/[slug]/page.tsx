import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { getCategory } from "@/lib/content/categories";
import { getAllCostGuides, getCostGuide } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

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

  const category = getCategory(guide.category);
  const currency = guide.currency === "USD" ? "$" : `${guide.currency} `;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cost Guides", path: "/cost-guides" },
          { name: guide.title, path: `/cost-guides/${guide.slug}` },
        ])}
      />
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {category.name}
        </span>
      )}
      <h1 className="mt-1 text-3xl font-bold text-stone-900 sm:text-4xl">{guide.title}</h1>
      <p className="mt-3 text-sm text-stone-500">
        Updated{" "}
        {new Date(guide.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-stone-200 bg-stone-50 p-5 text-center">
        <div>
          <p className="text-xs uppercase text-stone-500">Low</p>
          <p className="text-xl font-bold text-stone-900">
            {currency}
            {guide.costLow.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-stone-500">Average</p>
          <p className="text-xl font-bold text-amber-700">
            {currency}
            {guide.costAverage.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-stone-500">High</p>
          <p className="text-xl font-bold text-stone-900">
            {currency}
            {guide.costHigh.toLocaleString()}
          </p>
        </div>
        {guide.unit && (
          <p className="col-span-3 mt-1 text-xs text-stone-500">Per {guide.unit}</p>
        )}
      </div>

      <div className="mt-8">
        <Prose markdown={guide.body} />
      </div>
    </article>
  );
}
