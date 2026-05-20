import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeInit from "@/components/ThemeInit";
import ThemeSync from "@/components/ThemeSync";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Tech Brief · Mohammad K. Hussain",
  description:
    "AI-curated daily technology briefing — security, AI/LLMs, JS/React, dev tools, and industry news. Fresh at 8 AM IST every day.",
  openGraph: {
    title: "Daily Tech Brief",
    description: "Your daily signal from the noise. Fresh at 8 AM IST.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint — prevents theme flash */}
        <ThemeInit />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Syncs system/localStorage pref into Zustand on mount */}
        <ThemeSync />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
