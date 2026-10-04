import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import { designTokens } from "@/lib/design-tokens";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Verity",
  description:
    "Brief in, on-brand page and governance scorecard out — built by Kavya Parekh.",
};

const rootTokenStyle = {
  "--background": designTokens.background,
  "--foreground": designTokens.foreground,
  "--accent": designTokens.accent,
  "--muted": designTokens.muted,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexMono.variable}`}
      style={rootTokenStyle}
    >
      <body>{children}</body>
    </html>
  );
}
