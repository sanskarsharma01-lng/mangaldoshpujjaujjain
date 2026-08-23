import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { useBooking } from '../../contexts/BookingContext';

export const FloatingCTA: React.FC = () => {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
  const telUrl = `tel:${siteConfig.phone}`;

  const handleContactClick = (type: 'call' | 'whatsapp') => {
    trackEvent(`${type}_clicked`, { source: 'floating_cta' });
  };

  return (
    <>
      {/* Desktop Floating Buttons */}
      <div className="hidden md:flex flex-col gap-4 fixed bottom-8 right-8 z-40">
        <motion.a
          href={telUrl}
          onClick={() => handleContactClick('call')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 bg-primary hover:bg-primary-dark text-ivory rounded-full flex items-center justify-center shadow-lg hover:shadow-primary border border-gold/30 group relative focus-visible:outline-none"
          aria-label={t('nav.callNow')}
        >
          <Phone className="w-6 h-6 animate-pulse-gold rounded-full" />
          <span className="absolute right-16 bg-primary-dark text-ivory text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gold/20">
            {siteConfig.phone}
          </span>
        </motion.a>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContactClick('whatsapp')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg group relative focus-visible:outline-none"
          aria-label={t('whatsapp.chatLabel')}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-16 bg-primary-dark text-ivory text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gold/20">
            {t('whatsapp.chatLabel')}
          </span>
        </motion.a>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary-dark border-t border-gold/30 grid grid-cols-3 divide-x divide-gold/20 h-16 mobile-sticky-cta">
        <a
          href={telUrl}
          onClick={() => handleContactClick('call')}
          className="flex flex-col items-center justify-center text-ivory hover:text-gold active:bg-primary/50 transition-colors text-xs font-semibold focus-visible:outline-none"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span>{t('nav.callNow')}</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContactClick('whatsapp')}
          className="flex flex-col items-center justify-center text-ivory hover:text-gold active:bg-primary/50 transition-colors text-xs font-semibold focus-visible:outline-none"
        >
          <MessageCircle className="w-5 h-5 mb-1 text-[#25D366]" />
          <span>{t('nav.whatsApp')}</span>
        </a>
        <button
          onClick={() => {
            trackEvent('book_puja_clicked', { source: 'mobile_sticky_cta' });
            openBooking();
          }}
          className="flex flex-col items-center justify-center text-gold hover:text-gold-light active:bg-primary/50 transition-colors text-xs font-semibold focus-visible:outline-none"
        >
          <span className="text-base leading-none mb-0.5" aria-hidden="true">🕉</span>
          <span>{t('nav.bookPuja')}</span>
        </button>
      </div>
    </>
  );
};
export default FloatingCTA;
