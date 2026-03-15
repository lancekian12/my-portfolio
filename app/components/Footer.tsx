import React from "react";

const Footer: React.FC = () => (
  <footer className="dark:bg-[var(--background-dark)] mt-10 pb-10 text-center">
    <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
      <p className="text-sm text-slate-400">
        © {new Date().getFullYear()} Lance Kian Flores. Built with passion and
        clean code.
      </p>
    </div>
  </footer>
);

export default Footer;
