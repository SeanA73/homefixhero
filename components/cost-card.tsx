import Link from "next/link";
import { averagePosition, formatPrice } from "@/lib/content/cost";
import { contentHref } from "@/lib/content/kinds";
import type { CostGuide } from "@/lib/content/types";

export function CostCard({ guide, index }: { guide: CostGuide; index: number }) {
  const price = (n: number) => formatPrice(guide.currency, n);
  const position = averagePosition(guide);

  return (
    <Link
      href={contentHref(guide)}
      className="group flex flex-col rounded-3xl bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:shadow-warm"
    >
      <span className="font-serif text-sm font-semibold text-brand-ink">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">{guide.shortTitle ?? guide.title}</h3>
      <p className="mt-5 text-xs text-subtle">Typical total{guide.unit ? ` per ${guide.unit}` : ""}</p>
      <p className="font-serif text-3xl font-bold text-ink">{price(guide.costAverage)}</p>
      <div className="relative mt-4 h-1.5 rounded-full bg-line" role="img" aria-label={`Average ${price(guide.costAverage)}, range ${price(guide.costLow)} to ${price(guide.costHigh)}`}>
        <span className="absolute inset-y-0 left-0 right-0 rounded-full bg-brand/30" />
        <span
          className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-brand-deep shadow"
          style={{ left: `${position}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-subtle">
        {price(guide.costLow)}–{price(guide.costHigh)} range
      </p>
    </Link>
  );
}
