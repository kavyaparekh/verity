// Drafted fresh for this prototype — the PRD references a `lint_email.py`
// banned-phrase list that does not exist in this workspace. Swap this list
// out if a real one surfaces.
export const BANNED_PHRASES = [
  "unlock the power of",
  "take it to the next level",
  "in today's fast-paced world",
  "revolutionize",
  "revolutionary",
  "game-changing",
  "game changer",
  "disruptive",
  "best-in-class",
  "cutting-edge",
  "state-of-the-art",
  "unprecedented",
  "paradigm shift",
  "seamless",
  "synergy",
  "synergize",
  "low-hanging fruit",
  "move the needle",
  "circle back",
  "deep dive",
  "touch base",
  "boil the ocean",
  "leverage our",
  "leverage your",
  "world-class",
  "turnkey solution",
  "robust solution",
  "limited time only",
  "act now",
  "don't miss out",
] as const;

export interface BannedPhraseResult {
  pass: boolean;
  hits: string[];
}

export function checkBannedPhrases(text: string): BannedPhraseResult {
  const normalized = text.toLowerCase();
  const hits = BANNED_PHRASES.filter((phrase) => normalized.includes(phrase));

  return { pass: hits.length === 0, hits };
}
