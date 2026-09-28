import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import { API_BASE_URL } from '../../config/api';
import type { GalleryItem } from '../../types';

// Per-category gradient placeholders
const categoryGradients: Record<string, string> = {
  Temple:      'linear-gradient(135deg,#78350f 0%,#b45309 60%,#d97706 100%)',
  Puja:        'linear-gradient(135deg,#7c2d12 0%,#ea580c 60%,#f97316 100%)',
  Havan:       'linear-gradient(135deg,#7f1d1d 0%,#dc2626 60%,#f97316 100%)',
  'Pandit Ji': 'linear-gradient(135deg,#713f12 0%,#ca8a04 60%,#fbbf24 100%)',
  Ujjain:      'linear-gradient(135deg,#44403c 0%,#92400e 60%,#b45309 100%)',
  Devotees:    'linear-gradient(135deg,#881337 0%,#c2410c 60%,#ea580c 100%)',
  Prasad:      'linear-gradient(135deg,#92400e 0%,#d97706 60%,#fbbf24 100%)',
};

const categoryIcons: Record<string, string> = {
  Temple: '🛕', Puja: '🌸', Havan: '🔥',
  'Pandit Ji': '🕉', Ujjain: '📍', Devotees: '🙏', Prasad: '🪔',
};

interface CardProps {
  item: GalleryItem;
  delay?: number;
  className?: string;
}

const GalleryCard: React.FC<CardProps> = ({ item, delay = 0, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const grad   = categoryGradients[item.category] ?? categoryGradients['Temple'];
  const icon   = categoryIcons[item.category] ?? '📷';
  const showPh = imgError || !item.src;

  return (
    <ScrollReveal delay={delay} className={`group overflow-hidden rounded-2xl ${className}`}>
      <Link to="/gallery" className="block relative w-full h-full overflow-hidden rounded-2xl" aria-label={item.alt}>
        {!showPh ? (
          <img
            src={item.src}
            alt={item.alt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ background: grad }}>
            <div className="absolute inset-0 opacity-[0.10]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,220,130,0.8) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
            <span className="relative z-10 text-5xl drop-shadow-lg">{icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
      </Link>
    </ScrollReveal>
  );
};

const HomeGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/gallery?type=image`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const apiItems: GalleryItem[] = data.map((item: any) => ({
              id: `api-${item.id}`,
              src: item.filepath ? (item.filepath.startsWith('http') ? item.filepath : `${API_BASE_URL}${item.filepath}`) : '',
              alt: item.title_en || item.description_en || item.title_hi || `${item.category || 'Puja'} Photo`,
              altHi: item.title_hi || item.description_hi,
              category: item.category || 'Puja',
            }));
            setItems(apiItems);
          }
        }
      } catch (err) {
        console.error('Error fetching home gallery items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Do not render section if loading or if no data exists in backend
  if (isLoading || items.length === 0) {
    return null;
  }

  const featured  = items[0];
  const rightGrid = items.slice(1, 5);
  const bottomRow = items.slice(5, 8);

  return (
    <section
      id="gallery-highlights"
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="container-custom relative z-10">

        {/* ── Header ── */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-gold font-bold text-[11px] uppercase tracking-[0.18em] mb-3">
              <span className="w-6 h-px bg-gold" />
              {t('homeGallery.label')}
              <span className="w-6 h-px bg-gold" />
            </span>
            <h2 className="section-title mt-1">{t('homeGallery.title')}</h2>
            <div className="gold-divider !mx-0 mt-3" />
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 border border-gold/35 bg-gold/10 hover:bg-gold/20
              text-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shrink-0"
          >
            {t('homeGallery.viewGallery')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* ── Grid Layout for items ── */}
        {items.length === 1 ? (
          <div className="max-w-xl mx-auto aspect-video">
            <GalleryCard item={featured} delay={0} className="h-full" />
          </div>
        ) : items.length <= 4 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="aspect-square">
                <GalleryCard item={item} delay={i * 0.05} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 sm:gap-4" style={{ gridTemplateRows: 'auto auto' }}>
              <div className="col-span-3 sm:col-span-1 sm:row-span-2" style={{ minHeight: 320 }}>
                <GalleryCard item={featured} delay={0} className="h-full" />
              </div>

              {rightGrid.length > 0 && (
                <div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
                  {rightGrid.slice(0, 2).map((item, i) => (
                    <div key={item.id} style={{ aspectRatio: '4/3' }}>
                      <GalleryCard item={item} delay={0.07 + i * 0.06} className="h-full" />
                    </div>
                  ))}
                </div>
              )}

              {rightGrid.length > 2 && (
                <div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
                  {rightGrid.slice(2, 4).map((item, i) => (
                    <div key={item.id} style={{ aspectRatio: '4/3' }}>
                      <GalleryCard item={item} delay={0.19 + i * 0.06} className="h-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {bottomRow.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                {bottomRow.map((item, i) => (
                  <div key={item.id} style={{ aspectRatio: '4/3' }}>
                    <GalleryCard item={item} delay={0.31 + i * 0.06} className="h-full" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── View all link ── */}
        <ScrollReveal delay={0.4} className="mt-8 text-center">
          <Link
            to="/gallery"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3"
          >
            {language === 'hi' ? 'पूरी गैलरी देखें' : 'View Full Gallery'}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default HomeGallery;