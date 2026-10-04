import { generateRequestSchema } from "@/lib/schemas";
import { runPlanner } from "@/lib/nim/planner";
import { runGenerator } from "@/lib/nim/generator";
import { runValidator } from "@/lib/nim/validator";

export const runtime = "nodejs";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = generateRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.message }, { status: 400 });
  }

  const { brief, brandVoice } = parsed.data;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      try {
        send({ stage: "planning" });
        const { plan, reasoning: plannerReasoning } = await runPlanner(brief, brandVoice);

        send({ stage: "drafting", plan, reasoning: { planner: plannerReasoning } });
        const { content, reasoning: generatorReasoning } = await runGenerator(plan, brandVoice);

        send({
          stage: "governance",
          plan,
          content,
          reasoning: { planner: plannerReasoning, generator: generatorReasoning },
        });
        const { validation, reasoning: validatorReasoning } = await runValidator(content, brandVoice);

        send({
          stage: "done",
          plan,
          content,
          validation,
          reasoning: { planner: plannerReasoning, generator: generatorReasoning, validator: validatorReasoning },
        });
      } catch (error) {
        send({ stage: "error", message: getErrorMessage(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
