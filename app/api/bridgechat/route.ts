import { NextResponse } from "next/server";

import {
  AiDisabledError,
  AiUnavailableError,
  generateReflection,
  generateSuggestion,
} from "@/lib/ai";
import type { AiApiStatus, BridgeChatContext, SuggestionKind } from "@/lib/types";

function buildStatusResponse(status: AiApiStatus, message: string) {
  return NextResponse.json({ status, message });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    kind: SuggestionKind | "reflection";
    context: BridgeChatContext;
  };

  try {
    if (body.kind === "reflection") {
      const reflection = await generateReflection(body.context);
      return NextResponse.json({ status: "ok", reflection });
    }

    const suggestion = await generateSuggestion(body.kind, body.context);
    return NextResponse.json({ status: "ok", suggestion });
  } catch (error) {
    if (error instanceof AiDisabledError) {
      return buildStatusResponse("disabled", "Formal AI is not configured.");
    }

    if (error instanceof AiUnavailableError) {
      return buildStatusResponse("unavailable", error.message);
    }

    return buildStatusResponse("unavailable", "AI is temporarily unavailable.");
  }
}
