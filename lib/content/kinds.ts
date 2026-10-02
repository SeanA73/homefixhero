import type { AnyContent, ContentKind } from "./types";

/** Route segment and display labels for each content type — single source of truth. */
export const KIND_META: Record<ContentKind, { basePath: string; label: string; plural: string }> = {
  article: { basePath: "/articles", label: "Guide", plural: "Guides" },
  "cost-guide": { basePath: "/cost-guides", label: "Cost guide", plural: "Cost guides" },
  "product-review": { basePath: "/product-reviews", label: "Review", plural: "Reviews" },
  comparison: { basePath: "/product-comparisons", label: "Comparison", plural: "Comparisons" },
};

export function contentHref(item: Pick<AnyContent, "kind" | "slug">): string {
  return `${KIND_META[item.kind].basePath}/${item.slug}`;
}

export const DIFFICULTY_LABELS = ["Easy", "Moderate", "Advanced"] as const;
