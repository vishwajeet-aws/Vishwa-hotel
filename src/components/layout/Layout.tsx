import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
