"use client";

import { RotateCcw, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";
import { demoCopy } from "@/lib/demo-copy";

type AutoPlayControlsProps = {
  onReplay: () => void;
  onNextScene: () => void;
};

export function AutoPlayControls({ onReplay, onNextScene }: AutoPlayControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={onReplay} type="button" variant="subtle">
        <RotateCcw className="h-4 w-4" />
        {demoCopy.demo.replay}
      </Button>
      <Button onClick={onNextScene} type="button">
        <SkipForward className="h-4 w-4" />
        {demoCopy.demo.nextScene}
      </Button>
    </div>
  );
}
