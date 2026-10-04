const NIM_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const NIM_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

export interface NimMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface NimResponse {
  content: string;
  reasoning: string | null;
}

export class NimApiError extends Error {}

export async function callNim(
  messages: NimMessage[],
  options: { temperature?: number; maxTokens?: number } = {},
): Promise<NimResponse> {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    throw new NimApiError("NVIDIA_NIM_API_KEY is not configured");
  }

  const response = await fetch(NIM_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: NIM_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1024,
      stream: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new NimApiError(`NIM request failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string; reasoning_content?: string } }[];
  };

  const message = data.choices?.[0]?.message;
  if (!message?.content) {
    throw new NimApiError("NIM response had no message content");
  }

  return { content: message.content, reasoning: message.reasoning_content ?? null };
}
