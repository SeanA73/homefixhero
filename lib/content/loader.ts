import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  Article,
  ComparisonItem,
  ContentKind,
  CostGuide,
  ProductComparison,
  ProductReview,
  StaticPage,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const DIRS: Record<ContentKind, string> = {
  article: "articles",
  "cost-guide": "cost-guides",
  "product-review": "product-reviews",
  comparison: "comparisons",
};

function readMarkdownFiles(dir: string): { slug: string; data: Record<string, unknown>; content: string }[] {
  const fullDir = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), data, content };
    });
}

function baseFields(slug: string, data: Record<string, unknown>, content: string) {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    tags: (data.tags as string[]) ?? [],
    publishedAt: data.publishedAt as string,
    updatedAt: (data.updatedAt as string) ?? (data.publishedAt as string),
    author: (data.author as string) ?? "HomeFixHero Editorial Team",
    coverImage: data.coverImage as string | undefined,
    body: content,
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

function sortByDateDesc<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllArticles(): Article[] {
  const items = readMarkdownFiles(DIRS.article).map(({ slug, data, content }) => ({
    kind: "article" as const,
    ...baseFields(slug, data, content),
  }));
  return sortByDateDesc(items);
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((item) => item.slug === slug);
}

export function getAllCostGuides(): CostGuide[] {
  const items = readMarkdownFiles(DIRS["cost-guide"]).map(({ slug, data, content }) => ({
    kind: "cost-guide" as const,
    ...baseFields(slug, data, content),
    costLow: Number(data.costLow),
    costHigh: Number(data.costHigh),
    costAverage: Number(data.costAverage),
    currency: (data.currency as string) ?? "USD",
    unit: data.unit as string | undefined,
  }));
  return sortByDateDesc(items);
}

export function getCostGuide(slug: string): CostGuide | undefined {
  return getAllCostGuides().find((item) => item.slug === slug);
}

export function getAllProductReviews(): ProductReview[] {
  const items = readMarkdownFiles(DIRS["product-review"]).map(({ slug, data, content }) => ({
    kind: "product-review" as const,
    ...baseFields(slug, data, content),
    productName: data.productName as string,
    brand: data.brand as string,
    rating: Number(data.rating),
    pros: (data.pros as string[]) ?? [],
    cons: (data.cons as string[]) ?? [],
    priceRange: data.priceRange as string | undefined,
  }));
  return sortByDateDesc(items);
}

export function getProductReview(slug: string): ProductReview | undefined {
  return getAllProductReviews().find((item) => item.slug === slug);
}

export function getAllComparisons(): ProductComparison[] {
  const items = readMarkdownFiles(DIRS.comparison).map(({ slug, data, content }) => ({
    kind: "comparison" as const,
    ...baseFields(slug, data, content),
    items: (data.items as ComparisonItem[]) ?? [],
  }));
  return sortByDateDesc(items);
}

export function getComparison(slug: string): ProductComparison | undefined {
  return getAllComparisons().find((item) => item.slug === slug);
}

export function getAllStaticPages(): StaticPage[] {
  return readMarkdownFiles("pages").map(({ slug, data, content }) => ({
    slug,
    title: data.title as string,
    description: data.description as string,
    updatedAt: data.updatedAt as string,
    body: content,
  }));
}

export function getStaticPage(slug: string): StaticPage | undefined {
  return getAllStaticPages().find((item) => item.slug === slug);
}

export function getContentByCategory(categorySlug: string) {
  return {
    articles: getAllArticles().filter((item) => item.category === categorySlug),
    costGuides: getAllCostGuides().filter((item) => item.category === categorySlug),
    productReviews: getAllProductReviews().filter((item) => item.category === categorySlug),
    comparisons: getAllComparisons().filter((item) => item.category === categorySlug),
  };
}
