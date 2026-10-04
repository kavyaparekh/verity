"use client";

import { usePipelineStream } from "@/hooks/usePipelineStream";
import { BriefForm } from "@/components/pipeline/BriefForm";
import { StepTracker } from "@/components/pipeline/StepTracker";
import { PagePreview } from "@/components/pipeline/PagePreview";
import { GovernanceScorecard } from "@/components/pipeline/GovernanceScorecard";
import styles from "@/components/pipeline/PipelineRunner.module.css";

export function PipelineRunner() {
  const { stage, content, validation, failed, errorMessage, run } = usePipelineStream();

  return (
    <>
      <div className={styles.panel}>
        <BriefForm onSubmit={run} isRunning={stage !== "idle" && stage !== "done" && !failed} />
        <StepTracker stage={stage} failed={failed} errorMessage={errorMessage} />
      </div>
      {content && (
        <div className={styles.resultsRow}>
          <PagePreview content={content} />
          <GovernanceScorecard validation={validation} pending={stage === "governance" && !validation} />
        </div>
      )}
    </>
  );
}
