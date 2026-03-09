"use client";

import React from "react";
import { Mail, Link, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <section className="w-full px-4 flex flex-col items-center text-center space-y-8">
      {/* Profile Image */}
      <div className="relative group">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl border-2 border-slate-200 overflow-hidden bg-white shadow-sm">
          <img
            src="/images/kian3.jpg"
            alt="Lance Kian Flores profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name + Theme Toggle */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight dark:text-slate-100">
            Lance Kian Flores
          </h1>

          {/* Dark Mode Toggle beside name */}
          <ThemeToggle />
        </div>

        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-500 font-medium tracking-wide">
          Software Developer
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium">
        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="mailto:lancekian12@gmail.com"
        >
          <Mail size={20} /> Email
        </a>

        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="https://www.linkedin.com/in/lance-kian-fangon/"
        >
          <Link size={20} /> LinkedIn
        </a>

        <a
          className="flex items-center gap-2 hover:text-primary transition-colors"
          href="https://github.com/lancekian12"
        >
          <Github size={20} /> GitHub
        </a>
      </div>
    </section>
  );
};

export default Header;