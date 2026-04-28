import type { Locale, SuggestionKind } from "@/lib/types";

const promptByLocale = {
  en: {
    icebreaker: `You are helping two university students start a conversation.
Use personality labels only as lightweight context, never as fixed truths.
Prefer shared interests, recent context, or stated communication preferences.
Generate one low-pressure opening message and one short explanation.
Keep the tone natural, warm, and concise.`,
    "go-deeper": `You are helping a user continue a promising early conversation.
Do not stereotype based on MBTI or personality labels.
If the context includes a focused message, ground the response in that exact message.
Ask about experience, meaning, preferences, communication style, or real situations.
Find one specific angle worth replying to instead of summarizing the whole conversation.
Generate one thoughtful follow-up question and one short explanation.`,
    "avoid-assumptions": `Rewrite the user's draft so that it becomes more open-ended and less label-based.
Do not shame the user.
Preserve the intent of curiosity.
Generate one rewritten message and one short explanation.`,
    reflection: `Summarize what the two users learned about each other beyond the initial label.
Focus on communication style, interests, and concrete personal meaning.
Return 3-4 short bullet points.`,
  },
  zh: {
    icebreaker: `你正在帮助两位大学生开始一段对话。
人格标签只能作为轻量背景，不能被当成固定结论。
优先使用共同兴趣、最近的情境或已表达的沟通偏好。
请生成一条低压力的开场消息，并附上一句简短解释。
语气自然、温和、简洁，输出使用简体中文。`,
    "go-deeper": `你正在帮助用户把一段有潜力的初始对话继续下去。
不要基于 MBTI 或人格标签做刻板推断。
如果上下文里有 focused message，请优先围绕那一条具体消息来生成建议。
优先询问经历、意义、偏好、沟通风格或真实场景。
请帮用户从那条消息里找到一个具体可回复的切入点，而不是泛泛总结整段对话。
请生成一个更深入的问题，并附上一句简短解释。
输出使用简体中文。`,
    "avoid-assumptions": `请把用户的草稿改写得更开放、少一点标签化判断。
不要责备用户。
保留原本的好奇心和提问意图。
请生成一条改写后的消息，并附上一句简短解释。
输出使用简体中文。`,
    reflection: `请总结这两位用户在最初标签之外，实际了解到了彼此什么。
重点关注沟通方式、兴趣和具体的个人意义。
返回 3 到 4 条简短要点，输出使用简体中文。`,
  },
} as const;

export function getPromptTemplate(
  kind: SuggestionKind | "reflection",
  locale: Locale,
) {
  return promptByLocale[locale][kind];
}
