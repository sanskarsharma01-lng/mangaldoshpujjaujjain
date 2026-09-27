import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookingProvider } from '../../contexts/BookingContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { BookingModal } from '../booking/BookingModal';
import { trackPageView } from '../../lib/analytics';

// Scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Track a GA4 page_view on every SPA route change
const PageTracker: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const fullPath = pathname + search;
    const title = document.title;
    // Small timeout ensures react-helmet-async has updated <title> first
    const timer = setTimeout(() => trackPageView(fullPath, document.title || title), 100);
    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
};


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <BookingProvider>
      <ScrollToTop />
      <PageTracker />
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
