import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat, Lato } from "next/font/google";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
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
      className={`${montserrat.variable} ${lato.variable}`.trim()}
    >
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <main className="flex-grow flex flex-col items-center w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
