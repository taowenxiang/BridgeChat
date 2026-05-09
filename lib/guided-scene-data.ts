export type GuidedSceneId = "shared-interest" | "ai-guidance";

export type GuidedAnnotation = {
  title: string;
  body: string;
};

export type GuidedBubble = {
  id: string;
  sender: "self" | "peer";
  text: string;
  sentAt: string;
  replyTo?: {
    label: string;
    text: string;
  };
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type GuidedBeat = {
  visibleMessageIds: string[];
  draftText: string;
  showCursor: boolean;
  showHint: boolean;
  hintText?: string;
  showReplyComposer: boolean;
  showDemoCursor: boolean;
  demoCursorX?: number;
  demoCursorY?: number;
  showReplyButtonForMessageId?: string;
  selectedMessageId?: string;
  annotation: GuidedAnnotation;
  rhythmLabel: string;
  delayMs: number;
};

export type GuidedScene = {
  id: GuidedSceneId;
  title: string;
  subtitle: string;
  logoTag: string;
  hintBadge: string;
  bubbles: GuidedBubble[];
  beats: GuidedBeat[];
};

export const guidedScenes: Record<GuidedSceneId, GuidedScene> = {
  "shared-interest": {
    id: "shared-interest",
    title: "Scene 1 共同爱好",
    subtitle: "标签披露 · 温和展示共同爱好",
    logoTag: "BridgeChat",
    hintBadge: "共同点提示",
    bubbles: [
      { id: "s1-self-hello", sender: "self", text: "你好呀", sentAt: "10:09" },
      { id: "s1-peer-hello", sender: "peer", text: "hellohello", sentAt: "10:10" },
      {
        id: "s1-self-send",
        sender: "self",
        text: "今天在学校里遇见了超可爱的猫猫……",
        sentAt: "10:11",
      },
      {
        id: "s1-peer-reply",
        sender: "peer",
        text: "啊啊啊是的！我老喜欢秋秋了",
        sentAt: "10:12",
        media: {
          src: "/bridgechat/qiuqiu.jpg",
          alt: "秋秋的照片",
          caption: "秋秋",
        },
      },
      {
        id: "s1-self-followup",
        sender: "self",
        text: "真的太可爱了，下次碰到我拍给你看！",
        sentAt: "10:13",
      },
    ],
    beats: [
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "小A 想聊点什么，但不知道突然提猫猫会不会尴尬。",
          body: "聊天还没开始卡住，只是开场前那一点点犹豫。",
        },
        rhythmLabel: "1 开场",
        delayMs: 1000,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello"],
        draftText: "今天在学校里遇见了超可爱的猫猫……",
        showCursor: true,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "小A 想聊点什么，但不知道突然提猫猫会不会尴尬。",
          body: "先只让观众看到输入，不急着解释。",
        },
        rhythmLabel: "2 输入",
        delayMs: 2500,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello"],
        draftText: "今天在学校里遇见了超可爱的猫猫……",
        showCursor: true,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "不知道自己想的话题，对方是否感兴趣？",
          body: "输入已经完成，但消息还停在输入框里，这就是犹豫最真实的时刻。",
        },
        rhythmLabel: "3 停顿",
        delayMs: 1200,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello"],
        draftText: "今天在学校里遇见了超可爱的猫猫……",
        showCursor: true,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "不知道自己想的话题，对方是否感兴趣？",
          body: "再给一个很短的犹豫停顿，让提示出现更自然。",
        },
        rhythmLabel: "4 犹豫",
        delayMs: 700,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello"],
        draftText: "今天在学校里遇见了超可爱的猫猫……",
        showCursor: true,
        showHint: true,
        hintText: "对方也喜欢猫猫，聊聊猫猫的日常挺好呀",
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "一句提示，让你放下顾虑，大胆开聊。",
          body: "系统不替你说话，只提醒你这个话题有机会被接住。",
        },
        rhythmLabel: "5 提示",
        delayMs: 800,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello", "s1-self-send"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "一句提示，让你放下顾虑，大胆开聊。",
          body: "消息还是由小A 自己发出去，主动权没有被 AI 拿走。",
        },
        rhythmLabel: "6 发出",
        delayMs: 1000,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello", "s1-self-send"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "一句提示，让你放下顾虑，大胆开聊。",
          body: "保留一点真实的等待感，观众更容易相信这是聊天而不是播片。",
        },
        rhythmLabel: "7 等待",
        delayMs: 1800,
      },
      {
        visibleMessageIds: ["s1-self-hello", "s1-peer-hello", "s1-self-send", "s1-peer-reply"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "碰巧发现的共同喜好，更容易让聊天自然深入。",
          body: "对方接话后，氛围就从硬开场变成了顺着兴趣聊下去。",
        },
        rhythmLabel: "8 接话",
        delayMs: 1200,
      },
      {
        visibleMessageIds: [
          "s1-self-hello",
          "s1-peer-hello",
          "s1-self-send",
          "s1-peer-reply",
          "s1-self-followup",
        ],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "碰巧发现的共同喜好，更容易让聊天自然深入。",
          body: "一句共同点提示，换来的是后续更自然的来回互动。",
        },
        rhythmLabel: "9 深入",
        delayMs: 2000,
      },
    ],
  },
  "ai-guidance": {
    id: "ai-guidance",
    title: "Scene 2 AI 引导",
    subtitle: "AI 智能引导 · 挖掘隐性人格",
    logoTag: "BridgeChat AI",
    hintBadge: "AI 辅助提示",
    bubbles: [
      {
        id: "s2-peer-1",
        sender: "peer",
        text: "救命！昨天赶了 5 个 DDL，熬到凌晨，今天整个人都废了😫",
        sentAt: "22:18",
      },
      {
        id: "s2-self-send",
        sender: "self",
        text: "你行动力这么高啊，你是p人吧 hhh",
        sentAt: "22:19",
        replyTo: {
          label: "回复对方",
          text: "救命！昨天赶了 5 个 DDL，熬到凌晨，今天整个人都废了😫",
        },
      },
      {
        id: "s2-peer-reply",
        sender: "peer",
        text: "哈哈哈哈被你发现了，我就是 DDL 战神型 P 人",
        sentAt: "22:20",
      },
    ],
    beats: [
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "对方发来一条消息，但小C 一时不知道怎么接。",
          body: "不是没兴趣，而是还没找到一个舒服的切入口。",
        },
        rhythmLabel: "1 开场",
        delayMs: 1000,
      },
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: true,
        demoCursorX: 188,
        demoCursorY: 154,
        annotation: {
          title: "对方发来一条消息，但小C 一时不知道怎么接。",
          body: "先让鼠标靠近消息，观众能立刻知道这次演示跟“回复某条消息”有关。",
        },
        rhythmLabel: "2 靠近",
        delayMs: 1200,
      },
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: true,
        demoCursorX: 208,
        demoCursorY: 182,
        showReplyButtonForMessageId: "s2-peer-1",
        annotation: {
          title: "对方发来一条消息，但小C 一时不知道怎么接。",
          body: "点中消息后，回复入口才显出来。",
        },
        rhythmLabel: "3 选中",
        delayMs: 800,
      },
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "",
        showCursor: true,
        showHint: false,
        showReplyComposer: true,
        showDemoCursor: true,
        demoCursorX: 224,
        demoCursorY: 206,
        selectedMessageId: "s2-peer-1",
        annotation: {
          title: "感兴趣，但不知道怎么回，是很多聊天卡住的瞬间。",
          body: "进入回复态以后，真正的难点不是点按钮，而是下一句怎么说。",
        },
        rhythmLabel: "4 回复态",
        delayMs: 1800,
      },
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "",
        showCursor: true,
        showHint: true,
        hintText: "TA 居然赶了 5 个 DDL 还能扛住，或许可以聊聊 TA 的行动力",
        showReplyComposer: true,
        showDemoCursor: false,
        selectedMessageId: "s2-peer-1",
        annotation: {
          title: "一句引导，帮你找到聊天切入点。",
          body: "AI 没有替小C 组织全文，只是帮他把注意力放到“行动力”这个角度。",
        },
        rhythmLabel: "5 引导",
        delayMs: 800,
      },
      {
        visibleMessageIds: ["s2-peer-1"],
        draftText: "你行动力这么高啊，你是p人吧 hhh",
        showCursor: true,
        showHint: true,
        hintText: "TA 居然赶了 5 个 DDL 还能扛住，或许可以聊聊 TA 的行动力",
        showReplyComposer: true,
        showDemoCursor: false,
        selectedMessageId: "s2-peer-1",
        annotation: {
          title: "一句引导，帮你找到聊天切入点。",
          body: "把切入口落成一句轻松的 social signal，语气就自然了。",
        },
        rhythmLabel: "6 输入",
        delayMs: 2200,
      },
      {
        visibleMessageIds: ["s2-peer-1", "s2-self-send"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "一句引导，帮你找到聊天切入点。",
          body: "发送后保留引用关系，这样观众能清楚看到它是在回应哪一句。",
        },
        rhythmLabel: "7 发出",
        delayMs: 1500,
      },
      {
        visibleMessageIds: ["s2-peer-1", "s2-self-send", "s2-peer-reply"],
        draftText: "",
        showCursor: false,
        showHint: false,
        showReplyComposer: false,
        showDemoCursor: false,
        annotation: {
          title: "落到细节的夸夸，比空泛接话更能打动人。",
          body: "真正让气氛顺起来的，是贴着对方具体状态去夸和调侃。",
        },
        rhythmLabel: "8 接住",
        delayMs: 2000,
      },
    ],
  },
};
