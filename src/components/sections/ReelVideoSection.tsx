import React, { useState } from 'react';
import { Play, Video } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

const reelVideoSrc = '/videos/puja-reel.mp4';

const ReelVideoSection: React.FC = () => {
  const [hasVideoError, setHasVideoError] = useState(false);
  const { t } = useLanguage();

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

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative mx-auto w-full max-w-sm aspect-[9/14] rounded-2xl overflow-hidden border-2 border-gold/40 bg-gradient-to-br from-primary to-[#280707] shadow-primary-lg">
              {!hasVideoError ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setHasVideoError(true)}
                  aria-label={t('reelVideo.ariaLabel')}
                >
                  <source src={reelVideoSrc} type="video/mp4" />
                  {t('reelVideo.browserUnsupported')}
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <span className="w-16 h-16 rounded-full bg-gold text-primary-dark flex items-center justify-center mb-5">
                    <Play className="w-7 h-7 ml-1" fill="currentColor" aria-hidden="true" />
                  </span>
                  <p className="text-ivory font-poppins font-semibold">{t('reelVideo.comingSoon')}</p>
                  <p className="text-ivory/60 text-xs mt-2">{t('reelVideo.addVideo')} {reelVideoSrc}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReelVideoSection;