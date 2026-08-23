import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import PujaPackages from '../components/sections/PujaPackages';
import PackageComparison from '../components/sections/PackageComparison';
import FAQSection from '../components/sections/FAQSection';
import FinalCTA from '../components/sections/FinalCTA';

export const PackagesPage: React.FC = () => {
  const { t } = useLanguage();

  const canonical = `${siteConfig.seo.siteUrl}/puja-packages`;
  const title = `Mangal Dosh Puja Packages & Options in Ujjain | ${siteConfig.name}`;
  const description = `Explore puja packages (Basic, Standard, Premium) for Mangal Dosh Puja and Mangal Bhat Puja in Ujjain. Complete ritual arrangements.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb section banner */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: t('nav.pujaPackages') },
              ]}
            />
          </div>
        </div>

        {/* Compact Banner Title */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-3">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 वैदिक पूजा संकुल 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              {t('nav.pujaPackages')} & Options
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              Detailed package breakdowns and feature comparisons for all Vedic ritual options in Ujjain.
            </p>
          </div>
        </div>

        {/* Main Content Sections */}
        <PujaPackages />
        <PackageComparison />
        <FAQSection />
        <FinalCTA />
      </main>
    </>
  );
};
export default PackagesPage;
