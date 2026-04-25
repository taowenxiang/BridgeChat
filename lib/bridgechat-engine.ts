import { getCopy } from "@/lib/copy";
import { getCommonGroundItems } from "@/lib/mock-data";
import type {
  BridgeChatContext,
  DemoProgress,
  Locale,
  Suggestion,
  SuggestionKind,
  UnlockState,
} from "@/lib/types";

const stereotypePatterns = [
  "you are an i",
  "because you're infp",
  "because you're entp",
  "people like you",
  "your type always",
  "so you must be",
  "as an introvert you probably",
  "as an extrovert you probably",
  "你是i人",
  "你是e人",
  "像你这种人",
  "你这种类型的人",
  "所以你应该",
  "mbti就是这样",
  "你们这种类型都",
];

export function detectAssumptionHeavyDraft(text: string) {
  const normalized = text.toLowerCase().replace(/\s+/g, "");
  return stereotypePatterns.some((pattern) =>
    normalized.includes(pattern.replace(/\s+/g, "")),
  );
}

export function isThoughtfulFollowUp(text: string) {
  const normalized = text.trim().toLowerCase();
  return (normalized.includes("?") || normalized.includes("？")) && normalized.length > 18;
}

export function getUnlockState(progress: DemoProgress): UnlockState {
  return {
    commonGroundUnlocked: progress.userMessagesSent >= 2 ? 3 : 2,
    beyondLabelUnlocked: progress.totalNewMessages >= 4,
    reflectionUnlocked: progress.usedGoDeeper || progress.thoughtfulFollowup,
  };
}

export function getUnlockBanner(
  previous: UnlockState,
  next: UnlockState,
  locale: Locale,
): string | null {
  const copy = getCopy(locale).demo.unlockBanners;

  if (
    next.commonGroundUnlocked > previous.commonGroundUnlocked &&
    next.commonGroundUnlocked >= 3
  ) {
    return copy.common;
  }

  if (!previous.beyondLabelUnlocked && next.beyondLabelUnlocked) {
    return copy.beyond;
  }

  if (!previous.reflectionUnlocked && next.reflectionUnlocked) {
    return copy.reflection;
  }

  return null;
}

function makeSuggestion(
  kind: SuggestionKind,
  text: string,
  explanation: string,
  sourceTags: string[],
): Suggestion {
  return {
    id: `${kind}-${Math.random().toString(36).slice(2, 10)}`,
    kind,
    text,
    explanation,
    sourceTags,
  };
}

