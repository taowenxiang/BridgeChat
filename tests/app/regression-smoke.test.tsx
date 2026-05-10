import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import VideoPage from "@/app/video/page";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

describe("regression smoke", () => {
  it("keeps the final reduced app focused on the concept-first landing page and guided demo", () => {
    render(
      <LocaleProvider initialLocale="en">
        <HomePage />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /bridgechat/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /enter guided demo/i }),
    ).toHaveAttribute("href", "/video");
    expect(screen.queryByText(/language/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/launch demo/i)).not.toBeInTheDocument();

    render(
      <LocaleProvider initialLocale="en">
        <VideoPage />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("region", { name: /video demo controls/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /scene 1/i }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("button", { name: /replay current scene/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /phone demo stage/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /scene timeline/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/understand more/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reset demo/i)).not.toBeInTheDocument();
  });
});
