import type { Content, Plan, StageReasoning, ValidatorResult } from "@/lib/schemas";

export interface SeedExample {
  id: string;
  label: string;
  brief: string;
  brandVoice: string;
  plan: Plan;
  content: Content;
  validation: ValidatorResult;
  reasoning: StageReasoning;
}

// Hand-authored, not replayed from a live run. One (enterprise-analytics)
// is deliberately written to fail governance — see progress-part1-foundation.md
// for why live generation doesn't reliably fail on cue.
export const SEED_EXAMPLES: SeedExample[] = [
  {
    id: "fall-running-shoes",
    label: "Fall Running Shoes",
    brief: "Promote our new 20%-off fall sale on running shoes, energetic but premium tone.",
    brandVoice: "Confident and warm, never shouty. Specific over generic. No corporate jargon.",
    plan: {
      headlineAngle: "Step into autumn with confidence — 20% off our best-selling running shoes",
      keyPoints: [
        "Lightweight, breathable trainers built for cooler fall miles",
        "Responsive cushioning across the whole lineup",
        "20% discount applied automatically at checkout",
        "Free shipping over $75 and 30-day returns",
      ],
      cta: "Shop the fall collection now",
    },
    content: {
      headline: "Step into autumn with confidence — 20% off our best-selling running shoes",
      subhead: "Lightweight trainers and cushioned long-run models, premium materials, automatic discount, free shipping over $75.",
      body: "Our curated lineup pairs feather-light trainers with plush, long-distance models, each crafted from breathable engineered mesh, responsive foam, and durable outsoles that keep you moving mile after mile. The 20% discount applies automatically at checkout, no codes needed. Orders over $75 ship free, and you have 30 days to return anything that doesn't feel right.",
      cta: "Shop the fall sale now and hit your next personal best",
      imageAlt: "A pair of autumn-toned performance running shoes on a leaf-covered trail, highlighting engineered mesh upper and responsive foam midsole.",
    },
    validation: {
      voiceCheck: {
        pass: true,
        reason: "Copy is confident and warm without being shouty; uses specific product details (20% off, engineered mesh, responsive foam, automatic discount, free shipping over $75, 30-day returns) instead of generic hype.",
      },
      bannedPhrases: { pass: true, hits: [] },
      accessibility: { pass: true, issues: [] },
      verdict: "Ships as-is — confident, warm tone with specific product details and no jargon.",
    },
    reasoning: {
      planner: "The brief asks for energetic but premium, not loud. I'll anchor the headline on a season cue (autumn) paired with the discount, then back it with concrete product facts — materials, fit, shipping terms — rather than adjectives, since the brand voice explicitly wants specific over generic.",
      generator: "Keeping sentences short and concrete. Leading with the discount and season in the headline covers the offer immediately. The body needs to earn 'premium' through material specifics (engineered mesh, responsive foam) instead of claims like 'amazing' or 'best ever'. Checking the CTA reads energetic without an exclamation point, since the voice says confident, not shouty.",
      validator: "Scanning the copy against the brand voice line by line: no hype adjectives present, every claim ties to a specific feature or policy (discount %, shipping threshold, return window). Deterministic checks already came back clean, so my job is just judging tone fit — this reads premium through specificity, not through superlatives, which is exactly what was asked for.",
    },
  },
  {
    id: "coffee-loyalty",
    label: "Coffee Subscriber Loyalty",
    brief: "Announce our new loyalty program for coffee subscribers, warm and a little playful.",
    brandVoice: "Confident and warm, never shouty. Specific over generic. No corporate jargon.",
    plan: {
      headlineAngle: "A loyalty program that remembers how you take your coffee",
      keyPoints: [
        "Earn a free bag every five deliveries",
        "Early access to limited seasonal roasts",
        "Member-only brew guides written per grinder",
        "No tiers, no fine print",
      ],
      cta: "Join free with your next order",
    },
    content: {
      headline: "A loyalty program that actually tastes like one",
      subhead: "Earn a free bag every five deliveries, starting with your very first cup.",
      body: "Every subscription order counts toward your next free bag, automatically, no punch card to lose. Members get early access to limited seasonal roasts before they sell out, plus brew guides written for your specific grinder. No tiers, no points to decode, just coffee that keeps showing up.",
      cta: "Join free with your next order",
      imageAlt: "A warm kitchen counter with a bag of coffee, a pour-over dripper, and a steaming mug.",
    },
    validation: {
      voiceCheck: {
        pass: true,
        reason: "Warm and a little playful without overselling; grounded in specific mechanics (every five deliveries, no punch card, no tiers) rather than generic loyalty-program language.",
      },
      bannedPhrases: { pass: true, hits: [] },
      accessibility: { pass: true, issues: [] },
      verdict: "Ships as-is — warm, specific, and easy to act on.",
    },
    reasoning: {
      planner: "Playful but warm, not silly — the mechanic itself (every five deliveries) is inherently fun, so I don't need to force jokes into the copy. Leading with the loyalty mechanic rather than the word 'loyalty program', since that phrase itself tends to read corporate.",
      generator: "Avoiding the phrase 'loyalty program' entirely in the headline — it's exactly the kind of label the brand voice would flag as generic. Describing what members actually get (free bag cadence, early access, grinder-specific guides) does more work than naming the program type. Kept the body to mechanics only, no filler sentence before getting to the point.",
      validator: "Checking for playfulness without looking unserious: 'actually tastes like one' is the only departure from strictly literal copy, and it's grounded in the product category, not a forced pun. Mechanics are specific throughout. No banned phrases, no jargon — this reads like a real subscription update, not a template.",
    },
  },
  {
    id: "enterprise-analytics",
    label: "Enterprise Analytics Platform",
    brief: "Announce our new AI-powered analytics platform for enterprise teams, make it sound impressive.",
    brandVoice: "Confident and warm, never shouty. Specific over generic. No corporate jargon, ever.",
    plan: {
      headlineAngle: "The analytics platform built for how enterprise teams actually work",
      keyPoints: [
        "Real-time dashboards across every data source",
        "AI-powered anomaly detection",
        "Role-based access for enterprise security teams",
        "Deploys in under a week",
      ],
      cta: "Request a demo",
    },
    content: {
      headline: "Unlock the power of next-generation, AI-driven analytics",
      subhead: "A game-changing, cutting-edge platform that will revolutionize how your enterprise leverages data",
      body: "Our revolutionary platform delivers best-in-class, state-of-the-art analytics that will take your business to the next level. Seamlessly synergize your data sources and unlock unprecedented insights with our cutting-edge AI engine, built for enterprise teams who refuse to settle for anything less than world-class performance.",
      cta: "Request a demo",
      imageAlt: "",
    },
    validation: {
      voiceCheck: {
        pass: false,
        reason: "Tone is loud and generic exactly where the brand voice demands confidence and specificity — reads like stock enterprise-software marketing, not a description of what the product does.",
      },
      bannedPhrases: {
        pass: false,
        hits: [
          "unlock the power of",
          "game-changing",
          "cutting-edge",
          "revolutionize",
          "revolutionary",
          "best-in-class",
          "state-of-the-art",
          "seamlessly",
          "synergize",
          "unprecedented",
          "world-class",
        ],
      },
      accessibility: { pass: false, issues: ["Missing alt text for the image placeholder."] },
      verdict: "Needs a pass — this reads like generic enterprise marketing, not specific copy. Banned phrases throughout, no concrete product detail, and the image placeholder has no alt text.",
    },
    reasoning: {
      planner: "The brief says 'make it sound impressive' for an enterprise audience. I should be careful here — impressive and generic-corporate are not the same thing, but the plan itself is just structure, so I'll keep key points concrete (real-time dashboards, anomaly detection, role-based access, deploy time) and leave tone execution to the next stage.",
      generator: "Leaning into 'impressive' for an enterprise buyer, drawing on how this category typically talks about itself — fast, best-in-class, transformative. Didn't carry the plan's concrete details (dashboards, anomaly detection, deploy time) into the actual copy, and skipped the image alt text since the focus was on the headline impact.",
      validator: "This doesn't match the stated brand voice at all — 'confident and warm' and 'no corporate jargon, ever' are both violated immediately. None of the Planner's concrete details (real-time dashboards, role-based access, under-a-week deploy) made it into the final copy; it's all superlatives instead. Running the banned-phrase list confirms it: eleven hits. Alt text is also missing. This is exactly the kind of draft that should not ship without a pass.",
    },
  },
];
