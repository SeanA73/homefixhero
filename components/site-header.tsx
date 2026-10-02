"use client";

import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CategoryIcon } from "@/components/category-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/cost-guides", label: "Project costs" },
  { href: "/product-reviews", label: "Tool reviews" },
  { href: "/product-comparisons", label: "Comparisons" },
  { href: "/about", label: "Our standards" },
];

function Wordmark() {
  return (
    <span className="font-serif text-xl font-bold tracking-tight text-ink sm:text-2xl">
      HomeFix<span className="text-brand">Hero</span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);

  // Close menus after navigation (state reset keyed on pathname change).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setGuidesOpen(false);
  }

  useEffect(() => {
    // Written straight to the DOM: no React re-render of the header per scroll event.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!guidesOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!guidesRef.current?.contains(event.target as Node)) setGuidesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setGuidesOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [guidesOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div
        ref={barRef}
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand"
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <BrandMark size={38} />
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-ink lg:flex">
          <div ref={guidesRef} className="relative">
            <button
              type="button"
              onClick={() => setGuidesOpen((open) => !open)}
              aria-expanded={guidesOpen}
              aria-controls="guides-menu"
              className="flex items-center gap-1 hover:text-brand-ink"
            >
              Fix-it guides
              <ChevronDown className={`size-4 transition ${guidesOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {guidesOpen && (
              <div
                id="guides-menu"
                className="absolute left-1/2 top-full mt-4 w-[26rem] -translate-x-1/2 rounded-3xl border border-line bg-paper p-3 shadow-warm"
              >
                <ul className="grid gap-1">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-brand-soft"
                      >
                        <CategoryIcon slug={category.slug} className="size-10 shrink-0" iconClassName="size-5" />
                        <span>
                          <span className="block font-semibold text-ink">{category.name}</span>
                          <span className="block text-xs leading-snug text-subtle">{category.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/articles"
                  className="mt-1 block rounded-2xl px-3 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-soft"
                >
                  All repair guides →
                </Link>
              </div>
            )}
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-brand"
          >
            <Search className="size-[18px]" aria-hidden />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav-panel"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-cream px-6 pb-5 pt-2 shadow-warm lg:hidden"
          >
            <p className="pt-3 text-xs font-semibold uppercase tracking-wider text-subtle">Fix-it guides</p>
            <ul>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex items-center gap-3 py-2.5 font-medium text-ink"
                  >
                    <CategoryIcon slug={category.slug} className="size-9" iconClassName="size-[18px]" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 border-t border-line pt-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block py-2.5 font-medium text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
