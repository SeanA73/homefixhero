import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/** Builds canonical/OG/Twitter metadata for a page, rooted at homefixhero.com. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@homefixhero",
    },
  };
}
