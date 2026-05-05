import type { DemoScene, DemoSceneRuntime } from "@/lib/types";

function normalizeTotalSteps(totalSteps: number) {
  if (!Number.isFinite(totalSteps)) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.max(Math.floor(totalSteps), 0);
}

function clampStepIndex(stepIndex: number, totalSteps: number) {
  if (totalSteps <= 0) {
    return 0;
  }

  return Math.min(Math.max(stepIndex, 0), totalSteps - 1);
}

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
  const normalizedTotalSteps = normalizeTotalSteps(totalSteps);
  const lastStepIndex = clampStepIndex(runtime.activeStepIndex, normalizedTotalSteps);

  if (runtime.status === "completed") {
    return {
      ...runtime,
      status: "completed",
      activeStepIndex: lastStepIndex,
    };
  }

  if (normalizedTotalSteps === 0) {
    return {
      ...runtime,
      status: "completed",
      activeStepIndex: 0,
    };
  }

  const nextStepIndex = runtime.activeStepIndex + 1;
  const isCompleted = nextStepIndex >= normalizedTotalSteps;

  return {
    ...runtime,
    status: isCompleted ? "completed" : "playing",
    activeStepIndex: isCompleted
      ? normalizedTotalSteps - 1
      : clampStepIndex(nextStepIndex, normalizedTotalSteps),
  };
}

export function replayScene(runtime: DemoSceneRuntime): DemoSceneRuntime {
  return {
    ...runtime,
    status: "playing",
    activeStepIndex: 0,
  };
}

export function getVisibleMessages(runtime: DemoSceneRuntime, scene: DemoScene) {
  if (scene.id !== runtime.sceneId) {
    return [];
  }

  const step = scene.steps[runtime.activeStepIndex];

  if (!step) {
    return [];
  }

  return scene.messages.filter((message) => step.visibleMessageIds.includes(message.id));
}
