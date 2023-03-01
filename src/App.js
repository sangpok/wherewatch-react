import { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MainPage = lazy(() => import('./Pages/MainPage'));
const SearchResultPage = lazy(() => import('./Pages/SearchResultPage'));
const DetailPage = lazy(() => import('./Pages/DetailPage'));
const TestPage = lazy(() => import('./Pages/TestPage'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>흐으음</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
