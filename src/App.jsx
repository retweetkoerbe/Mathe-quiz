import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModeLiebesZahlen from './pages/ModeLiebesZahlen';
import ModeRechenweg from './pages/ModeRechenweg';
import ModeZahlenstrahl from './pages/ModeZahlenstrahl';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="liebes-zahlen" element={<ModeLiebesZahlen />} />
        <Route path="rechenweg" element={<ModeRechenweg />} />
        <Route path="zahlenstrahl" element={<ModeZahlenstrahl />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
