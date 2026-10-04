import type { ValidatorResult } from "@/lib/schemas";
import { PassFailChip } from "@/components/pipeline/PassFailChip";
import styles from "@/components/pipeline/GovernanceScorecard.module.css";

interface GovernanceScorecardProps {
  validation: ValidatorResult | null;
  pending: boolean;
}

export function GovernanceScorecard({ validation, pending }: GovernanceScorecardProps) {
  const voiceDetail = validation
    ? validation.voiceCheck.reason
    : pending
      ? "Validator is reviewing tone against the brand voice…"
      : "Awaiting draft.";

  const bannedDetail = validation
    ? validation.bannedPhrases.pass
      ? "No banned phrases found."
      : `Flagged: ${validation.bannedPhrases.hits.join(", ")}`
    : pending
      ? "Scanning for banned phrases…"
      : "Awaiting draft.";

  const accessibilityDetail = validation
    ? validation.accessibility.pass
      ? "Alt text, heading hierarchy, and contrast all pass."
      : validation.accessibility.issues.join(" ")
    : pending
      ? "Checking alt text, heading hierarchy, and contrast…"
      : "Awaiting draft.";

  return (
    <div className={styles.wrap}>
      <span className={styles.caption}>Governance scorecard</span>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.rowMain}>
            <span className={styles.rowLabel}>Brand Voice</span>
            <span className={styles.rowDetail}>{voiceDetail}</span>
          </div>
          <PassFailChip status={validation ? (validation.voiceCheck.pass ? "pass" : "fail") : "pending"} />
        </div>
        <div className={styles.row}>
          <div className={styles.rowMain}>
            <span className={styles.rowLabel}>Banned Phrases</span>
            <span className={styles.rowDetail}>{bannedDetail}</span>
          </div>
          <PassFailChip status={validation ? (validation.bannedPhrases.pass ? "pass" : "fail") : "pending"} />
        </div>
        <div className={styles.row}>
          <div className={styles.rowMain}>
            <span className={styles.rowLabel}>Accessibility</span>
            <span className={styles.rowDetail}>{accessibilityDetail}</span>
          </div>
          <PassFailChip status={validation ? (validation.accessibility.pass ? "pass" : "fail") : "pending"} />
        </div>
        {validation && (
          <div className={styles.verdict}>
            <span className={styles.verdictLabel}>Verdict</span>
            <p className={styles.verdictText}>{validation.verdict}</p>
          </div>
        )}
      </div>
    </div>
  );
}
