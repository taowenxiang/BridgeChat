"use client";

import { X } from "lucide-react";
import { SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";
import type { ChatMessage } from "@/lib/types";

type ComposerProps = {
  draft: string;
  setDraft: (value: string) => void;
  onSend: () => void;
  replyTarget: ChatMessage | null;
  onClearReplyTarget: () => void;
  disabled?: boolean;
  locale: "en" | "zh";
};

export function Composer({
  draft,
  setDraft,
  onSend,
  replyTarget,
  onClearReplyTarget,
  disabled,
  locale,
}: ComposerProps) {
  const demoCopy = getCopy(locale).demo;

  return (
    <div className="space-y-4">
      <div className="rounded-[32px] border border-[var(--border-strong)] bg-white/84 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="mb-3 text-sm text-slate-500">
          {demoCopy.helperHint}
        </p>
        <div className="flex flex-col gap-3">
          {replyTarget ? (
            <div className="flex items-start justify-between gap-3 rounded-[24px] border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-3 text-sm leading-6 text-slate-600">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {demoCopy.replyingTo}
                </p>
                <p className="mt-1 truncate">{replyTarget.text}</p>
              </div>
              <button
                type="button"
                aria-label={demoCopy.clearReply}
                onClick={onClearReplyTarget}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={demoCopy.composerPlaceholder}
            className="min-h-[112px] w-full resize-none rounded-[24px] border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-[var(--accent-soft)] focus:bg-white"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              {demoCopy.gentleGuardrail}
            </p>
            <Button onClick={onSend} disabled={disabled || !draft.trim()}>
              <SendHorizonal className="h-4 w-4" />
              {demoCopy.send}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
