import type { MetadataRoute } from "next";
import { categories } from "@/lib/content/categories";
import { contentHref } from "@/lib/content/kinds";
import { getAllContent } from "@/lib/content/loader";
import { absoluteUrl } from "@/lib/site-config";

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.8 },
  { path: "/cost-guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/product-reviews", changeFrequency: "weekly", priority: 0.8 },
  { path: "/product-comparisons", changeFrequency: "weekly", priority: 0.8 },
  { path: "/categories", changeFrequency: "monthly", priority: 0.6 },
  { path: "/search", changeFrequency: "monthly", priority: 0.4 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Index pages change when content does; avoid claiming "modified now" on every build.
  const times = getAllContent()
    .map((item) => new Date(item.updatedAt).getTime())
    .filter(Number.isFinite);
  const latestUpdate = times.length > 0 ? new Date(Math.max(...times)) : new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: latestUpdate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: latestUpdate,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const contentEntries: MetadataRoute.Sitemap = getAllContent().map((item) => ({
    url: absoluteUrl(contentHref(item)),
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...contentEntries];
}
