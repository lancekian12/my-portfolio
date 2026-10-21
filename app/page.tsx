"use client";

import { motion, type Variants, type Transition } from "framer-motion";

import Nav from "./components/Nav";
import Header from "./components/Header";
import AboutUs from "./components/Aboutus";
import GithubContributions from "./components/GithubContribution";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProject";
import Footer from "./components/Footer";
import ChatBox from "./components/Chatbox";

const transition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition,
  },
};

function Reveal({ children, amount = 0.15 }: { children: React.ReactNode; amount?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative z-10">
      <Nav />
      <main className="mx-auto flex w-full max-w-[720px] flex-col gap-28 px-5 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Header />
        </motion.div>

        <Reveal>
          <AboutUs />
        </Reveal>

        <Reveal amount={0.05}>
          <FeaturedProjects />
        </Reveal>

        <Reveal>
          <TechStack />
        </Reveal>

        <Reveal>
          <Experience />
        </Reveal>

        <Reveal amount={0.3}>
          <GithubContributions />
        </Reveal>

        <Reveal>
          <Footer />
        </Reveal>
      </main>
      <ChatBox />
    </div>
  );
}
