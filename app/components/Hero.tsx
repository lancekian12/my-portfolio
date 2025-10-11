"use client";

import Image from "next/image";
import {
  MapPin,
  Moon,
  Sun,
  Mail,
  Linkedin,
  Github,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Hero = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="w-full pt-12 relative">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/kian.jpg"
            alt="Lance Kian Flores"
            width={208}
            height={208}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full max-w-3xl">
          {/* Name + Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Lance Kian Flores
            </h1>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-1 text-lg justify-center md:justify-start">
            <MapPin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span>San Fabian, Pangasinan, Philippines</span>
          </div>

          {/* Role + Resume */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
            <p className="font-body text-[20px] text-gray-700 dark:text-gray-300">
              Software Developer
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white rounded-xl font-medium transition-all duration-300 w-full sm:w-auto px-6 py-[10px]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(59,130,246) 0%, rgb(37,99,235) 50%, rgb(29,78,216) 100%)",
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Email */}
            <a
              href="mailto:lancekian12@gmail.com"
              className="flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 w-full py-[10px]"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/lance-kian-fangon/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-900 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 w-full py-[10px]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/lancekian12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-900 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 w-full py-[10px]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
