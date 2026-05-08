import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

describe("home page", () => {
  it("renders Chinese by default and switches homepage copy to English with the toggle", () => {
    render(
      <LocaleProvider>
        <HomePage />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /bridgechat/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/从标签走向理解/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /进入引导演示/i }),
    ).toHaveAttribute("href", "/demo");
    expect(screen.getByText(/共同兴趣破冰/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to english/i })).toHaveTextContent("EN");

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(screen.getByText(/from labels to understanding/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /enter guided demo/i }),
    ).toHaveAttribute("href", "/demo");
    expect(screen.getByText(/shared-interest icebreaker/i)).toBeInTheDocument();
    expect(screen.getByText(/ai-guided deeper cue/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /切换到中文/i })).toHaveTextContent("中文");
  });
});
