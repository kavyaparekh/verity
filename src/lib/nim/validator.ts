import { z } from "zod";
import { callNimForJson } from "@/lib/nim/structuredCall";
import { checkAccessibility } from "@/lib/checks/accessibility";
import { checkBannedPhrases } from "@/lib/checks/bannedPhrases";
import { validatorSchema, type Content, type ValidatorResult } from "@/lib/schemas";

const voiceAndVerdictSchema = z.object({
  voiceCheck: z.object({
    pass: z.boolean(),
    reason: z.string().min(1),
  }),
  verdict: z.string().min(1),
});

const SYSTEM_PROMPT = `You are the independent Validator/Governance agent in a marketing content pipeline. You did not write the content you are reviewing — another agent did. Your job is to judge whether it matches the stated brand voice, and to write a short, honest, natural-language verdict that accounts for ALL findings given to you, including ones you did not personally check. Respond with ONLY a JSON object matching this shape, no prose, no markdown fences:
{"voiceCheck": {"pass": boolean, "reason": string}, "verdict": string}
The verdict should read like a real governance call: either "Ships as-is" with a one-line reason, or a specific note on what would block shipping (tone, a banned phrase, an accessibility gap). Be concrete, not generic.`;

export async function runValidator(content: Content, brandVoice: string): Promise<ValidatorResult> {
  const combinedText = [content.headline, content.subhead, content.body, content.cta].join(" ");
  const bannedPhrases = checkBannedPhrases(combinedText);
  const accessibility = checkAccessibility(content);

  const userPrompt = `Brand voice to check against: ${brandVoice}

Generated content:
${JSON.stringify(content)}

Deterministic findings already computed (incorporate these into your verdict, do not re-derive them):
- Banned phrase check: ${bannedPhrases.pass ? "pass" : `FAIL, hits: ${bannedPhrases.hits.join(", ")}`}
- Accessibility check: ${accessibility.pass ? "pass" : `FAIL, issues: ${accessibility.issues.join("; ")}`}`;

  const { voiceCheck, verdict } = await callNimForJson(SYSTEM_PROMPT, userPrompt, voiceAndVerdictSchema);

  return validatorSchema.parse({
    voiceCheck,
    bannedPhrases,
    accessibility,
    verdict,
  });
}
