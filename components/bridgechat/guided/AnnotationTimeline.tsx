import { cn } from "@/lib/utils";
import type { GuidedScene } from "@/lib/guided-scene-data";
import type { GuidedSceneSnapshot } from "@/lib/guided-scene-player";

export function AnnotationTimeline({
  scene,
  activeBeatIndex,
  snapshot,
}: {
  scene: GuidedScene;
  activeBeatIndex: number;
  snapshot: GuidedSceneSnapshot;
}) {
  return (
    <aside
      aria-label="Scene timeline panel"
      className="rounded-[30px] border border-[var(--border-strong)] bg-white/70 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Scene Purpose
        </p>
        <h2 className="text-2xl text-slate-950">{scene.title}</h2>
        <p className="text-sm leading-7 text-slate-600">{scene.subtitle}</p>
      </div>

      <ol aria-label="Scene timeline" className="mt-6 space-y-3">
        {scene.beats.map((beat, index) => {
          const state =
            index === activeBeatIndex ? "current" : index < activeBeatIndex ? "complete" : "upcoming";

          return (
            <li
              key={`${scene.id}-${index}`}
              aria-label={`Beat ${index + 1}: ${beat.rhythmLabel}`}
              data-state={state}
              className={cn(
                "rounded-[24px] border px-4 py-4 transition",
                state === "current" &&
                  "border-[var(--accent-soft)] bg-[linear-gradient(180deg,rgba(248,255,252,0.98),rgba(238,249,245,0.98))] shadow-[0_16px_32px_rgba(30,92,82,0.10)]",
                state === "complete" &&
                  "border-[var(--border-strong)] bg-white/84 text-slate-700",
                state === "upcoming" &&
                  "border-transparent bg-slate-50/88 text-slate-400",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-1 h-3 w-3 rounded-full",
                    state === "current" && "bg-[var(--accent-strong)]",
                    state === "complete" && "bg-slate-300",
                    state === "upcoming" && "bg-slate-200",
                  )}
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {beat.rhythmLabel}
                  </p>
                  <h3 className="mt-1 text-sm leading-6 text-slate-900">
                    {beat.annotation.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6">
                    {state === "upcoming" ? "Upcoming explanation" : beat.annotation.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-[22px] border border-[var(--border-strong)] bg-white/88 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Current Beat
        </p>
        <p className="mt-2 text-sm font-medium text-slate-700">{snapshot.rhythmLabel}</p>
      </div>
    </aside>
  );
}
