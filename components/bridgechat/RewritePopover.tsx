"use client";

import { ArrowRightLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";

export function RewritePopover({
  visible,
  onRewrite,
  locale,
}: {
  visible: boolean;
  onRewrite: () => void;
  locale: "en" | "zh";
}) {
  const demoCopy = getCopy(locale).demo;

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--accent-glow)] px-4 py-3 text-sm text-[var(--accent-stronger)] shadow-[0_14px_35px_rgba(46,109,100,0.12)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-6">
          {demoCopy.rewriteHint}
        </p>
        <Button size="sm" variant="secondary" onClick={onRewrite}>
          <ArrowRightLeft className="h-3.5 w-3.5" />
          {demoCopy.rewriteButton}
        </Button>
      </div>
    </div>
  );
}
