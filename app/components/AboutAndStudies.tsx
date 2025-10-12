"use client";
import { User, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, JSX } from "react";

const frontend = [
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind CSS",
  "Bulma",
  "React.js",
  "Next.js",
  "Flutter",
];
const backend = [
  "Node.js",
  "Express.js",
  "Flask",
  "Python",
  "PHP",
  "Java",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
];
const devops = ["Git", "GitHub", "Figma", "Docker"];

const previewCount = 6;

export default function AboutAndStudies(): JSX.Element {
  const [showExperience, setShowExperience] = useState(false);

  return (
    <section id="about" aria-labelledby="about-heading" className="w-full py-8">
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-stretch">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {/* ABOUT */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm hover:shadow-md hover:-translate-y-[1px]">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200">
                <User className="h-5 w-5" />
              </span>
              <h2
                id="about-heading"
                className="text-lg font-heading font-semibold text-gray-900 dark:text-white"
              >
                About
              </h2>
            </div>

            <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                A student at PHINMA–University of Pangasinan currently pursuing
                a Bachelor of Science in Information Technology. Skilled in both
                mobile and web development, with a strong focus on building
                responsive, user-friendly applications.
              </p>

              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-justify">
                Dedicated to continuous learning, improving technical skills,
                and exploring innovative design solutions. Passionate about
                contributing to projects that combine functionality and
                creativity.
              </p>
            </div>
          </div>

          {/* TECH STACK */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm hover:shadow-md hover:-translate-y-[1px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                </span>
                <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
                  Tech Stack
                </h3>
              </div>

              <Link
                href="/tech"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                View All →
              </Link>
            </div>

            <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4 space-y-4">
              {[
                ["Frontend", frontend],
                ["Backend", backend],
                ["DevOps & Collaboration", devops],
              ].map(([title, list]) => (
                <div key={title as string}>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-left">
                    {title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(list as string[]).slice(0, previewCount).map((t) => (
                      <span
                        key={t}
                        className="inline-block text-xs px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm hover:shadow-md hover:-translate-y-[1px]  flex flex-col h-full w-full relative">
          {/* Toggle Header */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setShowExperience(false)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300
    ${
      !showExperience
        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white"
        : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
    }`}
            >
              <BookOpen className="h-4 w-4" />
              Studies
            </button>

            <button
              onClick={() => setShowExperience(true)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                showExperience
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              <User className="h-4 w-4" />
              Experience
            </button>
          </div>

          {/* Content */}
          <div className="mt-2 border-t border-gray-100 dark:border-gray-800 pt-4 flex-1 relative">
            {!showExperience && (
              <>
                <div className="absolute left-6 top-6 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                <ul className="space-y-8">
                  {[
                    [
                      "BS Information Technology",
                      "University of Pangasinan",
                      "Present",
                      true,
                    ],
                    [
                      "Senior High School",
                      "Lyceum Northwestern University Dagupan",
                      "2019",
                    ],
                    [
                      "High School",
                      "Archdiocesan School Of San Fabian",
                      "2015",
                    ],
                    ["Elementary", "East Central Elementary School", "2008"],
                  ].map(([title, school, year, active], index, arr) => (
                    <li
                      key={title as string}
                      className={`relative pl-14 ${
                        index === arr.length - 1 ? "pb-2" : ""
                      }`}
                    >
                      {/* timeline dot */}
                      <span
                        className={`absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-900 transition-all duration-200 cursor-pointer ${
                          active
                            ? "bg-black dark:bg-white"
                            : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white"
                        }`}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {school}
                          </p>
                        </div>
                        <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                          {year}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {showExperience && (
              <div className="text-center text-gray-600 dark:text-gray-400 mt-6">
                <User className="h-8 w-8 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  No professional experience yet.
                </p>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  Currently focusing on academic learning and personal projects.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
