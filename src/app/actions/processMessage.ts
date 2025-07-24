"use server";

import { appConfig } from "@/lib/config";
import { Chat } from "@/lib/types";

interface Options {
  inputValue: string;
  chatHistory: Chat[];
}

interface SuccessResponse {
  ok: true;
  content: string;
  // retrieval?: Record<string, unknown>;
  // full_response?: Record<string, unknown>;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

type ProcessMessageResponse = SuccessResponse | ErrorResponse;

export async function processMessage({
  inputValue,
  chatHistory,
}: Options): Promise<ProcessMessageResponse> {
  if (!appConfig.aiFunctionEndpoint) {
    throw Error("Invalid AI function endpoint.");
  }

  const response = await fetch(appConfig.aiFunctionEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputValue, chatHistory }),
  });

  const data = await response.json();

  return data;
}
