import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookmarkButton } from "@/components/bookmark-button";
import { CategoryIcon } from "@/components/category-icon";
import type { CardData } from "@/lib/content/cards";
import { DIFFICULTY_LABELS } from "@/lib/content/kinds";
import { cn } from "@/lib/utils";

function Difficulty({ level }: { level: 1 | 2 | 3 }) {
  const label = DIFFICULTY_LABELS[level - 1];
  return (
    <span className="flex items-center gap-2 text-xs text-subtle">
      Difficulty
      <span className="flex gap-1" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className={cn("h-1 w-4 rounded-full", n <= level ? "bg-sage" : "bg-line")} />
        ))}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Stretched-link card: the title link covers the card, the bookmark sits above it. */
export function ContentCard({ card }: { card: CardData }) {
  const { href, title, description, kindLabel, categorySlug, categoryName, image, difficulty, timeNeeded } = card;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-warm">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CategoryIcon
            slug={categorySlug}
            className="size-full rounded-none bg-transparent"
            iconClassName="size-14 opacity-60"
          />
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          {categoryName ?? kindLabel}
        </span>
        <BookmarkButton href={href} title={title} className="absolute right-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-ink">{kindLabel}</p>
        <h3 className="mt-1.5 text-xl font-semibold leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-subtle">{description}</p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-subtle">
            {difficulty && <Difficulty level={difficulty} />}
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {card.meta ?? timeNeeded ?? `${card.readingTimeMinutes} min read`}
            </span>
            <ArrowRight
              className="ml-auto size-4 text-brand-ink transition group-hover:translate-x-1"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </article>
  );
}
