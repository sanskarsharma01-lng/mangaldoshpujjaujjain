import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { galleryItems } from '../data/gallery';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Temple', 'Puja', 'Havan', 'Pandit Ji', 'Ujjain', 'Devotees', 'Prasad'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

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
  const title = `Vedic Ceremonies & Temple Gallery | ${siteConfig.name}`;
  const description = `View real-time photographs representing our traditional Vedic rituals, temple ceremonies, and Ujjain spiritual locations.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Spiritual Gallery' },
              ]}
            />
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
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 focus-visible:outline-none ${
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
            <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative rounded-2xl overflow-hidden shadow-glass border border-gold/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold text-left"
                >
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 space-y-2 z-10">
                    <span className="text-gold text-2xl font-serif">🕉</span>
                    <p className="text-ivory font-poppins font-bold uppercase tracking-wider text-xs">{item.category}</p>
                    <p className="text-gold/90 text-sm italic font-serif">View Full Screen</p>
                  </div>
                  
                  {/* Visual block */}
                  <div className="aspect-video sm:aspect-square bg-gradient-to-br from-gold/30 to-primary/40 flex items-center justify-center text-center p-6 border-b border-gold/15 overflow-hidden">
                    <span className="text-gold text-2xl block absolute top-3 left-3 select-none">🕉</span>
                    <p className="text-primary-dark font-serif font-semibold text-lg relative z-10 leading-snug">
                      {item.alt}
                    </p>
                  </div>
                </button>
              ))}
            </ScrollReveal>
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
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all text-xl focus-visible:outline-none"
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
                className="absolute left-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all text-2xl focus-visible:outline-none z-10"
              >
                ‹
              </button>

              {/* Image Box */}
              <div className="text-center space-y-4 select-none relative z-0">
                <div className="max-h-[60vh] aspect-video sm:aspect-square max-w-[90vw] bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center p-8 rounded-2xl border-2 border-gold/30 shadow-primary">
                  <span className="text-gold text-7xl select-none" aria-hidden="true">🕉</span>
                </div>
                <p className="text-white text-base sm:text-lg font-serif italic font-medium px-4">
                  {activeItem.alt}
                </p>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all text-2xl focus-visible:outline-none z-10"
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
