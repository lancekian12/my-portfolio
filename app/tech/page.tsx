// app/tech/page.tsx
import Link from "next/link";

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

export default function TechPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-heading font-bold mb-8">Tech Stack</h1>

      {/* FRONTEND */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Frontend</h2>
        <div className="flex flex-wrap gap-3">
          {frontend.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* BACKEND */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Backend</h2>
        <div className="flex flex-wrap gap-3">
          {backend.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* DEVOPS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">DevOps & Collaboration</h2>
        <div className="flex flex-wrap gap-3">
          {devops.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
