export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: ExperienceItem[] = [
  {
    company: "Self-employed",
    role: "Freelance Full Stack Developer",
    period: "Jan 2025 — Present",
    description:
      "Building web applications for multiple clients, including Miss A Loan, a lending management app that replaced a family-run micro-lending business's shared Excel workbook and has been in daily use for 4 months, and a Laravel file management system with double AES-256 encryption at rest and role-based sharing.",
  },
  {
    company: "Boom Technologies Inc.",
    role: "Web Developer Intern (Full Stack)",
    period: "Nov 2025 — Mar 2026",
    description:
      "Led full-stack development with co-interns on the core platform, dashboard, and frontend integration of 3 AI systems (RiskSense, Detectify, and Clarity). Built 2 of 3 generative AI features, added usage limits, cut AI generation time from 15 s to 5 s, improved API response time from 400 ms to 150 ms with Redis caching, and raised the SEO score from 78 to 92.",
  },
  {
    company: "PHINMA University of Pangasinan",
    role: "BS Information Technology, Major in System Development",
    period: "2022 — Jun 2026",
    description:
      "Graduated in June 2026. Built mobile and web applications throughout my studies, including the award-winning AccessAbility capstone (Best in UI/UX Design Project, 2026).",
  },
];
