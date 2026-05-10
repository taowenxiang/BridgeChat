import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GuidedSceneShowcase } from "@/components/bridgechat/guided/GuidedSceneShowcase";

describe("GuidedSceneShowcase", () => {
  it("renders a timeline and advances the current beat as autoplay moves forward", () => {
    vi.useFakeTimers();

    render(<GuidedSceneShowcase />);

    expect(
      screen.getByRole("list", { name: /scene timeline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("listitem", { name: /beat 1/i }),
    ).toHaveAttribute("data-state", "current");

    act(() => {
      vi.advanceTimersByTime(3600);
    });

    expect(
      screen.getByRole("listitem", { name: /beat 3/i }),
    ).toHaveAttribute("data-state", "current");
    expect(
      screen.getByRole("listitem", { name: /beat 1/i }),
    ).toHaveAttribute("data-state", "complete");

    vi.useRealTimers();
  });
});
