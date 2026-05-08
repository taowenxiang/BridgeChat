"use client";

import { cn } from "@/lib/utils";
import type { DemoScene, DemoSceneId } from "@/lib/types";

type SceneSwitcherProps = {
  scenes: DemoScene[];
  activeSceneId: DemoSceneId;
  onSelectScene: (sceneId: DemoSceneId) => void;
  sceneLabel: string;
};

export function SceneSwitcher({ scenes, activeSceneId, onSelectScene, sceneLabel }: SceneSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {scenes.map((scene, index) => {
        const isActive = scene.id === activeSceneId;

        return (
          <button
            key={scene.id}
            aria-pressed={isActive}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] focus-visible:ring-offset-2",
              isActive
                ? "border-[var(--accent-strong)] bg-[var(--accent-glow)] text-[var(--accent-stronger)] shadow-[0_12px_30px_rgba(31,107,99,0.12)]"
                : "border-[var(--border-strong)] bg-white/75 text-slate-600 hover:border-[var(--accent-soft)] hover:text-slate-950",
            )}
            onClick={() => onSelectScene(scene.id)}
            type="button"
          >
            {`${sceneLabel} ${String(index + 1).padStart(2, "0")} · ${scene.title}`}
          </button>
        );
      })}
    </div>
  );
}
