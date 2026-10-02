"use client";

import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import type { CardData } from "@/lib/content/cards";
import { useSaved } from "@/lib/saved";

export function SavedGuides({ entries }: { entries: CardData[] }) {
  const saved = useSaved();
  const items = entries.filter((entry) => saved.includes(entry.href));

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line p-10 text-center">
        <p className="font-serif text-xl font-semibold text-ink">Nothing saved yet</p>
        <p className="mt-2 text-subtle">Tap the bookmark on any guide to keep it handy for the weekend.</p>
        <Link href="/articles" className="mt-5 inline-block font-semibold text-brand-ink hover:underline">
          Browse guides →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((entry) => (
        <ContentCard key={entry.href} card={entry} />
      ))}
    </div>
  );
}
