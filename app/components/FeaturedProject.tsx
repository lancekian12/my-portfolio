"use client";

import { projects } from "app/data/projects";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Plus, Minus } from "lucide-react";
import SectionHeading from "./SectionHeading";

const INITIAL_COUNT = 5;

const FeaturedProjects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="work">
      <SectionHeading
        index="02"
        title="Selected work"
        aside={
          <span className="font-mono text-xs text-muted-foreground">
            {String(projects.length).padStart(2, "0")}
          </span>
        }
      />

      <div className="space-y-6">
        {visibleProjects.map((project) => {
          const isWebsite = project.platform.toLowerCase().includes("website");

          return (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
            >
              <div
                className={`relative flex justify-center gap-3 overflow-hidden bg-muted ${
                  isWebsite ? "px-6 pt-6 sm:px-10 sm:pt-10" : "px-6 pt-8 sm:pt-10"
                }`}
              >
                {project.image.map((src, imageIndex) => (
                  <div
                    key={imageIndex}
                    className={`relative overflow-hidden border border-border shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
                      isWebsite
                        ? "w-full rounded-t-lg border-b-0"
                        : `w-[30%] max-w-[150px] rounded-t-2xl border-b-0 ${
                            imageIndex === 2 ? "hidden sm:block" : ""
                          } ${imageIndex === 1 ? "sm:translate-y-0" : "sm:translate-y-4"}`
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${imageIndex + 1}`}
                      width={isWebsite ? 1200 : 400}
                      height={isWebsite ? 750 : 800}
                      sizes={isWebsite ? "(min-width: 768px) 720px, 100vw" : "150px"}
                      className={`block w-full object-cover object-top ${
                        isWebsite ? "aspect-[16/9]" : "aspect-[9/16]"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {project.platform}
                    </p>
                    <h3 className="mt-1 text-xl font-medium tracking-tight">{project.title}</h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                      className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-1 rounded-full border border-border pl-4 pr-3 text-[13px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Live
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {projects.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {showAll ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
            {showAll ? "Show less" : `Show ${projects.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
