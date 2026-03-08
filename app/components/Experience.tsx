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
    <section className="space-y-12">
      <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">
        Study and Experience
      </h2>

      <div className="relative">
        {/* center timeline */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-slate-400 via-slate-200 to-transparent dark:via-slate-800" />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            // first item = school icon
            const Icon = index === 0 ? GraduationCap : Briefcase;

            return (
              <div key={index} className="relative flex items-center w-full">
                
                {/* LEFT SIDE */}
                <div
                  className={`w-1/2 pr-8 ${
                    isLeft ? "text-left" : "opacity-0"
                  }`}
                >
                  {isLeft && <Card exp={exp} />}
                </div>

                {/* ICON */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-900 text-white shadow">
                  <Icon size={18} />
                </div>

                {/* RIGHT SIDE */}
                <div
                  className={`w-1/2 pl-8 ${
                    !isLeft ? "text-left" : "opacity-0"
                  }`}
                >
                  {!isLeft && <Card exp={exp} />}
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
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold text-slate-900 dark:text-white">
          {exp.company}
        </div>
      </div>

      <time className="text-xs font-semibold text-slate-500">
        {exp.period}
      </time>

      <div className="text-slate-600 font-medium mb-3">
        {exp.role}
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm">
        {exp.description}
      </p>
    </div>
  );
}