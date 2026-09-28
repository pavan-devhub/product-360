// Soft tinted background used behind category and product artwork
export const surface = (category) =>
  `radial-gradient(120% 90% at 20% 0%, #ffffff 0%, transparent 55%), linear-gradient(150deg, ${category.tint} 0%, ${category.accent}38 100%)`;

export const initials = (name) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

export const productIcon = (product, category) => product.emoji || category.emoji[0];
