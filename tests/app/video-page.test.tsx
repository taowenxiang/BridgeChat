import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import VideoPage from "@/app/video/page";

describe("/video page", () => {
  it("renders the control deck and hero-stage shell", () => {
    render(<VideoPage />);

    expect(
      screen.getByRole("region", { name: /video demo controls/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /scene 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /replay current scene/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /phone demo stage/i }),
    ).toBeInTheDocument();
  });
});
