import { frontend, backend, devops } from "app/data/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const groups = [
  { title: "Frontend & Mobile", items: frontend },
  { title: "Backend & Data", items: backend },
  { title: "Tools & Collaboration", items: devops },
];

export default function TechPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[720px] px-5 py-16 sm:px-6 md:py-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-full text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        Back home
      </Link>

      <h1 className="mt-10 text-5xl font-medium tracking-[-0.04em] sm:text-6xl">
        Tools of the <span className="font-serif italic">trade</span>
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        The languages, frameworks and tools I reach for to ship web and mobile products.
      </p>

      <div className="mt-16 divide-y divide-border border-y border-border">
        {groups.map((g, i) => (
          <section key={g.title} className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <div>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-medium tracking-tight">{g.title}</h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm text-foreground/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
