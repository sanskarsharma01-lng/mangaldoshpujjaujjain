import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

export const VastuSection: React.FC = () => {
  const { t, language } = useLanguage();

  const handleConsultClick = () => {
    trackEvent('vastu_consult_clicked', { source: 'vastu_section' });
  };

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    language === 'hi'
      ? 'नमस्ते पंडित जी, मुझे वास्तु शास्त्र परामर्श के बारे में जानकारी चाहिए।'
      : 'Namaste Pandit Ji, I would like to consult you for Vastu Shastra Consultation.'
  )}`;

  return (
    <section className="section-padding bg-[#FDF8EF] relative overflow-hidden" id="vastu-section">
      {/* Background patterns */}
      <div className="absolute inset-0 pattern-grid opacity-[0.05] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label text-gold justify-center">
              <span aria-hidden="true">🏡</span> वास्तु परामर्श
            </span>
            <h2 className="section-title">
              {t('vastu.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="text-text-muted text-lg mt-4">
              {t('vastu.sectionSubtitle')}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="group relative flex flex-col p-8 rounded-2xl bg-white border border-gold/15 hover:border-gold/35 hover:shadow-gold-sm hover:bg-gold/5 transition-all duration-300 shadow-glass">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-semibold mb-6 group-hover:bg-gold/20 transition-colors duration-300">
              <span aria-hidden="true">🏡</span>
            </div>
            <h3 className="text-xl font-poppins font-bold text-primary mb-3">
              {t('vastu.card1Title')}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('vastu.card1Desc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col p-8 rounded-2xl bg-white border border-gold/15 hover:border-gold/35 hover:shadow-gold-sm hover:bg-gold/5 transition-all duration-300 shadow-glass">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-semibold mb-6 group-hover:bg-gold/20 transition-colors duration-300">
              <span aria-hidden="true">🏢</span>
            </div>
            <h3 className="text-xl font-poppins font-bold text-primary mb-3">
              {t('vastu.card2Title')}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('vastu.card2Desc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col p-8 rounded-2xl bg-white border border-gold/15 hover:border-gold/35 hover:shadow-gold-sm hover:bg-gold/5 transition-all duration-300 shadow-glass">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-semibold mb-6 group-hover:bg-gold/20 transition-colors duration-300">
              <span aria-hidden="true">🛡️</span>
            </div>
            <h3 className="text-xl font-poppins font-bold text-primary mb-3">
              {t('vastu.card3Title')}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('vastu.card3Desc')}
            </p>
          </div>
        </ScrollReveal>

        <div className="text-center">
          <ScrollReveal direction="up" delay={0.3}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleConsultClick}
              className="btn-primary inline-flex items-center gap-2.5 px-8 py-3 text-base shadow-primary font-bold"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z" />
              </svg>
              {t('vastu.cta')}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VastuSection;
