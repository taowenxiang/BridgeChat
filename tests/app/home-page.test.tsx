import { render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";
import HomePage from "@/app/page";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
const originalLocalStorage = window.localStorage;
const mockLocalStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
};

describe("home page", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: mockLocalStorage,
    });
  });

  beforeEach(() => {
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.getItem.mockReturnValue(null);
    document.documentElement.lang = "en";
  });

  afterAll(() => {
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
  });

  it("renders the concept-first BridgeChat landing page", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /bridgechat/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /enter guided demo/i }),
    ).toHaveAttribute("href", "/demo");

    expect(screen.getByText(/shared-interest icebreaker/i)).toBeInTheDocument();
    expect(screen.getByText(/ai-guided deeper cue/i)).toBeInTheDocument();
    expect(screen.queryByText(/launch demo/i)).not.toBeInTheDocument();
  });

  it("renders the legacy demo route without requiring a root locale provider", () => {
    expect(() => render(<DemoPage />)).not.toThrow();
  });

  it("restores the previous document lang after the demo bridge unmounts", async () => {
    document.documentElement.lang = "fr";
    mockLocalStorage.getItem.mockReturnValue("zh");

    const { unmount } = render(<DemoPage />);

    await waitFor(() => {
      expect(document.documentElement.lang).toBe("zh-CN");
    });

    unmount();

    expect(document.documentElement.lang).toBe("fr");
  });
});
