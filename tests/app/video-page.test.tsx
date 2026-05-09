import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import VideoPage from "@/app/video/page";

describe("/video page", () => {
  it("renders the guided showcase entrypoint", () => {
    render(<VideoPage />);

    expect(screen.getByText("Scene 1 共同爱好")).toBeInTheDocument();
    expect(
      screen.getByText("小A 想聊点什么，但不知道突然提猫猫会不会尴尬。"),
    ).toBeInTheDocument();
  });
});
