# Progress — Part 2: Experience

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

The visual layer. This is where "looks incredible in under 10 seconds" either happens or doesn't.

## Issues

- [x] [#3 — Design system + step-tracker UI (dark-luxury direction)](https://github.com/kavyaparekh/verity/issues/3)
- [x] [#4 — Output rendering: page preview + governance scorecard](https://github.com/kavyaparekh/verity/issues/4)

## Dependency order

```
Part 1 (#1, #2) → #3 (shell + step tracker) → #4 (output + scorecard rendering)
```

#3 needs #2's real stage status to wire the step tracker to (no fake timers). #4 needs #3's shell to render into, and #2's structured validator schema to render from.

## Notes

- `frontend-design:frontend-design` skill is a **hard requirement** before any UI code in #3 — not optional, not a suggestion.
- #4's failure-state rendering must stay visible when a check fails — the PRD explicitly calls out that hiding failures to make the demo look cleaner defeats the point.

## #3 — done

- Design direction: **"notary ledger"** — a formal attestation aesthetic (fine hairlines, small-caps mono labels, a brass/gold wax-seal motif for the stepper) rather than generic SaaS dark mode. Chosen to fit "dark luxury, disciplined contrast, B2B marketing-ops-harness."
- Typography: Fraunces (variable, display serif) + IBM Plex Mono (labels/data) — deliberately avoided Inter/Space Grotesk/Playfair.
- Palette: reuses the exact hex values from `src/lib/design-tokens.ts` as the single source of truth (injected into `:root` via an inline `style` attribute on `<html>` in `layout.tsx`, not duplicated in CSS) — so the Validator's WCAG contrast check and the rendered page can never drift apart. Added derived tokens (`--surface`, `--border`, `--color-pass`, `--color-fail`) directly in `globals.css` since those aren't contrast-checked.
- Atmosphere: radial gold vignette + SVG fractal-noise grain overlay, both `position: fixed` so they never scroll with content.
- Step tracker (`src/components/pipeline/StepTracker.tsx`): 4 wax-seal stamps (Planning/Drafting/Governance Check/Done) with custom line-art SVG icons per stage (`StageIcon.tsx`), connected by a ledger line that fills gold as steps complete. States: pending (outline) → active (pulsing gold ring) → complete (solid gold fill). Collapses to a vertical ledger on mobile (≤640px).
- `src/hooks/usePipelineStream.ts` — reads the SSE response from `/api/generate` via `fetch` + manual `ReadableStream` parsing (EventSource doesn't support POST), updates stage/plan/content/validation state as each event arrives. Errors are tracked separately from `stage` so the tracker can show *which* step failed instead of losing position.
- `src/components/pipeline/ResultPreview.tsx` is intentionally a bare JSON dump, explicitly marked as a stand-in — #4 owns real output/scorecard design, no point building throwaway UI for it here.
- "Try an example" input affordance deferred to #5, where it ships together with the real seed-example data — avoids a button that does nothing in the meantime.
- Byline/footer attribution text and links are placeholders (`href="#"`) — #5 finalizes real copy/links per PRD §4.6.
- **Verified in-browser** (not just build/lint): ran the full pipeline live against real NIM calls at desktop width (1440px) and confirmed Planning → Drafting → Governance Check → Done each animate correctly off real backend events (not a timer), then re-verified at mobile width (390px) with no overflow or breakage. Caught and fixed one real bug this way: the "Done" stamp was stuck in the pulsing "active" ring state forever instead of settling into solid "complete" once the pipeline finished (no next stage to transition into) — fixed in `stepStatus()`.
- Also fixed, incidentally: a hydration warning in `layout.tsx` caused by injecting design tokens as a text-node `<style>` child (fragile against browser-extension DOM injection in `<head>`) — switched to an inline `style` attribute on `<html>`, which is a more robust pattern regardless of cause.

## #4 — done

- `PagePreview.tsx` — the generated content rendered as a warm "paper" card (foreground-colored background, dark text — a deliberate inversion from the app's own dark chrome) with a dashed-placeholder image box showing the alt text inline, headline/subhead/body/CTA in real typographic hierarchy. Reads like an actual landing-page fragment, not a text dump.
- `GovernanceScorecard.tsx` — stays in the dark "ledger" surface established in #3. Three rows (Brand Voice / Banned Phrases / Accessibility) each with a `PassFailChip` (green "pass" / rust "fail" / gray "reviewing") and the specific reason/hits/issues text, plus a verdict block styled like a stamped notary line (gold mono label + serif verdict sentence).
- Staged reveal: both cards only mount once `content` exists (i.e. once the Generator stage completes); the scorecard shows a "reviewing…" pending skeleton (gray chips, in-progress copy) while `stage === "governance"` and `validation` is still null, then fills in with real pass/fail once the Validator responds. Makes the Governance Check step feel alive instead of just a pulsing stamp with nothing happening below it.
- Removed `ResultPreview.tsx` (the #3 placeholder) now that real rendering exists.
- **Caught and fixed a real layout bug via in-browser testing**: results were originally nested inside the narrow right-column panel (shared with the brief form), which squeezed the page-preview headline into an unreadably narrow, many-line wrap. Fixed by having `PipelineRunner` return a Fragment so the results row renders as a sibling of the panel and spans the full page grid (`grid-column: 1 / -1`) instead of being trapped in the panel's column.
- **Verified the failure-rendering path specifically**, since the PRD treats "don't hide failures" as a hard requirement and live generation doesn't reliably fail on cue (confirmed in #2's notes). Temporarily monkey-patched `window.fetch` in the browser console to feed a synthetic SSE stream with a failing validation (3 banned phrases, missing alt text, voice-check fail) through the real rendering code — app source was never touched. Confirmed: rust "FAIL" chips, correct per-check reason text, and a "Needs a pass — ..." verdict all render clearly. Re-verified the pass case and the failure case both work correctly at mobile width (390px) too — results stack to a single column with no overflow.
