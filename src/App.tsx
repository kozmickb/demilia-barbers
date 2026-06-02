import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AccessGate from './gate/AccessGate';
import { SiteLayout } from './layouts/SiteLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import { BrentwoodSalonPage, UpminsterSalonPage } from './pages/SalonPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <AccessGate>
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="brentwoodsalon" element={<BrentwoodSalonPage />} />
          <Route path="upminstersalon" element={<UpminsterSalonPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
    </AccessGate>
  );
}
