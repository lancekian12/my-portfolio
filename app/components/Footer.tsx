"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

const EMAIL = "lancekian12@gmail.com";

const links = [
  { href: "https://github.com/lancekian12", label: "GitHub" },
  { href: "https://www.linkedin.com/in/lance-kian-fangon/", label: "LinkedIn" },
  { href: "/resume.pdf", label: "Résumé" },
];

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
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
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {EMAIL}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:bg-muted active:scale-[0.98]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
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
};

export default Footer;
