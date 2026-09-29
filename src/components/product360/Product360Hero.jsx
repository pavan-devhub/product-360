import React from 'react';
import { SEGMETA, SEGMENT_ICONS, catIcon, divIcon, p360Path } from '../../utils/product360';
import { productIcon } from '../../utils/visuals';
import PageNav from '../PageNav';
import Icon from '../Icon';

// Title, icon, crumbs and back-link for whichever level of the tree is showing.
// `icon` is a Lucide name; the overview uses the product's `emoji` artwork instead.
function heroContent({ base, category, product, seg, layer, cat, catIdx, div }) {
  const segPath = p360Path(base, { seg, layer });
  const catPath = p360Path(base, { seg, layer, catIdx });

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: category.name, to: `/${category.id}` },
    { label: product.name, to: base },
  ];
  if (seg) crumbs.push({ label: `${seg} · ${layer}`, to: segPath });
  if (cat) crumbs.push({ label: cat.name, to: div ? catPath : null });
  if (div) crumbs.push({ label: div.name, to: null });

  if (div) {
    return { crumbs, back: catPath, icon: divIcon(seg, cat, div), eyebrow: `${seg} / ${layer} / ${cat.name}`, title: div.name };
  }
  if (cat) {
    return { crumbs, back: segPath, icon: catIcon(seg, cat), eyebrow: `${seg} / ${layer} / Category ${catIdx + 1}`, title: cat.name, subtitle: `${cat.divs.length} Divisions` };
  }
  if (seg) {
    return { crumbs, back: base, icon: SEGMENT_ICONS[seg], eyebrow: `${product.name} · ${SEGMETA[seg].journey}`, title: seg, subtitle: SEGMETA[seg].sub };
  }
  return { crumbs, back: `/${category.id}`, emoji: productIcon(product, category), eyebrow: 'నమస్కారం 🙏', title: 'SAFE Mission — Product 360', subtitle: `${product.name} · ${category.name}` };
}

function Product360Hero(props) {
  const { theme } = props;
  const { crumbs, back, icon, emoji, eyebrow, title, subtitle } = heroContent(props);

  return (
    <>
      <PageNav back={back} crumbs={crumbs} accent={theme.gradient} />

      <section
        className="relative isolate mb-8 overflow-hidden rounded-[32px] text-white shadow-lift motion-safe:animate-fade-up"
        style={{ background: `linear-gradient(135deg, ${theme.g1} 0%, ${theme.g2} 100%)` }}
      >
        {/* Depth: accent glow, shadowed corner, dot texture, watermark icon */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(38rem 22rem at 100% 0%, ${theme.accent}66, transparent 60%), radial-gradient(30rem 20rem at 0% 110%, rgb(0 0 0 / 0.28), transparent 60%)`,
          }}
        ></div>
        <div className="absolute inset-0 -z-10 bg-dots-light mask-fade-b opacity-60"></div>
        {emoji ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -right-4 -z-10 select-none font-emoji text-[190px] leading-none opacity-[0.16] md:text-[230px]"
            style={{ rotate: '-12deg' }}
          >
            {emoji}
          </div>
        ) : (
          <Icon
            name={icon}
            strokeWidth={0.9}
            className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-52 w-52 text-white opacity-[0.13] md:h-64 md:w-64"
            style={{ rotate: '-10deg' }}
          />
        )}

        <div className="relative p-6 md:p-9">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] ring-1 ring-white/25 backdrop-blur-md">
              {emoji ? <span className="font-emoji text-4xl">{emoji}</span> : <Icon name={icon} className="h-8 w-8" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">{eyebrow}</div>
              <h1 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight md:text-[34px]">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-white/80 md:text-base">{subtitle}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product360Hero;
