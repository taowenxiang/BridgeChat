import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GuidedSceneShowcase } from "@/components/bridgechat/guided/GuidedSceneShowcase";

afterEach(() => {
  cleanup();
});

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

  it("renders the phone stage inside a portrait hero frame", () => {
    render(<GuidedSceneShowcase />);

    expect(
      screen.getByRole("region", { name: /phone demo stage/i }),
    ).toBeInTheDocument();

    const frame = screen.getByTestId("hero-phone-frame");
    expect(frame.className).toContain("aspect-[9/19.5]");
    expect(frame.className).toContain("max-w-[420px]");
  });
});
