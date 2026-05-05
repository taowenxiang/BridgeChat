"use client";

import { useEffect, useState } from "react";

import { AnnotationRail } from "@/components/demo/AnnotationRail";
import { AutoPlayControls } from "@/components/demo/AutoPlayControls";
import { ChatStage } from "@/components/demo/ChatStage";
import { SceneSwitcher } from "@/components/demo/SceneSwitcher";
import { demoCopy } from "@/lib/demo-copy";
import { advanceScene, createSceneRuntime, getVisibleMessages, replayScene } from "@/lib/demo-player";
import { demoScenes } from "@/lib/demo-scenes";
import type { DemoSceneRuntime } from "@/lib/types";

type DemoShellState = {
  activeSceneIndex: number;
  runtime: DemoSceneRuntime;
};

function createDemoShellState(activeSceneIndex: number): DemoShellState {
  const scene = demoScenes[activeSceneIndex];

  return {
    activeSceneIndex,
    runtime: createSceneRuntime(scene),
  };
}

export function DemoShell() {
  const [demoState, setDemoState] = useState(() => createDemoShellState(0));
  const activeScene = demoScenes[demoState.activeSceneIndex];
  const runtime = demoState.runtime;

  useEffect(() => {
    if (runtime.status === "completed") {
      return;
    }

    const activeStep = activeScene.steps[runtime.activeStepIndex];

    if (!activeStep) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDemoState((currentState) => {
        const currentScene = demoScenes[currentState.activeSceneIndex];

        return {
          ...currentState,
          runtime: advanceScene(currentState.runtime, currentScene.steps.length),
        };
      });
    }, activeStep.delayMs);

    return () => window.clearTimeout(timer);
  }, [activeScene, runtime]);

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
                {demoCopy.demo.heading}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                A scripted walkthrough showing how lightweight context cues and AI guidance can move a
                conversation forward without reducing people to labels.
              </p>
            </div>

            <AutoPlayControls
              onNextScene={() => {
                setDemoState((currentState) =>
                  createDemoShellState((currentState.activeSceneIndex + 1) % demoScenes.length),
                );
              }}
              onReplay={() => {
                setDemoState((currentState) => ({
                  ...currentState,
                  runtime: replayScene(currentState.runtime),
                }));
              }}
            />
          </div>

          <div className="mt-4">
            <SceneSwitcher
              activeSceneId={activeScene.id}
              onSelectScene={(sceneId) => {
                const nextSceneIndex = demoScenes.findIndex((scene) => scene.id === sceneId);

                if (nextSceneIndex >= 0) {
                  setDemoState(createDemoShellState(nextSceneIndex));
                }
              }}
              scenes={demoScenes}
            />
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <AnnotationRail activeStepIndex={runtime.activeStepIndex} steps={activeScene.steps} />
          <ChatStage scene={activeScene} visibleMessages={visibleMessages} />
        </section>
      </div>
    </main>
  );
}
