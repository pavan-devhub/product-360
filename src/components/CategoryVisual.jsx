import React, { useState } from 'react';
import { surface } from '../utils/visuals';

// Emoji sizes shrink with the tile (container query units) but never exceed `px`
const fit = (px, cqw) => `min(${px}px, ${cqw}cqw)`;

// Emoji cluster on a tinted surface. With `photo`, shows the category's real
// photo instead when one exists (white backgrounds blend into the tint).
const CategoryVisual = ({ category, size = 64, photo = false, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [hero, left, right] = category.emoji;
  const showPhoto = photo && category.image && !imgError;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: surface(category), containerType: 'inline-size' }}
    >
      <div className="absolute inset-0 bg-dots opacity-60 mask-radial"></div>

      {showPhoto ? (
        <img
          src={category.image}
          alt={category.name}
          className="relative h-[92%] w-auto max-w-[92%] object-contain mix-blend-multiply transition duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <div
            className="absolute rounded-full bg-white/75 blur-2xl"
            style={{ width: fit(size * 2, 60), height: fit(size * 2, 60) }}
          ></div>
          <span
            aria-hidden="true"
            className="absolute font-emoji leading-none opacity-90 motion-safe:animate-float"
            style={{ fontSize: fit(size * 0.42, 12), left: '11%', top: '44%', rotate: '-12deg', animationDelay: '-2s' }}
          >
            {left}
          </span>
          <span
            aria-hidden="true"
            className="absolute font-emoji leading-none opacity-90 motion-safe:animate-float"
            style={{ fontSize: fit(size * 0.46, 13), right: '14%', bottom: '15%', rotate: '10deg', animationDelay: '-4s' }}
          >
            {right}
          </span>
          <span
            role="img"
            aria-label={category.name}
            className="relative font-emoji leading-none drop-shadow-[0_14px_14px_rgba(15,23,42,0.18)] transition duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
            style={{ fontSize: fit(size, 30) }}
          >
            {hero}
          </span>
        </>
      )}
    </div>
  );
};

export default CategoryVisual;
