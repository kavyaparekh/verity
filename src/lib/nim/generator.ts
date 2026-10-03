import { callNimForJson } from "@/lib/nim/structuredCall";
import { contentSchema, type Content, type Plan } from "@/lib/schemas";

const SYSTEM_PROMPT = `You are the Generator stage of a marketing content pipeline. Given a content plan and a brand voice description, write the actual landing-page section copy. Respond with ONLY a JSON object matching this shape, no prose, no markdown fences:
{"headline": string, "subhead": string, "body": string (1-2 short paragraphs), "cta": string, "imageAlt": string (descriptive alt text for a hero image placeholder that fits the content)}`;

export async function runGenerator(plan: Plan, brandVoice: string): Promise<Content> {
  const userPrompt = `Content plan: ${JSON.stringify(plan)}\nBrand voice: ${brandVoice}`;
  return callNimForJson(SYSTEM_PROMPT, userPrompt, contentSchema);
}
