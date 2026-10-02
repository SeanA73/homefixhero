export type ContentKind =
  | "article"
  | "cost-guide"
  | "product-review"
  | "comparison";

export interface BaseContent {
  slug: string;
  title: string;
  description: string;
  /** Compact name for tight spaces (cost cards, review cards). Falls back to `title`. */
  shortTitle?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  coverImage?: string;
  /** 1 = easy, 2 = moderate, 3 = advanced. Only set where the guide supports it. */
  difficulty?: 1 | 2 | 3;
  /** Human-readable time to finish, e.g. "30–45 min". */
  timeNeeded?: string;
  body: string;
  readingTimeMinutes: number;
}

export interface Article extends BaseContent {
  kind: "article";
}

export interface CostGuide extends BaseContent {
  kind: "cost-guide";
  costLow: number;
  costHigh: number;
  costAverage: number;
  currency: string;
  unit?: string;
}

export interface ProductReview extends BaseContent {
  kind: "product-review";
  productName: string;
  brand: string;
  rating: number;
  pros: string[];
  cons: string[];
  priceRange?: string;
}

export interface ComparisonItem {
  name: string;
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface ProductComparison extends BaseContent {
  kind: "comparison";
  items: ComparisonItem[];
}

export type AnyContent = Article | CostGuide | ProductReview | ProductComparison;

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface StaticPage {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  body: string;
}
