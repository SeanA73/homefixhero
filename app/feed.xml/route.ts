import { Feed } from "feed";
import {
  getAllArticles,
  getAllComparisons,
  getAllCostGuides,
  getAllProductReviews,
} from "@/lib/content/loader";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

function buildFeed() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    image: absoluteUrl(siteConfig.ogImage),
    favicon: absoluteUrl("/icon"),
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
    feedLinks: {
      rss: absoluteUrl("/feed.xml"),
    },
  });

  const entries = [
    ...getAllArticles().map((item) => ({ ...item, basePath: "/articles" })),
    ...getAllCostGuides().map((item) => ({ ...item, basePath: "/cost-guides" })),
    ...getAllProductReviews().map((item) => ({ ...item, basePath: "/product-reviews" })),
    ...getAllComparisons().map((item) => ({ ...item, basePath: "/product-comparisons" })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  for (const entry of entries) {
    const url = absoluteUrl(`${entry.basePath}/${entry.slug}`);
    feed.addItem({
      title: entry.title,
      id: url,
      link: url,
      description: entry.description,
      author: [{ name: entry.author }],
      date: new Date(entry.updatedAt),
      published: new Date(entry.publishedAt),
    });
  }

  return feed;
}

export async function GET() {
  const feed = buildFeed();

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
