import { describe, expect, it } from "vitest";

import { guidedScenes } from "@/lib/guided-scene-data";
import {
  buildSceneSnapshot,
  createInitialPlaybackState,
  getNextPlaybackState,
  replayPlaybackState,
} from "@/lib/guided-scene-player";

describe("guided scene player", () => {
  it("replays from the beginning and keeps Scene 1 explanation timing explicit", () => {
    const scene = guidedScenes["shared-interest"];
    const initialState = createInitialPlaybackState(scene.id);

    expect(initialState.sceneId).toBe("shared-interest");
    expect(initialState.activeBeatIndex).toBe(0);

    const openingSnapshot = buildSceneSnapshot(scene, initialState);
    expect(openingSnapshot.annotation.title).toBe(
      "小A 想聊点什么，但不知道突然提猫猫会不会尴尬。",
    );

    const afterTypingBeat = getNextPlaybackState(scene, initialState);
    const afterPauseBeat = getNextPlaybackState(scene, afterTypingBeat);
    const delayedAnnotationSnapshot = buildSceneSnapshot(scene, afterPauseBeat);

    expect(delayedAnnotationSnapshot.annotation.title).toBe(
      "不知道自己想的话题，对方是否感兴趣？",
    );

    const replayed = replayPlaybackState(scene.id);
    expect(replayed.activeBeatIndex).toBe(0);
    expect(buildSceneSnapshot(scene, replayed).draftText).toBe("");
  });
});
