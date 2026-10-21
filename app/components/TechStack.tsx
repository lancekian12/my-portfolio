import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stack = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Node.js",
  "Dart",
  "Flutter",
  "Python",
];

const TechStack: React.FC = () => (
  <section>
    <SectionHeading
      index="03"
      title="Stack"
      aside={
        <Link
          href="/tech"
          className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All tools
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      }
    />

    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          {tech}
        </li>
      ))}
    </ul>
  </section>
);

export default TechStack;
