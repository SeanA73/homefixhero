import Link from "next/link";

interface ContentCardProps {
  href: string;
  title: string;
  description: string;
  categoryName?: string;
  meta?: string;
}

export function ContentCard({ href, title, description, categoryName, meta }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-stone-200 p-5 transition hover:border-amber-400 hover:shadow-sm"
    >
      {categoryName && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {categoryName}
        </span>
      )}
      <h3 className="mt-1 text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
      {meta && <p className="mt-3 text-xs text-stone-400">{meta}</p>}
    </Link>
  );
}
