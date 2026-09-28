import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const ListCard = ({ to, icon, title, sub, theme, index = 0 }) => {
  return (
    <Link
      to={to}
      style={{ '--accent': theme.g2, animationDelay: `${Math.min(index, 14) * 30}ms` }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/90 p-4 shadow-soft ring-1 ring-slate-900/[0.06] transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_36px_-20px_var(--accent)] motion-safe:animate-fade-up"
    >
      <span
        className="absolute inset-y-3 left-0 w-1 origin-center scale-y-0 rounded-r-full transition duration-300 group-hover:scale-y-100"
        style={{ background: theme.gradient }}
      ></span>

      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition duration-300 group-hover:scale-105"
        style={{ background: theme.pale, boxShadow: `inset 0 0 0 1px ${theme.g2}22`, color: theme.g2 }}
      >
        <Icon name={icon} className="h-[22px] w-[22px]" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="line-clamp-2 text-[15px] font-semibold leading-snug text-slate-800 group-hover:text-slate-900">
          {title}
        </div>
        {sub && <div className="mt-1 text-xs font-medium text-slate-500">{sub}</div>}
      </div>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
        <Icon name="ChevronRight" strokeWidth={2.5} className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default ListCard;
