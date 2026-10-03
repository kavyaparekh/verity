# Progress — Part 1: Foundation

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

Scaffolding and backend pipeline. Nothing user-facing yet — this part exists so Part 2 has a real app and a real API to wire into.

## Issues

- [x] [#1 — Scaffold Next.js app + Vercel/env setup](https://github.com/kavyaparekh/verity/issues/1)
- [x] [#2 — Agent pipeline backend: Planner → Generator → Validator](https://github.com/kavyaparekh/verity/issues/2)

## Dependency order

```
#1 (scaffold) → #2 (pipeline backend)
```

#1 must land first — #2 needs the project structure and confirmed `NVIDIA_NIM_API_KEY` env var to build against.

## Notes

- Solo project. No PRs/merges — commit directly to `main`, push to `origin`.
- #2 is the thesis of the whole demo: the Validator call must be independent of the Generator call (separate system prompt, no shared context). If that boundary gets blurred for convenience, the governance-scorecard story collapses.
- **Model provider pivot:** switched from Anthropic Claude API (original PRD §7) to NVIDIA NIM's free-tier API, model `nvidia/nemotron-3-ultra-550b-a55b`, OpenAI-compatible endpoint. One model covers all three agent roles — independence comes from separate calls/system prompts, not separate models.

## #1 — done

- Next.js 16 (App Router, TypeScript, ESLint) scaffolded at repo root.
- `npm run build`, `npm run lint`, and a local `next dev` smoke test all pass.
- Vercel project `verity` created and linked (org `kavya-projects4`). GitHub auto-deploy integration couldn't be wired yet — Vercel account has no GitHub login connection, so deploys are manual via `vercel deploy` for now.
- First deploy live: https://verity-theta-pink.vercel.app
- `NVIDIA_NIM_API_KEY` added to `.env.local` and to all three Vercel environments (production/preview/development).

## #2 — done

- Model: `nvidia/nemotron-3-ultra-550b-a55b` on NVIDIA NIM (a reasoning model — chain-of-thought lands in a separate `reasoning_content` field, final answer in `content`; parsing only reads `content`, so no special handling needed).
- `src/lib/nim/client.ts` — low-level NIM fetch wrapper, throws `NimApiError` on missing key or non-OK response.
- `src/lib/nim/structuredCall.ts` — shared JSON-extraction + Zod-validated retry helper (2 attempts, corrective follow-up message on parse/validation failure) used by all three stages. Mirrors the self-correction retry loop from Kavya's QueryMind pattern referenced in the PRD.
- `src/lib/nim/{planner,generator,validator}.ts` — the three stages. Validator is a hybrid: deterministic banned-phrase matching (`src/lib/checks/bannedPhrases.ts`) and deterministic accessibility/contrast checks (`src/lib/checks/accessibility.ts`, WCAG contrast math against `src/lib/design-tokens.ts`) feed into a separate NIM call that only judges brand-voice fit and writes the natural-language verdict — deterministic checks for reliability, LLM for judgment, both merged into one `validatorSchema`-conformant result.
- `src/app/api/generate/route.ts` — POST route, SSE-streams `{stage: "planning"|"drafting"|"governance"|"done"|"error", ...}` events as each stage completes. No shared context between the Generator call and the Validator call — separate messages arrays, separate system prompts.
- Verified end-to-end via curl against the dev server: a clean brief produced a full plan → content → validation chain with `verdict: "Ships as-is..."`. A second brief deliberately loaded with banned phrases ("cutting-edge", "game-changing", "revolutionize", etc.) did **not** trigger a failure — the model declined to echo the jargon on its own, honoring the brand-voice instruction to avoid it. Confirmed the deterministic checks themselves work by calling them directly with forced-bad input (both correctly returned `pass: false` with accurate `hits`/`issues`).
- **Implication for #5:** live generation won't reliably reproduce a specific governance failure — confirms the PRD's existing call to hand-author the one failing seed example as static JSON rather than hoping a live call fails on cue.
- Known limitation, not fixed now: a 550B-class reasoning model doing 3 sequential calls has real latency (each call reasons internally before answering). Worth keeping in mind for #3's step-tracker pacing — stages may sit for several seconds each, which is actually good for the "visibly staged, not instant" effect the PRD wants, but shouldn't be mistaken for a hang.
