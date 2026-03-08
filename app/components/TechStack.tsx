import React from "react";
import Link from "next/link";

const stack = [
  "React",
  "TypeScript",
  "NodeJs",
  "Dart",
  "Flutter",
  "Python",
];

const TechStack: React.FC = () => (
  <section className="text-center space-y-8">
    
    <h2 className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500 font-semibold">
      Tech Stack
    </h2>

    <div className="flex flex-wrap justify-center gap-3">
      {stack.map((tech) => (
        <span
          key={tech}
          className="text-sm px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 
          text-slate-600 dark:text-slate-300 
          bg-white dark:bg-slate-900/40
          hover:border-slate-400 dark:hover:border-slate-600
          transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>

    <Link
      href="/tech"
      className="inline-block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 
      hover:text-slate-900 dark:hover:text-white transition-colors"
    >
      View More →
    </Link>

  </section>
);

export default TechStack;