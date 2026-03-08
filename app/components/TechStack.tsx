import React from 'react'

const stack = ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Git']

const TechStack: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">Tech Stack</h2>
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-slate-600 dark:text-slate-400">
      {stack.map(s => (
        <React.Fragment key={s}>
          <span className="text-sm font-medium hover:text-primary transition-colors">{s}</span>
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </React.Fragment>
      ))}
    </div>
  </div>
)

export default TechStack