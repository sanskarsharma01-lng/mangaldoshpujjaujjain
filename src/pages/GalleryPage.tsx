import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { galleryItems as staticGalleryItems } from '../data/gallery';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';
import { API_BASE_URL } from '../config/api';
import type { GalleryItem } from '../types';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCardItem: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const showPh = imgError || !item.src;

  return (
    <button
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden shadow-glass border border-gold/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold text-left bg-white w-full aspect-video sm:aspect-square flex items-center justify-center cursor-pointer"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary-dark/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 space-y-2 z-20">
        <span className="text-gold text-3xl font-serif">🕉</span>
        <p className="text-ivory font-poppins font-bold uppercase tracking-wider text-xs">{item.category}</p>
        <p className="text-gold/90 text-sm italic font-serif px-2 line-clamp-2">{item.alt}</p>
        <span className="text-gold text-xs font-semibold underline pt-1">View Full Screen</span>
      </div>

      {/* Media Display */}
      {!showPh ? (
        item.isVideo ? (
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )
      ) : (
        /* Fallback visual card */
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative bg-gradient-to-br from-cream via-ivory to-gold/10">
          <span className="text-gold text-2xl block absolute top-3 left-3 select-none">🕉</span>
          <span className="text-gold/40 text-5xl font-serif mb-2 select-none">🛕</span>
          <p className="text-primary-dark font-serif font-semibold text-base leading-snug px-2">
            {item.alt}
          </p>
          <span className="text-xs text-gold-dark font-poppins uppercase tracking-wider mt-2 font-medium">
            {item.category}
          </span>
        </div>
      )}
    </button>
  );
};

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch dynamic gallery items from backend API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/gallery`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const apiItems: GalleryItem[] = data.map((item: any) => ({
              id: `api-${item.id}`,
              src: item.filepath ? (item.filepath.startsWith('http') ? item.filepath : `${API_BASE_URL}${item.filepath}`) : '',
              alt: item.title_en || item.description_en || item.title_hi || `${item.category || 'Puja'} Photo`,
              altHi: item.title_hi || item.description_hi,
              category: item.category || 'Gallery',
              isVideo: item.type === 'video',
            }));
            setItems(apiItems);
          } else {
            setItems(staticGalleryItems);
          }
        } else {
          setItems(staticGalleryItems);
        }
      } catch (err) {
        console.error('Error fetching gallery API:', err);
        setItems(staticGalleryItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Compute category list dynamically
  const baseCategories = ['All', 'Temple', 'Puja', 'Havan', 'Pandit Ji', 'Ujjain', 'Devotees', 'Prasad'];
  const extraCategories = Array.from(new Set(items.map(i => i.category))).filter(c => !baseCategories.includes(c));
  const categories = [...baseCategories, ...extraCategories];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const canonical = `${siteConfig.seo.siteUrl}/gallery`;
  const title = `Puja & Temple Photo Gallery | ${siteConfig.name}`;
  const description = `View real-time photographs representing our traditional Vedic rituals, temple ceremonies, and Ujjain spiritual locations.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb items={[{ label: 'Spiritual Gallery' }]} />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 दर्शन दीर्घा 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              Spiritual Gallery
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              Catch glimpses of traditional Vedic Havan, Mangal Dosh Puja ceremonies, and Ujjain temples.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="py-8 bg-ivory">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 focus-visible:outline-none cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-ivory shadow-primary-sm'
                      : 'bg-white border-gold/20 text-text-dark hover:border-gold hover:bg-gold/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="pb-20 bg-ivory">
          <div className="container-custom">
            {isLoading ? (
              <div className="text-center py-12 text-gold font-serif">
                <span className="animate-spin inline-block text-3xl mb-2">🕉</span>
                <p className="text-text-muted text-sm">Loading spiritual gallery...</p>
              </div>
            ) : (
              <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <GalleryCardItem
                    key={item.id}
                    item={item}
                    onClick={() => setLightboxIndex(idx)}
                  />
                ))}
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Lightbox Overlay */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 animate-fade-in" role="dialog" aria-modal="true" aria-label="Image Lightbox">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-white relative z-10">
              <p className="text-sm font-semibold tracking-wide uppercase text-gold">
                {activeItem.category} ({lightboxIndex! + 1} / {filteredItems.length})
              </p>
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all text-xl focus-visible:outline-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Center Area */}
            <div className="flex-grow flex items-center justify-center relative p-4 max-w-4xl mx-auto w-full">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all text-2xl focus-visible:outline-none z-10 cursor-pointer"
              >
                ‹
              </button>

              {/* Media Box */}
              <div className="text-center space-y-4 select-none relative z-0 flex flex-col items-center justify-center">
                {activeItem.src ? (
                  activeItem.isVideo ? (
                    <video src={activeItem.src} controls autoPlay className="max-h-[65vh] max-w-[90vw] rounded-2xl border-2 border-gold/30 shadow-primary" />
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.alt}
                      className="max-h-[65vh] max-w-[90vw] object-contain rounded-2xl border-2 border-gold/30 shadow-primary"
                    />
                  )
                ) : (
                  <div className="max-h-[60vh] aspect-video sm:aspect-square max-w-[90vw] bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center p-8 rounded-2xl border-2 border-gold/30 shadow-primary text-center">
                    <span className="text-gold text-7xl select-none block mb-4" aria-hidden="true">🕉</span>
                    <p className="text-ivory font-serif text-lg">{activeItem.alt}</p>
                  </div>
                )}
                <p className="text-white text-base sm:text-lg font-serif italic font-medium px-4 max-w-2xl">
                  {activeItem.alt}
                </p>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all text-2xl focus-visible:outline-none z-10 cursor-pointer"
              >
                ›
              </button>
            </div>

            {/* Bottom Bar: Instructions */}
            <div className="text-center text-white/40 text-xs">
              Use Arrow keys Left / Right to navigate. Press ESC to close.
            </div>
          </div>
        )}

        <FinalCTA />
      </main>
    </>
  );
};

export default GalleryPage;
