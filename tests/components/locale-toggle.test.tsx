import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocaleProvider, useLocale } from "@/components/providers/LocaleProvider";
import { LocaleToggle } from "@/components/shared/LocaleToggle";

function LocaleProbe() {
  const { locale } = useLocale();

  return <span data-testid="locale-value">{locale}</span>;
}

describe("LocaleToggle", () => {
  it("shows the target locale label and switches between zh and en", () => {
    render(
      <LocaleProvider>
        <LocaleToggle />
        <LocaleProbe />
      </LocaleProvider>,
    );

    expect(screen.getByRole("button", { name: /switch to english/i })).toHaveTextContent("EN");
    expect(screen.getByTestId("locale-value")).toHaveTextContent("zh");

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(screen.getByRole("button", { name: /切换到中文/i })).toHaveTextContent("中文");
    expect(screen.getByTestId("locale-value")).toHaveTextContent("en");
  });
});
