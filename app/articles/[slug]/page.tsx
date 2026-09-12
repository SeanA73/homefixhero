import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { getCategory } from "@/lib/content/categories";
import { getAllArticles, getArticle } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/articles/${article.slug}`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          author: article.author,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ])}
      />
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {category.name}
        </span>
      )}
      <h1 className="mt-1 text-3xl font-bold text-stone-900 sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-sm text-stone-500">
        By {article.author} · {new Date(article.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {article.readingTimeMinutes} min read
      </p>
      <div className="mt-8">
        <Prose markdown={article.body} />
      </div>
    </article>
  );
}
