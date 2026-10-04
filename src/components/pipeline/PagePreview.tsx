import type { Content } from "@/lib/schemas";
import styles from "@/components/pipeline/PagePreview.module.css";

interface PagePreviewProps {
  content: Content;
}

export function PagePreview({ content }: PagePreviewProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.caption}>Page preview</span>
      <div className={styles.paper}>
        <div className={styles.imageBox}>
          <span className={styles.imageAlt}>alt: {content.imageAlt || "(missing)"}</span>
        </div>
        <h2 className={styles.headline}>{content.headline}</h2>
        <p className={styles.subhead}>{content.subhead}</p>
        <p className={styles.body}>{content.body}</p>
        <span className={styles.cta}>{content.cta}</span>
      </div>
    </div>
  );
}
