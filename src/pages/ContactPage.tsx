import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const canonical = `${siteConfig.seo.siteUrl}/contact`;
  const title = `Contact Us | Mangal Dosh Puja Booking Ujjain | ${siteConfig.name}`;
  const description = `Contact our team to book your Mangal Dosh and Mangal Bhat Puja in Ujjain. Connect directly via WhatsApp for free guidance.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: t('nav.contact') },
              ]}
            />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 संपर्क सूत्र 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              {t('nav.contact')}
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              We are here to assist you with booking enquiries, date calculations, and ceremony details.
            </p>
          </div>
        </div>

        {/* Contact Layout */}
        <section className="section-padding bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: WhatsApp CTA card */}
              <div className="lg:col-span-7">
                <ScrollReveal direction="up" className="card-glass p-8 text-center space-y-6">
                  <span className="text-6xl block" aria-hidden="true">💬</span>
                  <h2 className="text-3xl font-poppins font-bold text-primary">Chat on WhatsApp</h2>
                  <p className="text-text-muted leading-relaxed max-w-md mx-auto">
                    For bookings, package enquiries, date calculations, and spiritual guidance, you can connect directly with our Pandit Ji on WhatsApp.
                  </p>
                  
                  <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl text-warm-brown text-sm font-semibold max-w-sm mx-auto">
                    Our WhatsApp Support is available 24/7.
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp inline-flex items-center justify-center gap-2 px-8 py-4 text-base shadow-md w-full sm:w-auto"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
                      Connect on WhatsApp
                    </a>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Contact Details & Map */}
              <div className="lg:col-span-5 space-y-8">
                <ScrollReveal direction="right" className="space-y-6">
                  <h2 className="text-2xl font-poppins font-bold text-primary">Office Details</h2>
                  <div className="gold-divider-left" />

                  <ul className="space-y-5 text-sm">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-text-dark">Sacred Location Address:</p>
                        <p className="text-text-muted leading-relaxed">
                          {siteConfig.address}, {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-text-dark">WhatsApp Contact:</p>
                        <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                          +{siteConfig.whatsapp.slice(0, 2)} {siteConfig.whatsapp.slice(2)}
                        </a>
                      </div>
                    </li>
                  </ul>
                </ScrollReveal>

                {/* Compact Map placeholder */}
                <ScrollReveal direction="right" delay={0.2} className="card-base p-0 overflow-hidden border border-gold/25 aspect-video sm:aspect-square flex flex-col justify-between">
                  <div className="bg-primary/95 text-ivory p-4 flex-grow flex flex-col justify-center items-center text-center space-y-2">
                    <span className="text-gold text-4xl" aria-hidden="true">📍</span>
                    <p className="font-poppins font-bold uppercase tracking-wider">Mangalnath Temple, Ujjain</p>
                    <p className="text-ivory/60 text-xs">Coordinates: 23.2044° N, 75.7834° E</p>
                  </div>
                  <div className="p-4 border-t border-gold/15 bg-ivory">
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold w-full text-center py-2 text-xs uppercase font-bold"
                    >
                      Open Google Maps
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
};
export default ContactPage;
