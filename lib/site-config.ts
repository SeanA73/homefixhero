export const siteConfig = {
  name: "HomeFixHero",
  shortName: "HomeFixHero",
  domain: "https://homefixhero.com",
  url: "https://homefixhero.com",
  description: "Your trusted guide to fixing home problems.",
  tagline: "Your trusted guide to fixing home problems.",
  email: "hello@homefixhero.com",
  locale: "en_US",
  ogImage: "/opengraph-image",
  logo: {
    horizontal: "/branding/logo/homefixhero-logo-horizontal.svg",
    icon: "/branding/logo/homefixhero-logo-icon.svg",
  },
  social: {
    facebook: "https://facebook.com/homefixhero",
    x: "https://x.com/homefixhero",
    pinterest: "https://pinterest.com/homefixhero",
    youtube: "https://youtube.com/@homefixhero",
    linkedin: "https://linkedin.com/company/homefixhero",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds an absolute homefixhero.com URL from a site-relative path. */
export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}
