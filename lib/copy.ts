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
      badge: "Live experience",
      launch: "Launch Demo",
      videoLaunch: "Open Video Mode",
      viewPrinciples: "View design principles",
      desktopBadge: "Formal demo",
      stripTitle: "Light identity strip",
      stripSubtitle: "Labels stay visually secondary.",
      previewChips: ["INFP", "AI + HCI", "Specific questions"],
      previewMessageA:
        "Labels can help me start, but they don't tell people what actually makes conversation easy for me.",
      previewMessageB:
        "Pause for a moment and BridgeChat can suggest a low-pressure opener grounded in shared context.",
      previewHint:
        "Reply to a specific message to get a deeper angle rooted in what the other person actually said.",
      sharedGround: "A shared-context opener appears after a short pause.",
      beyondLabel: "Reply mode turns one real message into a better conversation angle.",
      reflectionAppears:
        "Both cues stay grounded in context instead of stereotype.",
    },
    demo: {
      resetDemo: "Reset demo",
      backToIntro: "Back to intro",
      steps: [
        "Step 1: spot shared context",
        "Step 2: open naturally",
        "Step 3: reply with a deeper angle",
      ],
      labelsStayLightweight: "Labels stay lightweight here",
      helperHint:
        "Shared context can help you open gently. Replying to one real message can help you go deeper.",
      composerPlaceholder: "Type a message that opens understanding...",
      gentleGuardrail:
        "BridgeChat keeps prompts grounded in shared context and real messages.",
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
        "BridgeChat suggests openings from shared context and deeper replies from one focused message instead of MBTI shortcuts.",
      latestHelper: "Latest helper",
      tryOneAction: "Try one action",
      tryOneActionDetail:
        "Use Break the Ice for a low-pressure opener, or Go Deeper after selecting a reply target.",
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
      reply: "Reply",
      replyingTo: "Replying to",
      clearReply: "Clear reply target",
      aiDisabled:
        "Formal AI is not configured in this environment yet, so the two guided features are hidden.",
      aiUnavailable: "AI is temporarily unavailable. Please try again in a moment.",
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
      badge: "正式体验",
      launch: "进入 Demo",
      videoLaunch: "进入视频模式",
      viewPrinciples: "查看设计原则",
      desktopBadge: "正式演示",
      stripTitle: "轻量身份信息条",
      stripSubtitle: "标签存在，但只是次要信息。",
      previewChips: ["INFP", "AI + HCI", "偏好具体问题"],
      previewMessageA:
        "标签可以帮我开启对话，但它并不能告诉别人，什么样的聊天方式真的会让我放松。",
      previewMessageB: "停顿一下，BridgeChat 会基于共同语境轻轻给出一个更自然的开场提示。",
      previewHint: "回复某条具体消息时，系统会围绕那条消息给出更值得继续聊的切入点。",
      sharedGround: "短暂停顿后，会出现基于共同语境的低压力开场。",
      beyondLabel: "进入回复状态后，一条真实消息会被转化成更好的继续对话角度。",
      reflectionAppears: "两个提示都基于语境，而不是基于刻板印象。",
    },
    demo: {
      resetDemo: "重置 Demo",
      backToIntro: "返回介绍页",
      steps: [
        "步骤 1：发现共同语境",
        "步骤 2：自然开场",
        "步骤 3：顺着具体消息聊深一点",
      ],
      labelsStayLightweight: "这里的标签只是轻量线索",
      helperHint:
        "提示：共同语境适合用来轻轻开场，具体消息适合用来继续聊深一点。",
      composerPlaceholder: "输入一条能把对话带向理解的消息...",
      gentleGuardrail: "BridgeChat 的提示会尽量围绕共同语境和真实消息来展开。",
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
        "BridgeChat 会先依据共同语境帮助你开场，再围绕一条具体消息帮助你找到更自然的继续聊天切口，而不是用 MBTI 直接下判断。",
      latestHelper: "最新建议",
      tryOneAction: "试试一个动作",
      tryOneActionDetail:
        "先用“破冰一下”开启话题，或在选中一条回复目标后用“聊得更深”继续推进。",
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
      reply: "回复",
      replyingTo: "正在回复",
      clearReply: "清除回复引用",
      aiDisabled: "当前环境还没有配置正式 AI，所以这两个引导功能暂时不会展示。",
      aiUnavailable: "AI 暂时不可用，请稍后再试。",
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
