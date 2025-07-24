"use server";

import { appConfig } from "@/lib/config";

interface Options {
  inputValue: string;
}

interface SuccessResponse {
  ok: true;
  content: string;
  retrieval?: Record<string, unknown>;
  full_response?: Record<string, unknown>;
}

interface ErrorResponse {
  ok: false;
  error: string;
  error_type: string;
}

type ProcessMessageResponse = SuccessResponse | ErrorResponse;

export async function processMessage({
  inputValue,
}: Options): Promise<ProcessMessageResponse> {
  if (!appConfig.aiFunctionEndpoint) {
    throw Error("Invalid AI function endpoint.");
  }

  const uri = appConfig.aiFunctionEndpoint + "?input_value=" + inputValue;

  const response = await fetch(encodeURI(uri), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_input: inputValue }),
  });

  console.log(response.body);

  const data = await response.json();

  return data;
}
