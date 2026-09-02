import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/layout/Layout';

// Lazy loading all pages for optimal performance and code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Service Pages
const MangalDoshPujaPage = lazy(() => import('./pages/services/MangalDoshPujaPage'));
const MangalBhatPujaPage = lazy(() => import('./pages/services/MangalBhatPujaPage'));
const MangalShantiPage = lazy(() => import('./pages/services/MangalShantiPage'));
const NavgrahaShantiPage = lazy(() => import('./pages/services/NavgrahaShantiPage'));
const RudrabhishekPage = lazy(() => import('./pages/services/RudrabhishekPage'));
const MahakaleshwarPujaPage = lazy(() => import('./pages/services/MahakaleshwarPujaPage'));
const MahamrityunjayaJaapPage = lazy(() => import('./pages/services/MahamrityunjayaJaapPage'));
const KaalSarpDoshPujaPage = lazy(() => import('./pages/services/KaalSarpDoshPujaPage'));
const BaglamukhiHavanPage = lazy(() => import('./pages/services/BaglamukhiHavanPage'));
const PitraDoshNivaranPage = lazy(() => import('./pages/services/PitraDoshNivaranPage'));
const BatukBhairavPujaPage = lazy(() => import('./pages/services/BatukBhairavPujaPage'));

// Legal & Fallbacks
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PujaPackagesPage = lazy(() => import('./pages/PujaPackagesPage'));

// Elegant loading fallback
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-ivory flex flex-col justify-center items-center gap-4">
    <span className="text-gold text-5xl animate-float select-none" aria-hidden="true">🕉</span>
    <p className="text-primary font-poppins font-medium text-sm tracking-widest uppercase">Loading sacred space...</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              
              {/* Services */}
              <Route path="/mangal-dosh-puja-ujjain" element={<MangalDoshPujaPage />} />
              <Route path="/mangal-bhat-puja-ujjain" element={<MangalBhatPujaPage />} />
              <Route path="/mangal-shanti-puja" element={<MangalShantiPage />} />
              <Route path="/navgraha-shanti-puja" element={<NavgrahaShantiPage />} />
              <Route path="/rudrabhishek" element={<RudrabhishekPage />} />
              <Route path="/mahakaleshwar-puja-ujjain" element={<MahakaleshwarPujaPage />} />
              <Route path="/mahamrityunjaya-jaap-ujjain" element={<MahamrityunjayaJaapPage />} />
              <Route path="/kaal-sarp-dosh-puja-ujjain" element={<KaalSarpDoshPujaPage />} />
              <Route path="/baglamukhi-havan-ujjain" element={<BaglamukhiHavanPage />} />
              <Route path="/pitra-dosh-nivaran-puja" element={<PitraDoshNivaranPage />} />
              <Route path="/batuk-bhairav-puja-ujjain" element={<BatukBhairavPujaPage />} />

              {/* Core Pages */}
              <Route path="/puja-packages" element={<PujaPackagesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<GalleryPage />} />

              {/* Blog */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              {/* Legal */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </LanguageProvider>
    </HelmetProvider>
  );
};
export default App;
