import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import Icon from './Icon';

// Back button with the breadcrumb trail beside it. `crumbs` is a list of
// { label, to }; the last one (to: null) is the current page.
const PageNav = ({ back, crumbs = [] }) => (
  <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
    <BackButton to={back} />

    {crumbs.length > 0 && (
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs font-medium md:text-[13px]">
          {crumbs.map((c, i) => (
            <li key={i} className="flex min-w-0 items-center gap-x-1.5">
              {i > 0 && <Icon name="ChevronRight" strokeWidth={2.5} className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
              {c.to ? (
                <Link to={c.to} className="max-w-[220px] truncate text-slate-500 transition hover:text-slate-900">
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="max-w-[260px] truncate rounded-full bg-white/85 px-2.5 py-0.5 font-semibold text-slate-900 shadow-soft ring-1 ring-slate-900/[0.08]"
                >
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )}
  </div>
);

export default PageNav;
