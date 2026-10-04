import { SEED_EXAMPLES } from "@/lib/seed-examples";
import styles from "@/components/pipeline/ExamplePicker.module.css";

interface ExamplePickerProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ExamplePicker({ activeId, onSelect }: ExamplePickerProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Try an example</span>
      <div className={styles.pills}>
        {SEED_EXAMPLES.map((example) => (
          <button
            key={example.id}
            type="button"
            className={`${styles.pill} ${example.id === activeId ? styles.pillActive : ""}`}
            onClick={() => onSelect(example.id)}
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
