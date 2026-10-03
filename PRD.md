# PRD: "Brief → Page + Governance Scorecard"
### A miniature Gradial harness, built to accompany Kavya Parekh's cold email for the Forward Deployed Engineer role

---

## 1. Why this exists

Kavya is sending a cold outreach email to Gradial about their Forward Deployed Engineer role. Instead of just saying "I'm passionate about this," the email will link to a small, live, working prototype that re-creates a sliver of Gradial's own product. The goal of this document is to specify that prototype precisely enough that a build agent can implement it end-to-end without further requirements-gathering.

**This is a demo artifact for a job application, not a product.** Optimize for: looks incredible in under 10 seconds, is obviously "agentic" (not a single prompt wrapper), and is clearly load-bearing proof that Kavya understood what Gradial actually builds.

## 2. Background — what Gradial actually does

(Researched from gradial.com, AdExchanger, GeekWire, CMSWire — Oct 2026)

- Gradial is a Seattle startup ($110M+ raised across Series A/B/C, Madrona/Insight/VMG-backed) building what they call an **"enterprise marketing harness."**
- Their AI agents automate: CMS authoring and page/email production from briefs, asset tagging, campaign assembly, **brand governance and tone enforcement**, **accessibility checks**, and **regression/QA validation** — before anything ships.
- They integrate across AEM, Contentful, Figma, Jira, Workfront, SFMC, Snowflake, and explicitly mention "other agents/MCPs" as an integration surface.
- Core architectural idea: a **knowledge graph** gives agents shared context across systems, and **governance is built into execution** — i.e., nothing an agent produces ships without passing brand/compliance/accessibility checks first.
- CEO quote (AdExchanger): Gradial assembles new creative "Mr. Potato Head" style from existing approved assets rather than generating everything from scratch, to stay on-brand and avoid an "AI-generated" look.

**The prototype should compress this into one flow:** brief in → agent drafts on-brand content → a second, independent agent grades that draft against brand/accessibility rules → both the draft and the grade are shown together, exactly like Gradial's "nothing ships without passing governance" pitch.

## 3. Why this is credible coming from Kavya (don't invent — these are real)

- Built **QueryMind**, a solo agentic pipeline (planner → schema retriever → generator → validator → executor) using the Claude API, exposing 5 tools via MCP, with a self-correction retry loop and its own evaluation harness before scaling usage. This prototype is structurally the same pattern: generator agent + validator agent, not a single prompt.
- Already runs a personal "brand voice lint" tool (`style/lint_email.py` in this repo) that rejects her own cold emails for banned phrases/tone violations before they go out — i.e., she already builds exactly this kind of pre-ship governance gate for herself.
- Shipped a production AWS Bedrock (Claude) multi-stage summarization pipeline and a production Gemini-based classification service — real experience operating LLM pipelines in production, not toy scripts.

The email copy will reference this prototype as something she built specifically because she couldn't stop thinking about the role — so the README/about text in the app should carry a similar one-line framing, written in Kavya's established voice (see `style/voice_guide.md` in the parent repo) — superlative but not corporate, no banned phrases, no em-dashes.

## 4. Core user flow

