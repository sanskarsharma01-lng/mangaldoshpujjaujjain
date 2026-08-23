import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ScrollReveal } from '../ui/ScrollReveal';

export const UjjainLocation: React.FC = () => {
  const { t, language } = useLanguage();

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
                {language === 'hi' ? '📍 उज्जैन, मध्य प्रदेश, भारत — मंगल ब्रह्मांड विज्ञान का केंद्र' : '📍 Ujjain, Madhya Pradesh, India — The Center of Mars Cosmology'}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="text-text-muted text-sm leading-relaxed space-y-4">
              <p>
                {language === 'hi' ? 'हिंदू ब्रह्मांड विज्ञान में उज्जैन को मंगल देव की उत्पत्ति के भौगोलिक स्थान के रूप में माना जाता है। पवित्र शिप्रा नदी के शांत तट पर स्थित मंगलनाथ मंदिर ग्रह पूजा का प्रमुख स्थल माना जाता है।' : 'In Hindu cosmography, Ujjain is traditionally regarded as the geographical coordinates representing the origin of Mars (Mangal Dev). The Mangalnath Temple, located on the serene banks of the sacred Shipra River, is considered a primary site dedicated to planetary worship.'}
              </p>
              <p>
                {language === 'hi' ? 'मत्स्य पुराण के अनुसार, उज्जैन की पवित्र भूमि पर भगवान मंगल का जन्म हुआ था। इस ऐतिहासिक और शास्त्रीय संबंध के कारण यहां मंगल दोष निवारण और मंगल भात पूजा करना भक्तों द्वारा अत्यंत शुभ माना जाता है।' : 'According to the Matsya Purana, the sacred land of Ujjain was where Lord Mangal was born. Because of this profound historical and scriptural association, performing Mangal Dosh Nivaran and Mangal Bhat puja rituals here is considered highly auspicious by devotees.'}
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

          {/* Right Column: Original Mangalnath Temple Image */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="right" delay={0.2} className="w-full max-w-sm">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-gold/35 shadow-gold group">
                <img
                  src="/mangalnath-temple.jpg"
                  alt={language === 'hi' ? 'मंगलनाथ मंदिर उज्जैन' : 'Mangalnath Temple Ujjain'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Text overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent pt-12 pb-6 px-6 text-center">
                  <p className="text-white font-poppins font-bold text-xl uppercase tracking-wider drop-shadow-md">
                    {language === 'hi' ? 'मंगलनाथ मंदिर' : 'MANGALNATH TEMPLE'}
                  </p>
                  <p className="text-gold text-xs tracking-widest uppercase font-medium mt-1">
                    {language === 'hi' ? 'उज्जैन, मध्य प्रदेश' : 'Ujjain, Madhya Pradesh'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
export default UjjainLocation;
