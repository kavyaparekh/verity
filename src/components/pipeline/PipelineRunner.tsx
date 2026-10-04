"use client";

import { useState } from "react";
import { usePipelineStream } from "@/hooks/usePipelineStream";
import { SEED_EXAMPLES } from "@/lib/seed-examples";
import { BriefForm } from "@/components/pipeline/BriefForm";
import { ExamplePicker } from "@/components/pipeline/ExamplePicker";
import { StepTracker } from "@/components/pipeline/StepTracker";
import { PagePreview } from "@/components/pipeline/PagePreview";
import { GovernanceScorecard } from "@/components/pipeline/GovernanceScorecard";
import styles from "@/components/pipeline/PipelineRunner.module.css";

const DEFAULT_EXAMPLE = SEED_EXAMPLES[0];

export function PipelineRunner() {
  const live = usePipelineStream();
  const [brief, setBrief] = useState(DEFAULT_EXAMPLE.brief);
  const [brandVoice, setBrandVoice] = useState(DEFAULT_EXAMPLE.brandVoice);
  const [activeExampleId, setActiveExampleId] = useState<string | null>(DEFAULT_EXAMPLE.id);

  const activeExample = SEED_EXAMPLES.find((example) => example.id === activeExampleId) ?? null;

  function handleSelectExample(id: string) {
    const example = SEED_EXAMPLES.find((candidate) => candidate.id === id);
    if (!example) return;
    setActiveExampleId(id);
    setBrief(example.brief);
    setBrandVoice(example.brandVoice);
  }

  function handleSubmit() {
    setActiveExampleId(null);
    live.run(brief, brandVoice);
  }

  const stage = activeExample ? "done" : live.stage;
  const content = activeExample ? activeExample.content : live.content;
  const validation = activeExample ? activeExample.validation : live.validation;
  const failed = activeExample ? false : live.failed;
  const errorMessage = activeExample ? null : live.errorMessage;
  const isRunning = !activeExample && stage !== "idle" && stage !== "done" && !failed;

  return (
    <>
      <div className={styles.panel}>
        <ExamplePicker activeId={activeExampleId} onSelect={handleSelectExample} />
        <BriefForm
          brief={brief}
          brandVoice={brandVoice}
          onBriefChange={setBrief}
          onBrandVoiceChange={setBrandVoice}
          onSubmit={handleSubmit}
          isRunning={isRunning}
        />
        <StepTracker stage={stage} failed={failed} errorMessage={errorMessage} />
      </div>
      {content && (
        <div className={styles.resultsRow}>
          <PagePreview content={content} />
          <GovernanceScorecard validation={validation} pending={stage === "governance" && !validation} />
        </div>
      )}
    </>
  );
}
