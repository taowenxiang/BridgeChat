"use client";

import { cn } from "@/lib/utils";
import type { DemoSceneStep } from "@/lib/types";

type AnnotationRailProps = {
  steps: DemoSceneStep[];
  activeStepIndex: number;
};

export function AnnotationRail({ steps, activeStepIndex }: AnnotationRailProps) {
  return (
    <aside className="rounded-[30px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_24px_60px_rgba(17,32,42,0.08)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-stronger)]">
        Scene annotations
      </p>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const isActive = index === activeStepIndex;

          return (
            <li
              aria-current={isActive ? "step" : undefined}
              key={step.id}
              className={cn(
                "rounded-[24px] border p-4 transition",
                isActive
                  ? "border-[var(--accent-strong)] bg-[var(--accent-glow)] shadow-[0_16px_34px_rgba(31,107,99,0.1)]"
                  : "border-[var(--border-soft)] bg-white/70",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {`Step ${index + 1}`}
              </p>
              <h2 className="mt-2 text-base font-semibold text-slate-950">{step.annotation.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.annotation.body}</p>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
