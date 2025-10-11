// app/layout.tsx (Next.js App Router)
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

// Load fonts
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
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="font-body bg-white text-gray-800 min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
