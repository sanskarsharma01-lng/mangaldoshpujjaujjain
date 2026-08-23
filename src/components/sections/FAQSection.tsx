import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { faqs } from '../../data/faqs';
import { Accordion } from '../ui/Accordion';
import { StructuredData } from '../seo/StructuredData';
import { ScrollReveal } from '../ui/ScrollReveal';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();

  // Show only first 5 FAQs on homepage
  const displayedFaqs = faqs.slice(0, 5);

  // Generate structured FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding bg-ivory relative overflow-hidden" id="homepage-faq">
      <StructuredData data={faqSchema} />
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">❓</span> संदेह निवारण
            </span>
            <h2 className="section-title">
              {t('faq.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              Find answers to common questions about Mangal Dosh, Mangal Bhat Puja, and the booking process.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" delay={0.2}>
            <Accordion items={displayedFaqs} />
          </ScrollReveal>

          {/* View All CTA */}
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-12">
            <Link to="/faq" className="btn-outline-gold">
              View All FAQs
            </Link>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
export default FAQSection;
