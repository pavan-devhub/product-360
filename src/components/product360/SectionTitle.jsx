import React from 'react';

const SectionTitle = ({ children, count }) => (
  <div className="mb-4 flex items-center gap-3">
    <h2 className="text-[15px] font-bold tracking-tight text-slate-900">{children}</h2>
    {count !== undefined && (
      <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-xs font-semibold text-slate-500 tabular-nums">
        {count}
      </span>
    )}
    <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></span>
  </div>
);

export default SectionTitle;
