import { ArrowRight, Clock, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CardData } from "@/lib/content/cards";
import { DIFFICULTY_LABELS } from "@/lib/content/kinds";

const QUICK_PICKS = [
  { label: "Leaky faucet", q: "faucet" },
  { label: "Tripped breaker", q: "breaker" },
  { label: "Clogged drain", q: "drain" },
  { label: "Water heater cost", q: "water heater" },
  { label: "Cordless drill", q: "drill" },
];

export function HeroSection({ spotlight }: { spotlight?: CardData }) {
  return (
    <section className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div className="reveal min-w-0">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand-ink">
          <ShieldCheck className="size-4" aria-hidden />
          Your trusted guide to fixing home problems
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
          Fix it yourself.
          <br />
          Or know exactly when to{" "}
          <span className="relative italic sm:whitespace-nowrap text-brand-ink">
            call a pro.
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-2.5 w-full text-brand"
            >
              <path d="M2 8c60-8 120-8 180-3s90 3 116-1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-subtle">
          Calm, clear repair advice for real homes. We’ll show you what’s happening, what it should cost, and whether
          it’s safe to tackle yourself.
        </p>

        <form action="/search" role="search" className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-line bg-paper p-2 shadow-warm focus-within:border-brand">
          <Search className="ml-3 size-5 shrink-0 text-subtle" aria-hidden />
          <label htmlFor="hero-search" className="sr-only">
            What’s broken?
          </label>
          <input
            id="hero-search"
            name="q"
            type="search"
            placeholder="What’s broken? Try “dripping tap”"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink outline-none placeholder:text-subtle/80"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Find a fix <ArrowRight className="size-4" aria-hidden />
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-ink">Popular:</span>
          {QUICK_PICKS.map((pick) => (
            <Link
              key={pick.label}
              href={`/search?q=${encodeURIComponent(pick.q)}`}
              className="rounded-full border border-line bg-paper px-3 py-1.5 text-subtle transition hover:border-brand hover:text-brand-ink"
            >
              {pick.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="reveal reveal-delay relative mx-auto min-w-0 w-full max-w-xl pb-12 lg:mx-0">
        <div className="absolute -left-4 -top-3 z-10 h-7 w-24 -rotate-[35deg] bg-brand/40" aria-hidden />
        <div className="rotate-[1.5deg] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[10px] border-paper bg-paper shadow-warm">
          <div className="relative aspect-[4/5]">
            <Image
              src="/photos/hero.jpg"
              alt="A cordless drill held in a hand on a well-used workbench"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
        <p className="absolute right-2 top-10 z-10 rotate-6 font-serif text-lg italic text-brand-ink" aria-hidden>
          You’ve got this! ↗
        </p>

        {spotlight && (
          <Link
            href={spotlight.href}
            className="absolute -left-2 bottom-0 z-10 w-[17.5rem] -rotate-2 rounded-2xl border border-line bg-paper p-4 shadow-warm transition hover:rotate-0 sm:-left-8"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="size-2.5 rounded-full bg-sage" aria-hidden />
              {spotlight.difficulty === 1 ? "DIY friendly" : "Worth a read first"}
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs text-subtle">{spotlight.title}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
              {spotlight.difficulty && (
                <div>
                  <dt className="text-xs text-subtle">Difficulty</dt>
                  <dd className="font-semibold text-ink">{DIFFICULTY_LABELS[spotlight.difficulty - 1]}</dd>
                </div>
              )}
              {spotlight.timeNeeded && (
                <div>
                  <dt className="flex items-center gap-1 text-xs text-subtle">
                    <Clock className="size-3" aria-hidden /> Time
                  </dt>
                  <dd className="font-semibold text-ink">{spotlight.timeNeeded}</dd>
                </div>
              )}
            </dl>
          </Link>
        )}
      </div>
    </section>
  );
}
