"use client";

import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TASKS = [
  "Test smoke and CO alarms",
  "Clear leaves from gutters",
  "Check weatherstripping",
  "Drain outdoor faucets",
  "Book furnace service",
];

export function SeasonalChecklist() {
  const [done, setDone] = useState<boolean[]>(() => TASKS.map(() => false));
  const count = done.filter(Boolean).length;
  const degrees = (count / TASKS.length) * 360;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="relative rounded-[2rem] border border-line bg-paper p-7 shadow-warm sm:p-9">
        <span className="absolute -top-4 left-8 -rotate-2 bg-brand-soft px-4 py-1.5 font-serif text-sm text-brand-ink shadow-sm">
          Pin this for the weekend
        </span>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">Seasonal care · 45 minutes</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Your autumn home checklist</h2>
            <p className="mt-2 max-w-sm text-subtle">
              Five small jobs now can prevent an expensive surprise when the temperature drops.
            </p>
          </div>
          <div
            role="img"
            aria-label={`${count} of ${TASKS.length} done`}
            className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(var(--sage) ${degrees}deg, var(--line) 0deg)` }}
          >
            <span className="flex size-[4.25rem] items-center justify-center rounded-full bg-paper font-serif text-xl font-bold text-ink">
              {count}
              <small className="text-xs font-normal text-subtle">/{TASKS.length}</small>
            </span>
          </div>
        </div>
        <ul className="mt-6">
          {TASKS.map((task, i) => (
            <li key={task} className="border-b border-dashed border-line last:border-0">
              <label className="flex cursor-pointer items-center gap-3 py-3.5">
                <input
                  type="checkbox"
                  checked={done[i]}
                  onChange={() => setDone((prev) => prev.map((v, n) => (n === i ? !v : v)))}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
                    done[i] ? "border-sage bg-sage text-white" : "border-line bg-cream"
                  )}
                >
                  {done[i] && <Check className="size-4" strokeWidth={3} aria-hidden />}
                </span>
                <span className={cn("text-ink transition", done[i] && "text-subtle line-through")}>{task}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] bg-brand-soft p-8 sm:p-10">
        <ShieldCheck className="size-14 text-brand-ink" strokeWidth={1.4} aria-hidden />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">Our safety-first promise</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">Bravery isn’t the same as guessing.</h2>
        <p className="mt-4 leading-relaxed text-ink/80">
          We label every job by risk, not ego. If a repair involves live mains power, gas lines, structural changes or
          a permit, we’ll tell you to call a licensed professional — and explain why.
        </p>
        <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-ink hover:underline">
          How our safety rules work →
        </Link>
      </div>
    </div>
  );
}
