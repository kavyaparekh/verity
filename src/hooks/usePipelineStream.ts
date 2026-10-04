import { useCallback, useState } from "react";
import type { Content, Plan, StageReasoning, ValidatorResult } from "@/lib/schemas";

export type PipelineStage = "idle" | "planning" | "drafting" | "governance" | "done";

interface PipelineState {
  stage: PipelineStage;
  plan: Plan | null;
  content: Content | null;
  validation: ValidatorResult | null;
  reasoning: StageReasoning;
  failed: boolean;
  errorMessage: string | null;
}

interface StageEvent {
  stage: PipelineStage | "error";
  plan?: Plan;
  content?: Content;
  validation?: ValidatorResult;
  reasoning?: StageReasoning;
  message?: string;
}

const INITIAL_STATE: PipelineState = {
  stage: "idle",
  plan: null,
  content: null,
  validation: null,
  reasoning: {},
  failed: false,
  errorMessage: null,
};

export function usePipelineStream() {
  const [state, setState] = useState<PipelineState>(INITIAL_STATE);

  const run = useCallback(async (brief: string, brandVoice: string) => {
    setState({ ...INITIAL_STATE, stage: "planning" });

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brief, brandVoice }),
    });

    if (!response.ok || !response.body) {
      setState((prev) => ({
        ...prev,
        failed: true,
        errorMessage: `Request failed (${response.status})`,
      }));
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        const line = chunk.trim();
        if (!line.startsWith("data:")) continue;

        const event = JSON.parse(line.slice("data:".length).trim()) as StageEvent;

        if (event.stage === "error") {
          setState((prev) => ({ ...prev, failed: true, errorMessage: event.message ?? "Unknown error" }));
          continue;
        }

        const stage = event.stage;
        setState((prev) => ({
          ...prev,
          stage,
          plan: event.plan ?? prev.plan,
          content: event.content ?? prev.content,
          validation: event.validation ?? prev.validation,
          reasoning: { ...prev.reasoning, ...event.reasoning },
        }));
      }
    }
  }, []);

  return { ...state, run };
}
