import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TREE, SEGMETA, SEG_ORDER, LAYER_ICONS, SEGMENT_ICONS,
  ALL_CATS, ALL_DIVS, divCount, segTheme, catIcon, divIcon, p360Path,
} from '../../utils/product360';
import { productIcon } from '../../utils/visuals';
import Icon from '../Icon';
import ListCard from './ListCard';
import SectionTitle from './SectionTitle';

const SEARCH_LIMIT = { cats: 10, divs: 30 };

function useSearch(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const has = (s) => String(s ?? '').toLowerCase().includes(q);
    return {
      cats: ALL_CATS.filter(({ cat }) => has(cat.name)),
      divs: ALL_DIVS.filter(({ div }) => has(div.name)),
    };
  }, [query]);
}

const limitLabel = (list, limit) =>
  list.length > limit ? `${limit} of ${list.length}` : list.length;

// `icon` is a Lucide name; `emoji` is used instead for product artwork
const StatTile = ({ icon, emoji, value, label, tint, color, index }) => (
  <div
    className="surface-card flex items-center gap-4 p-4 motion-safe:animate-fade-up"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{ background: tint, color, boxShadow: `inset 0 0 0 1px ${color}1f` }}
    >
      {emoji ? <span className="font-emoji text-xl">{emoji}</span> : <Icon name={icon} className="h-5 w-5" />}
    </span>
    <span className="min-w-0">
      <span className="block truncate text-2xl font-extrabold leading-tight tracking-tight text-slate-900 tabular-nums">{value}</span>
      <span className="block text-xs font-medium text-slate-500">{label}</span>
    </span>
  </div>
);

const SegmentCard = ({ base, seg, index }) => {
  const theme = segTheme(seg, 'PRODUCT');
  const meta = SEGMETA[seg];

  return (
    <Link
      to={p360Path(base, { seg })}
      className="group relative isolate overflow-hidden rounded-[28px] p-6 text-white shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-safe:animate-fade-up"
      style={{
        '--c': theme.g1,
        background: `linear-gradient(135deg, ${theme.g1} 0%, ${theme.g2} 100%)`,
        animationDelay: `${120 + index * 60}ms`,
      }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(26rem 16rem at 100% 0%, ${theme.accent}59, transparent 60%)` }}
      ></div>
      <div className="absolute inset-0 -z-10 bg-dots-light mask-fade-b opacity-50"></div>
      <Icon
        name={SEGMENT_ICONS[seg]}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-7 -right-5 -z-10 h-40 w-40 text-white opacity-[0.16] transition duration-500 group-hover:-rotate-6 group-hover:scale-110"
      />

      <div className="flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] ring-1 ring-white/25 backdrop-blur-md">
          <Icon name={SEGMENT_ICONS[seg]} className="h-7 w-7" />
        </span>
        <span className="text-5xl font-extrabold leading-none tracking-tighter text-white/15 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">{meta.journey}</div>
        <div className="mt-1 text-2xl font-extrabold tracking-tight">{seg}</div>
        <div className="mt-1 text-sm text-white/80">{meta.sub}</div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <span className="rounded-full bg-white/20 px-3 py-1 ring-1 ring-white/20">{divCount(seg)} Divisions</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
            <Icon name={LAYER_ICONS.PRODUCT} className="h-3.5 w-3.5" strokeWidth={2.2} /> {TREE[seg].PRODUCT.length}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
            <Icon name={LAYER_ICONS.ENTERPRISE} className="h-3.5 w-3.5" strokeWidth={2.2} /> {TREE[seg].ENTERPRISE.length}
          </span>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 transition duration-300 group-hover:bg-white group-hover:text-[var(--c)]">
          <Icon name="ArrowRight" strokeWidth={2.5} className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

const SearchResults = ({ base, results }) => {
  if (!results.cats.length && !results.divs.length) {
    return (
      <div className="surface-card flex flex-col items-center gap-2 border-2 border-dashed border-slate-200 bg-white/60 p-12 text-center shadow-none">
        <span className="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Icon name="ScanSearch" className="h-7 w-7" />
        </span>
        <span className="font-semibold text-slate-700">No matches found</span>
        <span className="text-sm text-slate-500">Try a different category or division name.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {results.cats.length > 0 && (
        <section>
          <SectionTitle count={limitLabel(results.cats, SEARCH_LIMIT.cats)}>Categories</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {results.cats.slice(0, SEARCH_LIMIT.cats).map((r, i) => (
              <ListCard
                key={`${r.seg}-${r.layer}-${r.catIdx}`}
                to={p360Path(base, r)}
                icon={catIcon(r.seg, r.cat)}
                title={r.cat.name}
                sub={`${r.seg} / ${r.layer} · ${r.cat.divs.length} Divisions`}
                theme={segTheme(r.seg, r.layer)}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {results.divs.length > 0 && (
        <section>
          <SectionTitle count={limitLabel(results.divs, SEARCH_LIMIT.divs)}>Divisions</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {results.divs.slice(0, SEARCH_LIMIT.divs).map((r, i) => (
              <ListCard
                key={`${r.seg}-${r.layer}-${r.catIdx}-${r.divIdx}`}
                to={p360Path(base, r)}
                icon={divIcon(r.seg, r.cat, r.div)}
                title={r.div.name}
                sub={`${r.seg} / ${r.layer} / ${r.cat.name}`}
                theme={segTheme(r.seg, r.layer)}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

function OverviewView({ base, category, product }) {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const inputRef = useRef(null);

  // "/" jumps to the search box, as on most modern sites
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <label className="group mb-8 flex h-14 items-center gap-3 rounded-2xl bg-white/90 px-5 shadow-card ring-1 ring-slate-900/[0.08] backdrop-blur transition focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/40">
        <Icon name="Search" strokeWidth={2.2} className="h-5 w-5 shrink-0 text-slate-400 transition group-focus-within:text-brand-600" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Category, Division వెతకండి…"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
        />
        <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-sans text-[11px] font-semibold text-slate-400 sm:inline-block">
          /
        </kbd>
      </label>

      {results ? (
        <SearchResults base={base} results={results} />
      ) : (
        <>
          <div className="mb-10 grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatTile index={0} icon="Waypoints" value={SEG_ORDER.length} label="Segments" tint="#ecfdf3" color="#039855" />
            <StatTile index={1} icon="FolderTree" value={ALL_CATS.length} label="Categories" tint="#fef6e7" color="#d97706" />
            <StatTile index={2} icon="Layers" value={ALL_DIVS.length} label="Divisions" tint="#f1efff" color="#7c3aed" />
            <StatTile index={3} emoji={productIcon(product, category)} value={product.name} label="Product" tint={category.tint} color={category.accent} />
          </div>

          <SectionTitle count={SEG_ORDER.length}>సెగ్మెంట్‌లు ఎంచుకోండి</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            {SEG_ORDER.map((seg, i) => (
              <SegmentCard key={seg} base={base} seg={seg} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OverviewView;
