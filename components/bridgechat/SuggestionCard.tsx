"use client";

import { AnimatePresence, motion } from "motion/react";
import { WandSparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";
import type { Suggestion } from "@/lib/types";

export function SuggestionCard({
  suggestion,
  onInsert,
  onDismiss,
  locale,
}: {
  suggestion: Suggestion | null;
  onInsert: (text: string) => void;
  onDismiss: () => void;
  locale: "en" | "zh";
}) {
  const demoCopy = getCopy(locale).demo;

  return (
    <AnimatePresence mode="wait">
      {suggestion ? (
        <motion.div
          key={suggestion.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24 }}
          className="rounded-[28px] border border-[var(--border-strong)] bg-white/86 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-glow)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-stronger)]">
                <WandSparkles className="h-3.5 w-3.5" />
                {demoCopy.actionLabels[suggestion.kind]}
              </div>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                {suggestion.text}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {suggestion.explanation}
              </p>
            </div>
            <button
              type="button"
              aria-label={demoCopy.dismissSuggestion}
              onClick={onDismiss}
              className="rounded-full border border-[var(--border-strong)] p-2 text-slate-400 transition hover:text-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestion.sourceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--panel-muted)] px-3 py-1 text-xs font-medium text-slate-500"
              >
                {demoCopy.suggestionTags[tag] ?? tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => onInsert(suggestion.text)}>{demoCopy.cardInsert}</Button>
            <Button variant="secondary" onClick={onDismiss}>
              {demoCopy.cardKeep}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
