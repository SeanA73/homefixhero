import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-line" aria-hidden />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-ink">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
