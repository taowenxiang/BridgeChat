import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import DemoPage from "@/app/demo/page";
import HomePage from "@/app/page";

describe("regression smoke", () => {
  const originalLocalStorage = window.localStorage;
  const mockLocalStorage = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: mockLocalStorage,
    });
  });

  beforeEach(() => {
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterAll(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
  });

  it("removes the legacy BridgeChat surfaces from the final reduced app", () => {
    document.documentElement.lang = "fr";

    render(<HomePage />);

    expect(screen.queryByText(/language/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/launch demo/i)).not.toBeInTheDocument();

    render(<DemoPage />);

    expect(screen.queryByText(/understand more/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reset demo/i)).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe("fr");
  });
});
