import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBooking } from '../../contexts/BookingContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ScrollReveal } from '../ui/ScrollReveal';

export const FinalCTA: React.FC = () => {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    'Namaste Pandit Ji, I would like to book a Mangal Dosh Puja ceremony in Ujjain.'
  )}`;

  const handleBook = () => {
    trackEvent('book_puja_clicked', { source: 'final_cta' });
    openBooking();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_clicked', { source: 'final_cta' });
  };

  return (
    <section className="section-padding bg-gradient-to-b from-primary-dark to-primary text-ivory relative overflow-hidden" id="final-cta">
      {/* Decorative radial background glowing elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute left-10 bottom-10 text-gold/5 font-serif text-9xl select-none pointer-events-none transform -translate-x-1/4 translate-y-1/4">
        🕉
      </div>

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <ScrollReveal direction="up" delay={0.1} className="space-y-4">
          <span className="section-label text-gold justify-center">
            <span aria-hidden="true">🕉</span> कल्याण मार्ग
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold leading-tight">
            {t('finalCta.heading')}
          </h2>
          <p className="text-ivory/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t('finalCta.text')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            onClick={handleBook}
            className="btn-gold w-full sm:w-auto px-8 py-4 font-bold tracking-wide text-base shadow-gold"
          >
            {t('finalCta.bookPuja')}
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="btn-whatsapp w-full sm:w-auto px-8 py-4 font-bold tracking-wide text-base flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
            {t('finalCta.whatsappCta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
export default FinalCTA;
