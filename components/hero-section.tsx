"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { proofPoints } from "@/lib/content/proof-points";
import { siteConfig } from "@/lib/site-config";

const ROTATE_INTERVAL_MS = 3200;

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % proofPoints.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const proofPoint = proofPoints[index];

  return (
    <section className="text-center">
      <Badge className="bg-amber-100 text-amber-800">
        Trusted by homeowners nationwide
      </Badge>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
        {siteConfig.tagline} Real repair guides, honest cost breakdowns, and
        tool reviews — written so you know exactly what to do, and when to
        call a pro.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/articles" className={buttonVariants({ size: "lg", className: "bg-amber-600 px-5 hover:bg-amber-700" })}>
          Browse guides
        </Link>
        <Link href="/cost-guides" className={buttonVariants({ variant: "outline", size: "lg", className: "px-5" })}>
          See cost guides
        </Link>
      </div>

      <div className="relative mx-auto mt-10 h-12 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={proofPoint.fix}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-medium text-amber-900 shadow-sm"
          >
            <CheckCircle2 className="size-4 shrink-0 text-amber-600" />
            <span>
              {proofPoint.fix} — {proofPoint.savings}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
