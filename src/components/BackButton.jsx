import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

// Always goes up one level (division → category → segment → product →
// category page → home), however the current page was reached. Browser
// history isn't used, so sideways moves (another division, the layer
// toggle, the sidebar, search) don't change where Back leads.
const BackButton = ({ to = '/' }) => (
  <Link
    to={to}
    className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white/85 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-slate-700 shadow-soft ring-1 ring-slate-900/[0.08] backdrop-blur transition hover:bg-white hover:text-slate-900 hover:shadow-card"
  >
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/5 transition group-hover:bg-slate-900 group-hover:text-white">
      <Icon name="ArrowLeft" strokeWidth={2.5} className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
    </span>
    Back
  </Link>
);

export default BackButton;
