import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContentPage } from "@/components/content-page";
import { ProsCons } from "@/components/pros-cons";
import { getAllProductReviews, getProductReview } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { productReviewSchema } from "@/lib/structured-data";

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

  return (
    <ContentPage
      item={review}
      schema={
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
      }
    >
      <div className="rounded-xl border border-line bg-paper p-6">
        <p className="text-sm text-subtle">
          {review.brand} · {review.productName}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Our rating</p>
            <p className="text-3xl font-bold text-brand-ink">
              {review.rating.toFixed(1)}
              <span className="text-base font-medium text-subtle"> / 5</span>
            </p>
          </div>
          {review.priceRange && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Typical price</p>
              <p className="text-3xl font-bold text-ink">{review.priceRange}</p>
            </div>
          )}
        </div>
        <ProsCons pros={review.pros} cons={review.cons} className="mt-6" />
      </div>
    </ContentPage>
  );
}
