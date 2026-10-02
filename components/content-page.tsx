import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { RelatedContent } from "@/components/related-content";
import { TocCollapsible, TocSidebar } from "@/components/toc";
import { getCategory } from "@/lib/content/categories";
import { contentHref, KIND_META } from "@/lib/content/kinds";
import type { AnyContent } from "@/lib/content/types";
import { extractHeadings } from "@/lib/markdown";
import { breadcrumbSchema } from "@/lib/structured-data";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

interface ContentPageProps {
  item: AnyContent;
  /** Structured data specific to the content type (article / review schema). */
  schema: ReactNode;
  /** Type-specific summary block rendered between the header and the body. */
  children?: ReactNode;
}

/** Shared detail-page layout: breadcrumbs, header, TOC + prose, related content. */
export function ContentPage({ item, schema, children }: ContentPageProps) {
  const category = getCategory(item.category);
  const kind = KIND_META[item.kind];
  const headings = extractHeadings(item.body);
  const updated = item.updatedAt !== item.publishedAt;

  return (
    <article className="mx-auto max-w-6xl px-6 py-10">
      {schema}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: kind.plural, path: kind.basePath },
          { name: item.title, path: contentHref(item) },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: kind.plural, href: kind.basePath },
          { name: item.title },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink">
          {kind.label}
          {category && ` · ${category.name}`}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-4 text-lg text-subtle">{item.description}</p>
        <p className="mt-4 text-sm text-subtle">
          By {item.author} · {updated ? `Updated ${formatDate(item.updatedAt)}` : formatDate(item.publishedAt)} ·{" "}
          {item.readingTimeMinutes} min read
        </p>
      </header>

      {children && <div className="mt-8 max-w-3xl">{children}</div>}

      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
        <div className="min-w-0 max-w-3xl">
          <TocCollapsible headings={headings} />
          <Prose markdown={item.body} />
        </div>
        <TocSidebar headings={headings} />
      </div>

      <RelatedContent item={item} />
    </article>
  );
}
