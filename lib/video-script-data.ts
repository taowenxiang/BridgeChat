import type { SuggestionKind, VideoScene } from "@/lib/types";

export type VideoMessage = {
  id: string;
  sender: "self" | "peer";
  text: string;
  sentAt: string;
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type VideoHint = {
  tone: "soft" | "ai";
  badge: string;
  scriptedText: string;
  liveKind: SuggestionKind;
};

export type VideoSceneScript = {
  id: VideoScene;
  title: string;
  subtitle: string;
  tone: string;
  headline: string;
  openerMessages: VideoMessage[];
  initialDraft: string;
  hint: VideoHint;
  sentMessage: VideoMessage;
  replyMessages: VideoMessage[];
  beatCaptions: string[];
  footerLine: string;
  logoTag: string;
};

export const videoScripts: Record<VideoScene, VideoSceneScript> = {
  "shared-interest": {
    id: "shared-interest",
    title: "场景一",
    subtitle: "标签披露 · 温和展示共同爱好",
    tone: "轻快治愈风",
    headline: "聊兴趣，怕尴尬？",
    openerMessages: [
      {
        id: "scene1-open-1",
        sender: "self",
        text: "你好呀",
        sentAt: "10:09",
      },
      {
        id: "scene1-open-2",
        sender: "peer",
        text: "hellohello",
        sentAt: "10:10",
      },
    ],
    initialDraft: "你看见过学校里的流浪猫嘛？我感觉他们好可爱！",
    hint: {
      tone: "soft",
      badge: "共同点提示",
      scriptedText: "对方也喜欢猫猫，聊聊猫猫的日常挺好呀✨",
      liveKind: "icebreaker",
    },
    sentMessage: {
      id: "scene1-send",
      sender: "self",
      text: "你看见过学校里的流浪猫嘛？我感觉他们好可爱！",
      sentAt: "10:11",
    },
    replyMessages: [
      {
        id: "scene1-reply-1",
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
        id: "scene1-reply-2",
        sender: "self",
        text: "哇！好乖！",
        sentAt: "10:13",
      },
    ],
    beatCaptions: [
      "普通聊天界面，用户刚输入关于流浪猫的话题，还在犹豫要不要发出。",
      "系统只轻轻揭示共同喜好，不直接抛出标签，让开场更自然。",
      "一句提示，帮用户放下顾虑，把话题稳稳发出去。",
      "对方顺势接话，还晒出秋秋的照片，对话一下子就活了起来。",
    ],
    footerLine: "一句话，开启共同话题，告别社交冷场",
    logoTag: "BridgeChat",
  },
  "ai-guidance": {
    id: "ai-guidance",
    title: "场景二",
    subtitle: "AI智能引导 · 挖掘隐性人格",
    tone: "真实接地气风",
    headline: "聊日常，没话题？",
    openerMessages: [
      {
        id: "scene2-open-1",
        sender: "peer",
        text: "救命！昨天赶了 5 个 DDL，熬到凌晨，今天整个人都废了😫",
        sentAt: "22:18",
      },
    ],
    initialDraft: "",
    hint: {
      tone: "ai",
      badge: "AI 辅助提示",
      scriptedText: "TA 居然积攒 5 个 DDL 在身然后从容应对，或许可以聊聊 TA 的执行力👀",
      liveKind: "go-deeper",
    },
    sentMessage: {
      id: "scene2-send",
      sender: "self",
      text: "哈哈哈哈，看来你是妥妥的 P 人吧！执行力也太强了！",
      sentAt: "22:19",
    },
    replyMessages: [
      {
        id: "scene2-reply-1",
        sender: "peer",
        text: "被你说中啦！DDL战神来的",
        sentAt: "22:20",
      },
    ],
    beatCaptions: [
      "对方先抛出一条很真实的 DDL 吐槽，界面里还没有任何提示。",
      "AI 从对话里抽出一个切入点，帮用户看到“执行力”这个更容易接话的方向。",
      "用户顺着提示把话题接住，还自然带出“P人”这类更有传播感的表达。",
      "对方轻松接住，尴尬感被化解，聊天氛围立刻顺起来。",
    ],
    footerLine: "AI 给出切入点，聊天更快找到共鸣",
    logoTag: "BridgeChat AI",
  },
};
