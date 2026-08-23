import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { services } from '../../data/services';
import { ScrollReveal } from '../ui/ScrollReveal';

// Fallback images for puja services when local image files are not available
const pujaImageFallback: Record<string, string> = {
  'mangal-dosh-puja': 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80', // Diyas and flowers
  'mangal-bhat-puja': 'https://images.unsplash.com/photo-1616038242814-a6eac7845d88?auto=format&fit=crop&w=600&q=80', // Worship offerings
  'mangal-shanti-puja': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80', // Temple architecture
  'navgraha-shanti': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', // Brass lamps
  'rudrabhishek': 'https://images.unsplash.com/photo-1630018868662-e3d82a7f516a?auto=format&fit=crop&w=600&q=80', // Shivling
  'special-havan': 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=80', // Havan fire
  'mahakaleshwar-puja': 'https://images.unsplash.com/photo-1608958416710-e71de58988a2?auto=format&fit=crop&w=600&q=80', // Temple bells/decor
  'mahamrityunjaya-jaap': 'https://images.unsplash.com/photo-1609137144813-7d788165b44d?auto=format&fit=crop&w=600&q=80', // Meditative Shivling
  'kaal-sarp-dosh-puja': 'https://images.unsplash.com/photo-1590076212952-b13134608c02?auto=format&fit=crop&w=600&q=80', // River banks
  'baglamukhi-havan': 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=600&q=80', // Havan fire ritual
  'pitra-dosh-nivaran': 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=600&q=80', // Shipra river / prayer
};

export const PujaServices: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-cream/35 relative overflow-hidden" id="puja-services">
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">🕉</span> वैदिक सेवाएँ
            </span>
            <h2 className="section-title">
              {t('services.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              {language === 'hi' ? 'उज्जैन में अनुभवी पंडितों के मार्गदर्शन में संपन्न होने वाली पारंपरिक वैदिक पूजा और शांति अनुष्ठानों में से चुनें।' : 'Choose from our range of traditional Vedic puja and shanti rituals, conducted under the guidance of experienced Pandits in Ujjain.'}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="card-base flex flex-col justify-between group h-full overflow-hidden p-0 bg-white"
            >
              <div>
                {/* Puja Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream border-b border-gold/15">
                  <img
                    src={service.image}
                    alt={language === 'hi' && service.nameHi ? service.nameHi : service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = pujaImageFallback[service.id] || '/mangalnath-temple.jpg';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  {/* Subtle float overlay badge to indicate spiritual category */}
                  <div className="absolute top-3 right-3 bg-primary-dark/85 backdrop-blur-xs text-gold border border-gold/30 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md select-none pointer-events-none">
                    🕉
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-poppins font-bold text-primary mb-3 group-hover:text-primary-light transition-colors duration-200">
                    {language === 'hi' && service.nameHi ? service.nameHi : service.name}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed mb-1">
                    {language === 'hi' && service.shortDescriptionHi ? service.shortDescriptionHi : service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/${service.slug}`}
                  className="inline-flex items-center text-gold hover:text-gold-dark text-sm font-semibold tracking-wide transition-colors duration-200"
                >
                  {t('services.viewDetails')}
                </Link>
                <Link
                  to={`/${service.slug}`}
                  className="btn-primary inline-flex items-center justify-center px-4 py-2 text-sm"
                >
                  {t('services.bookNow')}
                </Link>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};
export default PujaServices;
