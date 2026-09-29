import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import categories from '../data/productCategories';
import PageNav from '../components/PageNav';
import CategoryVisual from '../components/CategoryVisual';
import ProductCard from '../components/ProductCard';
import { surface } from '../utils/visuals';

function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const count = category.products.length;

  return (
    <div className="min-h-screen">
      <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-10">
        <PageNav
          back="/"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: category.name, to: null },
          ]}
        />

        <header
          className="relative mb-10 overflow-hidden rounded-[32px] shadow-card ring-1 ring-slate-900/[0.06] motion-safe:animate-fade-up"
          style={{ background: surface(category) }}
        >
          <div className="absolute inset-0 bg-dots opacity-50 mask-fade-b"></div>
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: category.accent }}
          ></div>

          <div className="relative grid items-center gap-8 p-7 md:grid-cols-[minmax(0,1fr)_300px] md:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-black/5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: category.accent }}></span>
                Category
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-slate-900 md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                {count} {count === 1 ? 'product' : 'products'} available
              </p>
            </div>

            <CategoryVisual
              category={category}
              photo
              size={84}
              className="hidden h-52 rounded-3xl bg-white/40 ring-1 ring-white/70 md:flex"
            />
          </div>
        </header>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Products</h2>
            <p className="mt-1 text-sm text-slate-500">Open any product to explore its 360° journey.</p>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-500 tabular-nums">
            {count} items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {category.products.map((product, i) => (
            <ProductCard key={product.id} product={product} category={category} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;
