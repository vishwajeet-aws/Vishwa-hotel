import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BookingPage } from './pages/BookingPage';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RoomDetailsPage } from './pages/RoomDetailsPage';
import { RoomsPage } from './pages/RoomsPage';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
