import React from "react";

const Footer: React.FC = () => (
  <footer className="dark:bg-[var(--background-dark)] pt-20 pb-10 text-center border-t border-slate-200 dark:border-slate-800">
    <p className="text-sm text-slate-400">
      © {new Date().getFullYear()} Lance Kian Flores. Built with passion and
      clean code.
    </p>
  </footer>
);

export default Footer;
