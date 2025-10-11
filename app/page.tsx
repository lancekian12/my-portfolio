// app/page.tsx
import Hero from "./components/Hero";
import AboutAndStudies from "./components/AboutAndStudies";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center w-full">
      <div className="w-full max-w-4xl px-6">
        <Hero />
        <AboutAndStudies />
      </div>
    </main>
  );
}
