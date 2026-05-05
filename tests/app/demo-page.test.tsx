import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

describe("demo page", () => {
  let scheduledTimeoutCallbacks: Array<() => void> = [];

  function expectActiveAnnotation(text: RegExp) {
    expect(document.querySelector('li[aria-current="step"]')).toHaveTextContent(text);
  }

  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    vi.useFakeTimers();
    scheduledTimeoutCallbacks = [];
    const activeSetTimeout = window.setTimeout.bind(window);
    vi.spyOn(window, "setTimeout").mockImplementation(((handler: TimerHandler, timeout?: number) => {
      if (typeof handler === "function") {
        scheduledTimeoutCallbacks.push(handler as () => void);
      }

      return activeSetTimeout(handler, timeout);
    }) as typeof window.setTimeout);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  afterAll(() => {
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  it("autoplays the guided demo and replays the active scene", () => {
    render(<DemoPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /shared-interest icebreaker/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/the helper appears after a pause/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /replay/i }));

    expect(
      screen.getByText(/the scene opens without foregrounding a label/i),
    ).toBeInTheDocument();
  });

  it("switches to scene 02 and keeps annotation and playback content synchronized through replay", () => {
    render(<DemoPage />);

    fireEvent.click(screen.getByRole("button", { name: /next scene/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /ai-guided deeper cue/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a real-life moment creates the opening/i),
    ).toBeInTheDocument();
    expectActiveAnnotation(/a real-life moment creates the opening/i);
    expect(
      screen.getByText(/救命！昨天赶了 5 个 DDL/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/the assistant spots an opening around coping style/i),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(
      screen.getByText(/ai extracts a deeper cue/i),
    ).toBeInTheDocument();
    expectActiveAnnotation(/ai extracts a deeper cue/i);
    expect(
      screen.getByText(/the assistant spots an opening around coping style/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /replay/i }));

    expect(
      screen.getByText(/a real-life moment creates the opening/i),
    ).toBeInTheDocument();
    expectActiveAnnotation(/a real-life moment creates the opening/i);
    expect(
      screen.getByText(/救命！昨天赶了 5 个 DDL/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/the assistant spots an opening around coping style/i),
    ).not.toBeInTheDocument();
  });

  it("uses the direct scene switcher path and ignores stale autoplay callbacks after switching and replaying", () => {
    render(<DemoPage />);

    const staleSceneOneCallback = scheduledTimeoutCallbacks.at(-1);

    fireEvent.click(screen.getByRole("button", { name: /scene 02 · ai-guided deeper cue/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /ai-guided deeper cue/i }),
    ).toBeInTheDocument();
    expectActiveAnnotation(/a real-life moment creates the opening/i);
    expect(screen.getByText(/救命！昨天赶了 5 个 DDL/i)).toBeInTheDocument();

    act(() => {
      staleSceneOneCallback?.();
    });

    expect(
      document.querySelector('li[aria-current="step"]'),
    ).toHaveTextContent(/a real-life moment creates the opening/i);
    expect(
      screen.queryByText(/the helper appears after a pause/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/the assistant spots an opening around coping style/i),
    ).not.toBeInTheDocument();

    const staleSceneTwoOpeningCallback = scheduledTimeoutCallbacks.at(-1);

    fireEvent.click(screen.getByRole("button", { name: /replay/i }));

    act(() => {
      staleSceneTwoOpeningCallback?.();
    });

    expect(
      document.querySelector('li[aria-current="step"]'),
    ).toHaveTextContent(/a real-life moment creates the opening/i);
    expect(
      screen.queryByText(/the assistant spots an opening around coping style/i),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(
      document.querySelector('li[aria-current="step"]'),
    ).toHaveTextContent(/ai extracts a deeper cue/i);
    expect(
      screen.getByText(/the assistant spots an opening around coping style/i),
    ).toBeInTheDocument();
  });
});
