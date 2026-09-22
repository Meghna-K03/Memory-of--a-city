import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CityDataProvider } from '@/context/CityDataContext';
import HomePage from '@/pages/HomePage';
import CityExplorerPage from '@/pages/CityExplorerPage';
import NeighborhoodPage from '@/pages/NeighborhoodPage';

export default function App() {
  return (
    <CityDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<CityExplorerPage />} />
          <Route path="/neighborhood/:id" element={<NeighborhoodPage />} />
        </Routes>
      </BrowserRouter>
    </CityDataProvider>
  );
}
