import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {children && <p className="mt-4 text-lg leading-relaxed text-subtle">{children}</p>}
    </header>
  );
}
