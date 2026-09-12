import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { getCategory } from "@/lib/content/categories";
import { getAllProductReviews, getProductReview } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, productReviewSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProductReviews().map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = getProductReview(slug);
  if (!review) return {};

  return pageMetadata({
    title: review.title,
    description: review.description,
    path: `/product-reviews/${review.slug}`,
    type: "article",
    publishedTime: review.publishedAt,
    modifiedTime: review.updatedAt,
    authors: [review.author],
  });
}

export default async function ProductReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getProductReview(slug);
  if (!review) notFound();

  const category = getCategory(review.category);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={productReviewSchema({
          productName: review.productName,
          brand: review.brand,
          rating: review.rating,
          description: review.description,
          author: review.author,
          publishedAt: review.publishedAt,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Product Reviews", path: "/product-reviews" },
          { name: review.title, path: `/product-reviews/${review.slug}` },
        ])}
      />
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {category.name}
        </span>
      )}
      <h1 className="mt-1 text-3xl font-bold text-stone-900 sm:text-4xl">{review.title}</h1>
      <p className="mt-3 text-sm text-stone-500">
        {review.brand} · {review.productName}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5">
        <div>
          <p className="text-xs uppercase text-stone-500">Rating</p>
          <p className="text-2xl font-bold text-amber-700">{review.rating.toFixed(1)} / 5</p>
        </div>
        {review.priceRange && (
          <div>
            <p className="text-xs uppercase text-stone-500">Price</p>
            <p className="text-2xl font-bold text-stone-900">{review.priceRange}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-800">Pros</p>
          <ul className="mt-2 list-inside list-disc text-sm text-green-900">
            {review.pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Cons</p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-900">
            {review.cons.map((con) => (
              <li key={con}>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Prose markdown={review.body} />
      </div>
    </article>
  );
}
