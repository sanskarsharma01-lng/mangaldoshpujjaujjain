import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

export const FloatingCTA: React.FC = () => {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  const handleContactClick = (type: 'whatsapp') => {
    trackEvent(`${type}_clicked`, { source: 'floating_cta' });
  };

  return (
    <>
      {/* Desktop Floating Buttons */}
      <div className="hidden md:flex flex-col gap-4 fixed bottom-8 right-8 z-40">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContactClick('whatsapp')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#25D366] hover:bg-[#128C7E] h-16 shadow-lg flex items-center justify-center transition-colors">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContactClick('whatsapp')}
          className="w-full h-full flex items-center justify-center gap-2 text-white font-semibold text-base focus-visible:outline-none"
        >
          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          <span>Book Puja / Consult on WhatsApp</span>
        </a>
      </div>
    </>
  );
};
export default FloatingCTA;
