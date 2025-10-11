// app/components/AboutAndStudies.tsx
import { User, BookOpen } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const frontend = [
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind CSS",
  "Bulma",
  "React.js",
  "Next.js",
  "Flutter",
];

const backend = [
  "Node.js",
  "Express.js",
  "Flask",
  "Python",
  "PHP",
  "Java",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
];

const devops = ["Git", "GitHub", "Figma", "Docker"];

const previewCount = 6; // number of visible badges per category in preview

export default function AboutAndStudies(): JSX.Element {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full py-8">
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 items-stretch">
        {/* Left: About */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col h-full w-full">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-gray-100 p-2 text-gray-700">
              <User className="h-5 w-5" />
            </span>
            <h2
              id="about-heading"
              className="text-lg font-heading font-semibold"
            >
              About
            </h2>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4 flex-1">
            <p className="font-body text-gray-700 leading-relaxed text-justify">
              A student at PHINMA–University of Pangasinan currently pursuing a
              Bachelor of Science in Information Technology. Skilled in both
              mobile and web development, with a strong focus on building
              responsive, user-friendly applications.
            </p>

            <p className="font-body text-gray-700 leading-relaxed mt-4 text-justify">
              Dedicated to continuous learning, improving technical skills, and
              exploring innovative design solutions. Passionate about
              contributing to projects that combine functionality and
              creativity.
            </p>
          </div>

          {/* Tech Stack preview */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-gray-100 p-2 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                </span>
                <h3 className="text-lg font-heading font-semibold">
                  Tech Stack
                </h3>
              </div>

              <Link
                href="/tech"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                View All →
              </Link>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {/* FRONTEND */}
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 text-left">
                  Frontend
                </h4>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                  {frontend.slice(0, previewCount).map((t) => (
                    <span
                      key={t}
                      className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* BACKEND */}
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 text-left">
                  Backend
                </h4>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                  {backend.slice(0, previewCount).map((t) => (
                    <span
                      key={t}
                      className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* DEVOPS & COLLAB */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 text-left">
                  DevOps & Collaboration
                </h4>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                  {devops.slice(0, previewCount).map((t) => (
                    <span
                      key={t}
                      className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Studies timeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col h-full w-full">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-gray-100 p-2 text-gray-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-heading font-semibold">Studies</h2>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4 flex-1 relative">
            <div className="absolute left-6 top-6 bottom-0 w-px bg-gray-200" />
            <ul className="space-y-8">
              <li className="relative pl-14">
                <span className="absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full bg-black ring-2 ring-white" />
                <div className="flex items-baseline gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">BS Information Technology</p>
                    <p className="text-sm text-gray-600">
                      University of Pangasinan
                    </p>
                  </div>
                  <span className="inline-block text-xs px-2 py-1 border border-gray-200 rounded-full text-gray-600">
                    Present
                  </span>
                </div>
              </li>

              <li className="relative pl-14">
                <span className="absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
                <div className="flex items-baseline gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">Senior High School</p>
                    <p className="text-sm text-gray-600">
                      Lyceum Northwestern University Dagupan
                    </p>
                  </div>
                  <span className="inline-block text-xs px-2 py-1 border border-gray-200 rounded-full text-gray-600">
                    2019
                  </span>
                </div>
              </li>

              <li className="relative pl-14">
                <span className="absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
                <div className="flex items-baseline gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">High School</p>
                    <p className="text-sm text-gray-600">
                      Archdiocesan School Of San Fabian
                    </p>
                  </div>
                  <span className="inline-block text-xs px-2 py-1 border border-gray-200 rounded-full text-gray-600">
                    2015
                  </span>
                </div>
              </li>

              <li className="relative pl-14">
                <span className="absolute left-6 top-2 transform -translate-x-1/2 inline-block w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
                <div className="flex items-baseline gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">Elementary</p>
                    <p className="text-sm text-gray-600">
                      East Central Elementary School
                    </p>
                  </div>
                  <span className="inline-block text-xs px-2 py-1 border border-gray-200 rounded-full text-gray-600">
                    2008
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
