import type { MetadataRoute } from "next";
import { categories } from "@/lib/content/categories";
import {
  getAllArticles,
  getAllComparisons,
  getAllCostGuides,
  getAllProductReviews,
} from "@/lib/content/loader";
import { absoluteUrl } from "@/lib/site-config";

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.8 },
  { path: "/cost-guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/product-reviews", changeFrequency: "weekly", priority: 0.8 },
  { path: "/product-comparisons", changeFrequency: "weekly", priority: 0.8 },
  { path: "/categories", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const costGuideEntries: MetadataRoute.Sitemap = getAllCostGuides().map((guide) => ({
    url: absoluteUrl(`/cost-guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productReviewEntries: MetadataRoute.Sitemap = getAllProductReviews().map((review) => ({
    url: absoluteUrl(`/product-reviews/${review.slug}`),
    lastModified: new Date(review.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = getAllComparisons().map((comparison) => ({
    url: absoluteUrl(`/product-comparisons/${comparison.slug}`),
    lastModified: new Date(comparison.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...articleEntries,
    ...costGuideEntries,
    ...productReviewEntries,
    ...comparisonEntries,
  ];
}
