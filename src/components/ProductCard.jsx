import React from 'react';
import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual';
import Icon from './Icon';

const ProductCard = ({ product, category, index = 0 }) => {
  return (
    <Link
      to={`/${category.id}/${product.id}`}
      style={{ '--accent': category.accent, animationDelay: `${Math.min(index, 18) * 35}ms` }}
      className="group relative flex flex-col rounded-3xl bg-white p-2 shadow-card ring-1 ring-slate-900/[0.06] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-safe:animate-fade-up"
    >
      <div className="relative">
        <ProductVisual product={product} category={category} size={62} className="aspect-square rounded-[20px]" />
        <span className="absolute right-2.5 top-2.5 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 ring-1 ring-black/5 backdrop-blur">
          360°
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 px-2 pb-1.5 pt-3">
        <h3 className="truncate text-[14.5px] font-semibold tracking-tight text-slate-800">{product.name}</h3>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
          <Icon name="ArrowRight" strokeWidth={2.6} className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
