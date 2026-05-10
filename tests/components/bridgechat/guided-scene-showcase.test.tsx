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

  it("keeps the phone ahead of the timeline in mobile order classes and lets the deck drive scene replay", () => {
    vi.useFakeTimers();

    render(<GuidedSceneShowcase />);

    expect(screen.getByTestId("video-main-grid").className).toContain(
      "xl:grid-cols-[minmax(280px,0.78fr)_minmax(420px,1.22fr)]",
    );
    expect(screen.getByTestId("phone-column").className).toContain("order-1");
    expect(screen.getByTestId("annotation-column").className).toContain("order-2");

    act(() => {
      screen.getByRole("tab", { name: /scene 2/i }).click();
    });
    expect(
      screen.getByRole("heading", { level: 1, name: /scene 2/i }),
    ).toBeInTheDocument();

    screen.getByRole("button", { name: /replay current scene/i }).click();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(
      screen.getByRole("listitem", { name: /beat 2/i }),
    ).toHaveAttribute("data-state", "current");

    vi.useRealTimers();
  });
});
