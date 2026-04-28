"use client";

import type { ComponentType } from "react";
import { Compass, MessagesSquare, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";
import type { SuggestionKind } from "@/lib/types";

const actionIcons: Record<
  SuggestionKind,
  ComponentType<{ className?: string }>
> = {
  "icebreaker": WandSparkles,
  "go-deeper": MessagesSquare,
  "avoid-assumptions": Compass,
};

export function ActionBar({
  onAction,
  kinds,
  disabled,
  locale,
}: {
  onAction: (kind: SuggestionKind) => void;
  kinds?: SuggestionKind[];
  disabled?: boolean;
  locale: "en" | "zh";
}) {
  const demoCopy = getCopy(locale).demo;
  const actions: Array<{
  kind: SuggestionKind;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  }> = (kinds ?? (Object.keys(actionIcons) as SuggestionKind[])).map((kind) => ({
    kind,
    label: demoCopy.actionLabels[kind],
    description: demoCopy.actionDescriptions[kind],
    icon: actionIcons[kind],
  }));

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          key={action.kind}
          type="button"
          onClick={() => onAction(action.kind)}
          disabled={disabled}
          className="group rounded-[24px] border border-[var(--border-strong)] bg-white/78 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] disabled:pointer-events-none disabled:opacity-60"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--panel-muted)] text-[var(--accent-stronger)]">
              <action.icon className="h-4.5 w-4.5" />
            </div>
            <Button variant="ghost" size="sm" className="pointer-events-none">
              {demoCopy.actionTry}
            </Button>
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-900">{action.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{action.description}</p>
        </button>
      ))}
    </div>
  );
}
