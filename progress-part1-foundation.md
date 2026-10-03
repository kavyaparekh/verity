# Progress — Part 1: Foundation

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

Scaffolding and backend pipeline. Nothing user-facing yet — this part exists so Part 2 has a real app and a real API to wire into.

## Issues

- [ ] [#1 — Scaffold Next.js app + Vercel/env setup](https://github.com/kavyaparekh/verity/issues/1)
- [ ] [#2 — Agent pipeline backend: Planner → Generator → Validator](https://github.com/kavyaparekh/verity/issues/2)

## Dependency order

```
#1 (scaffold) → #2 (pipeline backend)
```

#1 must land first — #2 needs the project structure and confirmed `ANTHROPIC_API_KEY` env var to build against.

## Notes

- Solo project. No PRs/merges — commit directly to `main`, push to `origin`.
- #2 is the thesis of the whole demo: the Validator call must be independent of the Generator call (separate system prompt, no shared context). If that boundary gets blurred for convenience, the governance-scorecard story collapses.
