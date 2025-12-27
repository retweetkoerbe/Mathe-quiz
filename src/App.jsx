'use client';

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GamePage from './pages/GamePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GamePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
