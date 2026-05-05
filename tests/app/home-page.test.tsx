import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("home page", () => {
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
});
