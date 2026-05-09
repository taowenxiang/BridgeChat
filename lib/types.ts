export type Locale = "zh" | "en";

export type DemoSceneId = "shared-interest" | "ai-guided-deeper-cue";

export type DemoChatMessage = {
  id: string;
  sender: "self" | "peer" | "system";
  text: string;
  sentAt: string;
  kind?: "message" | "hint" | "note";
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type DemoAnnotation = {
  title: string;
  body: string;
};

export type DemoSceneStep = {
  id: string;
  delayMs: number;
  annotation: DemoAnnotation;
  visibleMessageIds: string[];
  emphasis?: "hint" | "reply" | "final";
};

export type DemoScene = {
  id: DemoSceneId;
  eyebrow: string;
  title: string;
  subtitle: string;
  purpose: string;
  messages: DemoChatMessage[];
  steps: DemoSceneStep[];
};

export type DemoSceneRuntime = {
  sceneId: DemoSceneId;
  status: "playing" | "completed";
  activeStepIndex: number;
  totalSteps: number;
};
