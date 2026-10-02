"use client";

import { Bookmark } from "lucide-react";
import { toggleSaved, useSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function BookmarkButton({ href, title, className }: { href: string; title: string; className?: string }) {
  const saved = useSaved().includes(href);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(href)}
      aria-pressed={saved}
      aria-label={saved ? `Remove “${title}” from saved` : `Save “${title}” for later`}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm backdrop-blur transition hover:scale-105 hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-brand",
        saved && "text-brand-ink",
        className
      )}
    >
      <Bookmark className="size-[18px]" fill={saved ? "currentColor" : "none"} aria-hidden />
    </button>
  );
}
