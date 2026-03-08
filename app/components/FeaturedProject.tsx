"use client";

import React from "react";
import { Link, Code } from "lucide-react";

const projects = [
  {
    title: "Lumina Dashboard",
    desc: "Real-time cryptocurrency tracking dashboard with predictive analytics and customizable alerts.",
    tags: ["React", "FastAPI"],
  },
  {
    title: "FlowState Tasker",
    desc: "Minimalist productivity tool designed for deep work sessions with Pomodoro integration.",
    tags: ["TypeScript", "PostgreSQL"],
  },
];

const FeaturedProjects: React.FC = () => (
  <section className="space-y-12">
    <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">
      Featured Projects
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <div
          key={p.title}
          className="group rounded-xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 shadow-sm bg-transparent"
        >
          <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-800" />
          <div className="py-6 px-2 space-y-3">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between">
              <a
                className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-semibold"
                href="#"
              >
                <Link className="h-4 w-4" /> Demo
              </a>
              <a
                className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-semibold"
                href="#"
              >
                <Code className="h-4 w-4" /> View Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedProjects;