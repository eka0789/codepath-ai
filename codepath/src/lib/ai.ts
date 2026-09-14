import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

export type AIProvider = "openai" | "anthropic" | "google";

export function getAIProvider(provider?: AIProvider) {
  const selected = provider || detectProvider();

  switch (selected) {
    case "openai":
      return { provider: openai, model: "gpt-4o" };
    case "anthropic":
      return { provider: anthropic, model: "claude-sonnet-4-20250514" };
    case "google":
      return { provider: google, model: "gemini-2.0-flash" };
    default:
      return { provider: anthropic, model: "claude-sonnet-4-20250514" };
  }
}

function detectProvider(): AIProvider {
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GOOGLE_AI_API_KEY) return "google";
  return "anthropic";
}
