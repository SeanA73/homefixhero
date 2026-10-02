import { ContentCard } from "@/components/content-card";
import { toCardData } from "@/lib/content/cards";
import type { AnyContent } from "@/lib/content/types";

export function CardGrid({ items }: { items: AnyContent[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line p-8 text-center text-subtle">
        Nothing here yet — we’re writing more. Check back soon.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ContentCard key={`${item.kind}-${item.slug}`} card={toCardData(item)} />
      ))}
    </div>
  );
}
