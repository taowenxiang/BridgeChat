export type Locale = "en" | "zh";
export type AssistantMode = "scripted" | "live";
export type ExperienceMode = "standard" | "video";

// Legacy video-script identifiers for the older multi-mode prototype.
export type VideoScene = "shared-interest" | "ai-guidance";

export type DemoUser = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  label: string;
  interests: string[];
  conversationPreference: string;
  beyondLabel: {
    conversationStyle: string;
    misunderstoodAs: string;
    canTalkForeverAbout: string;
    groupWorkStyle: string;
  };
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
  tone?: "seeded" | "user" | "reply";
  replyTo?: {
    messageId: string;
    label: string;
    text: string;
  };
};

export type SuggestionKind = "icebreaker" | "go-deeper" | "avoid-assumptions";

export type Suggestion = {
  id: string;
  kind: SuggestionKind;
  text: string;
  explanation: string;
  sourceTags: string[];
};

export type UnlockState = {
  commonGroundUnlocked: number;
  beyondLabelUnlocked: boolean;
  reflectionUnlocked: boolean;
};

export type DemoProgress = {
  userMessagesSent: number;
  totalNewMessages: number;
  usedGoDeeper: boolean;
  thoughtfulFollowup: boolean;
};

export type AiMode = "mock" | "live";

export type BridgeChatContext = {
  locale?: Locale;
  users: [DemoUser, DemoUser];
  messages: ChatMessage[];
  draft?: string;
  progress: DemoProgress;
  focusedMessage?: ChatMessage;
};

export type AiApiStatus = "ok" | "disabled" | "unavailable";

// Guided-demo scene types for the Task 1 scripted runtime.
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
};
