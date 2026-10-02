import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContentPage } from "@/components/content-page";
import { getAllArticles, getArticle } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

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

  return (
    <ContentPage
      item={article}
      schema={
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
      }
    />
  );
}
