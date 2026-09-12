import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Categories",
  description: "Browse HomeFixHero guides, cost breakdowns, and reviews by category.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-lg border border-stone-200 p-5 transition hover:border-amber-400 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold text-stone-900">{category.name}</h2>
            <p className="mt-2 text-sm text-stone-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
