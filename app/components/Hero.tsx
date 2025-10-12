import Image from "next/image";
import { MapPin, Mail, Linkedin, Github, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Hero = () => {
  return (
    <section className="w-full pt-12 relative transition-colors">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-2xl shadow-lg dark:ring-gray-700 transition-all">
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
          {/* Name + Theme Toggle */}
          <div className="flex flex-col xs:flex-row sm:flex-row items-center sm:items-start justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Lance Kian Flores
              </h1>
              {/* Show toggle beside name on mobile */}
              <div className="block sm:hidden">
                <ThemeToggle />
              </div>
            </div>

            {/* Show toggle on the right on desktop */}
            <div className="hidden sm:block ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-2 text-lg justify-center md:justify-start">
            <MapPin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span>San Fabian, Pangasinan, Philippines</span>
          </div>

          {/* Role + Resume */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
            <p className="font-body text-[20px] text-gray-700 dark:text-gray-300">
              Software Developer
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white rounded-xl font-medium transition-all duration-300 w-full sm:w-auto px-6 py-[10px] shadow-sm hover:shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, rgb(59,130,246) 0%, rgb(37,99,235) 50%, rgb(29,78,216) 100%)",
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-6 w-full">
            {/* Email */}
            <a
              href="mailto:lancekian12@gmail.com"
              className="flex items-center justify-center gap-2 bg-black text-white border border-gray-900 dark:bg-white dark:text-black dark:border-gray-700 hover:bg-gray-800 hover:text-white dark:hover:bg-black dark:hover:text-white rounded-xl font-medium transition-all duration-300 w-full sm:w-auto px-6 py-[10px]"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            {/* Wrapper for full-width LinkedIn and GitHub */}
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/lance-kian-fangon/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-900 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-xl font-medium hover:bg-black dark:hover:text-black hover:text-white dark:hover:bg-white transition-all duration-300 flex-1 px-6 py-[10px]"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/lancekian12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-900 dark:border-gray-700 dark:hover:text-black text-gray-900 dark:text-gray-200 rounded-xl font-medium hover:bg-black hover:text-white dark:hover:bg-white  transition-all duration-300 flex-1 px-6 py-[10px]"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
