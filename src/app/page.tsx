import { Masthead } from "@/components/masthead/Masthead";
import { PipelineRunner } from "@/components/pipeline/PipelineRunner";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <Masthead />
        <PipelineRunner />
      </div>
    </main>
  );
}
