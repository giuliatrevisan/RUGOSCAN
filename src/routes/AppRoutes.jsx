import { Routes, Route } from 'react-router-dom';
import EpanetReport from '../features/epanetReport/EpanetReport';
import TutorialPage from '../features/tutorial/TutorialPage';
import EpanetDashboard  from '../features/dashboard/EpanetDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EpanetReport />} />
      
      <Route path="/tutorial" element={<TutorialPage />} />
      <Route path="/dashboards" element={<EpanetDashboard />} />
    </Routes>
  );
}
