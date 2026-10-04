import type { z } from "zod";
import { callNim, type NimMessage } from "@/lib/nim/client";

const MAX_ATTEMPTS = 2;

export interface StructuredResult<T> {
  data: T;
  reasoning: string | null;
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  const jsonSlice =
    firstBrace !== -1 && lastBrace !== -1
      ? candidate.slice(firstBrace, lastBrace + 1)
      : candidate;

  return JSON.parse(jsonSlice);
}

export async function callNimForJson<T>(
  systemPrompt: string,
  userPrompt: string,
  schema: z.ZodType<T>,
): Promise<StructuredResult<T>> {
  const messages: NimMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  let lastError = "";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const { content: raw, reasoning } = await callNim(messages);

    try {
      const parsed = extractJson(raw);
      const result = schema.safeParse(parsed);
      if (result.success) {
        return { data: result.data, reasoning };
      }
      lastError = result.error.message;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    messages.push({ role: "assistant", content: raw });
    messages.push({
      role: "user",
      content: `That response was not valid JSON matching the required schema (${lastError}). Reply again with ONLY the corrected JSON object, no prose, no markdown fences.`,
    });
  }

  throw new Error(`NIM did not return valid structured output after ${MAX_ATTEMPTS} attempts: ${lastError}`);
}
