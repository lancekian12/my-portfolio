import Hero from "./pages/Hero";
import AboutAndStudies from "./pages/AboutAndStudies";
import Projects from "./pages/Projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center w-full dark:bg-black-800">
      <div className="w-full max-w-4xl px-6">
        <Hero />
        <AboutAndStudies />
        <Projects />
      </div>
    </main>
  );
}
