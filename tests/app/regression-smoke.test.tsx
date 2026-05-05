import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DemoPage from "@/app/demo/page";
import HomePage from "@/app/page";

describe("regression smoke", () => {
  it("keeps the final reduced app focused on the concept-first landing page and guided demo", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /bridgechat/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /enter guided demo/i }),
    ).toHaveAttribute("href", "/demo");
    expect(screen.queryByText(/language/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/launch demo/i)).not.toBeInTheDocument();

    render(<DemoPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /shared-interest icebreaker/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();
    expect(screen.queryByText(/understand more/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reset demo/i)).not.toBeInTheDocument();
  });
});
