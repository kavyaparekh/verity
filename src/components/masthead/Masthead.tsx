import styles from "@/components/masthead/Masthead.module.css";

// Byline links are placeholders — issue #5 finalizes the real attribution
// footer copy and links per PRD §4.6.
export function Masthead() {
  return (
    <div className={styles.masthead}>
      <span className={styles.eyebrow}>Agentic governance demo</span>
      <h1 className={styles.headline}>Verity</h1>
      <p className={styles.description}>
        Brief in. On-brand page and governance scorecard out — a Planner, a Generator, and an
        independent Validator, each visible, each doing one job.
      </p>
      <div className={styles.byline}>
        <span>Built by Kavya Parekh</span>
        <a href="#">Site / GitHub →</a>
      </div>
    </div>
  );
}
