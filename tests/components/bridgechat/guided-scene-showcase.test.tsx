import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GuidedSceneShowcase } from "@/components/bridgechat/guided/GuidedSceneShowcase";

describe("GuidedSceneShowcase", () => {
  it("autoplays Scene 1 and delays the hesitation annotation until after the typing beat", () => {
    vi.useFakeTimers();

    render(<GuidedSceneShowcase />);

    expect(
      screen.getByText("小A 想聊点什么，但不知道突然提猫猫会不会尴尬。"),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2600);
    });

    expect(
      screen.queryByText("不知道自己想的话题，对方是否感兴趣？"),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(
      screen.getByText("不知道自己想的话题，对方是否感兴趣？"),
    ).toBeInTheDocument();

    vi.useRealTimers();
  });
});
