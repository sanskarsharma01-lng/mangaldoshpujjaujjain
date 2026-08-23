import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { galleryItems } from '../../data/gallery';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

const featuredItems = galleryItems.slice(0, 6);
const categoryLabels: Record<string, string> = {
  Temple: 'मंदिर',
  Puja: 'पूजा',
  Havan: 'हवन',
  'Pandit Ji': 'पंडित जी',
  Ujjain: 'उज्जैन',
  Devotees: 'भक्त',
  Prasad: 'प्रसाद',
};

const HomeGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const getCategoryLabel = (category: string) => language === 'hi' ? categoryLabels[category] : category;

  return (
  <section className="section-padding bg-white relative overflow-hidden" id="gallery-highlights">
    <div className="absolute inset-0 pattern-dots opacity-[0.06] pointer-events-none" />
    <div className="container-custom relative z-10">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
        <div>
            <span className="section-label text-gold">
              <span aria-hidden="true">✦</span> {t('homeGallery.label')}
          </span>
          <h2 className="section-title mt-2">{t('homeGallery.title')}</h2>
          <div className="gold-divider !mx-0" />
        </div>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-gold transition-colors"
        >
          {t('homeGallery.viewGallery')} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {featuredItems.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 0.06} className="group">
            <Link
              to="/gallery"
              className="block relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-gold/20 via-ivory to-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold"
              aria-label={`${t('homeGallery.viewCategory')} ${getCategoryLabel(item.category)}: ${language === 'hi' ? item.altHi : item.alt}`}
            >
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                <span className="text-ivory text-xs sm:text-sm font-semibold">{t('homeGallery.viewCategory')} {getCategoryLabel(item.category)}</span>
              </div>
              <span className="absolute top-3 left-3 text-gold text-lg" aria-hidden="true">* </span>
              <p className="absolute inset-x-4 bottom-4 text-primary-dark font-serif font-semibold text-sm sm:text-base leading-snug">
                {language === 'hi' ? item.altHi : item.alt}
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export default HomeGallery;