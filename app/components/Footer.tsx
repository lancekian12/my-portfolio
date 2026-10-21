import React from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "https://github.com/lancekian12", label: "GitHub" },
  { href: "https://www.linkedin.com/in/lance-kian-fangon/", label: "LinkedIn" },
  { href: "/resume.pdf", label: "Résumé" },
];

const Footer: React.FC = () => (
  <footer id="contact" className="pb-32 pt-8">
    <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
      <p className="font-mono text-xs text-muted-foreground">06 — Contact</p>
      <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
        Let&apos;s build something{" "}
        <span className="font-serif italic">great</span>.
      </h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Open to full-time roles and freelance projects. The fastest way to reach me is email.
      </p>
      <a
        href="mailto:lancekian12@gmail.com"
        className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-lg font-medium transition-colors hover:border-foreground"
      >
        lancekian12@gmail.com
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>

    <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
      <p>© {new Date().getFullYear()} Lance Kian Flores</p>
      <ul className="flex gap-5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
