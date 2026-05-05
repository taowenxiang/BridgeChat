import { describe, expect, it } from "vitest";

import { advanceScene, createSceneRuntime, getVisibleMessages, replayScene } from "@/lib/demo-player";
import { demoScenes } from "@/lib/demo-scenes";

describe("demo player", () => {
  it("plays, advances, and replays the first scene", () => {
    const scene = demoScenes[0];
    const runtime = createSceneRuntime(scene);

    expect(runtime.status).toBe("playing");
    expect(runtime.activeStepIndex).toBe(0);
    expect(getVisibleMessages(runtime, scene)).toEqual([]);

    const afterFirstAdvance = advanceScene(runtime, scene.steps.length);

    expect(afterFirstAdvance.activeStepIndex).toBe(1);
    expect(getVisibleMessages(afterFirstAdvance, scene)).toHaveLength(2);

    const replayed = replayScene(afterFirstAdvance);

    expect(replayed.activeStepIndex).toBe(0);
    expect(replayed.status).toBe("playing");
    expect(getVisibleMessages(replayed, scene)).toEqual([]);
  });

  it("transitions to completed and clamps at the last step", () => {
    const scene = demoScenes[0];
    const runtime = createSceneRuntime(scene);

    const afterFirstAdvance = advanceScene(runtime, scene.steps.length);
    const afterSecondAdvance = advanceScene(afterFirstAdvance, scene.steps.length);
    const afterThirdAdvance = advanceScene(afterSecondAdvance, scene.steps.length);
    const completedRuntime = advanceScene(afterThirdAdvance, scene.steps.length);

    expect(completedRuntime.status).toBe("completed");
    expect(completedRuntime.activeStepIndex).toBe(scene.steps.length - 1);
    expect(getVisibleMessages(completedRuntime, scene)).toHaveLength(4);
  });

  it("stays completed on repeated advance calls", () => {
    const scene = demoScenes[0];
    let runtime = createSceneRuntime(scene);

    for (let index = 0; index < scene.steps.length; index += 1) {
      runtime = advanceScene(runtime, scene.steps.length);
    }

    const afterCompletionAdvance = advanceScene(runtime, scene.steps.length);

    expect(runtime.status).toBe("completed");
    expect(runtime.activeStepIndex).toBe(scene.steps.length - 1);
    expect(afterCompletionAdvance.status).toBe("completed");
    expect(afterCompletionAdvance.activeStepIndex).toBe(scene.steps.length - 1);
    expect(getVisibleMessages(afterCompletionAdvance, scene)).toHaveLength(4);
  });

  it("plays through the second scene and rejects mismatched scene input", () => {
    const firstScene = demoScenes[0];
    const secondScene = demoScenes[1];
    const runtime = createSceneRuntime(secondScene);

    expect(runtime.status).toBe("playing");
    expect(runtime.activeStepIndex).toBe(0);
    expect(getVisibleMessages(runtime, secondScene)).toHaveLength(1);
    expect(getVisibleMessages(runtime, firstScene)).toEqual([]);

    const afterFirstAdvance = advanceScene(runtime, secondScene.steps.length);

    expect(afterFirstAdvance.activeStepIndex).toBe(1);
    expect(getVisibleMessages(afterFirstAdvance, secondScene)).toHaveLength(2);
    expect(getVisibleMessages(afterFirstAdvance, firstScene)).toEqual([]);
  });
});
