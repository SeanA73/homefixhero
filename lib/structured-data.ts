import { absoluteUrl, siteConfig } from "./site-config";

function organization() {
  return {
    "@type": "Organization" as const,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo.horizontal),
    sameAs: Object.values(siteConfig.social),
  };
}

export function organizationSchema() {
  return { "@context": "https://schema.org", ...organization() };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  image?: string;
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author,
  image,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    image: [absoluteUrl(image ?? siteConfig.ogImage)],
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: author },
    publisher: organization(),
  };
}

interface BreadcrumbInput {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface ProductReviewSchemaInput {
  productName: string;
  brand: string;
  rating: number;
  description: string;
  author: string;
  publishedAt: string;
}

export function productReviewSchema({
  productName,
  brand,
  rating,
  description,
  author,
  publishedAt,
}: ProductReviewSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: productName,
      brand: { "@type": "Brand", name: brand },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    name: productName,
    reviewBody: description,
    author: { "@type": "Organization", name: author },
    datePublished: publishedAt,
    publisher: organization(),
  };
}
