"use client";

import { motion, type Variants, type Transition } from "framer-motion";

import Header from "./components/Header";
import AboutUs from "./components/Aboutus";
import GithubContributions from "./components/GithubContribution";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProject";
import Footer from "./components/Footer";

const transition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16">
      <div className="w-full max-w-[920px] flex flex-col gap-24">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Header />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-100px" }}
        >
          <AboutUs />
        </motion.div>

        <motion.section
          className="space-y-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
        >
          <GithubContributions />
        </motion.section>

        <motion.section
          className="space-y-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
        >
          <TechStack />
        </motion.section>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
        >
          <Experience />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
        >
          <FeaturedProjects />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
        >
          <Footer />
        </motion.div>
      </div>
    </main>
  );
}
