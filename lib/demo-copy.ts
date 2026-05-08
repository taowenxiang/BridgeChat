import type { Locale } from "@/lib/types";

export const localizedCopy = {
  zh: {
    home: {
      badge: "研究原型",
      title: "BridgeChat",
      tagline: "从标签走向理解",
      intro:
        "这是一个课堂演示用的引导式原型，展示轻量语境提示和更好的提问方式如何帮助对话走出刻板印象。",
      cta: "进入引导演示",
      secondaryCta: "阅读原则",
      principles: ["弱标签", "丰富语境", "更好提示", "共享理解"],
    },
    demo: {
      heading: "引导演示",
      replay: "重播",
      nextScene: "下一场景",
      sceneLabel: "场景",
    },
  },
  en: {
    home: {
      badge: "Research prototype",
      title: "BridgeChat",
      tagline: "From labels to understanding",
      intro:
        "A guided class-demo showing how lightweight cues and better prompts can move a conversation beyond stereotype-driven assumptions.",
      cta: "Enter Guided Demo",
      secondaryCta: "Read Principles",
      principles: ["Weak label", "Richer context", "Better prompts", "Shared understanding"],
    },
    demo: {
      heading: "Guided Demo",
      replay: "Replay",
      nextScene: "Next Scene",
      sceneLabel: "Scene",
    },
  },
} as const;

export function getCopy(locale: Locale) {
  return localizedCopy[locale];
}

export const demoCopy = localizedCopy.en;
