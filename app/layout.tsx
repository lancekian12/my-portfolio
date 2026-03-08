// app/layout.tsx
import "./globals.css";
import { Manrope, Geist } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import ThemeWrapper from "./components/ThemeWrapper";
import { ThemeProvider } from "./components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${manrope.variable} font-sans`} 
      >
        <ThemeProvider
                    attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <ScrollProgress />
          <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
            <main className="w-full max-w-[720px] flex flex-col gap-24">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}