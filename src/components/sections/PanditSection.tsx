import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { pandit } from '../../data/pandit';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ScrollReveal } from '../ui/ScrollReveal';

export const PanditSection: React.FC = () => {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    'Namaste Pandit Ji, I would like to consult you regarding Mangal Dosh Puja in Ujjain.'
  )}`;

  const handleConsult = () => {
    trackEvent('whatsapp_clicked', { source: 'pandit_section' });
  };

  return (
    <section className="section-padding bg-cream/40 relative overflow-hidden" id="meet-pandit-ji">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Portrait representation */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="left" delay={0.2} className="w-full max-w-sm">
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#FDF0D8] to-[#F5E0B8] border-2 border-gold/35 shadow-gold flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-4 border border-gold/20 rounded-full opacity-60 animate-spin-slow pointer-events-none" />
                  
                  {/* Portrait Placeholder Icon */}
                  <div className="relative z-10 text-center space-y-4">
                    <span className="text-gold text-7xl block select-none" aria-hidden="true">👨‍🦳</span>
                    <div>
                      <p className="text-primary font-poppins font-bold text-2xl tracking-wide">{pandit.name}</p>
                      <p className="text-primary/80 text-sm tracking-wider uppercase mt-1">{pandit.experience} Experience</p>
                    </div>
                  </div>

                  {/* Corner ornaments */}
                  <div className="absolute top-4 left-4 text-gold/60">🕉</div>
                  <div className="absolute top-4 right-4 text-gold/60">🕉</div>
                  <div className="absolute bottom-4 left-4 text-gold/60">🕉</div>
                  <div className="absolute bottom-4 right-4 text-gold/60">🕉</div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Profile & Bio */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <span className="section-label">
                  <span aria-hidden="true">🕉</span> आचार्य परिचय
                </span>
                <h2 className="section-title">
                  {t('pandit.sectionTitle')}
                </h2>
                <div className="gold-divider-left" />
                <p className="text-warm-brown font-serif text-lg font-medium leading-relaxed italic">
                  {pandit.title}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2} className="text-text-muted text-sm leading-relaxed space-y-4">
                <p>{pandit.bio}</p>
                
                {/* Credentials Row */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold text-sm">📍 Location:</span>
                    <span className="text-text-dark font-medium">{pandit.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold text-sm">🗣 Languages:</span>
                    <span className="text-text-dark font-medium">{pandit.languages.join(', ')}</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Specializations Badges */}
              <ScrollReveal direction="up" delay={0.3} className="space-y-3">
                <p className="text-warm-brown font-bold text-sm uppercase tracking-wide">Specializations:</p>
                <div className="flex flex-wrap gap-2.5">
                  {pandit.badges.map((badge, idx) => (
                    <span key={idx} className="badge-gold">
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal direction="up" delay={0.4} className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleConsult}
                  className="btn-whatsapp"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
                  {t('pandit.talkCta')}
                </a>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
export default PanditSection;
