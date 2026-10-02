"use client";

import { ArrowRight, ShieldAlert, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ROOMS = ["Kitchen", "Bathroom", "Basement", "Whole house"] as const;
const SYMPTOMS = ["Dripping", "Not turning on", "Slow or clogged", "Strange noise", "Bad smell"] as const;
type Room = (typeof ROOMS)[number];
type Symptom = (typeof SYMPTOMS)[number];

export interface SolverLinks {
  faucet?: string;
  breaker?: string;
  drain?: string;
}

type Verdict = "diy" | "check" | "pro";
interface Diagnosis {
  verdict: Verdict;
  title: string;
  body: string;
  href: string;
  cta: string;
}

const VERDICT = {
  diy: { label: "Likely DIY-friendly", icon: ShieldCheck, tone: "bg-sage-soft text-sage" },
  check: { label: "Start with a safe check", icon: Wrench, tone: "bg-brand-soft text-brand-ink" },
  pro: { label: "Call a professional", icon: ShieldAlert, tone: "bg-brick-soft text-brick" },
} as const;

const searchFor = (q: string) => `/search?q=${encodeURIComponent(q)}`;

function diagnose(room: Room, symptom: Symptom, links: SolverLinks): Diagnosis {
  const wet = room === "Kitchen" || room === "Bathroom";

  if (symptom === "Bad smell") {
    return {
      verdict: "pro",
      title: "Treat unusual smells seriously",
      body: "If it smells like gas (rotten eggs) or burning, leave the house, don’t touch switches, and call your gas utility or emergency services from outside. Sewer or musty smells are usually a drain or moisture issue — a plumber can trace them.",
      href: searchFor("drain"),
      cta: "Read about drains",
    };
  }
  if (symptom === "Dripping" && wet && links.faucet) {
    return {
      verdict: "diy",
      title: "A worn faucet part is the likely cause",
      body: "Most drips come from a worn washer or cartridge. Allow under an hour and have the right replacement part ready.",
      href: links.faucet,
      cta: "See the guide",
    };
  }
  if (symptom === "Dripping") {
    return {
      verdict: "pro",
      title: "Find the source before you fix anything",
      body: "Drips from a ceiling, pipe joint or the main line can mean hidden damage. If you can’t trace it quickly, shut off the water supply and call a licensed plumber.",
      href: searchFor("leak"),
      cta: "Search leak guides",
    };
  }
  if (symptom === "Not turning on" && links.breaker) {
    return {
      verdict: "check",
      title: "Check the breaker panel first",
      body: "A tripped breaker is the most common cause. If it trips again straight away, stop and call an electrician.",
      href: links.breaker,
      cta: "See the guide",
    };
  }
  if (symptom === "Slow or clogged" && wet && links.drain) {
    return {
      verdict: "diy",
      title: "Pick the right tool for the clog",
      body: "A plunger and a drain snake solve different clogs. Our comparison shows which to reach for first.",
      href: links.drain,
      cta: "Plunger vs. snake",
    };
  }
  return {
    verdict: "check",
    title: "Let’s look for a matching guide",
    body: "We don’t have a step-by-step for this exact combination yet. Search for the closest match — and if anything involves gas, live wiring or flooding, call a pro.",
    href: searchFor(symptom === "Strange noise" ? "noise" : room),
    cta: "Search the library",
  };
}

function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-ink">{label}</legend>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              "rounded-xl border px-4 py-3 text-left text-[0.95rem] transition",
              value === option
                ? "border-brand bg-brand-soft font-medium text-brand-ink ring-2 ring-brand/30"
                : "border-line bg-cream text-ink hover:border-brand/60"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ProblemSolver({ links }: { links: SolverLinks }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [symptom, setSymptom] = useState<Symptom | null>(null);
  const diagnosis = room && symptom ? diagnose(room, symptom, links) : null;
  const verdict = diagnosis ? VERDICT[diagnosis.verdict] : null;
  const step = symptom && room ? 3 : room ? 2 : 1;

  return (
    <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-warm sm:p-8">
      <ol className="flex items-center gap-2" aria-label="Progress">
        {[1, 2, 3].map((n) => (
          <li key={n} className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full border text-xs font-bold transition",
                n <= step ? "border-brand bg-brand text-white" : "border-line bg-cream text-subtle"
              )}
            >
              {n}
            </span>
            {n < 3 && <span className={cn("h-0.5 w-14 transition", n < step ? "bg-brand" : "bg-line")} aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ChoiceGroup label="Where’s the problem?" options={ROOMS} value={room} onChange={setRoom} />
        <ChoiceGroup label="What can you see or hear?" options={SYMPTOMS} value={symptom} onChange={setSymptom} />
      </div>

      <div aria-live="polite" className="mt-6">
        {diagnosis && verdict ? (
          <div className="reveal flex flex-col gap-4 rounded-2xl border border-line bg-cream p-5 sm:flex-row sm:items-center">
            <span className={cn("inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold", verdict.tone)}>
              <verdict.icon className="size-4" aria-hidden />
              {verdict.label}
            </span>
            <div className="flex-1">
              <p className="font-serif text-lg font-semibold text-ink">{diagnosis.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-subtle">{diagnosis.body}</p>
            </div>
            <Link
              href={diagnosis.href}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
            >
              {diagnosis.cta} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line px-5 py-4 text-sm text-subtle">
            Pick a room and a symptom — we’ll suggest where to start and whether it’s a DIY job.
          </p>
        )}
      </div>
    </div>
  );
}
