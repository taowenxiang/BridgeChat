import { describe, expect, it } from "vitest";

import { getDemoScenes } from "@/lib/demo-scenes";

describe("getDemoScenes", () => {
  it("preserves structure and timing while localizing visible scene copy", () => {
    const zhScenes = getDemoScenes("zh");
    const enScenes = getDemoScenes("en");

    expect(zhScenes).toHaveLength(enScenes.length);
    expect(zhScenes[0].id).toBe(enScenes[0].id);
    expect(zhScenes[0].steps.map((step) => step.id)).toEqual(
      enScenes[0].steps.map((step) => step.id),
    );
    expect(zhScenes[0].steps.map((step) => step.delayMs)).toEqual(
      enScenes[0].steps.map((step) => step.delayMs),
    );
    expect(zhScenes[0].steps.map((step) => step.visibleMessageIds)).toEqual(
      enScenes[0].steps.map((step) => step.visibleMessageIds),
    );
    expect(zhScenes[0].messages.map((message) => message.id)).toEqual(
      enScenes[0].messages.map((message) => message.id),
    );

    expect(zhScenes[0].title).toBe("共同兴趣破冰");
    expect(enScenes[0].title).toBe("Shared-interest icebreaker");
    expect(zhScenes[0].messages[0].text).toBe("你好呀");
    expect(enScenes[0].messages[0].text).toBe("Hey, hi!");
    expect(zhScenes[0].messages[1].text).toBe(
      "系统注意到一个共同兴趣点，并且刻意把它保持成轻量提示。",
    );
    expect(enScenes[0].messages[1].text).toBe(
      "The system notices a shared interest and keeps the cue lightweight.",
    );
    expect(zhScenes[0].messages[3].media?.alt).toBe("秋秋的照片");
    expect(enScenes[0].messages[3].media?.alt).toBe("Photo of Qiuqiu");
    expect(zhScenes[1].messages[0].text).toBe("救命！昨天赶了 5 个 DDL，熬到凌晨，今天整个人都废了😫");
    expect(enScenes[1].messages[0].text).toBe(
      "Help. I pushed through five deadlines last night and stayed up until dawn, and now I am completely wiped 😫",
    );
  });
});
