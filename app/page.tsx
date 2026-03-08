import Header from "./components/Header";
import AboutUs from "./components/Aboutus";
import GithubContributions from "./components/GithubContribution";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProject";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16">
      <div className="w-full max-w-[920px] flex flex-col gap-24">
        <Header />
        <AboutUs />
        <section className="space-y-12">
          <GithubContributions />
          <TechStack />
        </section>
        <Experience />
        <FeaturedProjects />
        <footer className="pt-20 pb-10 text-center border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Lance Kian Flores. Built with passion
            and clean code.
          </p>
        </footer>
      </div>
    </main>
  );
}
