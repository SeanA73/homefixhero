import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { ContentCard } from "@/components/content-card";
import { CostCard } from "@/components/cost-card";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolver } from "@/components/problem-solver";
import { ReviewCard } from "@/components/review-card";
import { SeasonalChecklist } from "@/components/seasonal-checklist";
import { SectionHeading } from "@/components/section-heading";
import { toCardData } from "@/lib/content/cards";
import { categories } from "@/lib/content/categories";
import { contentHref, DIFFICULTY_LABELS } from "@/lib/content/kinds";
import {
  getAllArticles,
  getAllComparisons,
  getAllCostGuides,
  getAllProductReviews,
  getCategoryCount,
} from "@/lib/content/loader";
import type { AnyContent } from "@/lib/content/types";
import { extractHeadings } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    "Practical, no-nonsense home repair guides, cost breakdowns, and tool reviews for plumbing, electrical, HVAC, and more.",
  path: "/",
});

/** Resolves a content slug to its URL, or undefined if that piece no longer exists. */
function findHref(items: AnyContent[], slug: string): string | undefined {
  const item = items.find((i) => i.slug === slug);
  return item && contentHref(item);
}

export default function HomePage() {
  const articles = getAllArticles();
  const costGuides = getAllCostGuides();
  const reviews = getAllProductReviews();
  const comparisons = getAllComparisons();

  // Featured: the most recently updated guide that has a photo and a difficulty rating.
  const featured = [...articles]
    .filter((a) => a.coverImage && a.difficulty)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
  const featuredSteps = featured
    ? extractHeadings(featured.body).filter((h) => /^\d+\./.test(h.text)).length
    : 0;

  const solverLinks = {
    faucet: findHref(articles, "how-to-fix-a-leaky-faucet"),
    breaker: findHref(articles, "reset-a-tripped-circuit-breaker"),
    drain: findHref(comparisons, "drain-snake-vs-plunger"),
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-12 sm:pt-16">
        <HeroSection spotlight={featured && toCardData(featured)} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="solver-heading">
        <SectionHeading
          eyebrow="Problem solver"
          title="Tell us what’s going on"
          aside="Two quick choices. No trade jargon. We’ll point you to the right guide."
        />
        <h2 id="solver-heading" className="sr-only">
          Problem solver
        </h2>
        <div className="mt-8">
          <ProblemSolver links={solverLinks} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading
          eyebrow="Browse by trade"
          title="Start where the trouble is"
          aside={
            <Link href="/articles" className="inline-flex items-center gap-1.5 font-semibold text-brand-ink hover:underline">
              View all guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} count={getCategoryCount(category.slug)} />
          ))}
        </div>
      </section>

      {featured && (
        <section className="my-14 bg-walnut text-on-dark-muted">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-warm">
              <Image
                src={featured.coverImage!}
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <span className="absolute left-0 top-5 -rotate-2 bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow">
                Featured guide
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Featured field guide</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-on-dark">{featured.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-on-dark-muted">{featured.description}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-on-dark-muted">
                {featured.timeNeeded && (
                  <span className="flex items-center gap-2">
                    <Clock className="size-4" aria-hidden /> {featured.timeNeeded}
                  </span>
                )}
                {featured.difficulty && (
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-sage-light" aria-hidden />
                    {DIFFICULTY_LABELS[featured.difficulty - 1]}
                  </span>
                )}
              </p>
              <Link
                href={contentHref(featured)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-brand-deep"
              >
                {featuredSteps > 0 ? `Follow the ${featuredSteps} steps` : "Read the guide"} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading
          eyebrow="Fresh from the workbench"
          title="Latest how-to guides"
          aside="Clear steps and a safety check in every guide."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((article) => (
            <ContentCard key={article.slug} card={toCardData(article)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-xl border border-brand px-6 py-3 font-semibold text-brand-ink transition hover:bg-brand-soft"
          >
            Browse all {articles.length} {articles.length === 1 ? "guide" : "guides"} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {costGuides.length > 0 && (
        <section className="mt-12 bg-walnut py-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              light
              eyebrow="Know before you hire"
              title="What common jobs cost"
              aside={
                <Link href="/cost-guides" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
                  Explore all cost guides <ArrowRight className="size-4" aria-hidden />
                </Link>
              }
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {costGuides.slice(0, 3).map((guide, i) => (
                <CostCard key={guide.slug} guide={guide} index={i} />
              ))}
              <Link
                href="/contact"
                className="flex flex-col justify-between rounded-3xl border border-dashed border-white/25 p-6 text-on-dark-muted transition hover:border-brand hover:text-brand"
              >
                <span className="font-serif text-xl font-semibold text-on-dark">Need a price for something else?</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Suggest a topic <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Tool bench"
            title="Tools worth making room for"
            aside="We focus on comfort, control and long-term value — not the longest spec sheet."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
            {comparisons.slice(0, 1).map((comparison) => (
              <ContentCard key={comparison.slug} card={toCardData(comparison)} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SeasonalChecklist />
      </section>
    </>
  );
}
