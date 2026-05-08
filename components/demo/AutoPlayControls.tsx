"use client";

import { RotateCcw, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";

type AutoPlayControlsProps = {
  onReplay: () => void;
  onNextScene: () => void;
  replayLabel: string;
  nextSceneLabel: string;
};

export function AutoPlayControls({
  onReplay,
  onNextScene,
  replayLabel,
  nextSceneLabel,
}: AutoPlayControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={onReplay} type="button" variant="subtle">
        <RotateCcw className="h-4 w-4" />
        {replayLabel}
      </Button>
      <Button onClick={onNextScene} type="button">
        <SkipForward className="h-4 w-4" />
        {nextSceneLabel}
      </Button>
    </div>
  );
}
