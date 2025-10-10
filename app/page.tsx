import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center">
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
