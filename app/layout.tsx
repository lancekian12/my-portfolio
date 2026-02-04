import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter, Space_Grotesk } from "next/font/google";
import Footer from "./pages/Footer";
import ClickSpark from "@/components/ClickSpark";
import ScrollProgress from "@/app/components/ScrollProgress";
import ClientEffects from "./components/ClientEffects";

// ✅ Body Font (Clean UI)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

// ✅ Headline Font (Modern Aesthetic)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});


export const metadata = {
  title: "Lance Kian Flores | Portfolio",
  description: "Portfolio of Lance Kian Flores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <ScrollProgress />
          <ClientEffects />

          <ClickSpark
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <main className="flex-grow flex flex-col items-center w-full">
              {children}
            </main>

            <Footer />
          </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
