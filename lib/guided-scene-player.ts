import {
  guidedScenes,
  type GuidedBeat,
  type GuidedBubble,
  type GuidedScene,
  type GuidedSceneId,
} from "@/lib/guided-scene-data";

export type GuidedPlaybackState = {
  sceneId: GuidedSceneId;
  activeBeatIndex: number;
  status: "playing" | "completed";
};

export type GuidedSceneSnapshot = GuidedBeat & {
  visibleMessages: GuidedBubble[];
};

export function createInitialPlaybackState(sceneId: GuidedSceneId): GuidedPlaybackState {
  return {
    sceneId,
    activeBeatIndex: 0,
    status: "playing",
  };
}

export function replayPlaybackState(sceneId: GuidedSceneId): GuidedPlaybackState {
  return createInitialPlaybackState(sceneId);
}

export function getNextPlaybackState(
  scene: GuidedScene,
  state: GuidedPlaybackState,
): GuidedPlaybackState {
  const nextIndex = Math.min(state.activeBeatIndex + 1, scene.beats.length - 1);

  return {
    sceneId: state.sceneId,
    activeBeatIndex: nextIndex,
    status: nextIndex === scene.beats.length - 1 ? "completed" : "playing",
  };
}

export function buildSceneSnapshot(
  scene: GuidedScene,
  state: GuidedPlaybackState,
): GuidedSceneSnapshot {
  const beat = scene.beats[state.activeBeatIndex];

  return {
    ...beat,
    visibleMessages: scene.bubbles.filter((bubble) => beat.visibleMessageIds.includes(bubble.id)),
  };
}

export function getSceneById(sceneId: GuidedSceneId): GuidedScene {
  return guidedScenes[sceneId];
}
