# Progress — Part 2: Experience

Repo: [kavyaparekh/gradial-prototype](https://github.com/kavyaparekh/gradial-prototype)
Source PRD: [PRD.md](./PRD.md)

The visual layer. This is where "looks incredible in under 10 seconds" either happens or doesn't.

## Issues

- [ ] [#3 — Design system + step-tracker UI (dark-luxury direction)](https://github.com/kavyaparekh/gradial-prototype/issues/3)
- [ ] [#4 — Output rendering: page preview + governance scorecard](https://github.com/kavyaparekh/gradial-prototype/issues/4)

## Dependency order

```
Part 1 (#1, #2) → #3 (shell + step tracker) → #4 (output + scorecard rendering)
```

#3 needs #2's real stage status to wire the step tracker to (no fake timers). #4 needs #3's shell to render into, and #2's structured validator schema to render from.

## Notes

- `frontend-design:frontend-design` skill is a **hard requirement** before any UI code in #3 — not optional, not a suggestion.
- #4's failure-state rendering must stay visible when a check fails — the PRD explicitly calls out that hiding failures to make the demo look cleaner defeats the point.
