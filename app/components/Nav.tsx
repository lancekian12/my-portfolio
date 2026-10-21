"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Nav: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-4 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-border bg-background/70 p-1 pl-4 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl"
      >
        <a href="#top" className="mr-2 font-serif text-lg italic leading-none" aria-label="Back to top">
          lk.
        </a>
        <ul className="flex items-center">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className={l.label === "Experience" ? "hidden sm:block" : undefined}>
                <a
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`block rounded-full px-3 py-2 text-[13px] transition-colors hover:bg-muted hover:text-foreground ${
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Nav;
