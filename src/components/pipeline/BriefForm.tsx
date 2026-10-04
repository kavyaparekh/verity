"use client";

import { useState, type FormEvent } from "react";
import styles from "@/components/pipeline/BriefForm.module.css";

const DEFAULT_BRAND_VOICE =
  "Confident and warm, never shouty. Specific over generic. No corporate jargon.";

interface BriefFormProps {
  onSubmit: (brief: string, brandVoice: string) => void;
  isRunning: boolean;
}

export function BriefForm({ onSubmit, isRunning }: BriefFormProps) {
  const [brief, setBrief] = useState("");
  const [brandVoice, setBrandVoice] = useState(DEFAULT_BRAND_VOICE);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!brief.trim() || isRunning) return;
    onSubmit(brief.trim(), brandVoice.trim());
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
          onChange={(event) => setBrief(event.target.value)}
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
          onChange={(event) => setBrandVoice(event.target.value)}
          rows={2}
        />
      </div>
      <button className={styles.submit} type="submit" disabled={isRunning}>
        {isRunning ? "Running…" : "Generate"}
      </button>
    </form>
  );
}
