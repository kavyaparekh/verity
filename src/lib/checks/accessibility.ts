import { designTokens } from "@/lib/design-tokens";
import type { Content } from "@/lib/schemas";

const WCAG_AA_MIN_CONTRAST = 4.5;

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return [r, g, b];
}

function channelLuminance(channel: number): number {
  const sRGB = channel / 255;
  return sRGB <= 0.03928
    ? sRGB / 12.92
    : Math.pow((sRGB + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface AccessibilityResult {
  pass: boolean;
  issues: string[];
}

export function checkAccessibility(content: Content): AccessibilityResult {
  const issues: string[] = [];

  if (!content.imageAlt.trim()) {
    issues.push("Missing alt text for the image placeholder.");
  }

  if (content.headline.trim().toLowerCase() === content.subhead.trim().toLowerCase()) {
    issues.push("Headline and subhead are identical — breaks heading hierarchy.");
  }

  const ratio = contrastRatio(designTokens.foreground, designTokens.background);
  if (ratio < WCAG_AA_MIN_CONTRAST) {
    issues.push(
      `Foreground/background contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AA (needs ${WCAG_AA_MIN_CONTRAST}:1 minimum).`,
    );
  }

  return { pass: issues.length === 0, issues };
}
