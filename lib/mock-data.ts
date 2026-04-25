import type { ChatMessage, DemoProgress, DemoUser, Locale } from "@/lib/types";

const localizedData = {
  en: {
    users: [
      {
        id: "user-a",
        name: "Mina Park",
        role: "HCI student",
        avatar: "/avatars/mina.svg",
        label: "INFP",
        interests: ["AI + HCI", "campus media", "music"],
        conversationPreference: "Prefers specific questions",
        beyondLabel: {
          conversationStyle:
            "I usually warm up after a few messages, especially when the topic is concrete instead of broad small talk.",
          misunderstoodAs:
            "People sometimes think I'm distant at first, but usually I'm listening carefully and trying to understand the vibe.",
          canTalkForeverAbout:
            "Why some interfaces make people feel instantly comfortable and others make them shut down.",
          groupWorkStyle:
            "I tend to organize the structure early, then speak more once I know where the discussion is going.",
        },
      },
      {
        id: "user-b",
        name: "Theo Liang",
        role: "Computing student",
        avatar: "/avatars/theo.svg",
        label: "ENTP",
        interests: ["design systems", "debate club", "prototype jams"],
        conversationPreference: "Likes low-pressure back-and-forth",
        beyondLabel: {
          conversationStyle:
            "I come across energetic, but I usually slow down if the other person needs more time to think.",
          misunderstoodAs:
            "People assume I always want to argue, but I mostly like exploring ideas from different angles.",
          canTalkForeverAbout:
            "How presentation tools shape what kinds of teamwork people think are possible.",
          groupWorkStyle:
            "I often throw out rough ideas fast, then help the group test which one is actually useful.",
        },
      },
    ] as [DemoUser, DemoUser],
    messages: [
      {
        id: "seed-1",
        senderId: "user-b",
        text: "Hey, were you also in the studio critique this morning? I recognized your slide about calmer onboarding flows.",
        sentAt: "10:02",
        tone: "seeded",
      },
      {
        id: "seed-2",
        senderId: "user-a",
        text: "Yeah, that was me. I was a little nervous, so I'm glad at least the slides looked calm.",
        sentAt: "10:03",
        tone: "seeded",
      },
      {
        id: "seed-3",
        senderId: "user-b",
        text: "They did. The point about interfaces feeling welcoming instead of efficient-only was really good.",
        sentAt: "10:04",
        tone: "seeded",
      },
      {
        id: "seed-4",
        senderId: "user-a",
        text: "Thanks. I always get curious about why some tools make group work easier to enter and some feel intimidating immediately.",
        sentAt: "10:05",
        tone: "seeded",
      },
      {
        id: "seed-5",
        senderId: "user-b",
        text: "Same. I'm helping with a club showcase next week, so I've been thinking about how to make first conversations less awkward too.",
        sentAt: "10:06",
        tone: "seeded",
      },
      {
        id: "seed-6",
        senderId: "user-a",
        text: "That sounds fun. I usually do better once someone asks something specific instead of the generic 'tell me about yourself' thing.",
        sentAt: "10:07",
        tone: "seeded",
      },
      {
        id: "seed-7",
        senderId: "user-b",
        text: "That makes sense. I almost asked if your MBTI explains that, but honestly the specific-question part feels more useful.",
        sentAt: "10:08",
        tone: "seeded",
      },
      {
        id: "seed-8",
        senderId: "user-a",
        text: "Exactly. Labels can help me start, but they don't tell people what actually makes conversation easy for me.",
        sentAt: "10:09",
        tone: "seeded",
      },
    ] as ChatMessage[],
    commonGroundItems: [
      "Both are preparing class presentations and care about how people enter conversations.",
      "Both respond better to lower-pressure messaging than to performative networking energy.",
      "Both are interested in research and prototyping, not just surface-level campus chatter.",
    ],
    guidedDraft: "You're an I person so you probably hate social situations, right?",
  },
  zh: {
    users: [
      {
        id: "user-a",
        name: "Mina Park",
        role: "HCI 学生",
        avatar: "/avatars/mina.svg",
        label: "INFP",
        interests: ["AI + HCI", "校园媒体", "音乐"],
        conversationPreference: "更喜欢具体的问题",
        beyondLabel: {
          conversationStyle:
            "我通常在聊过几轮之后才会慢慢放松，尤其当话题是具体的，而不是很泛的寒暄时。",
          misunderstoodAs:
            "别人有时会觉得我一开始有点冷淡，但大多数时候我只是在先观察气氛、认真听对方说什么。",
          canTalkForeverAbout:
            "为什么有些界面会让人立刻觉得放松，而另一些会让人一下子就退缩。",
          groupWorkStyle:
            "我常常会先把结构理清楚，等我知道讨论往哪走之后，再说得更多一些。",
        },
      },
      {
        id: "user-b",
        name: "Theo Liang",
        role: "计算机学生",
        avatar: "/avatars/theo.svg",
        label: "ENTP",
        interests: ["设计系统", "辩论社", "原型冲刺"],
        conversationPreference: "喜欢低压力的来回交流",
        beyondLabel: {
          conversationStyle:
            "我看起来会比较有能量，但如果对方需要时间整理思路，我通常也会放慢节奏。",
          misunderstoodAs:
            "别人常常以为我总想辩论，但其实我更喜欢从不同角度把想法展开看看。",
          canTalkForeverAbout:
            "演示工具会怎样影响团队对协作方式的想象。",
          groupWorkStyle:
            "我经常会先快速抛出一些雏形想法，然后再帮大家一起验证哪些真的有用。",
        },
      },
    ] as [DemoUser, DemoUser],
    messages: [
      {
        id: "seed-1",
        senderId: "user-b",
        text: "嗨，你今天早上的 studio critique 也在吗？我认出了你那页关于“更平静的 onboarding 流程”的幻灯片。",
        sentAt: "10:02",
        tone: "seeded",
      },
      {
        id: "seed-2",
        senderId: "user-a",
        text: "对，是我。我当时其实有点紧张，所以至少幻灯片看起来很平静这件事还挺安慰人的。",
        sentAt: "10:03",
        tone: "seeded",
      },
      {
        id: "seed-3",
        senderId: "user-b",
        text: "确实是。你提到“界面应该让人感到被欢迎，而不只是高效”那一点特别好。",
        sentAt: "10:04",
        tone: "seeded",
      },
      {
        id: "seed-4",
        senderId: "user-a",
        text: "谢谢。我一直很好奇，为什么有些工具会让小组协作更容易开始，而有些一上来就让人有点退缩。",
        sentAt: "10:05",
        tone: "seeded",
      },
      {
        id: "seed-5",
        senderId: "user-b",
        text: "我也在想这个。我下周在帮一个社团做展示，所以最近也一直在想怎么让第一次聊天不要那么尴尬。",
        sentAt: "10:06",
        tone: "seeded",
      },
      {
        id: "seed-6",
        senderId: "user-a",
        text: "听起来很有意思。比起那种很泛的“介绍一下你自己”，我通常会在别人问得更具体一点时更容易打开。",
        sentAt: "10:07",
        tone: "seeded",
      },
      {
        id: "seed-7",
        senderId: "user-b",
        text: "懂。我刚刚差点想问这是不是和你的 MBTI 有关，但说实话，“偏好具体问题”这件事本身好像更有用。",
        sentAt: "10:08",
        tone: "seeded",
      },
      {
        id: "seed-8",
        senderId: "user-a",
        text: "没错。标签可以帮我开个头，但它并不能告诉别人，什么样的交流方式真的会让我觉得舒服。",
        sentAt: "10:09",
        tone: "seeded",
      },
    ] as ChatMessage[],
    commonGroundItems: [
      "两个人都在准备课堂展示，也都在意别人是怎样进入一段对话的。",
      "两个人都更喜欢低压力的交流方式，而不是那种表演感很强的社交能量。",
      "两个人都对研究和原型设计感兴趣，而不只是停留在表面的校园寒暄。",
    ],
    guidedDraft: "你是 I 人，所以你应该很不喜欢社交吧？",
  },
} as const;

export const initialProgress: DemoProgress = {
  userMessagesSent: 0,
  totalNewMessages: 0,
  usedGoDeeper: false,
  thoughtfulFollowup: false,
};

export function getDemoUsers(locale: Locale) {
  return localizedData[locale].users;
}

export function getSeededMessages(locale: Locale) {
  return localizedData[locale].messages;
}

export function getCommonGroundItems(locale: Locale) {
  return localizedData[locale].commonGroundItems;
}

export function getGuidedDraft(locale: Locale) {
  return localizedData[locale].guidedDraft;
}
