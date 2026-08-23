import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { faqs } from '../data/faqs';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { Accordion } from '../components/ui/Accordion';
import { StructuredData } from '../components/seo/StructuredData';
import FinalCTA from '../components/sections/FinalCTA';

export const FAQPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'About Mangal Dosh', 'Booking Process', 'Ujjain Visit', 'Remedies & Customs'];

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const canonical = `${siteConfig.seo.siteUrl}/faq`;
  const title = `Frequently Asked Questions | Mangal Dosh Puja Ujjain | ${siteConfig.name}`;
  const description = `Get answers to your queries about Mangal Dosh planetary alignments, traditional Mangal Bhat Puja in Ujjain, online booking processes, and traveling tips.`;

  // Structured data schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />
      <StructuredData data={faqSchema} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: t('nav.faqs') },
              ]}
            />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 शंका समाधान 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              {t('nav.faqs')}
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              Clear, transparent answers to your astrological and logistics questions.
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="py-8 bg-ivory">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 focus-visible:outline-none ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-ivory shadow-primary-sm'
                      : 'bg-white border-gold/20 text-text-dark hover:border-gold hover:bg-gold/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ list */}
        <section className="pb-20 bg-ivory">
          <div className="container-custom max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-glass border border-gold/10">
              <Accordion items={filteredFaqs} />
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
};
export default FAQPage;
