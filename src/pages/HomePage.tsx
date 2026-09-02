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
import NumerologySection from '../components/sections/NumerologySection';
import VastuSection from '../components/sections/VastuSection';

export const HomePage: React.FC = () => {

  // ProfessionalService structured data (no fake address claim)
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.seo.siteUrl}/#professional-service`,
    name: siteConfig.name,
    description: 'Experienced Vedic Pandits offering authentic Mangal Dosh Puja, Mangal Bhat Puja, Kaal Sarp Dosh Puja, and related traditional puja services in Ujjain, Madhya Pradesh, India.',
    url: siteConfig.seo.siteUrl,
    logo: `${siteConfig.seo.siteUrl}/favicon.svg`,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    telephone: `+${siteConfig.whatsapp}`,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.2044',
      longitude: '75.7834',
    },
    areaServed: {
      '@type': 'City',
      name: 'Ujjain',
      containedInPlace: {
        '@type': 'State',
        name: 'Madhya Pradesh',
      },
    },
    serviceType: [
      'Mangal Dosh Puja',
      'Mangal Bhat Puja',
      'Kaal Sarp Dosh Puja',
      'Vedic Puja Services',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '06:00',
        closes: '21:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Puja Services in Ujjain',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mangal Dosh Puja Ujjain',
            url: `${siteConfig.seo.siteUrl}/mangal-dosh-puja-ujjain`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mangal Bhat Puja Ujjain',
            url: `${siteConfig.seo.siteUrl}/mangal-bhat-puja-ujjain`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaal Sarp Dosh Puja Ujjain',
            url: `${siteConfig.seo.siteUrl}/kaal-sarp-dosh-puja-ujjain`,
          },
        },
      ],
    },
  };

  // WebSite schema with SearchAction for Google Sitelinks Search Box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.seo.siteUrl}/#website`,
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
    description: siteConfig.seo.defaultDescription,
    inLanguage: ['en', 'hi'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.seo.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEOHead
        title={siteConfig.seo.defaultTitle}
        description={siteConfig.seo.defaultDescription}
        canonical={siteConfig.seo.siteUrl}
      />
      <StructuredData data={websiteSchema} />
      <StructuredData data={businessSchema} />

      <main role="main">
        <HeroSection />
        <PanditSection />
        <PujaServices />
        <TrustStats />
        <MangalDoshIntro />
        <WhyUjjain />
        <NumerologySection />
        <VastuSection />
        <HowPujaWorks />
        <HomeGallery />
        <ReelVideoSection />
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
