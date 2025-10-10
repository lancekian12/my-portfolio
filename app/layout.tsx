// app/layout.tsx (Next.js App Router)
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

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
  title: "My Portfolio",
  description:
    "Minimalist one-page portfolio built with Next.js + Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="font-body bg-white text-gray-800">{children}</body>
    </html>
  );
}
