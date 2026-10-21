"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { experiences } from "app/data/experience";

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeading index="04" title="Experience" />

      <ol className="divide-y divide-border border-y border-border">
        {experiences.map((exp) => (
          <li key={exp.company} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <time className="font-mono text-xs leading-6 text-muted-foreground">{exp.period}</time>
            <div>
              <h3 className="font-medium tracking-tight">
                {exp.role}
                <span className="text-muted-foreground"> · {exp.company}</span>
              </h3>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
