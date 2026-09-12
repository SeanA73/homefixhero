import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { getCategory } from "@/lib/content/categories";
import { getAllProductReviews } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Product Reviews",
  description:
    "Hands-on reviews of the tools and products worth buying for home repair and maintenance.",
  path: "/product-reviews",
});

export default function ProductReviewsPage() {
  const reviews = getAllProductReviews();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Product Reviews</h1>
      <p className="mt-2 text-stone-600">
        Tools and products we&apos;ve tested, with honest pros and cons.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <ContentCard
            key={review.slug}
            href={`/product-reviews/${review.slug}`}
            title={review.title}
            description={review.description}
            categoryName={getCategory(review.category)?.name}
            meta={`${review.rating.toFixed(1)} / 5`}
          />
        ))}
      </div>
    </div>
  );
}
