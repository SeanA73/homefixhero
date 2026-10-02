import type { CostGuide } from "./types";

export function formatPrice(currency: string, value: number): string {
  return `${currency === "USD" ? "$" : `${currency} `}${value.toLocaleString()}`;
}

/** Where the average sits between low and high, as a 0–100 percentage. */
export function averagePosition({ costLow, costHigh, costAverage }: Pick<CostGuide, "costLow" | "costHigh" | "costAverage">): number {
  const span = costHigh - costLow;
  if (span <= 0) return 50;
  return Math.min(100, Math.max(0, ((costAverage - costLow) / span) * 100));
}
