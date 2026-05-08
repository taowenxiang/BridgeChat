import { describe, expect, it } from "vitest";

import { resolveInitialLocale } from "@/app/layout";

describe("layout locale bootstrap", () => {
  it("leaves the server locale undefined when no locale cookie is present", () => {
    expect(resolveInitialLocale(undefined)).toBeUndefined();
  });
});
