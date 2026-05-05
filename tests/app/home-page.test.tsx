import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";
import HomePage from "@/app/page";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
const originalLocalStorage = window.localStorage;

describe("home page", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
      },
    });
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
});
