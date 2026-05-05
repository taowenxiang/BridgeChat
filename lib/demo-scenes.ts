import type { DemoScene } from "@/lib/types";

export const demoScenes: DemoScene[] = [
  {
    id: "shared-interest",
    eyebrow: "Scene 01",
    title: "Shared-interest icebreaker",
    subtitle: "A lightweight cue lowers the cost of saying hello.",
    purpose:
      "Show how shared context can open a conversation without overusing labels.",
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
        text: "The system notices a shared interest and keeps the cue lightweight.",
        sentAt: "10:10",
        kind: "hint",
      },
      {
        id: "s1-self-1",
        sender: "self",
        text: "你看见过学校里的流浪猫嘛？我感觉他们好可爱！",
        sentAt: "10:11",
      },
      {
        id: "s1-peer-2",
        sender: "peer",
        text: "啊啊啊是的！我老喜欢秋秋了",
        sentAt: "10:12",
        media: {
          src: "/bridgechat/qiuqiu.jpg",
          alt: "秋秋的照片",
          caption: "秋秋",
        },
      },
    ],
    steps: [
      {
        id: "scene-1-intro",
        delayMs: 1200,
        visibleMessageIds: [],
        annotation: {
          title: "Shared context comes first",
          body: "The scene opens without foregrounding a label. The product starts from a conversational cue.",
        },
      },
      {
        id: "scene-1-hint",
        delayMs: 1800,
        visibleMessageIds: ["s1-peer-1", "s1-hint-1"],
        annotation: {
          title: "A gentle prompt reduces hesitation",
          body: "The helper appears after a pause and suggests a shared-interest opener instead of personality-based guessing.",
        },
        emphasis: "hint",
      },
      {
        id: "scene-1-send",
        delayMs: 1500,
        visibleMessageIds: ["s1-peer-1", "s1-hint-1", "s1-self-1"],
        annotation: {
          title: "The user still owns the message",
          body: "The system supports the send moment, but the conversation still feels human-led.",
        },
      },
      {
        id: "scene-1-reply",
        delayMs: 1600,
        visibleMessageIds: ["s1-peer-1", "s1-hint-1", "s1-self-1", "s1-peer-2"],
        annotation: {
          title: "Shared experience opens the reply",
          body: "The response validates that concrete overlap creates warmer momentum than stereotype-first messaging.",
        },
        emphasis: "reply",
      },
    ],
  },
  {
    id: "ai-guided-deeper-cue",
    eyebrow: "Scene 02",
    title: "AI-guided deeper cue",
    subtitle: "The assistant finds a better angle inside a real exchange.",
    purpose:
      "Show how AI can surface a more meaningful follow-up without collapsing someone into a label.",
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
        text: "The assistant spots an opening around coping style and execution, not just an MBTI joke.",
        sentAt: "22:18",
        kind: "hint",
      },
      {
        id: "s2-self-1",
        sender: "self",
        text: "你居然能一晚上扛住 5 个 DDL，我更想知道你怎么撑下来的。",
        sentAt: "22:19",
      },
      {
        id: "s2-peer-2",
        sender: "peer",
        text: "其实是先把最难的拆开，然后一件一件压过去，不然会更慌。",
        sentAt: "22:20",
      },
    ],
    steps: [
      {
        id: "scene-2-intro",
        delayMs: 1200,
        visibleMessageIds: ["s2-peer-1"],
        annotation: {
          title: "A real-life moment creates the opening",
          body: "The scene starts from a concrete experience instead of a personality summary.",
        },
      },
      {
        id: "scene-2-hint",
        delayMs: 1800,
        visibleMessageIds: ["s2-peer-1", "s2-hint-1"],
        annotation: {
          title: "AI extracts a deeper cue",
          body: "The assistant explains why this angle matters: it follows behavior and coping style instead of stereotyping the speaker.",
        },
        emphasis: "hint",
      },
      {
        id: "scene-2-send",
        delayMs: 1500,
        visibleMessageIds: ["s2-peer-1", "s2-hint-1", "s2-self-1"],
        annotation: {
          title: "The follow-up invites self-definition",
          body: "The response asks for process and experience, giving the other person room to describe themselves.",
        },
      },
      {
        id: "scene-2-reply",
        delayMs: 1600,
        visibleMessageIds: ["s2-peer-1", "s2-hint-1", "s2-self-1", "s2-peer-2"],
        annotation: {
          title: "The conversation gets more specific",
          body: "What emerges is a meaningful habit and way of coping, which is more useful than a label shortcut.",
        },
        emphasis: "final",
      },
    ],
  },
];
