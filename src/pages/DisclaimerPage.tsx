import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';

export const DisclaimerPage: React.FC = () => {
  const title = `Disclaimer | ${siteConfig.name}`;
  const canonical = `${siteConfig.seo.siteUrl}/disclaimer`;

  return (
    <>
      <SEOHead title={title} description="Disclaimer regarding puja outcomes and astrological advice on MangalDoshPujaUjjain." canonical={canonical} noIndex={true} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Disclaimer' },
              ]}
            />
          </div>
        </div>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-glass border border-gold/10">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-2">Spiritual & Service Disclaimer</h1>
            <p className="text-xs text-text-muted mb-8">Last Updated: August 2026</p>

            <div className="space-y-6 text-text-muted text-sm leading-relaxed">
              <div className="p-5 bg-gold/10 border-l-4 border-gold text-warm-brown rounded-r-xl text-sm leading-relaxed">
                📢 <strong>Important Astrological Notice:</strong> The rituals, pujas, and astrological advice provided on this platform are conducted based on classical Hindu scriptural beliefs and traditional planetary interpretations. Astrological remedies do not represent scientific facts or guaranteed material outcomes.
              </div>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">1. No Guaranteed Outcomes</h2>
              <p>
                Spiritual practices, Vedic mantras, and planetary offerings are personal expressions of faith and devotion. <strong>{siteConfig.name}</strong> makes no claims, warranties, or guarantees regarding specific outcomes—including marriage resolutions, wealth gains, removal of obstacles, or health improvements. Results represent individual spiritual journeys and are not commercially contractible.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">2. Professional Consultations</h2>
              <p>
                Our horoscope reviews, checker results, and Pandit Ji consults represent traditional astrological guidance. Devotees should make personal decisions regarding marriage, health, finance, and career independently. Astrological recommendations should not replace professional medical, legal, financial, or psychological consulting advice.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">3. Online Puja Logistics</h2>
              <p>
                We coordinate physical ritual arrangements in Ujjain. When you participate in-person or online, we arrange all materials, pandits, and temple locations. Prasad shipping is conducted via third-party courier services and delivery times may vary.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">4. External Links</h2>
              <p>
                Our website may contain links to external sites (such as Google Maps). We do not operate or control the content, accuracy, or privacy policies of third-party external resources.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default DisclaimerPage;
