import { Routes, Route } from 'react-router-dom';
import EpanetReport from '../features/epanetReport/EpanetReport';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EpanetReport />} />
    </Routes>
  );
}
