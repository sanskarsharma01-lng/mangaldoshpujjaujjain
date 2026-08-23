import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ScrollReveal } from '../ui/ScrollReveal';

export const UjjainLocation: React.FC = () => {
  const { t } = useLanguage();

  const handleMapClick = () => {
    trackEvent('call_clicked', { source: 'location_map_link' });
  };

  return (
    <section className="section-padding bg-ivory relative overflow-hidden" id="ujjain-location">
      <div className="container-custom relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Location Info & Text */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="section-label">
                <span aria-hidden="true">📍</span> सिद्ध पीठ उज्जैन
              </span>
              <h2 className="section-title">
                {t('location.sectionTitle')}
              </h2>
              <div className="gold-divider-left" />
              <p className="text-warm-brown font-serif text-lg font-medium tracking-wide">
                📍 Ujjain, Madhya Pradesh, India — The Center of Mars Cosmology
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="text-text-muted text-sm leading-relaxed space-y-4">
              <p>
                In Hindu cosmography, Ujjain is traditionally regarded as the geographical coordinates representing the origin of Mars (Mangal Dev). The Mangalnath Temple, located on the serene banks of the sacred Shipra River, is considered a primary site dedicated to planetary worship.
              </p>
              <p>
                According to the Matsya Purana, the sacred land of Ujjain was where Lord Mangal was born. Because of this profound historical and scriptural association, performing Mangal Dosh Nivaran and Mangal Bhat puja rituals here is considered highly auspicious by devotees.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="pt-2">
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMapClick}
                className="btn-outline-gold"
              >
                {t('location.viewLocation')}
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column: Decorative Sacred representation */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="right" delay={0.2} className="w-full max-w-sm">
              <div className="relative aspect-video sm:aspect-square rounded-3xl bg-primary shadow-primary-lg overflow-hidden border-2 border-gold/30 flex items-center justify-center p-8">
                {/* Visual patterns */}
                <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />
                <div className="absolute inset-8 border border-gold/20 rounded-full animate-spin-slow opacity-60 pointer-events-none" />
                
                {/* Visual center */}
                <div className="relative z-10 text-center space-y-2">
                  <span className="text-gold text-6xl block select-none" aria-hidden="true">🔱</span>
                  <p className="text-ivory font-poppins font-bold text-xl uppercase tracking-wider">UJJAIN DHAM</p>
                  <p className="text-gold/80 text-xs tracking-widest">Shipra River Coast</p>
                </div>

                {/* Corner highlights */}
                <div className="absolute top-4 left-4 text-gold/30">🕉</div>
                <div className="absolute top-4 right-4 text-gold/30">🕉</div>
                <div className="absolute bottom-4 left-4 text-gold/30">🕉</div>
                <div className="absolute bottom-4 right-4 text-gold/30">🕉</div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
export default UjjainLocation;
