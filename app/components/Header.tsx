"use client";

import React from "react";
import { Mail, Link, Github, Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all"
    >
      <Moon className="block dark:hidden w-5 h-5" />
      <Sun className="hidden dark:block text-slate-100 w-5 h-5" />
    </button>
  );
};

const Header: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center space-y-8">
      <div className="relative group">
<div className="relative size-32 md:size-40 rounded-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden bg-white shadow-sm">          <img
            src="/images/kian3.jpg"
            alt="Lance Kian Flores profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lance Kian Flores
          </h1>
          <ThemeToggle />
        </div>

        <p className="text-xl text-primary font-medium tracking-wide">
          Software Developer
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-slate-500 dark:text-slate-400 font-medium">
        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="mailto:lance@example.com"
        >
          <Mail size={20} /> Email
        </a>

        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="#"
        >
          <Link size={20} /> LinkedIn
        </a>

        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="#"
        >
          <Github size={20} /> GitHub
        </a>
      </div>
    </section>
  );
};

export default Header;