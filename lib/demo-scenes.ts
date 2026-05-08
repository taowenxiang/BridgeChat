import type { DemoScene, Locale } from "@/lib/types";

export function getDemoScenes(locale: Locale): DemoScene[] {
  const isZh = locale === "zh";

  return [
    {
      id: "shared-interest",
      eyebrow: isZh ? "场景 01" : "Scene 01",
      title: isZh ? "共同兴趣破冰" : "Shared-interest icebreaker",
      subtitle: isZh
        ? "一个轻量提示，降低开口说第一句话的成本。"
        : "A lightweight cue lowers the cost of saying hello.",
      purpose: isZh
        ? "展示共同语境如何在不过度强调标签的情况下帮助对话开始。"
        : "Show how shared context can open a conversation without overusing labels.",
      messages: [
        {
          id: "s1-peer-1",
          sender: "peer",
          text: "你好呀",
          sentAt: "10:10",
        },
        {
          id: "s1-hint-1",
          sender: "system",
          text: isZh
            ? "系统注意到一个共同兴趣点，并且刻意把它保持成轻量提示。"
            : "The system notices a shared interest and keeps the cue lightweight.",
          sentAt: "10:10",
          kind: "hint",
        },
        {
          id: "s1-self-1",
          sender: "self",
          text: isZh
            ? "你看见过学校里的流浪猫嘛？我感觉他们好可爱！"
            : "Have you seen the campus cats? They make the whole place feel softer.",
          sentAt: "10:11",
        },
        {
          id: "s1-peer-2",
          sender: "peer",
          text: isZh ? "啊啊啊是的！我老喜欢秋秋了" : "Yes! I always get excited when Qiuqiu shows up.",
          sentAt: "10:12",
          media: {
            src: "/bridgechat/bridgechat/qiuqiu.jpg",
            alt: isZh ? "秋秋的照片" : "Photo of Qiuqiu",
            caption: isZh ? "秋秋" : "Qiuqiu",
          },
        },
      ],
      steps: [
        {
          id: "scene-1-intro",
          delayMs: 1200,
          visibleMessageIds: [],
          annotation: {
            title: isZh ? "共同语境先于标签出现" : "Shared context comes first",
            body: isZh
              ? "这个场景一开始并没有突出标签，而是先给出一个更像真实聊天的共同语境。"
              : "The scene opens without foregrounding a label. The product starts from a conversational cue.",
          },
        },
        {
          id: "scene-1-hint",
          delayMs: 1800,
          visibleMessageIds: ["s1-peer-1", "s1-hint-1"],
          annotation: {
            title: isZh ? "轻提示降低了犹豫成本" : "A gentle prompt reduces hesitation",
            body: isZh
              ? "提示在停顿后出现，帮助用户从共同兴趣开场，而不是从人格刻板印象开场。"
              : "The helper appears after a pause and suggests a shared-interest opener instead of personality-based guessing.",
          },
          emphasis: "hint",
        },
        {
          id: "scene-1-send",
          delayMs: 1500,
          visibleMessageIds: ["s1-peer-1", "s1-hint-1", "s1-self-1"],
          annotation: {
            title: isZh ? "消息仍然由用户自己发出" : "The user still owns the message",
            body: isZh
              ? "系统只是在发送前降低负担，对话的主导权仍然属于用户。"
              : "The system supports the send moment, but the conversation still feels human-led.",
          },
        },
        {
          id: "scene-1-reply",
          delayMs: 1600,
          visibleMessageIds: ["s1-peer-1", "s1-hint-1", "s1-self-1", "s1-peer-2"],
          annotation: {
            title: isZh ? "真实共同体验让回复更自然" : "Shared experience opens the reply",
            body: isZh
              ? "对方的回应证明，具体的重叠经验比先判断对方是什么样的人更容易带来暖场效果。"
              : "The response validates that concrete overlap creates warmer momentum than stereotype-first messaging.",
          },
          emphasis: "reply",
        },
      ],
    },
    {
      id: "ai-guided-deeper-cue",
      eyebrow: isZh ? "场景 02" : "Scene 02",
      title: isZh ? "AI 引导更深一层的线索" : "AI-guided deeper cue",
      subtitle: isZh
        ? "助手在真实互动里找到一个更值得追问的角度。"
        : "The assistant finds a better angle inside a real exchange.",
      purpose: isZh
        ? "展示 AI 如何提出更有意义的追问，而不是把一个人压缩成标签。"
        : "Show how AI can surface a more meaningful follow-up without collapsing someone into a label.",
      messages: [
        {
          id: "s2-peer-1",
          sender: "peer",
          text: "救命！昨天赶了 5 个 DDL，熬到凌晨，今天整个人都废了😫",
          sentAt: "22:18",
        },
        {
          id: "s2-hint-1",
          sender: "system",
          text: isZh
            ? "助手注意到，对方真正值得聊的是应对方式和执行过程，而不只是一个 MBTI 玩笑。"
            : "The assistant spots an opening around coping style and execution, not just an MBTI joke.",
          sentAt: "22:18",
          kind: "hint",
        },
        {
          id: "s2-self-1",
          sender: "self",
          text: isZh
            ? "你居然能一晚上扛住 5 个 DDL，我更想知道你怎么撑下来的。"
            : "You handled five deadlines in one night. I want to know how you kept yourself going.",
          sentAt: "22:19",
        },
        {
          id: "s2-peer-2",
          sender: "peer",
          text: isZh
            ? "其实是先把最难的拆开，然后一件一件压过去，不然会更慌。"
            : "I break the hardest part apart first, then push through it one piece at a time or I spiral.",
          sentAt: "22:20",
        },
      ],
      steps: [
        {
          id: "scene-2-intro",
          delayMs: 1200,
          visibleMessageIds: ["s2-peer-1"],
          annotation: {
            title: isZh ? "真实生活时刻本身就是入口" : "A real-life moment creates the opening",
            body: isZh
              ? "场景从一个具体经历开始，而不是先给出人格总结。"
              : "The scene starts from a concrete experience instead of a personality summary.",
          },
        },
        {
          id: "scene-2-hint",
          delayMs: 1800,
          visibleMessageIds: ["s2-peer-1", "s2-hint-1"],
          annotation: {
            title: isZh ? "AI 提取出更深的线索" : "AI extracts a deeper cue",
            body: isZh
              ? "助手解释这个角度为什么重要: 它关注行为和应对方式，而不是套用刻板印象。"
              : "The assistant explains why this angle matters: it follows behavior and coping style instead of stereotyping the speaker.",
          },
          emphasis: "hint",
        },
        {
          id: "scene-2-send",
          delayMs: 1500,
          visibleMessageIds: ["s2-peer-1", "s2-hint-1", "s2-self-1"],
          annotation: {
            title: isZh ? "追问邀请对方自己定义自己" : "The follow-up invites self-definition",
            body: isZh
              ? "这句回复询问的是过程和经验，给了对方更多空间去描述自己。"
              : "The response asks for process and experience, giving the other person room to describe themselves.",
          },
        },
        {
          id: "scene-2-reply",
          delayMs: 1600,
          visibleMessageIds: ["s2-peer-1", "s2-hint-1", "s2-self-1", "s2-peer-2"],
          annotation: {
            title: isZh ? "对话因此变得更具体" : "The conversation gets more specific",
            body: isZh
              ? "最后浮现出来的是一个有意义的习惯和应对方式，这比标签捷径更有价值。"
              : "What emerges is a meaningful habit and way of coping, which is more useful than a label shortcut.",
          },
          emphasis: "final",
        },
      ],
    },
  ];
}

export const demoScenes = getDemoScenes("en");
