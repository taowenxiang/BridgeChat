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
});
