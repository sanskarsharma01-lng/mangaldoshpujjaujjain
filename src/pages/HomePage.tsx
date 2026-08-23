import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { StructuredData } from '../components/seo/StructuredData';

// Lazy-loaded or direct sections
import HeroSection from '../components/sections/HeroSection';
import TrustStats from '../components/sections/TrustStats';
import MangalDoshIntro from '../components/sections/MangalDoshIntro';
import WhyUjjain from '../components/sections/WhyUjjain';
import PujaServices from '../components/sections/PujaServices';
import HowPujaWorks from '../components/sections/HowPujaWorks';
import HomeGallery from '../components/sections/HomeGallery';
import ReelVideoSection from '../components/sections/ReelVideoSection';
import PanditSection from '../components/sections/PanditSection';
import UjjainLocation from '../components/sections/UjjainLocation';
import MangalDoshChecker from '../components/sections/MangalDoshChecker';
import Testimonials from '../components/sections/Testimonials';
import FAQSection from '../components/sections/FAQSection';
import BlogSection from '../components/sections/BlogSection';
import FinalCTA from '../components/sections/FinalCTA';

export const HomePage: React.FC = () => {

  // LocalBusiness structured data schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.seo.siteUrl}/#local-business`,
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.seo.siteUrl,
    logo: `${siteConfig.seo.siteUrl}/favicon.svg`,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: siteConfig.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.2044', // Ujjain Mangalnath Coordinates
      longitude: '75.7834',
    },
    priceRange: '₹₹',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '21:00',
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={siteConfig.seo.defaultTitle}
        description={siteConfig.seo.defaultDescription}
        canonical={siteConfig.seo.siteUrl}
      />
      <StructuredData data={businessSchema} />

      <main role="main">
        <HeroSection />
        <TrustStats />
        <MangalDoshIntro />
        <WhyUjjain />
        <PujaServices />
        <HowPujaWorks />
        <HomeGallery />
        <ReelVideoSection />
        <PanditSection />
        <UjjainLocation />
        <MangalDoshChecker />
        <Testimonials />
        <FAQSection />
        <BlogSection />
        <FinalCTA />
      </main>
    </>
  );
};
export default HomePage;
