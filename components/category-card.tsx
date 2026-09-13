import { Fan, Hammer, Plug, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import type { Category } from "@/lib/content/types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  plumbing: Wrench,
  electrical: Plug,
  hvac: Fan,
  tools: Hammer,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = CATEGORY_ICONS[category.slug] ?? Wrench;

  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <Card className="items-center text-center transition hover:ring-amber-400 hover:shadow-sm">
        <CardContent className="flex flex-col items-center gap-3 py-2">
          <span className="flex size-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Icon className="size-5" />
          </span>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription className="line-clamp-2">{category.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
