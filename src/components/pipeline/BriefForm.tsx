"use client";

import type { FormEvent } from "react";
import styles from "@/components/pipeline/BriefForm.module.css";

interface BriefFormProps {
  brief: string;
  brandVoice: string;
  onBriefChange: (value: string) => void;
  onBrandVoiceChange: (value: string) => void;
  onSubmit: () => void;
  isRunning: boolean;
}

export function BriefForm({
  brief,
  brandVoice,
  onBriefChange,
  onBrandVoiceChange,
  onSubmit,
  isRunning,
}: BriefFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!brief.trim() || isRunning) return;
    onSubmit();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="brief">
          Brief
        </label>
        <textarea
          id="brief"
          className={styles.textarea}
          placeholder="Promote our new 20%-off fall sale on running shoes, energetic but premium tone."
          value={brief}
          onChange={(event) => onBriefChange(event.target.value)}
          rows={3}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="brandVoice">
          Brand voice
        </label>
        <textarea
          id="brandVoice"
          className={styles.textarea}
          value={brandVoice}
          onChange={(event) => onBrandVoiceChange(event.target.value)}
          rows={2}
        />
      </div>
      <button className={styles.submit} type="submit" disabled={isRunning}>
        {isRunning ? "Running…" : "Generate"}
      </button>
    </form>
  );
}
