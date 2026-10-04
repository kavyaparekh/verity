import styles from "@/components/masthead/Masthead.module.css";

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
        <span>
          Built by Kavya Parekh, because she couldn&apos;t stop thinking about a Forward
          Deployed Engineer role.
        </span>
        <a href="https://github.com/kavyaparekh/verity" target="_blank" rel="noopener noreferrer">
          View the repo →
        </a>
      </div>
    </div>
  );
}
