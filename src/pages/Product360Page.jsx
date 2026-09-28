import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import categories from '../data/productCategories';
import Product360Sidebar from '../components/product360/Product360Sidebar';
import Product360Hero from '../components/product360/Product360Hero';
import OverviewView from '../components/product360/OverviewView';
import SegmentView from '../components/product360/SegmentView';
import CategoryView from '../components/product360/CategoryView';
import DivisionView from '../components/product360/DivisionView';
import { resolveP360, segTheme, p360Path } from '../utils/product360';

function Product360Page() {
  const params = useParams();
  const category = categories.find((c) => c.id === params.categoryId);
  const product = category?.products.find((p) => p.id === params.productId);

  if (!category) return <Navigate to="/" replace />;
  if (!product) return <Navigate to={`/${category.id}`} replace />;

  const base = `/${category.id}/${product.id}`;
  const loc = resolveP360(params);
  if (loc.invalid) return <Navigate to={p360Path(base, loc)} replace />;

  const ctx = { base, category, product, ...loc, theme: segTheme(loc.seg, loc.layer) };

  let view;
  if (loc.div) view = <DivisionView key={`${loc.seg}-${loc.layer}-${loc.catIdx}-${loc.divIdx}`} {...ctx} />;
  else if (loc.cat) view = <CategoryView {...ctx} />;
  else if (loc.seg) view = <SegmentView {...ctx} />;
  else view = <OverviewView {...ctx} />;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8 md:py-10 grid gap-8 lg:grid-cols-[288px_minmax(0,1fr)]">
        <Product360Sidebar {...ctx} />
        <main className="min-w-0">
          <Product360Hero {...ctx} />
          {view}
        </main>
      </div>
    </div>
  );
}

export default Product360Page;
