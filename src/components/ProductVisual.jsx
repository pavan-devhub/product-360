import React, { useState } from 'react';
import { initials, surface } from '../utils/visuals';

// Product artwork: a photo if one is set, else the product's emoji, else a
// monogram medallion in the category's accent colour.
const ProductVisual = ({ product, category, size = 56, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  let art;
  if (product.image && !imgError) {
    art = (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={() => setImgError(true)}
      />
    );
  } else if (product.emoji) {
    art = (
      <span
        role="img"
        aria-label={product.name}
        className="relative font-emoji leading-none drop-shadow-[0_12px_12px_rgba(15,23,42,0.18)] transition duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
        style={{ fontSize: size }}
      >
        {product.emoji}
      </span>
    );
  } else {
    art = (
      <span
        aria-hidden="true"
        className="relative flex items-center justify-center rounded-full bg-white/85 font-extrabold tracking-tight shadow-card ring-1 ring-black/5 transition duration-500 ease-out group-hover:scale-110"
        style={{ width: size * 1.45, height: size * 1.45, fontSize: size * 0.5, color: category.accent }}
      >
        {initials(product.name)}
      </span>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: surface(category) }}
    >
      <div className="absolute inset-0 bg-dots opacity-50 mask-radial"></div>
      <div
        className="absolute rounded-full bg-white/70 blur-2xl"
        style={{ width: size * 1.8, height: size * 1.8 }}
      ></div>
      {art}
    </div>
  );
};

export default ProductVisual;
