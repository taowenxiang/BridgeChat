import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { LocaleProvider, useLocale } from "@/components/providers/LocaleProvider";

function LocaleProbe() {
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <span data-testid="locale-value">{locale}</span>
      <button type="button" onClick={() => setLocale("en")}>
        switch to english
      </button>
      <button type="button" onClick={() => setLocale("zh")}>
        switch to chinese
      </button>
    </div>
  );
}

describe("LocaleProvider", () => {
  beforeEach(() => {
    let store: Record<string, string> = {};

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
      },
    });
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    document.cookie = "bridgechat-locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.documentElement.lang = "";
  });

  it("defaults to zh and sets the document language to zh-CN", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId("locale-value")).toHaveTextContent("zh");
    expect(window.localStorage.getItem("bridgechat-locale")).toBe("zh");
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("uses the server-provided initial locale before reading persisted state", () => {
    window.localStorage.setItem("bridgechat-locale", "zh");

    render(
      <LocaleProvider initialLocale="en">
        <LocaleProbe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId("locale-value")).toHaveTextContent("en");
    expect(window.localStorage.getItem("bridgechat-locale")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("persists the selected locale across remounts", () => {
    const firstRender = render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(screen.getByTestId("locale-value")).toHaveTextContent("en");
    expect(window.localStorage.getItem("bridgechat-locale")).toBe("en");
    expect(document.documentElement.lang).toBe("en");

    firstRender.unmount();

    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId("locale-value")).toHaveTextContent("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("updates the document language when the locale changes", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));
    expect(document.documentElement.lang).toBe("en");

    fireEvent.click(screen.getByRole("button", { name: /switch to chinese/i }));
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("falls back to the initial locale when storage access fails", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error("storage blocked");
        },
        setItem: () => {
          throw new Error("storage blocked");
        },
        clear: () => {},
      },
    });

    expect(() =>
      render(
        <LocaleProvider initialLocale="en">
          <LocaleProbe />
        </LocaleProvider>,
      ),
    ).not.toThrow();

    expect(screen.getByTestId("locale-value")).toHaveTextContent("en");
    expect(document.documentElement.lang).toBe("en");
  });
});