export function rewriteAssumptionHeavyDraft(text: string, locale: Locale) {
  const normalized = text.trim();

  if (!normalized) {
    return locale === "zh"
      ? "你通常更喜欢小范围聊天，还是会看场合和对象而变化？"
      : "Do you usually prefer smaller conversations, or does it depend on the setting?";
  }

  if (locale === "zh") {
    if (
      normalized.includes("I 人") ||
      normalized.includes("I人") ||
      normalized.includes("E 人") ||
      normalized.includes("E人") ||
      normalized.includes("应该") ||
      normalized.includes("你这种")
    ) {
      return "你通常更喜欢小范围聊天，还是会看场合和对象而变化？";
    }

    return normalized.endsWith("？") || normalized.endsWith("?")
      ? normalized
      : `${normalized}？`;
  }

  return (
    normalized
      .replace(/you('?| a)re an? [ie]\w*/gi, "Do you usually")
      .replace(/because you're [A-Z]{4}/gi, "")
      .replace(/your type always/gi, "do you often")
      .replace(/so you must be/gi, "does that ever mean")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/,\s*\?/g, "?")
      .replace(/\?*$/, "?") ||
    "Do you usually prefer smaller conversations, or does it depend on the setting?"
  );
}

export function buildMockSuggestion(
  kind: SuggestionKind,
  context: BridgeChatContext,
  locale: Locale,
): Suggestion {
  const latestDraft = context.draft?.trim() ?? "";

  if (locale === "zh") {
    if (kind === "icebreaker") {
      return makeSuggestion(
        "icebreaker",
        "你刚才提到下周要做社团展示。通常什么样的第一个问题会让人比较放松，而不是像在被面试？",
        "这个开场利用了共同项目语境和沟通偏好，而不是直接把标签当成结论。",
        ["shared interest", "prior message", "communication preference"],
      );
    }

    if (kind === "go-deeper") {
      return makeSuggestion(
        "go-deeper",
        "你刚才说标签可以帮你开始，但不能解释完整的你。什么样的问题最容易让你觉得自己真的被理解了？",
        "这个问题顺着对方已经表达过的经历继续追问，让定义权留在对方手里。",
        ["prior message", "communication preference"],
      );
    }

    if (latestDraft) {
      return makeSuggestion(
        "avoid-assumptions",
        rewriteAssumptionHeavyDraft(latestDraft, locale),
        "它保留了你的好奇心，但把问题改成了围绕情境和偏好的开放表达。",
        ["draft rewrite", "anti-stereotype"],
      );
    }

    return makeSuggestion(
      "avoid-assumptions",
      "你通常更喜欢小范围聊天，还是会看场合和对象而变化？",
      "这句话问的是现实中的行为和情境，而不是从标签直接推出性格结论。",
      ["communication preference", "anti-stereotype"],
    );
  }

  if (kind === "icebreaker") {
    return makeSuggestion(
      "icebreaker",
      "You mentioned the club showcase earlier. What kind of first question usually helps people relax instead of feeling interviewed?",
      "This opener uses shared project context and communication preference instead of leaning on a label.",
      ["shared interest", "prior message", "communication preference"],
    );
  }

  if (kind === "go-deeper") {
    return makeSuggestion(
      "go-deeper",
      "You said labels can help you start but not explain the full picture. What kind of question usually makes you feel understood fastest?",
      "This follows up on a stated experience and invites the other person to define themselves in context.",
      ["prior message", "communication preference"],
    );
  }

  if (latestDraft) {
    return makeSuggestion(
      "avoid-assumptions",
      rewriteAssumptionHeavyDraft(latestDraft, locale),
      "This keeps the curiosity but turns the draft into an open question grounded in situation and preference.",
      ["draft rewrite", "anti-stereotype"],
    );
  }

  return makeSuggestion(
    "avoid-assumptions",
    "Do you usually prefer smaller conversations, or does it depend on the setting and who you're talking with?",
    "This asks about real behavior in context instead of assuming a trait from a label.",
    ["communication preference", "anti-stereotype"],
  );
}

export function buildReflectionSummary(
  context: BridgeChatContext,
  locale: Locale,
) {
  const [userA, userB] = context.users;
  const lastUserQuestion = [...context.messages].reverse().find((message) => {
    return (
      message.senderId === userA.id &&
      (message.text.includes("?") || message.text.includes("？"))
    );
  });

  if (locale === "zh") {
    return [
      `${userB.name.split(" ")[0]} 对具体的问题比“泛泛介绍一下自己”这类提示更容易回应。`,
      `${userA.name.split(" ")[0]} 和 ${userB.name.split(" ")[0]} 真正建立连接的基础，更像是展示、研究和协作方式，而不是 MBTI 缩写本身。`,
      "这段对话说明，围绕经历去发问，比从人格标签直接猜测更容易建立信任。",
      lastUserQuestion
        ? "一次更深入的追问，让沟通偏好开始在具体情境里被看见，而不是停留在类型判断上。"
        : "他们的共同点开始落在真实的交流方式上，而不是固定印象。",
    ];
  }

  return [
    `${userB.name.split(" ")[0]} responds better to concrete questions than broad self-description prompts.`,
    `${userA.name.split(" ")[0]} and ${userB.name.split(" ")[0]} connect more through presentation work, research, and collaboration style than through MBTI shorthand.`,
    "The conversation shows that curiosity about experience builds more trust than guessing from a personality label.",
    lastUserQuestion
      ? "A thoughtful follow-up helped surface how communication preferences change with context, not just type."
      : "Their shared ground is anchored in how they like to communicate, not in fixed assumptions.",
  ];
}

export function buildAutoReply(
  _context: BridgeChatContext,
  userText: string,
  locale: Locale,
) {
  const lower = userText.toLowerCase();

  if (locale === "zh") {
    if (userText.includes("什么样的第一个问题") || userText.includes("什么样的问题")) {
      return "大概是那种从我已经提到过的具体事情切入的问题吧。这样我不用突然现场概括“我是谁”，会轻松很多。";
    }

    if (userText.includes("社团展示")) {
      return "通常像“你现在在做哪一部分？”这种问题就不错。它会给人一个真实的切入口，而不是让人一下子开始表演自己。";
    }

    if (userText.includes("小范围聊天") || userText.includes("看场合")) {
      return "会看场合。刚开始热身的时候我更喜欢比较安静的小对话，但一旦话题变得真实起来，我其实也会聊很多。";
    }

    return "这个问题其实挺好的。我觉得当别人不是想靠标签来“解读”我，而是真的对具体细节感兴趣时，对话会轻松很多。";
  }

  if (lower.includes("what kind of question") || lower.includes("feel understood")) {
    return "Probably a question that starts with something concrete I've already mentioned. It feels easier to answer when I don't have to invent a whole self-summary on the spot.";
  }

  if (lower.includes("club showcase")) {
    return "Usually something like 'what part are you building right now?' It gives people somewhere real to start instead of making them perform.";
  }

  if (lower.includes("setting") || lower.includes("smaller conversations")) {
    return "It definitely depends on the setting. I like quieter conversations when I'm warming up, but I can be pretty talkative once the topic feels real.";
  }

  return "That question is actually nice. I think conversation gets easier for me when someone is curious about specifics instead of trying to decode me from a label.";
}

export function getCommonGround(unlockedCount: number, locale: Locale) {
  return getCommonGroundItems(locale).slice(0, unlockedCount);
}

export function formatClock(indexOffset: number) {
  const baseHour = 10;
  const baseMinute = 10 + indexOffset;
  return `${String(baseHour).padStart(2, "0")}:${String(baseMinute).padStart(2, "0")}`;
}
