import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEGMETA, SEG_ORDER, SEGMENT_ICONS, ALL_DIVS, divCount, segTheme, p360Path } from '../../utils/product360';
import Icon from '../Icon';
import ProductVisual from '../ProductVisual';
import { surface } from '../../utils/visuals';

const NavItem = ({ to, active, icon, label, sub, count, theme }) => (
  <Link
    to={to}
    aria-current={active ? 'page' : undefined}
    className={`group relative flex min-w-[200px] shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 transition duration-300 lg:min-w-0 ${active ? 'text-white' : 'text-slate-700 hover:bg-slate-900/[0.03]'}`}
    style={active ? { background: theme.gradient, boxShadow: theme.glow } : undefined}
  >
    <span
      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300 ${active ? 'bg-white/20 ring-1 ring-white/30' : 'bg-white shadow-soft ring-1 ring-slate-900/[0.07] group-hover:scale-105'}`}
      style={active ? undefined : { color: theme.g2 }}
    >
      <Icon name={icon} className="h-5 w-5" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-bold tracking-tight">{label}</span>
      <span className={`block truncate text-xs ${active ? 'text-white/75' : 'text-slate-400'}`}>{sub}</span>
    </span>
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${active ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}
    >
      {count}
    </span>
  </Link>
);

function Product360Sidebar({ base, category, product, seg, layer }) {
  const navRef = useRef(null);

  // On narrow screens the nav scrolls sideways; keep the active segment in view
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector('[aria-current="page"]');
    if (!active) return;
    nav.scrollLeft += active.getBoundingClientRect().left - nav.getBoundingClientRect().left - 8;
  }, [seg]);

  return (
    <aside className="min-w-0 space-y-5 self-start lg:sticky lg:top-6">
      <div
        className="relative overflow-hidden rounded-[28px] p-4 shadow-card ring-1 ring-slate-900/[0.06] motion-safe:animate-fade-up"
        style={{ background: surface(category) }}
      >
        <div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: category.accent }}
        ></div>
        <div className="relative flex items-center gap-4 lg:block">
          <ProductVisual
            product={product}
            category={category}
            size={40}
            className="h-16 w-16 shrink-0 rounded-2xl bg-white/50 ring-1 ring-white/80 lg:hidden"
          />
          <ProductVisual
            product={product}
            category={category}
            size={76}
            className="hidden h-44 w-full rounded-[22px] ring-1 ring-white/80 lg:flex"
          />
          <div className="min-w-0 lg:mt-4 lg:px-1 lg:pb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: category.accent }}></span>
              Product 360
            </span>
            <div className="mt-1.5 truncate text-2xl font-extrabold tracking-tight text-slate-900">{product.name}</div>
            <Link
              to={`/${category.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <span className="font-emoji">{category.emoji[0]}</span>
              {category.name}
            </Link>
          </div>
        </div>
      </div>

      <nav className="surface-card p-3 motion-safe:animate-fade-up" style={{ animationDelay: '80ms' }}>
        <div className="eyebrow px-3 pb-3 pt-1.5">Journey</div>
        <div ref={navRef} className="scrollbar-none flex gap-1.5 overflow-x-auto lg:flex-col">
          <NavItem
            to={base}
            active={!seg}
            icon="LayoutGrid"
            label="Overview"
            sub="All stages"
            count={ALL_DIVS.length}
            theme={segTheme()}
          />

          <div className="relative flex gap-1.5 lg:flex-col">
            {/* Connector line running behind the step icons */}
            <span className="absolute bottom-7 left-[32px] top-7 hidden w-px bg-gradient-to-b from-slate-200 via-slate-200 to-slate-100 lg:block"></span>
            {SEG_ORDER.map((s) => (
              <NavItem
                key={s}
                to={p360Path(base, { seg: s })}
                active={seg === s}
                icon={SEGMENT_ICONS[s]}
                label={SEGMETA[s].label}
                sub={SEGMETA[s].journey}
                count={divCount(s)}
                theme={segTheme(s, seg === s ? layer : 'PRODUCT')}
              />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Product360Sidebar;
