"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content-card";
import type { CardData } from "@/lib/content/cards";

export function SearchBox({ entries }: { entries: CardData[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q")?.slice(0, 100) ?? "");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return entries;
    return entries.filter((entry) => {
      const haystack = [entry.title, entry.description, entry.categoryName, ...entry.tags]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [entries, query]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search guides, costs, and reviews
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-subtle" aria-hidden />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “faucet”, “breaker”, or “drill”"
          autoComplete="off"
          className="w-full rounded-xl border border-line bg-paper py-3 pl-12 pr-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <p className="mt-4 text-sm text-subtle" role="status" aria-live="polite">
        {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : `${entries.length} pages`}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-line p-8 text-center text-subtle">
          Nothing matched “{query}”. Try a simpler word, or browse by category from the menu.
        </p>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {results.map((entry) => (
            <ContentCard key={entry.href} card={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
