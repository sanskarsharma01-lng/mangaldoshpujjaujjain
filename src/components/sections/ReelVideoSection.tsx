import React, { useState, useEffect } from 'react';
import { Play, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import { API_BASE_URL } from '../../config/api';

interface Reel {
  id: string;
  src: string;
  title: string;
  titleHi: string;
}

const ReelVideoSection: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/videos`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const apiReels: Reel[] = data.map((item: any) => ({
              id: `api-vid-${item.id}`,
              src: item.filepath ? (item.filepath.startsWith('http') ? item.filepath : `${API_BASE_URL}${item.filepath}`) : '',
              title: item.title_en || 'Vedic Puja Video',
              titleHi: item.title_hi || 'वैदिक पूजा वीडियो',
            }));
            setReels(apiReels);
          } else {
            setReels([]);
          }
        }
      } catch (err) {
        console.error('Error fetching reels video API:', err);
        setReels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReels();
  }, []);

  // Do not render section on home page if loading or if no uploaded videos exist
  if (isLoading || reels.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setHasVideoError(false);
    setCurrentIndex((prev) => (prev === 0 ? reels.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setHasVideoError(false);
    setCurrentIndex((prev) => (prev === reels.length - 1 ? 0 : prev + 1));
  };

  const currentReel = reels[currentIndex];
  const currentTitle = language === 'hi' ? (currentReel.titleHi || currentReel.title) : currentReel.title;

  return (
    <section className="section-padding bg-primary-dark relative overflow-hidden" id="puja-reels">
      <div className="absolute inset-0 pattern-dots opacity-[0.08] pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <span className="section-label text-gold-light">
              <Video className="w-4 h-4" aria-hidden="true" /> {t('reelVideo.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-ivory leading-tight mt-3">
              {t('reelVideo.title')}
            </h2>
            <div className="w-16 h-0.5 bg-gold my-5" />
            <p className="text-ivory/75 leading-relaxed max-w-md">
              {t('reelVideo.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="relative flex items-center justify-center w-full py-8">
            {/* Left navigation button */}
            {reels.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-gold/10 hover:bg-gold hover:text-primary-dark text-gold border border-gold/30 flex items-center justify-center shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                aria-label="Previous Reel"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Video Card Container */}
            <div className="relative mx-8 w-full max-w-sm aspect-[9/14] rounded-2xl overflow-hidden border-2 border-gold/40 bg-gradient-to-br from-primary to-[#280707] shadow-primary-lg">
              {/* Active video title banner */}
              <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 text-center">
                <p className="text-gold text-xs tracking-wider uppercase font-bold">
                  Reel {currentIndex + 1} of {reels.length}
                </p>
                <h3 className="text-ivory font-poppins text-sm font-semibold truncate mt-0.5">
                  {currentTitle}
                </h3>
              </div>

              {!hasVideoError ? (
                <video
                  key={currentReel.id}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setHasVideoError(true)}
                  aria-label={currentTitle}
                >
                  <source src={currentReel.src} type="video/mp4" />
                  {t('reelVideo.browserUnsupported')}
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <span className="w-16 h-16 rounded-full bg-gold text-primary-dark flex items-center justify-center mb-4">
                    <Play className="w-7 h-7 ml-1" fill="currentColor" aria-hidden="true" />
                  </span>
                  <p className="text-ivory font-poppins font-semibold">{currentTitle}</p>
                </div>
              )}
            </div>

            {/* Right navigation button */}
            {reels.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-gold/10 hover:bg-gold hover:text-primary-dark text-gold border border-gold/30 flex items-center justify-center shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                aria-label="Next Reel"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Slider Indicator Dots */}
            {reels.length > 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {reels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setHasVideoError(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === index ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/50'
                    }`}
                    aria-label={`Go to Reel ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReelVideoSection;