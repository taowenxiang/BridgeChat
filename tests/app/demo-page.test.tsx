import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
const originalLocalStorage = window.localStorage;
const mockLocalStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
};

describe("demo page", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: mockLocalStorage,
    });
  });

  beforeEach(() => {
    vi.useFakeTimers();
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  afterAll(() => {
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
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
});
