import type { Locale, SuggestionKind } from "@/lib/types";

const copy = {
  en: {
    title: "BridgeChat",
    tagline: "From labels to understanding",
    languageButton: "中文",
    intro:
      "BridgeChat is a research-driven conversation prototype that treats personality labels as soft cues rather than hard judgments. It helps users move from first impressions to richer understanding.",
    railLine:
      "A chat interface designed to move from labels to understanding.",
    drawerTitle: "Understand More",
    reflectionTitle: "What you learned beyond the label",
    designPrinciplesLabel: "Design Principles",
    designPrincipleChips: [
      "Weak label",
      "Richer context",
      "Better questions",
      "Learn beyond the label",
    ],
    landing: {
      badge: "Research prototype",
      launch: "Launch Demo",
      videoLaunch: "Open Video Mode",
      viewPrinciples: "View design principles",
      desktopBadge: "Desktop-first demo",
      stripTitle: "Light identity strip",
      stripSubtitle: "Labels stay visually secondary.",
      previewChips: ["INFP", "AI + HCI", "Specific questions"],
      previewMessageA:
        "Labels can help me start, but they don't tell people what actually makes conversation easy for me.",
      previewMessageB:
        "What kind of question usually makes conversation feel easier for you?",
      previewHint:
        "Explainable prompt support nudges toward experience instead of stereotype.",
      sharedGround: "Shared ground unlocks first.",
      beyondLabel: "Beyond-the-label detail reveals after real interaction.",
      reflectionAppears:
        "Reflection card appears once the conversation gets more thoughtful.",
    },
    demo: {
      resetDemo: "Reset demo",
      playGuidedFlow: "Play guided flow",
      guidedFlowRunning: "Guided flow running...",
      toggleAiMode: "Toggle AI mode",
      optionalLive:
        "Optional live mode uses OPENAI_API_KEY and falls back to mock suggestions if no key is present.",
      backToIntro: "Back to intro",
      steps: [
        "Step 1: light cues",
        "Step 2: open conversation",
        "Step 3: reveal more",
        "Step 4: reflect",
      ],
      labelsStayLightweight: "Labels stay lightweight here",
      helperHint:
        "Helper hint: the best messages here usually use a real moment, a stated preference, or a concrete experience.",
      composerPlaceholder: "Type a message that opens understanding...",
      gentleGuardrail:
        "Gentle guardrail: suggest rewrites instead of blocking curiosity.",
      send: "Send",
      rewriteHint:
        "This message sounds label-based. Want to rephrase it as an open question?",
      rewriteButton: "One-click rewrite",
      reflectionEyebrow: "Reflection",
      researchLayer: "Research layer",
      drawerSubtitle:
        "Lightweight cues at the top, richer understanding through conversation.",
      sharedSignal: "Shared signal",
      richerContextUnlocks:
        "Richer context unlocks after more back-and-forth.",
      richerContextHelp:
        "Send a few thoughtful messages and the drawer will reveal how they actually prefer to communicate.",
      promptingPrinciple: "Prompting principle",
      promptingPrincipleDetail:
        "BridgeChat suggests questions based on shared context, message history, and communication preference instead of MBTI shortcuts.",
      latestHelper: "Latest helper",
      tryOneAction: "Try one action",
      tryOneActionDetail:
        "Use Break the Ice, Go Deeper, or Avoid Assumptions to surface explainable AI support.",
      cardInsert: "Insert into composer",
      cardKeep: "Keep current draft",
      dismissSuggestion: "Dismiss suggestion",
      actionTry: "Try",
      actionLabels: {
        "icebreaker": "Break the Ice",
        "go-deeper": "Go Deeper",
        "avoid-assumptions": "Avoid Assumptions",
      } as Record<SuggestionKind, string>,
      actionDescriptions: {
        "icebreaker": "Generate a low-pressure opener",
        "go-deeper": "Ask about experience, not assumptions",
        "avoid-assumptions": "Rewrite label-heavy phrasing",
      } as Record<SuggestionKind, string>,
      tabLabels: {
        common: "Common Ground",
        beyond: "Beyond the Label",
        ask: "Ask Better",
      },
      beyondTitles: {
        style: "How Mina usually shows up",
        misunderstood: "What people misunderstand",
        topic: "A topic Mina can stay on for hours",
        groupWork: "In group work, Theo usually...",
      },
      mobileDrawerButton: "Understand More",
      selfLabel: "You",
      partnerThinking: "Theo is thinking...",
      suggestionTags: {
        "shared interest": "shared interest",
        "prior message": "prior message",
        "communication preference": "communication preference",
        "draft rewrite": "draft rewrite",
        "anti-stereotype": "anti-stereotype",
        "live AI": "live AI",
        "explainable": "explainable",
      } as Record<string, string>,
      unlockBanners: {
        common: "More context unlocked.",
        beyond:
          "You've moved beyond first impressions. Richer context is now visible.",
        reflection: "The conversation now reveals richer understanding.",
      },
    },
  },
  zh: {
    title: "BridgeChat",
    tagline: "从标签走向理解",
    languageButton: "English",
    intro:
      "BridgeChat 是一个由研究驱动的对话原型。它把人格标签当作轻量提示，而不是硬性判断，帮助用户从第一印象逐步走向更丰富的理解。",
    railLine: "一个帮助用户从标签走向理解的聊天界面。",
    drawerTitle: "了解更多",
    reflectionTitle: "你在标签之外了解了什么",
    designPrinciplesLabel: "设计原则",
    designPrincipleChips: ["弱标签", "更丰富的语境", "更好的问题", "超越标签去理解"],
    landing: {
      badge: "研究原型",
      launch: "进入 Demo",
      videoLaunch: "进入视频模式",
      viewPrinciples: "查看设计原则",
      desktopBadge: "桌面端演示",
      stripTitle: "轻量身份信息条",
      stripSubtitle: "标签存在，但只是次要信息。",
      previewChips: ["INFP", "AI + HCI", "偏好具体问题"],
      previewMessageA:
        "标签可以帮我开启对话，但它并不能告诉别人，什么样的聊天方式真的会让我放松。",
      previewMessageB: "你觉得什么样的问题最容易让对话自然地展开？",
      previewHint: "可解释的提示会把对话引向真实经验，而不是刻板印象。",
      sharedGround: "共同点会先被逐步解锁。",
      beyondLabel: "更深一层的信息会在真实互动后出现。",
      reflectionAppears: "当对话更有深度时，反思卡片就会出现。",
    },
    demo: {
      resetDemo: "重置 Demo",
      playGuidedFlow: "播放引导演示",
      guidedFlowRunning: "引导演示进行中...",
      toggleAiMode: "切换 AI 模式",
      optionalLive:
        "可选 live 模式会使用 `OPENAI_API_KEY`；如果没有配置，就会自动回退到 mock 建议。",
      backToIntro: "返回介绍页",
      steps: [
        "步骤 1：轻量线索",
        "步骤 2：展开对话",
        "步骤 3：逐步揭示",
        "步骤 4：反思理解",
      ],
      labelsStayLightweight: "这里的标签只是轻量线索",
      helperHint:
        "提示：这里最好的消息通常会从一个真实情境、明确偏好或具体经历出发。",
      composerPlaceholder: "输入一条能把对话带向理解的消息...",
      gentleGuardrail: "温和护栏：提供改写建议，而不是阻止你的好奇心。",
      send: "发送",
      rewriteHint: "这条草稿有点依赖标签，要不要改成一个更开放的问题？",
      rewriteButton: "一键改写",
      reflectionEyebrow: "反思",
      researchLayer: "研究视角",
      drawerSubtitle: "顶部只给轻量线索，更丰富的理解通过对话逐步展开。",
      sharedSignal: "共同信号",
      richerContextUnlocks: "更多语境会在来回交流后解锁。",
      richerContextHelp: "再发几条更有内容的消息，右侧就会显示他们真正的沟通偏好。",
      promptingPrinciple: "提问原则",
      promptingPrincipleDetail:
        "BridgeChat 的建议会依据共同语境、消息历史和沟通偏好，而不是用 MBTI 直接下判断。",
      latestHelper: "最新建议",
      tryOneAction: "试试一个动作",
      tryOneActionDetail:
        "使用“破冰一下”、“聊得更深”或“避免预设”，就能看到带解释的 AI 帮助。",
      cardInsert: "插入输入框",
      cardKeep: "保留当前草稿",
      dismissSuggestion: "关闭建议",
      actionTry: "试试",
      actionLabels: {
        "icebreaker": "破冰一下",
        "go-deeper": "聊得更深",
        "avoid-assumptions": "避免预设",
      } as Record<SuggestionKind, string>,
      actionDescriptions: {
        "icebreaker": "生成一个低压力开场",
        "go-deeper": "围绕经历和偏好继续问",
        "avoid-assumptions": "把标签化措辞改写得更开放",
      } as Record<SuggestionKind, string>,
      tabLabels: {
        common: "共同点",
        beyond: "超越标签",
        ask: "更好的提问",
      },
      beyondTitles: {
        style: "Mina 平时在对话中的状态",
        misunderstood: "别人常常误解她的地方",
        topic: "Mina 可以聊很久的话题",
        groupWork: "在小组合作里，Theo 往往会...",
      },
      mobileDrawerButton: "了解更多",
      selfLabel: "你",
      partnerThinking: "Theo 正在输入...",
      suggestionTags: {
        "shared interest": "共同兴趣",
        "prior message": "前文线索",
        "communication preference": "沟通偏好",
        "draft rewrite": "草稿改写",
        "anti-stereotype": "避免刻板印象",
        "live AI": "实时 AI",
        "explainable": "可解释",
      } as Record<string, string>,
      unlockBanners: {
        common: "更多语境已解锁。",
        beyond: "你们已经越过了第一印象，更丰富的信息现已可见。",
        reflection: "这段对话已经开始呈现更深的理解。",
      },
    },
  },
} as const;

export function getCopy(locale: Locale) {
  return copy[locale];
}
