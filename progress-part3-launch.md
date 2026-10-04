# Progress — Part 3: Launch

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

Seed content, attribution, deploy, and final verification against the PRD's success criteria.

## Issues

- [x] [#5 — Seed examples, attribution footer, deploy, and QA against success criteria](https://github.com/kavyaparekh/verity/issues/5)

## Dependency order

```
Part 2 (#3, #4) → #5
```

#5 needs real output/scorecard rendering (#4) to seed pre-baked examples into.

## Notes

- One of the 2-3 seed examples must be hand-authored to fail a governance check on purpose. Static JSON, not a hopeful live model call — reliability over cleverness here.
- Final deploy target: public Vercel URL, no login wall, loads in under ~2s.
- Once #5 is done and deployed, report the final URL back so it can go into Kavya's Gradial cold email draft (email itself is out of scope per PRD §10.3).

## #5 — done

**Live URL: https://verity-theta-pink.vercel.app**

- `src/lib/seed-examples.ts` — three hand-authored examples, matching the real Zod schemas exactly so they render through the same `PagePreview`/`GovernanceScorecard` components as a live run, no special-casing in the UI:
  - **Fall Running Shoes** (default on load) — passes all three checks.
  - **Coffee Subscriber Loyalty** — passes all three checks, different domain for variety.
  - **Enterprise Analytics Platform** — deliberately fails all three checks (11 banned phrases including "unlock the power of"/"game-changing"/"revolutionary", voice-check fail, missing alt text). Written to fail convincingly, not arbitrarily — it's exactly the kind of generic enterprise-marketing copy the brand voice explicitly forbids.
- `ExamplePicker.tsx` — pill selector; switching examples is instant (no API call), repopulates the brief/brand-voice fields, and snaps the step tracker straight to its complete state.
- `PipelineRunner.tsx` restructured around an `activeExample` concept: example state and live-pipeline-stream state are mutually exclusive, with example state winning by default. Editing the form fields doesn't clear the currently-shown example output until Generate is actually submitted, so the page never flashes blank mid-edit. Submitting Generate clears the active example and hands off to the real `usePipelineStream` hook.
- Masthead byline finalized: real link to the project repo (`github.com/kavyaparekh/verity`), plus the PRD §3-requested one-line "why this exists" framing in Kavya's voice, no banned phrases, no em-dash.
- Production deploy via `vercel deploy --prod`. Confirmed via direct `curl`: 200 status, ~0.65s page load, example content present in the server-rendered HTML (no client-side flash of empty state), no login/auth wall.
- Confirmed live generation works end-to-end on the actual production deployment too, not just local dev — ran a real brief against `https://verity-theta-pink.vercel.app/api/generate` via curl and via the browser; completed in ~45s (reasoning-model latency, not a bug — initially looked "stuck" in the browser because I under-waited, but `vercel logs` + a direct curl confirmed the route completes correctly and returns a valid structured result).

### PRD §9 success criteria — verified

- [x] Understandable in <10s with zero instructions — eyebrow, headline, description, and byline framing all visible immediately on load.
- [x] 3 distinct pipeline stages visibly obvious — step tracker wired to real SSE events, verified in-browser both locally and in production, including mid-run screenshots at each stage.
- [x] At least one shipped example visibly fails a governance check — Enterprise Analytics Platform example, verified with real FAIL chips and a "Needs a pass" verdict.
- [x] Public Vercel URL, no login wall, loads in <~2s — 0.65s measured, 200 status, no auth.
- [x] Doesn't look like a hackathon page — committed "notary ledger" direction via the `frontend-design` skill (#3), not a generic template.

All 5 issues across all 3 parts are now closed. Project complete.
