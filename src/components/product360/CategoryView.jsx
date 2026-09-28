import React from 'react';
import { divIcon, p360Path } from '../../utils/product360';
import ListCard from './ListCard';
import SectionTitle from './SectionTitle';

function CategoryView({ base, seg, layer, cat, catIdx, theme }) {
  return (
    <div>
      <SectionTitle count={cat.divs.length}>Divisions</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {cat.divs.map((div, divIdx) => (
          <ListCard
            key={divIdx}
            to={p360Path(base, { seg, layer, catIdx, divIdx })}
            icon={divIcon(seg, cat, div)}
            title={div.name}
            theme={theme}
            index={divIdx}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryView;
