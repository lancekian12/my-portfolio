// app/components/About.tsx
import { User } from "lucide-react";
import { JSX } from "react";

export default function About(): JSX.Element {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full py-8">
      {/* card fills the parent width (max-w-5xl from page.tsx) */}
      <div className="mx-auto w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-gray-100 p-2 text-gray-700">
            <User className="h-5 w-5" />
          </span>
          <h2 id="about-heading" className="text-lg font-heading font-semibold">
            About
          </h2>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="font-body text-gray-700 leading-relaxed text-justify">
            A student at PHINMA–University of Pangasinan currently pursuing a
            Bachelor of Science in Information Technology. Skilled in both
            mobile and web development, with a strong focus on building
            responsive, user-friendly applications.
          </p>

          <p className="font-body text-gray-700 leading-relaxed mt-4 text-justify">
            Dedicated to continuous learning, improving technical skills, and
            exploring innovative design solutions. Passionate about contributing
            to projects that combine functionality and creativity.
          </p>
        </div>
      </div>
    </section>
  );
}
