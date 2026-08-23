import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import PanditSection from '../components/sections/PanditSection';
import WhyUjjain from '../components/sections/WhyUjjain';
import FinalCTA from '../components/sections/FinalCTA';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const canonical = `${siteConfig.seo.siteUrl}/about`;
  const title = `About Us | Authentic Vedic Puja Service in Ujjain | ${siteConfig.name}`;
  const description = `Learn about our authentic Vedic traditions, our experienced Pandits, and our commitment to conducting authentic Mangal Dosh Puja ceremonies in Ujjain.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: t('nav.about') },
              ]}
            />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 अस्मत् परिचयः 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              {t('nav.about')}
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              Rooted in scriptural heritage. Guided by devotion. Committed to authentic Vedic tradition.
            </p>
          </div>
        </div>

        {/* Section: Our Story */}
        <section className="section-padding bg-ivory relative overflow-hidden">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <ScrollReveal direction="up" delay={0.1}>
                  <span className="section-label">🔱 हमारी परंपरा</span>
                  <h2 className="section-title">Rooted in Vedic Heritage</h2>
                  <div className="gold-divider-left" />
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2} className="text-text-muted text-sm leading-relaxed space-y-4">
                  <p>
                    {siteConfig.name} represents a dedicated lineage of spiritual practitioners and pandits. We provide authentic, traditional booking coordination and ritual assistance for devotees seeking peace and resolution through ancient astrological practices.
                  </p>
                  <p>
                    We believe that puja is not merely a custom but a sacred connection. All our rituals are planned with meticulous adherence to scriptural guidelines (vidhi), accurate muhurat timings, and family lineage gotras.
                  </p>
                </ScrollReveal>
              </div>

              {/* Decorative side block */}
              <div className="lg:col-span-5 flex justify-center">
                <ScrollReveal direction="right" delay={0.2} className="w-full max-w-xs">
                  <div className="relative aspect-square rounded-3xl bg-primary-dark shadow-primary border border-gold/25 flex items-center justify-center p-8">
                    <span className="text-gold text-7xl select-none" aria-hidden="true">🕉</span>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Section: Our Mission & Values */}
        <section className="section-padding bg-cream/35 relative border-t border-b border-gold/10">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="section-title">Our Spiritual Values</h2>
                <div className="gold-divider" />
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Authenticity */}
              <div className="card-base text-center p-8 space-y-4">
                <span className="text-gold text-4xl block" aria-hidden="true">📜</span>
                <h3 className="text-xl font-poppins font-bold text-primary">Scriptural Authenticity</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  We guarantee strict adherence to traditional Vedic guidelines, mantra pronunciations, and puja procedures.
                </p>
              </div>

              {/* Devotee Trust */}
              <div className="card-base text-center p-8 space-y-4">
                <span className="text-gold text-4xl block" aria-hidden="true">🤝</span>
                <h3 className="text-xl font-poppins font-bold text-primary">Trust & Transparency</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Transparent package features, fixed pricing, and full booking coordination. No hidden charges.
                </p>
              </div>

              {/* Sacred Ujjain */}
              <div className="card-base text-center p-8 space-y-4">
                <span className="text-gold text-4xl block" aria-hidden="true">🔱</span>
                <h3 className="text-xl font-poppins font-bold text-primary">Spiritual Service</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Complete devotee support, from initial horoscope checking to sending prasad at your home.
                </p>
              </div>
            </div>

          </div>
        </section>

        <PanditSection />
        <WhyUjjain />
        <FinalCTA />
      </main>
    </>
  );
};
export default AboutPage;
