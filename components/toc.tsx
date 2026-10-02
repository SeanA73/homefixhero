import type { Heading } from "@/lib/markdown";

function TocLinks({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.depth === 3 ? "pl-4" : undefined}>
          <a href={`#${heading.id}`} className="text-subtle hover:text-brand-ink">
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Collapsible variant for small screens. Pure HTML — no client JS. */
export function TocCollapsible({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="mb-8 rounded-lg border border-line bg-paper p-4 lg:hidden">
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        In this guide
      </summary>
      <div className="mt-3">
        <TocLinks headings={headings} />
      </div>
    </details>
  );
}

/** Sticky sidebar variant for large screens. */
export function TocSidebar({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">
          In this guide
        </p>
        <TocLinks headings={headings} />
      </div>
    </aside>
  );
}
