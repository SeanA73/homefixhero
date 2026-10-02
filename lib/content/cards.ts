import { getCategory } from "./categories";
import { formatPrice } from "./cost";
import { contentHref, KIND_META } from "./kinds";
import { getAllContent } from "./loader";
import type { AnyContent } from "./types";

/** Serializable shape shared by every card/list/search surface. */
export interface CardData {
  href: string;
  title: string;
  description: string;
  kindLabel: string;
  categorySlug: string;
  categoryName?: string;
  image?: string;
  difficulty?: 1 | 2 | 3;
  timeNeeded?: string;
  /** Overrides the footer line (e.g. "Avg. $1,800" for cost guides). */
  meta?: string;
  readingTimeMinutes: number;
  tags: string[];
}

export function toCardData(item: AnyContent): CardData {
  return {
    href: contentHref(item),
    title: item.title,
    description: item.description,
    kindLabel: KIND_META[item.kind].label,
    categorySlug: item.category,
    categoryName: getCategory(item.category)?.name,
    image: item.coverImage,
    difficulty: item.difficulty,
    timeNeeded: item.timeNeeded,
    meta:
      item.kind === "cost-guide"
        ? `Avg. ${formatPrice(item.currency, item.costAverage)}`
        : item.kind === "product-review"
          ? `Rated ${item.rating.toFixed(1)} / 5`
          : undefined,
    readingTimeMinutes: item.readingTimeMinutes,
    tags: item.tags,
  };
}

export function getAllCards(): CardData[] {
  return getAllContent().map(toCardData);
}
