"use client";

import { useEffect, useRef, useState } from "react";

import { AnnotationTimeline } from "@/components/bridgechat/guided/AnnotationTimeline";
import { ControlDeck } from "@/components/bridgechat/guided/ControlDeck";
import { PhoneStage } from "@/components/bridgechat/guided/PhoneStage";
import type { GuidedSceneId } from "@/lib/guided-scene-data";
import {
  buildSceneSnapshot,
  createInitialPlaybackState,
  getSceneById,
  type GuidedPlaybackState,
} from "@/lib/guided-scene-player";

export function GuidedSceneShowcase() {
  const [sceneId, setSceneId] = useState<GuidedSceneId>("shared-interest");
  const [playback, setPlayback] = useState<GuidedPlaybackState>(
    createInitialPlaybackState("shared-interest"),
  );
  const [runKey, setRunKey] = useState(0);
  const timersRef = useRef<number[]>([]);

  const scene = getSceneById(sceneId);
  const snapshot = buildSceneSnapshot(scene, playback);

  useEffect(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    let elapsedMs = 0;

    for (let nextIndex = 1; nextIndex < scene.beats.length; nextIndex += 1) {
      elapsedMs += scene.beats[nextIndex - 1].delayMs;

      const timer = window.setTimeout(() => {
        setPlayback({
          sceneId,
          activeBeatIndex: nextIndex,
          status: nextIndex === scene.beats.length - 1 ? "completed" : "playing",
        });
      }, elapsedMs);

      timersRef.current.push(timer);
    }

    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, [scene, sceneId, runKey]);

  function switchScene(nextSceneId: GuidedSceneId) {
    setSceneId(nextSceneId);
    setPlayback(createInitialPlaybackState(nextSceneId));
    setRunKey((current) => current + 1);
  }

  function replayScene() {
    setPlayback(createInitialPlaybackState(sceneId));
    setRunKey((current) => current + 1);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(160,231,216,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(125,146,230,0.22),transparent_28%)] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6">
        <ControlDeck
          scene={scene}
          sceneId={sceneId}
          activeBeatIndex={playback.activeBeatIndex}
          onSceneChange={switchScene}
          onReplay={replayScene}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(280px,0.82fr)_minmax(420px,1.18fr)] xl:items-start">
          <div data-testid="annotation-column" className="order-2 xl:order-1">
            <AnnotationTimeline
              scene={scene}
              activeBeatIndex={playback.activeBeatIndex}
              snapshot={snapshot}
            />
          </div>
          <div data-testid="phone-column" className="order-1 xl:order-2">
            <PhoneStage scene={scene} snapshot={snapshot} />
          </div>
        </div>
      </div>
    </main>
  );
}
