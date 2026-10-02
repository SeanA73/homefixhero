import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

function Column({ title, items, tone }: { title: string; items: string[]; tone: "pro" | "con" }) {
  if (items.length === 0) return null;
  const Icon = tone === "pro" ? Check : Minus;
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-2 space-y-2 text-sm text-ink">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Icon
              className={cn("mt-0.5 size-4 shrink-0", tone === "pro" ? "text-sage" : "text-brick")}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProsCons({
  pros,
  cons,
  stacked = false,
  className,
}: {
  pros: string[];
  cons: string[];
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5", !stacked && "sm:grid-cols-2", className)}>
      <Column title="Pros" items={pros} tone="pro" />
      <Column title="Cons" items={cons} tone="con" />
    </div>
  );
}
