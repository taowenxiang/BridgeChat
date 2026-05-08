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
      principlesLabel: "原则",
      principlesHeading: "这个概念刻意保持简洁。",
      principlesBody:
        "BridgeChat 聚焦那些最轻量、但足以让第一次互动从标签判断转向具体理解的设计动作。",
      principles: ["弱标签", "丰富语境", "更好提示", "共享理解"],
      featureCards: [
        {
          label: "功能 01",
          title: "共同兴趣破冰",
          body: "一个轻量提示，帮助对话更自然地开始。",
        },
        {
          label: "功能 02",
          title: "AI 引导更深一层的线索",
          body: "更好的追问角度来自真实互动，而不是刻板印象。",
        },
      ],
    },
    demo: {
      heading: "引导演示",
      intro:
        "这是一个脚本化 walkthrough，展示轻量语境提示和 AI 引导如何帮助对话前进，而不把人压缩成一个标签。",
      replay: "重播",
      nextScene: "下一场景",
      sceneLabel: "场景",
      annotationHeading: "场景注释",
      stepLabel: "步骤",
      chatStageHeading: "聊天舞台",
      livePlayback: "实时播放",
      waiting: "等待开场提示出现。",
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
      principlesLabel: "Principles",
      principlesHeading: "The concept is simple on purpose.",
      principlesBody:
        "BridgeChat focuses on the smallest interventions that can shift a first interaction away from labeling and toward understanding.",
      principles: ["Weak label", "Richer context", "Better prompts", "Shared understanding"],
      featureCards: [
        {
          label: "Feature 01",
          title: "Shared-interest icebreaker",
          body: "A lightweight cue helps the conversation start naturally.",
        },
        {
          label: "Feature 02",
          title: "AI-guided deeper cue",
          body: "A better follow-up angle grows from a real exchange, not a stereotype.",
        },
      ],
    },
    demo: {
      heading: "Guided Demo",
      intro:
        "A scripted walkthrough showing how lightweight context cues and AI guidance can move a conversation forward without reducing people to labels.",
      replay: "Replay",
      nextScene: "Next Scene",
      sceneLabel: "Scene",
      annotationHeading: "Scene annotations",
      stepLabel: "Step",
      chatStageHeading: "Chat stage",
      livePlayback: "Live playback",
      waiting: "Waiting for the opening cue to arrive.",
    },
  },
} as const;

export function getCopy(locale: Locale) {
  return localizedCopy[locale];
}
