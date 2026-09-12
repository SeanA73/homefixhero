import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const socialLinks: { label: string; href: string }[] = [
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "X", href: siteConfig.social.x },
  { label: "Pinterest", href: siteConfig.social.pinterest },
  { label: "YouTube", href: siteConfig.social.youtube },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-stone-600">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-base font-semibold text-stone-900">{siteConfig.name}</p>
            <p className="mt-1 max-w-sm">{siteConfig.tagline}</p>
            <a
              href={siteConfig.url}
              className="mt-2 inline-block text-amber-700 hover:underline"
            >
              {siteConfig.domain}
            </a>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 sm:items-end">
            <Link href="/about" className="hover:text-amber-700">
              About
            </Link>
            <Link href="/contact" className="hover:text-amber-700">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-amber-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-700">
              Terms of Use
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-700"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
