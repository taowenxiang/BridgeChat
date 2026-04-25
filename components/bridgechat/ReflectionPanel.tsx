"use client";

import { AnimatePresence, motion } from "motion/react";
import { BookOpenText } from "lucide-react";

import { getCopy } from "@/lib/copy";

export function ReflectionPanel({
  visible,
  insights,
  locale,
}: {
  visible: boolean;
  insights: string[];
  locale: "en" | "zh";
}) {
  const copy = getCopy(locale);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28 }}
          className="rounded-[30px] border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,247,244,0.92))] p-6 shadow-[0_18px_45px_rgba(30,92,82,0.12)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-glow)] text-[var(--accent-stronger)]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {copy.demo.reflectionEyebrow}
              </p>
              <h3 className="text-xl font-semibold text-slate-950">
                {copy.reflectionTitle}
              </h3>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {insights.map((insight) => (
              <div
                key={insight}
                className="rounded-3xl border border-[var(--border-strong)] bg-white/84 px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {insight}
              </div>
            ))}
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