1. Visitor (a Gradial hiring manager, cold, no context, 10 seconds of patience) opens the link.
2. The page loads with a **pre-filled example already run** — a real marketing brief and its generated output and scorecard, visible immediately with zero interaction required. (Never make a recruiter type something before seeing the payoff.)
3. Visitor can also type/paste their own one- or two-line brief, optionally pick or edit a short "brand voice" snippet, and click Generate.
4. The app visibly steps through stages (not a single spinner): **Planning → Drafting → Governance Check → Done** — this visible staging is the whole point; it's what proves "agentic system," not "ChatGPT wrapper."
5. Output: a rendered landing-page/email section (real HTML/CSS, styled, not a text blob) **plus** a governance scorecard panel:
   - Brand voice compliance (pass/fail + which rule, if any, it tripped — reuse-style banned-phrase/tone checking, modeled on `lint_email.py`'s approach)
   - Accessibility (contrast ratio pass/fail, alt text present/missing, heading structure)
   - A short natural-language verdict from the validator agent ("Ships as-is" / "Needs a pass — tone drifts generic in paragraph 2")
6. A small persistent footer/header line identifies what this is: built by Kavya Parekh, link to her site/GitHub, one sentence of context. No fake Gradial branding, no claim of affiliation.

## 5. Functional requirements

### 5.1 Input
- Free-text "brief" field (1-3 sentences), e.g. "Promote our new 20%-off fall sale on running shoes, energetic but premium tone."
- Optional "brand voice" field, short text describing tone/do's-and-don'ts (pre-filled with a sensible default so it's never blank).
- A visible, one-click "Try an example" / the page defaults to one pre-run example on load (see 4.2).

### 5.2 Agent pipeline (must be real orchestration, not one call)
Minimum three distinct model calls / agent roles, each with a visible name and status in the UI:
1. **Planner** — turns the brief into a short structured content plan (headline angle, key points, CTA).
2. **Generator** — writes the actual landing-page section (headline, subhead, body, CTA) as structured content, from the plan.
3. **Validator/Governance agent** — independently reviews the generator's output against: (a) the brand voice rules, (b) a fixed banned-phrase/corporate-cliché list, (c) basic accessibility heuristics on the generated structure (alt text present on any image placeholder, heading hierarchy, sufficient color contrast on the rendered styling) — and returns a structured pass/fail + reasons.

The validator must be a separate call/pass from the generator — this is the whole thesis of the demo (governance is independent of authoring, mirroring Gradial's own pitch) — not the same model call self-grading in one shot.

### 5.3 Output rendering
- Generated content renders as an actual styled component (card/section), not raw text — this needs to look like a real landing-page fragment.
- Scorecard renders as a distinct panel: clear pass/fail chips per check, with the validator's short natural-language note.
- If validation fails any check, visibly show the failure state (don't hide failures to make the demo look cleaner — a visible "would be rejected, here's why" is more impressive than always-green).

### 5.4 Example/seed content
- Ship with 2-3 pre-baked example briefs (one should be allowed to fail a check on purpose, to prove the governance layer is real and not cosmetic) so the first impression doesn't depend on a recruiter typing anything.

## 6. Design requirements — THIS IS NOT OPTIONAL

**The build agent MUST invoke the `frontend-design:frontend-design` skill before writing any UI code.** This is a hard requirement from the user, not a suggestion.

- The visual bar is "looks incredible," not "looks clean." This is going in a cold email to a company whose entire pitch is execution quality — a generic Tailwind/shadcn-looking page undermines the message.
- Follow the ECC web design-quality rules already in effect for this environment (banned: generic card grids, stock centered-hero-with-gradient-blob, flat uniform-radius layouts, safe gray-on-white with one accent color). Pick a deliberate style direction up front (editorial, bento, Swiss/International, or a confident dark-luxury direction would all fit a B2B "marketing ops harness" subject well) and commit to it — don't default to generic SaaS-dashboard-with-sidebar.
- Must clearly show the agent pipeline stages as part of the visual design (e.g., a step tracker, not just a spinner) — this is functional requirement 5.2 made visible, and it's also a design opportunity (motion between stages, staged reveal of output).
- Both the generated "page preview" and the "governance scorecard" should look like distinct, intentional surfaces (not just two plain divs) — depth/layering between "this is marketing content" and "this is a QA/governance tool" should be visually legible.
- Responsive down to mobile (recruiter may open on phone from an email).
- No login, no walls, loads instantly.

## 7. Technical requirements

- **Framework:** Next.js (App Router), deployed to Vercel. Vercel CLI is already authenticated in this environment as `parekhkavya02-6672` — reuse that login, don't re-auth.
- **Model calls:** Anthropic Claude API (the user already has Claude Code / Anthropic access in this environment — confirm an `ANTHROPIC_API_KEY` is available or needs to be added to `.env`/Vercel project env vars before build; do not hardcode a key in source).
- **Architecture:** Server-side API route(s) orchestrate the 3-stage pipeline (planner → generator → validator) — never call the Anthropic API from client-side JS (key exposure). Stream or poll stage status to the frontend so the step-tracker UI (5.2/6) can show real progress, not a fake timer.
- **No database needed** — this is stateless per-request; pre-baked examples can be static JSON shipped with the app (or generated once at build time and cached) so they load instantly with zero latency/cost on page load.
- **Validator output must be structured** (JSON / tool-use schema: `{voiceCheck: {pass, reason}, banned_phrases: {pass, hits:[]}, accessibility: {pass, issues:[]}, verdict: string}`), not parsed from free text — makes the scorecard UI reliable.
- Keep it small: this should be buildable as a single Next.js app, not a monorepo. Target under a day of agent build time.

## 8. Non-goals / out of scope

- No real integration with AEM/Contentful/Jira/etc. — those are referenced in spirit only (it's a miniature demo, not a competitor).
- No user accounts, no persistence of user-submitted briefs, no analytics/tracking beyond basic Vercel defaults.
- No claim of Gradial affiliation or use of Gradial's branding/logo anywhere in the app.
- Not trying to be a general-purpose tool — scope is exactly: brief in, on-brand section + governance scorecard out.

## 9. Success criteria

- A stranger with zero context can open the link, understand within 10 seconds what it does and why it's relevant to Gradial, without reading any instructions.
- The agentic pipeline is visually obvious (3 distinct stages, not a spinner-then-answer).
- At least one shipped example visibly fails a governance check, proving the check is real.
- The page would not look out of place as a funded startup's actual product teaser — not a hackathon page.
- Deployed to a public Vercel URL with no login wall, loads in under ~2s.

## 10. Deliverables for this PRD's execution

1. Next.js app source in this repo at `verity/app/` (or sibling folder — build agent's call, keep it out of the email-content folders under `recipients/`).
2. Deployed public Vercel URL.
3. A one-line note back to this conversation/repo with the final URL, so it can be inserted into Kavya's Gradial cold email draft (the email itself is out of scope for this PRD — that gets drafted separately via the `cold-email` skill once the recipient's name/LinkedIn is known).

## 11. Open questions for the user before/at build time

- Confirm `ANTHROPIC_API_KEY` availability/source for the Vercel deployment's server-side env.
- Any preference on visual style direction (editorial vs. bento vs. dark-luxury), or leave it to the frontend-design skill's judgment?
- Project name / URL slug preference for the Vercel deployment?
