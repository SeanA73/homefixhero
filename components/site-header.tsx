import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.name}>
          <Image
            src={siteConfig.logo.horizontal}
            alt={siteConfig.name}
            width={180}
            height={38}
            priority
          />
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-stone-700 sm:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="hover:text-amber-700"
            >
              {category.name}
            </Link>
          ))}
          <Link href="/about" className="hover:text-amber-700">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
