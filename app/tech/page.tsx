import Link from "next/link";
import { frontend, backend, devops } from "@/app/data/data"; // adjust path

export default function TechPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-100 transition-colors">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-heading font-bold mb-8">Tech Stack</h1>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Frontend</h2>
        <div className="flex flex-wrap gap-3">
          {frontend.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Backend</h2>
        <div className="flex flex-wrap gap-3">
          {backend.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">DevOps & Collaboration</h2>
        <div className="flex flex-wrap gap-3">
          {devops.map((t) => (
            <span
              key={t}
              className="inline-block text-xs px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
