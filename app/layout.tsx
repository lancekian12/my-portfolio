// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import ThemeColorSync from "./components/ThemeColorSync";
import { THEME_COLORS } from "./data/theme";
import { ThemeProvider } from "./components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lance Kian Flores — Software Developer",
  description:
    "Full-stack developer building modern web and mobile products with clean, maintainable code.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geist.variable, geistMono.variable, instrument.variable)}
    >
      <body className="font-sans grain min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorSync />
          <ScrollProgress />
          <div className="page-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
