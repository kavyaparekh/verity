import styles from "@/components/pipeline/ReasoningToggle.module.css";

interface ReasoningToggleProps {
  on: boolean;
  onToggle: () => void;
}

export function ReasoningToggle({ on, onToggle }: ReasoningToggleProps) {
  return (
    <button
      type="button"
      className={styles.wrap}
      data-on={on}
      onClick={onToggle}
      aria-pressed={on}
    >
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      <span className={styles.label}>Reasoning</span>
    </button>
  );
}
