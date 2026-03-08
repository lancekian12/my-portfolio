import React from 'react'

const GithubContributions: React.FC = () => {
  // just render a grid of cells; real data would come from GitHub API
  const cells = Array.from({ length: 364 })
  return (
    <div className="space-y-6">
      <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">GitHub Contributions</h2>
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-auto">
        <div className="grid grid-cols-52 gap-1 min-w-[700px]">
          {cells.map((_, i) => {
            const level = i % 5
            const classes = [
              'bg-slate-100 dark:bg-slate-800',
              'bg-slate-300 dark:bg-slate-700',
              'bg-slate-400 dark:bg-slate-600',
              'bg-slate-600 dark:bg-slate-400',
              'bg-slate-900 dark:bg-slate-100'
            ][level]
            return <div key={i} className={`aspect-square rounded-sm ${classes}`}></div>
          })}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-slate-400 font-medium">
          <span>Less</span>
          <div className="w-6 h-6 rounded-[1px] bg-slate-100 dark:bg-slate-800" />
          <div className="w-6 h-6 rounded-[1px] bg-slate-300 dark:bg-slate-700" />
          <div className="w-6 h-6 rounded-[1px] bg-slate-400 dark:bg-slate-600" />
          <div className="w-6 h-6 rounded-[1px] bg-slate-600 dark:bg-slate-400" />
          <div className="w-6 h-6 rounded-[1px] bg-slate-900 dark:bg-slate-100" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default GithubContributions