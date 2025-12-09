"use client";

import { User, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect, useRef, JSX } from "react";
import { frontend, backend, devops, education } from "@/app/data/data";

const PREVIEW_COUNT = 6;

function TechStack({ visible = true }: { visible?: boolean }): JSX.Element {
  const groups: [string, string[]][] = [
    ["Frontend", frontend],
    ["Backend", backend],
    ["DevOps & Collaboration", devops],
  ];

  return (
    <div className="rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-500 ease-out bg-white dark:bg-black border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </span>
          <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">Tech Stack</h3>
        </div>

        <Link href="/tech" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          View All →
        </Link>
      </div>

      <div className="mt-4 border-t pt-4 border-gray-100 dark:border-gray-800 space-y-4">
        {groups.map(([title, list]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-left">{title}</h4>
            <div className="flex flex-wrap gap-2">
              {(list as string[]).slice(0, PREVIEW_COUNT).map((t, i) => (
                <span
                  key={t}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className={`inline-block text-xs px-3 py-1 border rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transform transition-all duration-400 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutAndStudies(): JSX.Element {
  const [showExperience, setShowExperience] = useState(false);

  // entrance flags
  const [loadedContainer, setLoadedContainer] = useState(false);
  const [loadedLeft, setLoadedLeft] = useState(false);
  const [loadedRight, setLoadedRight] = useState(false);

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const [aboutHeight, setAboutHeight] = useState<number | null>(null);

  // desktop detection safe for SSR
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );

  // container entrance stagger
  useEffect(() => {
    // small stagger: container -> left -> right
    const a = setTimeout(() => setLoadedContainer(true), 30);
    const b = setTimeout(() => setLoadedLeft(true), 120);
    const c = setTimeout(() => setLoadedRight(true), 260);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, []);

  // media query listener
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(Boolean((e as any).matches ?? mq.matches));
    };

    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler);
    } else {
      mq.addListener(handler);
    }
    setIsDesktop(mq.matches);

    return () => {
      if ("removeEventListener" in mq) {
          mq.removeEventListener("change", handler);
      } else {
          mq.removeListener(handler);
      }
    };
  }, []);

  // measurement: measure about card and keep it updated
  useLayoutEffect(() => {
    if (!aboutRef.current) return;

    const measure = () => {
      if (!aboutRef.current) return;
      const h = Math.ceil(aboutRef.current.offsetHeight || aboutRef.current.getBoundingClientRect().height);
      setAboutHeight(h);
    };

    measure();

    const onLoad = () => requestAnimationFrame(measure);
    window.addEventListener("load", onLoad);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => requestAnimationFrame(measure));
      ro.observe(aboutRef.current);
    }

    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);

    const timer = setTimeout(() => measure(), 200);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      if (ro && aboutRef.current) ro.unobserve(aboutRef.current);
      clearTimeout(timer);
    };
  }, [loadedLeft, loadedRight]);

  useEffect(() => {
    if (!aboutRef.current) return;
    requestAnimationFrame(() => {
      const h = Math.ceil(aboutRef.current!.offsetHeight || aboutRef.current!.getBoundingClientRect().height);
      setAboutHeight(h);
    });
  }, [showExperience, loadedLeft, loadedRight]);

  return (
    <section
      id="about"
      className={`w-full py-8 transition-all duration-700 ${
        loadedContainer ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:items-stretch items-start h-full min-h-0">
        <div className="flex flex-col gap-6 md:row-start-1 md:col-start-1">
          <div
            ref={aboutRef}
            className={`rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-500 ${
              loadedLeft ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            } ease-out bg-white dark:bg-black border-gray-200 dark:border-gray-700`}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200">
                <User className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">About</h2>
            </div>

            <div className="mt-4 border-t pt-4 border-gray-100 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                A student at PHINMA–University of Pangasinan currently pursuing a Bachelor of Science in Information Technology. Skilled in both mobile and web development, with a strong focus on building responsive, user-friendly applications.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-justify">
                Dedicated to continuous learning, improving technical skills, and exploring innovative design solutions. Passionate about contributing to projects that combine functionality and creativity.
              </p>
            </div>
          </div>

          {!showExperience && (
            <div className="hidden md:block">
              <TechStack visible={loadedLeft} />
            </div>
          )}
        </div>

        <div
          ref={rightCardRef}
          style={aboutHeight && isDesktop ? { minHeight: `${aboutHeight}px` } : undefined}
          className={`rounded-xl border p-6 shadow-sm hover:shadow-md flex flex-col w-full relative transition-all duration-500 ease-out bg-white dark:bg-black border-gray-200 dark:border-gray-700 ${
            loadedRight ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } md:row-start-1 md:col-start-2 h-full`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setShowExperience(false)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-300 ${
                !showExperience
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              <BookOpen className="h-4 w-4" /> Studies
            </button>

            <button
              onClick={() => setShowExperience(true)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-300 ${
                showExperience
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              <User className="h-4 w-4" /> Experience
            </button>
          </div>

          <div className="mt-2 border-t pt-4 flex-1 relative border-gray-100 dark:border-gray-800 min-h-0">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gray-200 dark:bg-gray-700" />

            {!showExperience ? (
              <ul className="space-y-16">
                {education.map((ed, index, arr) => (
                  <li
                    key={ed.title}
                    className={`relative pl-14 transition-all duration-400 ease-in-out ${
                      loadedRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    } ${index === arr.length - 1 ? "pb-2" : ""}`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <span
                      className={`absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-900 transition-colors duration-300 cursor-pointer ${
                        ed.active
                          ? "bg-black dark:bg-white"
                          : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:bg-black dark:hover:bg-white"
                      }`}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{ed.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ed.school}</p>
                      </div>
                      <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                        {ed.year}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-10">
                <li
                  className={`relative pl-14 transition-all duration-400 ease-in-out ${
                    loadedRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `60ms` }}
                >
                  <span className="absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full bg-black dark:bg-white ring-2 ring-white dark:ring-gray-900" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Boom Technologies Inc.</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer</p>
                    </div>
                    <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                      Present
                    </span>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="block md:hidden">
          <TechStack visible={loadedLeft} />
        </div>

        {showExperience && (
          <div className="hidden md:block md:col-span-2 md:row-start-2">
            <TechStack visible={loadedRight} />
          </div>
        )}
      </div>
    </section>
  );
}
