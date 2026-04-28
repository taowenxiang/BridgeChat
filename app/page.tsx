"use client";

import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";

import { LanguageToggle } from "@/components/bridgechat/LanguageToggle";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";

export default function HomePage() {
  const { locale } = useLocale();
  const copy = getCopy(locale);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(178,239,226,0.55),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(120,141,225,0.18),transparent_32%)]" />

      <div className="relative mx-auto flex max-w-[1380px] justify-end">
        <LanguageToggle />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1380px] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[38px] border border-[var(--border-strong)] bg-white/72 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--accent-glow)] px-4 py-2 text-sm font-semibold text-[var(--accent-stronger)]">
            <MessageSquareText className="h-4 w-4" />
            {copy.landing.badge}
          </div>

          <h1 className="mt-8 font-[var(--font-display)] text-5xl leading-tight text-slate-950 md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-xl text-slate-600">{copy.tagline}</p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            {copy.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/demo">
                {copy.landing.launch}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#principles">{copy.landing.viewPrinciples}</a>
            </Button>
          </div>

          <div id="principles" className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {copy.designPrinciplesLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {copy.designPrincipleChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--border-strong)] bg-white/78 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[38px] border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(234,243,255,0.8))] p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="absolute right-5 top-5 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
            {copy.landing.desktopBadge}
          </div>
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-[var(--border-strong)] bg-white/82 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {copy.landing.stripTitle}
                  </p>
                  <p className="text-xs text-slate-500">
                    {copy.landing.stripSubtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {copy.landing.previewChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[var(--border-strong)] bg-[var(--panel-muted)] px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-[var(--border-strong)] bg-white/82 p-5 shadow-sm">
                <div className="space-y-4">
                  <div className="ml-auto max-w-[72%] rounded-[24px] rounded-br-md bg-[var(--accent-strong)] px-4 py-3 text-sm text-white">
                    {copy.landing.previewMessageA}
                  </div>
                  <div className="max-w-[72%] rounded-[24px] rounded-bl-md border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-3 text-sm text-slate-700">
                    {copy.landing.previewMessageB}
                  </div>
                  <div className="rounded-[24px] border border-[var(--border-strong)] bg-[var(--accent-glow)] px-4 py-3 text-sm text-[var(--accent-stronger)]">
                    {copy.landing.previewHint}
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-[var(--border-strong)] bg-white/82 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {copy.drawerTitle}
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--panel-muted)] p-4 text-sm text-slate-600">
                    {copy.landing.sharedGround}
                  </div>
                  <div className="rounded-3xl border border-dashed border-[var(--border-strong)] bg-white/70 p-4 text-sm text-slate-500">
                    {copy.landing.beyondLabel}
                  </div>
                  <div className="rounded-3xl border border-[var(--border-strong)] bg-white p-4 text-sm text-slate-700">
                    {copy.landing.reflectionAppears}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
