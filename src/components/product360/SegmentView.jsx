import React from 'react';
import { Link } from 'react-router-dom';
import { TREE, LAYER_ORDER, LAYER_ICONS, divCount, segTheme, catIcon, p360Path } from '../../utils/product360';
import Icon from '../Icon';
import ListCard from './ListCard';
import SectionTitle from './SectionTitle';

function SegmentView({ base, seg, layer, theme }) {
  const cats = TREE[seg][layer];

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 gap-1 rounded-2xl bg-white/80 p-1.5 shadow-soft ring-1 ring-slate-900/[0.06] backdrop-blur sm:inline-grid">
        {LAYER_ORDER.map((l) => {
          const active = l === layer;
          const t = segTheme(seg, l);
          return (
            <Link
              key={l}
              to={p360Path(base, { seg, layer: l })}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition duration-300 ${active ? 'text-white' : 'text-slate-500 hover:bg-slate-900/[0.03] hover:text-slate-800'}`}
              style={active ? { background: t.gradient, boxShadow: t.glow } : undefined}
            >
              <Icon name={LAYER_ICONS[l]} className="h-4 w-4" strokeWidth={2.2} />
              {l}
              <span className={`rounded-full px-1.5 py-px text-[11px] tabular-nums ${active ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                {divCount(seg, l)}
              </span>
            </Link>
          );
        })}
      </div>

      <SectionTitle count={cats.length}>Categories</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {cats.map((cat, catIdx) => (
          <ListCard
            key={`${layer}-${catIdx}`}
            to={p360Path(base, { seg, layer, catIdx })}
            icon={catIcon(seg, cat)}
            title={cat.name}
            sub={`${cat.divs.length} Divisions`}
            theme={theme}
            index={catIdx}
          />
        ))}
      </div>
    </div>
  );
}

export default SegmentView;
