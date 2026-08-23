import React from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { services } from '../../data/services';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumb } from '../../components/seo/Breadcrumb';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import PujaPackages from '../../components/sections/PujaPackages';
import FAQSection from '../../components/sections/FAQSection';
import FinalCTA from '../../components/sections/FinalCTA';

interface ServicePageTemplateProps {
  slug: string;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ slug }) => {
  const { openBooking } = useBooking();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-32 text-center text-red-600 font-bold">
        Service not found.
      </div>
    );
  }

  const handleBookClick = () => {
    trackEvent('book_puja_clicked', { source: `service_page_${slug}` });
    openBooking(service.id);
  };

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Namaste Pandit Ji, I would like to enquire about ${service.name} in Ujjain.`
  )}`;

  const canonical = `${siteConfig.seo.siteUrl}/${service.slug}`;

  return (
    <>
      <SEOHead
        title={`${service.metaTitle} | ${siteConfig.name}`}
        description={service.metaDescription}
        canonical={canonical}
      />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: service.name },
              ]}
            />
          </div>
        </div>

        {/* Hero Compact Banner */}
        <div className="page-banner-light py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-3">
            <span className="text-gold text-5xl block animate-bounce-gentle select-none" aria-hidden="true">
              {service.icon}
            </span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary leading-tight">
              {service.name}
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <section className="section-padding bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Description & Features */}
              <div className="lg:col-span-8 space-y-6">
                <ScrollReveal direction="up" delay={0.1} className="prose max-w-none text-text-muted leading-relaxed">
                  <h2 className="text-2xl font-poppins font-bold text-primary mb-4">Ritual Overview & Scriptural Importance</h2>
                  <p>{service.fullDescription}</p>
                </ScrollReveal>

                {/* Features List */}
                <ScrollReveal direction="up" delay={0.2} className="space-y-4 pt-4">
                  <h3 className="text-lg font-poppins font-bold text-primary">Puja Offerings & Arrangements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-gold text-lg mt-0.5" aria-hidden="true">✔</span>
                        <span className="text-text-dark font-medium text-sm leading-normal">{feat}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Sticky Booking Widget */}
              <div className="lg:col-span-4">
                <ScrollReveal direction="right" className="lg:sticky lg:top-28 card-glass border-2 border-gold/30">
                  <h3 className="text-xl font-poppins font-bold text-primary text-center mb-2">Reserve Ceremony</h3>
                  <p className="text-xs text-text-muted text-center mb-6 leading-normal">
                    Select a date and customize your Vedic puja offerings with our Pandit Ji.
                  </p>

                  <div className="space-y-4">
                    <button onClick={handleBookClick} className="btn-primary w-full py-3 text-base shadow-primary font-bold">
                      Book This Puja
                    </button>
                    
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_clicked', { source: `service_sidebar_${slug}` })}
                      className="btn-whatsapp w-full py-3 text-base font-bold"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
                      Consult Pandit Ji
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing & Packages */}
        <PujaPackages />

        <FAQSection />

        <FinalCTA />
      </main>
    </>
  );
};
export default ServicePageTemplate;
