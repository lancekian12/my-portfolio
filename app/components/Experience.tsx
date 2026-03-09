"use client";

import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    company: "Phinma University Of Pangasinan",
    role: "Senior Student",
    period: "2021 – 2026",
    description:
      "I'm dedicated to developing mobile and web applications. I continuously improve my skills by building projects and learning modern technologies.",
  },
  {
    company: "Boom Technologies Inc",
    role: "Fullstack Developer",
    period: "November 2025 – Present",
    description:
      "Built an AI-powered platform with 3 core AI features while leading a team of 4 developers, modernizing enterprise dashboard architectures using React and TypeScript.",
  },
];

export default function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-center text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 font-bold mb-6">
        Study and Experience
      </h2>

      <div className="relative">
        {/* Center vertical timeline (shown only on md and up) */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-slate-300 via-slate-200 to-transparent dark:from-slate-700 dark:via-slate-800" />

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const Icon = index === 0 ? GraduationCap : Briefcase;

            return (
              <div key={index} className="relative">
                {/* MOBILE: simple stacked layout with icon left */}
                <div className="flex items-start gap-4 md:hidden">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm border border-white dark:border-slate-900">
                    <Icon size={16} />
                  </div>

                  <div className="flex-1">
                    <Card exp={exp} />
                  </div>
                </div>

                {/* DESKTOP: timeline layout */}
                <div className="hidden md:flex items-center md:justify-between md:mb-12">
                  {/* left side */}
                  <div className={`w-1/2 pr-8 ${!isLeft ? "invisible" : "visible"}`}>
                    {isLeft && <Card exp={exp} />}
                  </div>

                  {/* icon in center */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white shadow border border-white dark:border-slate-900">
                    <Icon size={18} />
                  </div>

                  {/* right side */}
                  <div className={`w-1/2 pl-8 ${isLeft ? "invisible" : "visible"}`}>
                    {!isLeft && <Card exp={exp} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ exp }: { exp: ExperienceItem }) {
  return (
    <article className="bg-white dark:bg-slate-900/60 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{exp.company}</h3>
        <time className="text-xs text-slate-500 font-semibold ml-3">{exp.period}</time>
      </div>

      <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium mb-2">{exp.role}</div>

      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
    </article>
  );
}
