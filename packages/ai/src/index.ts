import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { streamText, type CoreMessage } from "ai";

export type SupportedModelProvider = "openai" | "anthropic" | "google";

export function getModel(provider: SupportedModelProvider, model: string) {
  switch (provider) {
    case "openai":
      return openai(model);
    case "anthropic":
      return anthropic(model);
    case "google":
      return google(model);
  }
}

export async function streamChat(args: {
  provider: SupportedModelProvider;
  model: string;
  messages: CoreMessage[];
}) {
  return streamText({
    model: getModel(args.provider, args.model),
    messages: args.messages
  });
}
