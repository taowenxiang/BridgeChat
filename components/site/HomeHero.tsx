import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { demoCopy } from "@/lib/demo-copy";

export function HomeHero() {
  const copy = demoCopy.home;

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.78)] px-6 py-8 shadow-[0_24px_70px_rgba(17,32,42,0.08)] backdrop-blur md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,208,193,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(31,107,99,0.12),transparent_34%)]" />

      <div className="relative max-w-3xl">
        <p className="inline-flex rounded-full border border-[var(--border-strong)] bg-[var(--accent-glow)] px-4 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--accent-stronger)] uppercase">
          {copy.badge}
        </p>

        <h1 className="mt-6 text-5xl leading-none text-[var(--foreground)] md:text-7xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-lg text-[color:rgba(17,32,42,0.78)] md:text-2xl">
          {copy.tagline}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[color:rgba(17,32,42,0.74)] md:text-lg">
          {copy.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/demo">
              {copy.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#principles">{copy.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
