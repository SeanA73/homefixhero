import { CardGrid } from "@/components/card-grid";
import { getRelatedContent } from "@/lib/content/loader";
import type { AnyContent } from "@/lib/content/types";

export function RelatedContent({ item }: { item: AnyContent }) {
  const related = getRelatedContent(item);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-20 border-t border-line pt-12">
      <h2 id="related-heading" className="mb-6 text-2xl font-semibold text-ink">
        Keep reading
      </h2>
      <CardGrid items={related} />
    </section>
  );
}
