import type { DemoScene, DemoSceneRuntime } from "@/lib/types";

export function createSceneRuntime(scene: DemoScene): DemoSceneRuntime {
  return {
    sceneId: scene.id,
    status: "playing",
    activeStepIndex: 0,
  };
}

export function advanceScene(
  runtime: DemoSceneRuntime,
  totalSteps = Number.MAX_SAFE_INTEGER,
): DemoSceneRuntime {
  const lastStepIndex = Math.max(totalSteps - 1, 0);
  const nextStepIndex = runtime.activeStepIndex + 1;
  const isCompleted = nextStepIndex >= totalSteps;

  return {
    ...runtime,
    status: isCompleted ? "completed" : "playing",
    activeStepIndex: isCompleted ? lastStepIndex : nextStepIndex,
  };
}

export function replayScene(runtime: DemoSceneRuntime): DemoSceneRuntime {
  return {
    ...runtime,
    status: "playing",
    activeStepIndex: 0,
  };
}

export function getVisibleMessages(runtime: DemoSceneRuntime, scene?: DemoScene) {
  const step = scene?.steps[runtime.activeStepIndex];

  if (!scene || !step) {
    return [];
  }

  return scene.messages.filter((message) => step.visibleMessageIds.includes(message.id));
}
