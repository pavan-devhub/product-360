import React from 'react';
import categories from '../data/productCategories';
import CategoryCard from '../components/CategoryCard';
import Icon from '../components/Icon';

const TOTAL_PRODUCTS = categories.reduce((sum, c) => sum + c.products.length, 0);

// Decorative floating tiles beside the hero text (large screens only)
const HERO_TILES = [
  { emoji: '🥭', left: '6%', top: '12%', size: 92, rotate: '-8deg', delay: '0s' },
  { emoji: '🌾', left: '44%', top: '0%', size: 76, rotate: '6deg', delay: '-1.5s' },
  { emoji: '🐟', left: '72%', top: '26%', size: 84, rotate: '10deg', delay: '-3s' },
  { emoji: '🌶️', left: '28%', top: '50%', size: 100, rotate: '-4deg', delay: '-4.5s' },
  { emoji: '☕', left: '66%', top: '70%', size: 70, rotate: '-10deg', delay: '-2.2s' },
];

const STATS = [
  { icon: 'LayoutGrid', value: categories.length, label: 'Categories' },
  { icon: 'ShoppingBasket', value: TOTAL_PRODUCTS, label: 'Products' },
  { icon: 'Rotate3d', value: '360°', label: 'Journey view' },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <header className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="pointer-events-none absolute -inset-x-6 -top-16 h-80 bg-dots mask-fade-b opacity-70"></div>

          <div className="relative motion-safe:animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-soft ring-1 ring-slate-900/5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60 motion-safe:animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
              </span>
              Farm-to-export product intelligence
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-6xl">
              Explore Agricultural{' '}
              <span className="bg-gradient-to-r from-brand-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              Browse our premium selection of fresh produce, spices, dairy, and more. Source high-quality products directly from verified suppliers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-2xl bg-white/80 py-2.5 pl-2.5 pr-5 shadow-soft ring-1 ring-slate-900/5 backdrop-blur"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-600/10">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-lg font-extrabold leading-tight tracking-tight text-slate-900 tabular-nums">{s.value}</span>
                    <span className="block text-xs font-medium text-slate-500">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div aria-hidden="true" className="relative hidden h-72 lg:block">
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-brand-200/60 via-amber-100/50 to-transparent blur-3xl"></div>
            {HERO_TILES.map((t) => (
              <div
                key={t.emoji}
                className="absolute flex items-center justify-center rounded-3xl bg-white/80 font-emoji shadow-card ring-1 ring-slate-900/5 backdrop-blur motion-safe:animate-float"
                style={{
                  left: t.left,
                  top: t.top,
                  width: t.size,
                  height: t.size,
                  fontSize: t.size * 0.5,
                  rotate: t.rotate,
                  animationDelay: t.delay,
                }}
              >
                {t.emoji}
              </div>
            ))}
          </div>
        </header>

        <div className="mb-6 mt-14 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Browse categories</h2>
            <p className="mt-1 text-sm text-slate-500">Pick a category to see its products.</p>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-500 tabular-nums">
            {categories.length} categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
