"use client";

import Image from "next/image";
import {
  FolderGit2,
  Github,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, JSX, useEffect } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  repo?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "AccessAbility",
    description:
      "A GPS-based mobile navigation app built to assist persons with disabilities. Offers accessible routes, real-time tracking, and voice-guided navigation using Dart, Flutter, and Google Maps API with Firebase authentication.",
    tech: ["Dart", "Flutter", "Firebase", "Google Maps API", "AI Assistant"],
    image: "/images/accesability_picture.jpeg",
    repo: "https://github.com/lancekian12/3Y2AAPWD",
  },
  {
    title: "CryptoHotel",
    description:
      "A hotel booking platform with secure crypto payments. Uses Flutter, Node.js, and MongoDB to enable fast and private global transactions with MetaMask integration.",
    tech: ["Flutter", "Node.js", "Express", "MongoDB", "MetaMask"],
    image: "/images/cryptotel_picture.jpeg",
    repo: "https://github.com/lancekian12/3Y1Cryptotel",
  },
  {
    title: "InsureChain",
    description:
      "Decentralized platform enhancing insurance accessibility through gamified challenges. Built with React, TypeScript, and Axle.",
    tech: ["React.js", "TypeScript", "Axle"],
    image: "/images/insurechain_picture.jpeg",
    repo: "https://github.com/lancekian12/InsureChain",
  },
  {
    title: "AppoinCare",
    description:
      "Doctor–patient appointment system for web and mobile. Enables scheduling and record management with React, Node.js, and Kotlin.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Kotlin"],
    image: "/images/appointcare_picture.jpeg",
    repo: "https://github.com/lancekian12/AppointCare-Web",
  },
  {
    title: "Study With Me",
    description:
      "A quiz and learning app built with Kotlin. Lets users watch lessons, take notes, and manage to-do lists across five subjects with SQLite storage.",
    tech: ["Kotlin", "SQLite"],
    image: "/images/studywithme_picture.jpeg",
    repo: "https://github.com/lancekian12/StudyWithMe",
  },
  {
    title: "BeatSearching",
    description:
      "A music website using HTML, CSS, and JavaScript for browsing and purchasing instruments and courses online.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/beatsearching_picture.jpeg",
    repo: "https://github.com/lancekian12/MusicStoreWebsite",
  },
];

export default function Projects(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (isMobile) {
      setCurrent((prev) => (prev + 1 >= projects.length ? 0 : prev + 1));
    } else {
      setCurrent((prev) => (prev + 3 >= projects.length ? 0 : prev + 3));
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrent((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
    } else {
      setCurrent((prev) =>
        prev - 3 < 0 ? Math.max(0, projects.length - 3) : prev - 3
      );
    }
  };

  const visibleProjects = isMobile
    ? projects.slice(current, current + 1)
    : projects.slice(current, current + 3);

  return (
    <section id="projects" className="w-full pb-12 relative">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200">
            <FolderGit2 className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className={`grid gap-6 ${
              isMobile
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {visibleProjects.map((p, index) => (
              <motion.div
                key={p.title}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <div className="relative w-full h-44">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-auto">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <Globe className="h-4 w-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow hover:scale-105 transition-transform"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow hover:scale-105 transition-transform"
            >
              <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
