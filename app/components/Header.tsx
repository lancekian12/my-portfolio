"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/lancekian12", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/lance-kian-fangon/", label: "LinkedIn", icon: Linkedin },
];

const Header: React.FC = () => {
  return (
    <section id="top" className="pt-16 md:pt-24">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-border">
          <Image
            src="/images/kian3.jpg"
            alt="Portrait of Lance Kian Flores"
            fill
            sizes="56px"
            priority
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Available for work
        </div>
      </div>

      <h1 className="mt-10 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl">
        Lance Kian Flores
      </h1>
      <p className="mt-5 max-w-xl text-xl leading-snug text-muted-foreground sm:text-2xl">
        Software developer crafting{" "}
        <span className="font-serif italic text-foreground">thoughtful</span> web &amp; mobile
        products — from interface to infrastructure.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="mailto:lancekian12@gmail.com"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Get in touch
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/60 px-5 text-sm font-medium transition-colors hover:bg-muted active:scale-[0.98]"
        >
          <FileText className="h-4 w-4" aria-hidden />
          Résumé
        </a>
        <div className="ml-1 flex items-center gap-1">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
