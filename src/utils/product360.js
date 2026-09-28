import { TREE, SEGMETA, GRAD, SEG_ORDER, LAYER_ORDER } from '../data/product360Data';
import { nodeIcon } from './iconRules';

export { TREE, SEGMETA, SEG_ORDER, LAYER_ORDER };
export { SEGMENT_ICONS, LAYER_ICONS } from './iconRules';

// Lucide icon names for tree nodes, chosen from their names (see iconRules)
export const catIcon = (seg, cat) => nodeIcon(cat, seg);
export const divIcon = (seg, cat, div) => nodeIcon(div, seg, catIcon(seg, cat));

export const segTheme = (seg = 'FarmGate', layer = 'PRODUCT') => {
  const g = GRAD[`${seg}|${layer}`];
  return {
    ...g,
    gradient: `linear-gradient(120deg, ${g.g1}, ${g.g2})`,
    pale: `${g.g2}1a`,
    glow: `0 14px 30px -12px ${g.g2}`,
  };
};

// Flattened indexes, used for totals and search
export const ALL_CATS = SEG_ORDER.flatMap((seg) =>
  LAYER_ORDER.flatMap((layer) =>
    TREE[seg][layer].map((cat, catIdx) => ({ seg, layer, cat, catIdx }))
  )
);

export const ALL_DIVS = ALL_CATS.flatMap((entry) =>
  entry.cat.divs.map((div, divIdx) => ({ ...entry, div, divIdx }))
);

export const divCount = (seg, layer) =>
  ALL_DIVS.filter((d) => d.seg === seg && (!layer || d.layer === layer)).length;

// Categories and divisions are addressed by 1-based position in the URL,
// since division `num` is null for every Exports division.
export const p360Path = (base, { seg, layer = 'PRODUCT', catIdx, divIdx } = {}) => {
  if (!seg) return base;
  let path = `${base}/${seg.toLowerCase()}/${layer.toLowerCase()}`;
  if (catIdx !== undefined) path += `/${catIdx + 1}`;
  if (divIdx !== undefined) path += `/${divIdx + 1}`;
  return path;
};

const fromSlug = (list, slug) => list.find((item) => item.toLowerCase() === slug?.toLowerCase());

// Turns route params into tree nodes. On a bad param, returns the deepest
// valid location with `invalid: true` so the page can redirect there.
export function resolveP360({ seg: segSlug, layer: layerSlug, catNum, divNum, partId }) {
  if (!segSlug) return {};

  const seg = fromSlug(SEG_ORDER, segSlug);
  if (!seg) return { invalid: true };

  const layer = fromSlug(LAYER_ORDER, layerSlug);
  if (!layer) return { seg, invalid: true };
  if (!catNum) return { seg, layer };

  const catIdx = Number(catNum) - 1;
  const cat = TREE[seg][layer][catIdx];
  if (!cat) return { seg, layer, invalid: true };
  if (!divNum) return { seg, layer, cat, catIdx };

  const divIdx = Number(divNum) - 1;
  const div = cat.divs[divIdx];
  if (!div) return { seg, layer, cat, catIdx, invalid: true };

  // Part pages were removed; old part links fall back to their division
  if (partId) return { seg, layer, cat, catIdx, div, divIdx, invalid: true };
  return { seg, layer, cat, catIdx, div, divIdx };
}
