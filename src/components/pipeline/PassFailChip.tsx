import styles from "@/components/pipeline/PassFailChip.module.css";

interface PassFailChipProps {
  status: "pass" | "fail" | "pending";
}

const LABEL: Record<PassFailChipProps["status"], string> = {
  pass: "Pass",
  fail: "Fail",
  pending: "Reviewing",
};

export function PassFailChip({ status }: PassFailChipProps) {
  return (
    <span className={`${styles.chip} ${styles[status]}`}>
      <span className={styles.dot} />
      {LABEL[status]}
    </span>
  );
}
