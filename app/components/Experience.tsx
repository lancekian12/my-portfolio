import React from 'react'

const Experience = () => (
  <section className="space-y-12">
    <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">Experience</h2>
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:via-slate-200 dark:before:via-slate-800 before:to-transparent before:from-slate-400">
      <div className="relative flex items-center justify-between md:justify-normal group">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-primary text-white shadow">
          <span className="material-symbols-outlined text-[18px]">work</span>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-slate-900 dark:text-white">Tech Solutions Inc.</div>
            <time className="text-xs font-semibold text-slate-500">2021 – Present</time>
          </div>
          <div className="text-primary font-medium mb-3">Senior Frontend Developer</div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Leading a team of 4 developers to modernize enterprise dashboard architectures using React and TypeScript.</p>
        </div>
      </div>

      <div className="relative flex items-center justify-between md:justify-normal group">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-200 text-slate-600 shadow">
          <span className="material-symbols-outlined text-[18px]">work</span>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-slate-900 dark:text-white">Creative Pixels</div>
            <time className="text-xs font-semibold text-slate-500">2019 – 2021</time>
          </div>
          <div className="text-primary font-medium mb-3">Junior Software Engineer</div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Developed and optimized multiple high-traffic e-commerce platforms using Python and PostgreSQL.</p>
        </div>
      </div>
    </div>
  </section>
)

export default Experience