import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Fix it",
    links: categories.map((c) => ({ href: `/categories/${c.slug}`, label: c.name })),
  },
  {
    title: "Plan it",
    links: [
      { href: "/cost-guides", label: "Project costs" },
      { href: "/product-reviews", label: "Tool reviews" },
      { href: "/product-comparisons", label: "Comparisons" },
      { href: "/search", label: "Search" },
      { href: "/saved", label: "Saved guides" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our mission & standards" },
      { href: "/contact", label: "Contact us" },
      { href: "/privacy-policy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-bark text-on-dark-muted">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
              <BrandMark size={38} />
              <span className="font-serif text-2xl font-bold text-on-dark">
                HomeFix<span className="text-brand">Hero</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">
              {siteConfig.tagline} Clear help for calmer homeowners.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-on-dark-muted">
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              Safety callouts in every repair guide
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-serif text-lg font-semibold text-on-dark">{column.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-on-dark-muted transition hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-on-dark-faint sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Questions or corrections?{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline hover:text-brand">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
