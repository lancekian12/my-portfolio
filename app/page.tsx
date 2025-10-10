// app/page.tsx
import Hero from "./components/Hero";
import About from "./components/About";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center w-full">
      <div className="w-full max-w-2xl px-6">
        <Hero />
        <About />
      </div>
    </main>
  );
}
