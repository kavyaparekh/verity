"use client";

import { usePipelineStream } from "@/hooks/usePipelineStream";
import { BriefForm } from "@/components/pipeline/BriefForm";
import { StepTracker } from "@/components/pipeline/StepTracker";
import { ResultPreview } from "@/components/pipeline/ResultPreview";
import styles from "@/components/pipeline/PipelineRunner.module.css";

export function PipelineRunner() {
  const { stage, plan, content, validation, failed, errorMessage, run } = usePipelineStream();

  return (
    <div className={styles.panel}>
      <BriefForm onSubmit={run} isRunning={stage !== "idle" && stage !== "done" && !failed} />
      <StepTracker stage={stage} failed={failed} errorMessage={errorMessage} />
      <ResultPreview plan={plan} content={content} validation={validation} />
    </div>
  );
}
