import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import { siteConfig } from '../data/siteConfig';
import { packages } from '../data/packages';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { StructuredData } from '../components/seo/StructuredData';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import PackageComparison from '../components/sections/PackageComparison';
import FinalCTA from '../components/sections/FinalCTA';
import { trackEvent } from '../lib/analytics';

export const PujaPackagesPage: React.FC = () => {
  const { openBooking } = useBooking();

  const canonical = `${siteConfig.seo.siteUrl}/puja-packages`;
  const title = 'Puja Packages in Ujjain | Mangal Dosh Puja Booking Packages';
  const description =
    'Explore our Mangal Dosh Puja and Mangal Bhat Puja packages in Ujjain. Basic, Standard, and Premium packages available with transparent inclusions. Enquire to book.';

  const handleBookClick = (packageId: string) => {
    trackEvent('book_puja_clicked', { source: `packages_page_${packageId}` });
    openBooking('mangal-dosh-puja');
  };

  // ItemList schema for packages
  const packagesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mangal Dosh Puja Packages in Ujjain',
    url: canonical,
    numberOfItems: packages.length,
    itemListElement: packages.map((pkg, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${pkg.name} Puja Package`,
      description: pkg.description,
    })),
  };

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />
      <StructuredData data={packagesSchema} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb — Breadcrumb auto-prepends Home */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb items={[{ label: 'Puja Packages' }]} />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="page-banner-light py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-3">
            <span className="text-gold text-5xl block select-none" aria-hidden="true">🔱</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary leading-tight">
              Puja Packages in Ujjain
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Choose from our Basic, Standard, or Premium packages for Mangal Dosh Puja and Mangal Bhat Puja.
              All packages include experienced Pandit Ji guidance and complete puja samagri.
            </p>
          </div>
        </div>

        {/* Package Cards */}
        <section className="section-padding bg-ivory" aria-label="Puja package options">
          <div className="container-custom">
            <div className="text-center mb-12">
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="section-title">Our Puja Packages</h2>
                <div className="gold-divider" />
                <p className="section-subtitle mx-auto">
                  All packages are performed by experienced Vedic Pandits in Ujjain following traditional procedures.
                  Prices are available on enquiry — contact us for current rates.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <ScrollReveal key={pkg.id} direction="up" delay={0.1 * (idx + 1)}>
                  <div
                    className={`relative flex flex-col h-full rounded-2xl border p-8 space-y-6 transition-all duration-300 hover:shadow-card-hover ${
                      pkg.highlighted
                        ? 'bg-primary-dark border-gold/60 shadow-primary'
                        : 'bg-white border-gold/20 shadow-glass'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-primary text-xs font-bold rounded-full tracking-wider">
                        {pkg.badge}
                      </span>
                    )}

                    <div className="space-y-2">
                      <h3
                        className={`text-2xl font-poppins font-bold ${
                          pkg.highlighted ? 'text-gold' : 'text-primary'
                        }`}
                      >
                        {pkg.name}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          pkg.highlighted ? 'text-ivory/75' : 'text-text-muted'
                        }`}
                      >
                        {pkg.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 flex-grow" aria-label={`${pkg.name} package inclusions`}>
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <span className="text-gold text-lg mt-0.5 flex-shrink-0" aria-hidden="true">✔</span>
                          <span
                            className={`text-sm font-medium leading-normal ${
                              pkg.highlighted ? 'text-ivory' : 'text-text-dark'
                            }`}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleBookClick(pkg.id)}
                      className={`w-full py-3 font-bold rounded-xl transition-all duration-300 ${
                        pkg.highlighted
                          ? 'btn-gold shadow-gold'
                          : 'btn-outline-gold'
                      }`}
                      aria-label={`Enquire about ${pkg.name} package`}
                    >
                      {pkg.cta}
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Pricing note */}
            <div className="mt-10 text-center">
              <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
                <strong>Note:</strong> Package prices are available on enquiry and depend on the specific puja,
                number of participants, and selected date. Contact our team for accurate pricing and availability.
              </p>
            </div>
          </div>
        </section>

        {/* Package Comparison Table */}
        <PackageComparison />

        {/* Internal Links to Service Pages */}
        <section className="section-padding bg-cream/30 border-t border-gold/10">
          <div className="container-custom text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="section-title">Explore Our Puja Services</h2>
              <div className="gold-divider" />
              <p className="section-subtitle mx-auto">
                Learn more about each puja service before choosing a package.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="/mangal-dosh-puja-ujjain" className="btn-primary px-6 py-3 text-sm">
                Mangal Dosh Puja
              </a>
              <a href="/mangal-bhat-puja-ujjain" className="btn-outline-gold px-6 py-3 text-sm">
                Mangal Bhat Puja
              </a>
              <a href="/kaal-sarp-dosh-puja-ujjain" className="btn-outline-gold px-6 py-3 text-sm">
                Kaal Sarp Dosh Puja
              </a>
              <a href="/navgraha-shanti-puja" className="btn-outline-gold px-6 py-3 text-sm">
                Navgraha Shanti Puja
              </a>
            </ScrollReveal>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
};
export default PujaPackagesPage;
