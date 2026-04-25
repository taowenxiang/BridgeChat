import { NextResponse } from "next/server";

import { generateReflection, generateSuggestion } from "@/lib/ai";
import type { BridgeChatContext, SuggestionKind } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    kind: SuggestionKind | "reflection";
    context: BridgeChatContext;
  };

  if (body.kind === "reflection") {
    const reflection = await generateReflection(body.context);
    return NextResponse.json({ reflection });
  }

  const suggestion = await generateSuggestion(body.kind, body.context);
  return NextResponse.json({ suggestion });
}
