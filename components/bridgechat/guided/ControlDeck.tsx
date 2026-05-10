import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GuidedScene, GuidedSceneId } from "@/lib/guided-scene-data";

const sceneTabs: Array<{ id: GuidedSceneId; label: string }> = [
  { id: "shared-interest", label: "Scene 1 共同爱好" },
  { id: "ai-guidance", label: "Scene 2 AI 引导" },
];

export function ControlDeck({
  scene,
  sceneId,
  activeBeatIndex,
  onSceneChange,
  onReplay,
}: {
  scene: GuidedScene;
  sceneId: GuidedSceneId;
  activeBeatIndex: number;
  onSceneChange: (sceneId: GuidedSceneId) => void;
  onReplay: () => void;
}) {
  const beatCount = scene.beats.length;
  const currentBeat = scene.beats[activeBeatIndex];

  return (
    <section
      aria-label="Video demo controls"
      className="rounded-[30px] border border-[var(--border-strong)] bg-white/82 px-5 py-5 shadow-[0_20px_48px_rgba(15,23,42,0.08)] backdrop-blur md:px-6"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div
          role="tablist"
          aria-label="Scene switcher"
          className="inline-flex w-full flex-wrap gap-2 xl:w-auto"
        >
          {sceneTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={sceneId === tab.id}
              onClick={() => onSceneChange(tab.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                sceneId === tab.id
                  ? "bg-[var(--accent-strong)] text-white shadow-[0_12px_28px_rgba(30,92,82,0.22)]"
                  : "border border-[var(--border-strong)] bg-white text-slate-600 hover:border-[var(--accent-soft)] hover:text-slate-950",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-w-0 flex-1 xl:px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Guided Scene
          </p>
          <h1 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] text-slate-950">
            {scene.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            {scene.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:justify-end">
          <div className="rounded-full border border-[var(--accent-soft)]/60 bg-[var(--accent-glow)] px-4 py-2 text-sm text-[var(--accent-stronger)]">
            <span className="font-semibold">Progress</span>
            <span className="ml-2">
              {activeBeatIndex + 1}/{beatCount} · {currentBeat.rhythmLabel}
            </span>
          </div>
          <Button variant="secondary" onClick={onReplay} aria-label="Replay current scene">
            Replay
          </Button>
        </div>
      </div>
    </section>
  );
}
