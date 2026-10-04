# Progress — Part 2: Experience

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

The visual layer. This is where "looks incredible in under 10 seconds" either happens or doesn't.

## Issues

- [x] [#3 — Design system + step-tracker UI (dark-luxury direction)](https://github.com/kavyaparekh/verity/issues/3)
- [ ] [#4 — Output rendering: page preview + governance scorecard](https://github.com/kavyaparekh/verity/issues/4)

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
