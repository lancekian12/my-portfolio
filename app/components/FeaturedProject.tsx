"use client";

import { projects } from "app/data/projects";
import React, { useState } from "react";
import Image from "next/image";

const FeaturedProjects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <section className="space-y-12 max-w-[920px] mx-auto px-4 sm:px-0">
      <h2 className="text-center text-xs uppercase tracking-wider text-slate-400 font-bold">
        Featured Projects
      </h2>

      {visibleProjects.map((project, index) => {
        const isWebsite = project.platform.toLowerCase().includes("website");
        const isLastProject = index === visibleProjects.length - 1;

        return (
          <div key={project.title}>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-1">
                {project.title}
              </h3>

              <p className="text-sm md:text-base text-slate-700 dark:text-slate-500 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-row gap-3 flex-wrap">
                {project.tech.map((tech, techIndex) => (
                  <p
                    key={techIndex}
                    className="border rounded-sm font-semibold border-slate-200 dark:border-slate-700 px-2 py-2 text-xs text-slate-500 dark:text-slate-400"
                  >
                    {tech}
                  </p>
                ))}
              </div>

              <div
                className={`mt-4 flex gap-4 ${
                  isWebsite
                    ? "w-full"
                    : "w-[38vw] sm:w-[26vw] md:w-[18vw] lg:w-[14vw] xl:w-[12vw]"
                }`}
              >
                {project.image.map((src, imageIndex) => {
                  if (imageIndex === 2) {
                    return (
                      <div
                        key={imageIndex}
                        className="hidden sm:block w-full overflow-hidden rounded-lg border flex-shrink-0"
                        style={{
                          clipPath: "inset(0 40% 0 0)",
                        }}
                      >
                        <Image
                          src={src}
                          alt={project.title}
                          width={600}
                          height={400}
                          quality={100}
                          className="block w-full h-auto object-cover object-left"
                        />
                      </div>
                    );
                  }
                  return (
                    <Image
                      key={imageIndex}
                      src={src}
                      alt={project.title}
                      width={600}
                      quality={100}
                      height={400}
                      className="border rounded-lg object-cover w-full h-auto"
                    />
                  );
                })}
              </div>

              <div className="flex gap-6 mt-5">
                <a
                  href={project.repo}
                  className="text-[10px] font-bold tracking-widest uppercase rounded-sm border px-3 py-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary hover:border-slate-900 dark:hover:border-white transition-all"
                >
                  View Code
                </a>
                <a
                  href={project.demo}
                  className="text-[10px] font-bold tracking-widest uppercase rounded-sm border px-3 py-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary hover:border-slate-900 dark:hover:border-white transition-all"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {!isLastProject && (
              <hr className="mt-10 mb-10 border-slate-200 dark:border-slate-800" />
            )}
          </div>
        );
      })}

      {projects.length > 5 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-[10px] font-bold tracking-widest uppercase rounded-sm border px-4 py-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary hover:border-slate-900 dark:hover:border-white transition-all"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
