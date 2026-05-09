import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

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
    render(
      <LocaleProvider>
        <DemoPage />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /共同兴趣破冰/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /重播/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to english/i })).toHaveTextContent("EN");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/提示在停顿后出现/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /重播/i }));

    expect(
      screen.getByText(/这个场景一开始并没有突出标签/i),
    ).toBeInTheDocument();
  });

  it("switches to English and localizes the current demo shell and visible messages", () => {
    render(
      <LocaleProvider>
        <DemoPage />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /shared-interest icebreaker/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /切换到中文/i })).toHaveTextContent("中文");

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByText(/hey, hi!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the system notices a shared interest and keeps the cue lightweight/i),
    ).toBeInTheDocument();
  });

  it("switches to scene 02 and keeps annotation and playback content synchronized through replay", () => {
    render(
      <LocaleProvider initialLocale="en">
        <DemoPage />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /next scene/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /ai-guided deeper cue/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a real-life moment creates the opening/i),
    ).toBeInTheDocument();
    expectActiveAnnotation(/a real-life moment creates the opening/i);
    expect(
      screen.getByText(/five deadlines last night/i),
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
      screen.getByText(/five deadlines last night/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/the assistant spots an opening around coping style/i),
    ).not.toBeInTheDocument();
  });

  it("uses the direct scene switcher path and ignores stale autoplay callbacks after switching and replaying", () => {
    render(
      <LocaleProvider initialLocale="en">
        <DemoPage />
      </LocaleProvider>,
    );

    const staleSceneOneCallback = scheduledTimeoutCallbacks.at(-1);

    fireEvent.click(screen.getByRole("button", { name: /scene 02 · ai-guided deeper cue/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: /ai-guided deeper cue/i }),
    ).toBeInTheDocument();
    expectActiveAnnotation(/a real-life moment creates the opening/i);
    expect(screen.getByText(/five deadlines last night/i)).toBeInTheDocument();

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
