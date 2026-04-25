"use client";

import { SendHorizonal } from "lucide-react";

import { RewritePopover } from "@/components/bridgechat/RewritePopover";
import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";

type ComposerProps = {
  draft: string;
  setDraft: (value: string) => void;
  onSend: () => void;
  onRewrite: () => void;
  showRewriteHint: boolean;
  disabled?: boolean;
  locale: "en" | "zh";
};

export function Composer({
  draft,
  setDraft,
  onSend,
  onRewrite,
  showRewriteHint,
  disabled,
  locale,
}: ComposerProps) {
  const demoCopy = getCopy(locale).demo;

  return (
    <div className="space-y-4">
      <RewritePopover visible={showRewriteHint} onRewrite={onRewrite} locale={locale} />
      <div className="rounded-[32px] border border-[var(--border-strong)] bg-white/84 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="mb-3 text-sm text-slate-500">
          {demoCopy.helperHint}
        </p>
        <div className="flex flex-col gap-3">
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
