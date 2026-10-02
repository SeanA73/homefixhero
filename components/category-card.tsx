import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryIcon } from "@/components/category-icon";
import type { Category } from "@/lib/content/types";

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex min-h-[17rem] flex-col overflow-hidden rounded-3xl border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:shadow-warm"
    >
      <span
        aria-hidden
        className="absolute -bottom-10 -right-10 size-32 rounded-full bg-brand-soft transition duration-300 group-hover:scale-125"
      />
      <CategoryIcon slug={category.slug} className="size-[4.25rem]" iconClassName="size-8" />
      <p className="mt-auto pt-10 text-xs font-semibold text-subtle">
        {count === 0 ? "Coming soon" : `${count} ${count === 1 ? "guide" : "guides"} & reviews`}
      </p>
      <h3 className="mt-1 text-2xl font-semibold text-ink">{category.name}</h3>
      <p className="mt-1 max-w-[80%] text-sm text-subtle">{category.description}</p>
      <span className="absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
        <ArrowRight className="size-[18px]" aria-hidden />
      </span>
    </Link>
  );
}
