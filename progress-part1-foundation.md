# Progress — Part 1: Foundation

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

Scaffolding and backend pipeline. Nothing user-facing yet — this part exists so Part 2 has a real app and a real API to wire into.

## Issues

- [x] [#1 — Scaffold Next.js app + Vercel/env setup](https://github.com/kavyaparekh/verity/issues/1)
- [ ] [#2 — Agent pipeline backend: Planner → Generator → Validator](https://github.com/kavyaparekh/verity/issues/2)

## Dependency order

```
#1 (scaffold) → #2 (pipeline backend)
```

#1 must land first — #2 needs the project structure and confirmed `NVIDIA_NIM_API_KEY` env var to build against.

## Notes

- Solo project. No PRs/merges — commit directly to `main`, push to `origin`.
- #2 is the thesis of the whole demo: the Validator call must be independent of the Generator call (separate system prompt, no shared context). If that boundary gets blurred for convenience, the governance-scorecard story collapses.
- **Model provider pivot:** switched from Anthropic Claude API (original PRD §7) to NVIDIA NIM's free-tier API, model `meta/llama-3.3-70b-instruct`, OpenAI-compatible endpoint. One model covers all three agent roles — independence comes from separate calls/system prompts, not separate models.

## #1 — done

- Next.js 16 (App Router, TypeScript, ESLint) scaffolded at repo root.
- `npm run build`, `npm run lint`, and a local `next dev` smoke test all pass.
- Vercel project `verity` created and linked (org `kavya-projects4`). GitHub auto-deploy integration couldn't be wired yet — Vercel account has no GitHub login connection, so deploys are manual via `vercel deploy` for now.
- First deploy live: https://verity-theta-pink.vercel.app
- **Still open:** `NVIDIA_NIM_API_KEY` not yet added to the Vercel project env — needed before #2 can make real API calls. Key is free-tier from NVIDIA NIM (build.nvidia.com); needs to be added via `vercel env add` (not pasted into chat/commits).
