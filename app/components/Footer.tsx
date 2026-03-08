// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => (
  <footer className="pt-20 pb-10 text-center border-t border-slate-200 dark:border-slate-800">
    <p className="text-slate-400 dark:text-slate-500 text-sm">
      © {new Date().getFullYear()} Lance Kian Flores. Built with passion and clean code.
    </p>
  </footer>
)

export default Footer