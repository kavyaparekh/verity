# Progress — Part 3: Launch

Repo: [kavyaparekh/verity](https://github.com/kavyaparekh/verity)
Source PRD: [PRD.md](./PRD.md)

Seed content, attribution, deploy, and final verification against the PRD's success criteria.

## Issues

- [ ] [#5 — Seed examples, attribution footer, deploy, and QA against success criteria](https://github.com/kavyaparekh/verity/issues/5)

## Dependency order

```
Part 2 (#3, #4) → #5
```

#5 needs real output/scorecard rendering (#4) to seed pre-baked examples into.

## Notes

- One of the 2-3 seed examples must be hand-authored to fail a governance check on purpose. Static JSON, not a hopeful live model call — reliability over cleverness here.
- Final deploy target: public Vercel URL, no login wall, loads in under ~2s.
- Once #5 is done and deployed, report the final URL back so it can go into Kavya's Gradial cold email draft (email itself is out of scope per PRD §10.3).
