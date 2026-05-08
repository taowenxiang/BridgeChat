import { describe, expect, it } from "vitest";

import { getCopy } from "@/lib/demo-copy";

describe("getCopy", () => {
  it("returns localized homepage and demo shell copy for zh and en", () => {
    const zhCopy = getCopy("zh");
    const enCopy = getCopy("en");

    expect(zhCopy.home.badge).toBe("研究原型");
    expect(zhCopy.home.cta).toBe("进入引导演示");
    expect(zhCopy.home.principles).toEqual([
      "弱标签",
      "丰富语境",
      "更好提示",
      "共享理解",
    ]);

    expect(enCopy.home.badge).toBe("Research prototype");
    expect(enCopy.home.cta).toBe("Enter Guided Demo");
    expect(enCopy.demo.replay).toBe("Replay");
    expect(enCopy.demo.sceneLabel).toBe("Scene");
  });
});
