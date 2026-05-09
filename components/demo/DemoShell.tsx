"use client";

import { useEffect, useState } from "react";

import { AnnotationRail } from "@/components/demo/AnnotationRail";
import { AutoPlayControls } from "@/components/demo/AutoPlayControls";
import { ChatStage } from "@/components/demo/ChatStage";
import { SceneSwitcher } from "@/components/demo/SceneSwitcher";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LocaleToggle } from "@/components/shared/LocaleToggle";
import { getCopy } from "@/lib/demo-copy";
import { advanceScene, createSceneRuntime, getVisibleMessages, replayScene } from "@/lib/demo-player";
import { getDemoScenes } from "@/lib/demo-scenes";
import type { DemoSceneRuntime } from "@/lib/types";

type DemoShellState = {
  activeSceneIndex: number;
  playbackGeneration: number;
  runtime: DemoSceneRuntime;
};

function createDemoShellState(activeSceneIndex: number, scenes: ReturnType<typeof getDemoScenes>, playbackGeneration = 0): DemoShellState {
  const scene = scenes[activeSceneIndex];

  return {
    activeSceneIndex,
    playbackGeneration,
    runtime: createSceneRuntime(scene),
  };
}

export function DemoShell() {
  const { locale } = useLocale();
  const copy = getCopy(locale).demo;
  const scenes = getDemoScenes(locale);
  const [demoState, setDemoState] = useState(() => createDemoShellState(0, scenes));
  const activeScene = scenes[demoState.activeSceneIndex];
  const playbackGeneration = demoState.playbackGeneration;
  const runtime = demoState.runtime;

  useEffect(() => {
    if (runtime.status === "completed") {
      return;
    }

    const activeStep = activeScene.steps[runtime.activeStepIndex];

    if (!activeStep) {
      return;
    }

    const timerOrigin = {
      playbackGeneration,
      sceneId: activeScene.id,
      stepIndex: runtime.activeStepIndex,
    };

    const timer = window.setTimeout(() => {
      setDemoState((currentState) => {
        const currentScene = scenes[currentState.activeSceneIndex];
        const isStaleCallback =
          currentState.playbackGeneration !== timerOrigin.playbackGeneration ||
          currentState.runtime.sceneId !== timerOrigin.sceneId ||
          currentState.runtime.activeStepIndex !== timerOrigin.stepIndex ||
          currentScene.id !== timerOrigin.sceneId ||
          currentState.runtime.status === "completed";

        if (isStaleCallback) {
          return currentState;
        }

        return {
          ...currentState,
          runtime: advanceScene(currentState.runtime, currentScene.steps.length),
        };
      });
    }, activeStep.delayMs);

    return () => window.clearTimeout(timer);
  }, [activeScene, playbackGeneration, runtime, scenes]);

  const visibleMessages = getVisibleMessages(runtime, activeScene);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(154,208,193,0.28),transparent_70%)]" />
        <div className="absolute left-1/2 top-28 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_72%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-[radial-gradient(circle,rgba(31,107,99,0.14),transparent_72%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-[30px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.8)] p-4 shadow-[0_24px_70px_rgba(17,32,42,0.08)] backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-stronger)]">
                {copy.heading}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                {copy.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LocaleToggle />
              <AutoPlayControls
                nextSceneLabel={copy.nextScene}
                onNextScene={() => {
                  setDemoState((currentState) =>
                    createDemoShellState(
                      (currentState.activeSceneIndex + 1) % scenes.length,
                      scenes,
                      currentState.playbackGeneration + 1,
                    ),
                  );
                }}
                onReplay={() => {
                  setDemoState((currentState) => ({
                    ...currentState,
                    playbackGeneration: currentState.playbackGeneration + 1,
                    runtime: replayScene(currentState.runtime),
                  }));
                }}
                replayLabel={copy.replay}
              />
            </div>
          </div>

          <div className="mt-4">
            <SceneSwitcher
              activeSceneId={activeScene.id}
              onSelectScene={(sceneId) => {
                const nextSceneIndex = scenes.findIndex((scene) => scene.id === sceneId);

                if (nextSceneIndex >= 0) {
                  setDemoState((currentState) =>
                    createDemoShellState(nextSceneIndex, scenes, currentState.playbackGeneration + 1),
                  );
                }
              }}
              sceneLabel={copy.sceneLabel}
              scenes={scenes}
            />
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <AnnotationRail
            activeStepIndex={runtime.activeStepIndex}
            heading={copy.annotationHeading}
            stepLabel={copy.stepLabel}
            steps={activeScene.steps}
          />
          <ChatStage
            chatStageHeading={copy.chatStageHeading}
            livePlaybackLabel={copy.livePlayback}
            scene={activeScene}
            visibleMessages={visibleMessages}
            waitingLabel={copy.waiting}
          />
        </section>
      </div>
    </main>
  );
}
