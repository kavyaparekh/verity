import type { PipelineStage } from "@/hooks/usePipelineStream";
import { StageIcon } from "@/components/pipeline/StageIcon";
import styles from "@/components/pipeline/StepTracker.module.css";

interface Step {
  key: Exclude<PipelineStage, "idle">;
  label: string;
}

const STEPS: Step[] = [
  { key: "planning", label: "Planning" },
  { key: "drafting", label: "Drafting" },
  { key: "governance", label: "Governance Check" },
  { key: "done", label: "Done" },
];

interface StepTrackerProps {
  stage: PipelineStage;
  failed: boolean;
  errorMessage: string | null;
}

function stepStatus(stepIndex: number, currentIndex: number, failed: boolean, pipelineDone: boolean) {
  if (pipelineDone) return stepIndex <= currentIndex ? "complete" : "pending";
  if (stepIndex < currentIndex) return "complete";
  if (stepIndex === currentIndex) return failed ? "failed" : "active";
  return "pending";
}

export function StepTracker({ stage, failed, errorMessage }: StepTrackerProps) {
  const currentIndex = stage === "idle" ? -1 : STEPS.findIndex((step) => step.key === stage);
  const pipelineDone = stage === "done" && !failed;

  return (
    <div>
      <ol className={styles.tracker}>
        {STEPS.map((step, index) => {
          const status = currentIndex === -1 ? "pending" : stepStatus(index, currentIndex, failed, pipelineDone);
          const isLastComplete = index < currentIndex || (pipelineDone && index <= currentIndex);

          return (
            <li key={step.key} className={styles.step}>
              <div
                className={`${styles.connector} ${isLastComplete ? styles.connectorComplete : ""}`}
              />
              <div
                className={`${styles.stamp} ${
                  status === "active"
                    ? styles.stampActive
                    : status === "complete"
                      ? styles.stampComplete
                      : status === "failed"
                        ? styles.stampFailed
                        : ""
                }`}
              >
                <StageIcon name={step.key} />
              </div>
              <span
                className={`${styles.label} ${
                  status === "active" ? styles.labelActive : status === "complete" ? styles.labelComplete : ""
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
      {failed && errorMessage && <p className={styles.statusLine}>{errorMessage}</p>}
    </div>
  );
}
