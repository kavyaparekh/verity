import { z } from "zod";

export const planSchema = z.object({
  headlineAngle: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(2).max(5),
  cta: z.string().min(1),
});

export type Plan = z.infer<typeof planSchema>;

export const contentSchema = z.object({
  headline: z.string().min(1),
  subhead: z.string().min(1),
  body: z.string().min(1),
  cta: z.string().min(1),
  imageAlt: z.string(),
});

export type Content = z.infer<typeof contentSchema>;

export const validatorSchema = z.object({
  voiceCheck: z.object({
    pass: z.boolean(),
    reason: z.string().min(1),
  }),
  bannedPhrases: z.object({
    pass: z.boolean(),
    hits: z.array(z.string()),
  }),
  accessibility: z.object({
    pass: z.boolean(),
    issues: z.array(z.string()),
  }),
  verdict: z.string().min(1),
});

export type ValidatorResult = z.infer<typeof validatorSchema>;

export const generateRequestSchema = z.object({
  brief: z.string().min(1).max(600),
  brandVoice: z.string().min(1).max(600),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;

export interface StageReasoning {
  planner?: string | null;
  generator?: string | null;
  validator?: string | null;
}
