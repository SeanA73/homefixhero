export type ContentKind =
  | "article"
  | "cost-guide"
  | "product-review"
  | "comparison";

export interface BaseContent {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  coverImage?: string;
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
