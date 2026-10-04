import type { StageReasoning } from "@/lib/schemas";
import styles from "@/components/pipeline/ReasoningPanel.module.css";

interface ReasoningPanelProps {
  reasoning: StageReasoning;
}

const STAGES: { key: keyof StageReasoning; label: string }[] = [
  { key: "planner", label: "Planner" },
  { key: "generator", label: "Generator" },
  { key: "validator", label: "Validator" },
];

export function ReasoningPanel({ reasoning }: ReasoningPanelProps) {
  return (
    <div className={styles.panel}>
      {STAGES.map(({ key, label }) => {
        const text = reasoning[key];
        return (
          <div className={styles.stage} key={key}>
            <span className={styles.stageLabel}>{label}</span>
            {text ? (
              <p className={styles.stageText}>{text}</p>
            ) : (
              <span className={styles.stageEmpty}>— not yet run —</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
