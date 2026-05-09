import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GuidedSceneId } from "@/lib/guided-scene-data";
import type { GuidedSceneSnapshot } from "@/lib/guided-scene-player";

export function ShowcaseSidebar({
  sceneId,
  snapshot,
  onSceneChange,
  onReplay,
}: {
  sceneId: GuidedSceneId;
  snapshot: GuidedSceneSnapshot;
  onSceneChange: (sceneId: GuidedSceneId) => void;
  onReplay: () => void;
}) {
  const sceneButtons: Array<{ id: GuidedSceneId; label: string }> = [
    { id: "shared-interest", label: "Scene 1 共同爱好" },
    { id: "ai-guidance", label: "Scene 2 AI 引导" },
  ];

  return (
    <aside className="flex flex-col gap-4 rounded-[32px] border border-[var(--border-strong)] bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Scene Control
        </p>
        {sceneButtons.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => onSceneChange(button.id)}
            className={cn(
              "w-full rounded-2xl px-4 py-3 text-left text-sm transition",
              sceneId === button.id
                ? "bg-[var(--accent-glow)] text-[var(--accent-stronger)] shadow-[0_10px_24px_rgba(30,92,82,0.12)]"
                : "border border-[var(--border-strong)] bg-white text-slate-600 hover:border-[var(--accent-soft)] hover:text-slate-900",
            )}
          >
            {button.label}
          </button>
        ))}
      </div>

      <Button onClick={onReplay}>Replay 当前场景</Button>

      <div className="rounded-[26px] border border-[var(--accent-soft)]/60 bg-[linear-gradient(180deg,rgba(248,255,252,0.98),rgba(238,249,245,0.98))] p-5 shadow-[0_18px_38px_rgba(30,92,82,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-stronger)]">
          当前讲解
        </p>
        <h1 className="mt-3 text-2xl text-slate-950">{snapshot.annotation.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{snapshot.annotation.body}</p>
      </div>

      <div className="rounded-[24px] border border-[var(--border-strong)] bg-white/90 p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          当前节奏
        </p>
        <p className="mt-3 text-sm font-medium text-slate-700">{snapshot.rhythmLabel}</p>
      </div>
    </aside>
  );
}
