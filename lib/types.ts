export type Locale = "en" | "zh";
export type AssistantMode = "scripted" | "live";
export type ExperienceMode = "standard" | "video";
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
