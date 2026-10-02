import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { contentHref } from "@/lib/content/kinds";
import type { ProductReview } from "@/lib/content/types";

export function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-warm">
      {review.coverImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={review.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {review.priceRange && (
            <span className="absolute bottom-3 left-3 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
              {review.priceRange}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
          <Star className="size-4 fill-current" aria-hidden />
          {review.rating.toFixed(1)} <span className="font-normal text-subtle">/ 5</span>
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">
          <Link href={contentHref(review)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {review.shortTitle ?? review.productName}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-subtle">{review.description}</p>
        {review.pros[0] && (
          <p className="mt-4 rounded-lg bg-sage-soft px-3 py-2 text-xs text-ink">
            <b className="text-sage">Good:</b> {review.pros[0]}
          </p>
        )}
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-brand-ink">
          Read the full test <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}
