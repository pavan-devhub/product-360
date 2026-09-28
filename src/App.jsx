import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';

// Split out so the large Product 360 dataset only loads when a product is opened
const Product360Page = lazy(() => import('./pages/Product360Page'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:categoryId" element={<CategoryPage />} />
        <Route
          path="/:categoryId/:productId/:seg?/:layer?/:catNum?/:divNum?/:partId?"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Product360Page />
            </Suspense>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

