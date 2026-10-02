import { Droplet, Flame, Wrench, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Icon + tint per trade, shared by trade cards, content-card fallbacks and the menu. */
const CATEGORY_STYLE: Record<string, { icon: LucideIcon; tint: string }> = {
  plumbing: { icon: Droplet, tint: "bg-brand-soft text-brand-ink" },
  electrical: { icon: Zap, tint: "bg-brick-soft text-brick" },
  hvac: { icon: Flame, tint: "bg-sage-soft text-sage" },
  tools: { icon: Wrench, tint: "bg-brand-soft text-brand-ink" },
};

export function CategoryIcon({
  slug,
  className,
  iconClassName,
}: {
  slug: string;
  className?: string;
  iconClassName?: string;
}) {
  const style = CATEGORY_STYLE[slug] ?? CATEGORY_STYLE.tools;
  const Icon = style.icon;
  return (
    <span className={cn("flex items-center justify-center rounded-2xl", style.tint, className)}>
      <Icon className={cn("size-6", iconClassName)} strokeWidth={1.6} aria-hidden />
    </span>
  );
}
