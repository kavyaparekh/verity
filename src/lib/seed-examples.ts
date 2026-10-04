import type { Content, Plan, ValidatorResult } from "@/lib/schemas";

export interface SeedExample {
  id: string;
  label: string;
  brief: string;
  brandVoice: string;
  plan: Plan;
  content: Content;
  validation: ValidatorResult;
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
  },
];
