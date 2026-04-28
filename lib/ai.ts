import { getPromptTemplate } from "@/lib/prompts";
import type { BridgeChatContext, Suggestion, SuggestionKind } from "@/lib/types";

export class AiDisabledError extends Error {
  constructor() {
    super("No compatible LLM API key is configured.");
  }
}

export class AiUnavailableError extends Error {
  constructor(message = "AI output was unavailable.") {
    super(message);
  }
}

export function isAiConfigured() {
  return Boolean(resolveAiConfig().apiKey);
}

type ResolvedAiConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function resolveAiConfig(): ResolvedAiConfig {
  const apiKey = process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? "";
  const baseUrl = stripTrailingSlash(
    process.env.LLM_BASE_URL ??
      process.env.OPENAI_BASE_URL ??
      "https://api.openai.com/v1",
  );
  const model = process.env.LLM_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-5-mini";

  return {
    apiKey,
    baseUrl,
    model,
  };
}

function extractOutputText(payload: any) {
  if (typeof payload?.output_text === "string" && payload.output_text.length > 0) {
    return payload.output_text;
  }

  const content = payload?.output?.[0]?.content;
  if (Array.isArray(content)) {
    const textItem = content.find((item: any) => item.type === "output_text");
    if (typeof textItem?.text === "string") {
      return textItem.text;
    }
  }

  return "";
}

async function callOpenAi(kind: SuggestionKind | "reflection", context: BridgeChatContext) {
  const { apiKey, baseUrl, model } = resolveAiConfig();
  if (!apiKey) {
    throw new AiDisabledError();
  }

  const locale = context.locale ?? "en";

  const response = await fetch(`${baseUrl}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions: getPromptTemplate(kind, locale),
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(context),
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`LLM request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return extractOutputText(payload);
}

export async function generateSuggestion(
  kind: SuggestionKind,
  context: BridgeChatContext,
): Promise<Suggestion> {
  const output = await callOpenAi(kind, context);
  const [textLine, explanationLine] = output
    .split("\n")
    .map((line: string) => line.replace(/^[*-]\s*/, "").trim())
    .filter(Boolean);

  if (textLine && explanationLine) {
    return {
      id: `${kind}-live`,
      kind,
      text: textLine,
      explanation: explanationLine,
      sourceTags: ["live AI", "explainable"],
    };
  }

  throw new AiUnavailableError("Suggestion output was incomplete.");
}

export async function generateReflection(context: BridgeChatContext) {
  const output = await callOpenAi("reflection", context);
  const reflection = output
    .split("\n")
    .map((line: string) => line.replace(/^[*-]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 4);

  if (reflection.length > 0) {
    return reflection;
  }

  throw new AiUnavailableError("Reflection output was empty.");
}
