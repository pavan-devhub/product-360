import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import Icon from './Icon';

// Back button with the breadcrumb trail beside it. `crumbs` is a list of
// { label, to }; the last one (to: null) is the current page, filled with
// `accent` (any CSS background, e.g. the segment gradient).
const PageNav = ({ back, crumbs = [], accent = '#039855' }) => (
  <div className="mb-6 flex items-start gap-3">
    <BackButton to={back} />

    {crumbs.length > 0 && (
      <nav
        aria-label="Breadcrumb"
        className="flex min-h-10 min-w-0 items-center rounded-[20px] bg-white/85 px-2 py-1.5 shadow-soft ring-1 ring-slate-900/[0.08] backdrop-blur"
      >
        <ol className="flex flex-wrap items-center gap-x-0.5 gap-y-1 text-xs font-semibold md:text-[13px]">
          {crumbs.map((c, i) => (
            <li key={i} className="flex min-w-0 items-center gap-x-0.5">
              {i > 0 && <Icon name="ChevronRight" strokeWidth={2.5} className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
              {c.to ? (
                <Link
                  to={c.to}
                  className="inline-flex max-w-[220px] items-center gap-1.5 rounded-full px-2 py-1 text-slate-600 transition hover:bg-slate-900/[0.06] hover:text-slate-900"
                >
                  {i === 0 && <Icon name="House" strokeWidth={2.25} className="h-3.5 w-3.5 shrink-0" />}
                  <span className="truncate">{c.label}</span>
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="max-w-[260px] truncate rounded-full px-3 py-1 font-bold text-white shadow-soft"
                  style={{ background: accent }}
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
