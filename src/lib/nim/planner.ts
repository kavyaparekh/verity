import { callNimForJson } from "@/lib/nim/structuredCall";
import { planSchema, type Plan } from "@/lib/schemas";

const SYSTEM_PROMPT = `You are the Planner stage of a marketing content pipeline. Given a short brief and a brand voice description, produce a structured content plan. Respond with ONLY a JSON object matching this shape, no prose, no markdown fences:
{"headlineAngle": string, "keyPoints": string[] (2 to 5 items), "cta": string}`;

export async function runPlanner(brief: string, brandVoice: string): Promise<Plan> {
  const userPrompt = `Brief: ${brief}\nBrand voice: ${brandVoice}`;
  return callNimForJson(SYSTEM_PROMPT, userPrompt, planSchema);
}
