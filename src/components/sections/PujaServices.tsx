import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { services } from '../../data/services';
import { ScrollReveal } from '../ui/ScrollReveal';

export const PujaServices: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-cream/35 relative overflow-hidden" id="puja-services">
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">🕉</span> वैदिक सेवाएँ
            </span>
            <h2 className="section-title">
              {t('services.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              {language === 'hi' ? 'उज्जैन में अनुभवी पंडितों के मार्गदर्शन में संपन्न होने वाली पारंपरिक वैदिक पूजा और शांति अनुष्ठानों में से चुनें।' : 'Choose from our range of traditional Vedic puja and shanti rituals, conducted under the guidance of experienced Pandits in Ujjain.'}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="card-base flex flex-col justify-between group h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold text-2xl font-semibold mb-5 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
                  <span aria-hidden="true">{service.icon}</span>
                </div>

                <h3 className="text-xl font-poppins font-bold text-primary mb-3 group-hover:text-primary-light transition-colors duration-200">
                  {language === 'hi' && service.nameHi ? service.nameHi : service.name}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {language === 'hi' && service.shortDescriptionHi ? service.shortDescriptionHi : service.shortDescription}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={`/${service.slug}`}
                  className="inline-flex items-center text-gold hover:text-gold-dark text-sm font-semibold tracking-wide transition-colors duration-200"
                >
                  {t('services.viewDetails')}
                </Link>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};
export default PujaServices;
