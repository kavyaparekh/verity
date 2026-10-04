import type { Content, Plan, ValidatorResult } from "@/lib/schemas";
import styles from "@/components/pipeline/ResultPreview.module.css";

// Placeholder rendering only — issue #4 replaces this with the designed
// page preview + governance scorecard panels.
interface ResultPreviewProps {
  plan: Plan | null;
  content: Content | null;
  validation: ValidatorResult | null;
}

export function ResultPreview({ plan, content, validation }: ResultPreviewProps) {
  if (!plan && !content && !validation) return null;

  return (
    <div className={styles.preview}>
      <span className={styles.caption}>Raw stage data — #4 renders this properly</span>
      {JSON.stringify({ plan, content, validation }, null, 2)}
    </div>
  );
}
