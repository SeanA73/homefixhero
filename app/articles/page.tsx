import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { getCategory } from "@/lib/content/categories";
import { getAllArticles } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Repair Articles & How-To Guides",
  description:
    "Step-by-step home repair guides for plumbing, electrical, HVAC, and more — written to be followed without a trade background.",
  path: "/articles",
});

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Articles</h1>
      <p className="mt-2 text-stone-600">
        Practical, step-by-step guides for the repairs homeowners run into most often.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ContentCard
            key={article.slug}
            href={`/articles/${article.slug}`}
            title={article.title}
            description={article.description}
            categoryName={getCategory(article.category)?.name}
            meta={`${article.readingTimeMinutes} min read`}
          />
        ))}
      </div>
    </div>
  );
}
