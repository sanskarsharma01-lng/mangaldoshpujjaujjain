import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookingProvider } from '../../contexts/BookingContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { BookingModal } from '../booking/BookingModal';

// Scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <BookingProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <FloatingCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  );
};
export default Layout;
