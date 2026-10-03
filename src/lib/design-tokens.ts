export const designTokens = {
  background: "#0B0B0E",
  foreground: "#F5F3EE",
  accent: "#C9A227",
  muted: "#A8A29E",
} as const;

export type DesignTokens = typeof designTokens;
