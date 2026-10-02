import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  aside,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10", className)}>
      <div>
        <p className={cn("text-xs font-bold uppercase tracking-[0.18em]", light ? "text-brand" : "text-brand-ink")}>
          {eyebrow}
        </p>
        <h2 className={cn("mt-2 text-3xl font-semibold sm:text-4xl", light ? "text-on-dark" : "text-ink")}>
          {title}
        </h2>
      </div>
      {aside && (
        <div className={cn("max-w-sm text-sm sm:text-right", light ? "text-on-dark-muted" : "text-subtle")}>{aside}</div>
      )}
    </div>
  );
}
