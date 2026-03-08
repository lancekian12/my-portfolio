// app/layout.tsx
import "./globals.css";
import { Manrope } from "next/font/google";
import Providers from "./components/Provider"; // adjust name if needed
import ScrollProgress from "./components/ScrollProgress";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Lance Kian Flores | Portfolio",
  description: "Portfolio of Lance Kian Flores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable}`} // makes --font-manrope available globally
    >
      {/* Use Tailwind utility classes as before; bg tokens are defined in globals.css */}
      <body className="font-display flex flex-col min-h-screen overflow-y-auto bg-[var(--background-light)] dark:bg-[var(--background-dark)] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Providers>
          <ScrollProgress />

          <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16">
            <main className="w-full max-w-[720px] flex flex-col gap-24">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}