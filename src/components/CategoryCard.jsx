import React from 'react';
import { Link } from 'react-router-dom';
import CategoryVisual from './CategoryVisual';
import Icon from './Icon';

const CategoryCard = ({ category, index = 0 }) => {
  const count = category.products.length;
  const more = count - 3;
  const preview = category.products.slice(0, 3).map((p) => p.name).join(', ');

  return (
    <Link
      to={`/${category.id}`}
      style={{ '--accent': category.accent, animationDelay: `${index * 45}ms` }}
      className="group relative flex flex-col rounded-[28px] bg-white p-2 shadow-card ring-1 ring-slate-900/[0.06] transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift motion-safe:animate-fade-up"
    >
      <div className="relative">
        <CategoryVisual category={category} size={68} className="aspect-[4/3] rounded-[22px]" />

        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-black/5 backdrop-blur">
          {count} {count === 1 ? 'product' : 'products'}
        </span>

        <span className="absolute right-3 top-3 hidden h-9 w-9 items-center sm:flex justify-center rounded-full bg-white/85 text-slate-700 ring-1 ring-black/5 backdrop-blur transition duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:ring-transparent">
          <Icon name="ArrowUpRight" strokeWidth={2.4} className="h-4 w-4 transition duration-300 group-hover:rotate-45" />
        </span>
      </div>

      <div className="px-3 pb-2.5 pt-3.5">
        <h3 className="text-base font-bold tracking-tight text-slate-900">{category.name}</h3>
        <p className="mt-0.5 truncate text-[13px] text-slate-500">
          {preview}
          {more > 0 && <span className="text-slate-400"> +{more} more</span>}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
