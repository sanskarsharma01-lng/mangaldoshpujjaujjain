import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';

export const TermsPage: React.FC = () => {
  const title = `Terms & Conditions | ${siteConfig.name}`;
  const canonical = `${siteConfig.seo.siteUrl}/terms-and-conditions`;

  return (
    <>
      <SEOHead title={title} description="Terms and Conditions of MangalDoshPujaUjjain website." canonical={canonical} noIndex={true} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Terms & Conditions' },
              ]}
            />
          </div>
        </div>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-glass border border-gold/10">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-2">Terms & Conditions</h1>
            <p className="text-xs text-text-muted mb-8">Last Updated: August 2026</p>

            <div className="space-y-6 text-text-muted text-sm leading-relaxed">
              <p>
                Welcome to <strong>{siteConfig.name}</strong>. These terms and conditions outline the rules and regulations for the use of our website and services, located at {siteConfig.seo.siteUrl}. By accessing this website, we assume you accept these terms and conditions.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">1. Use of Service</h2>
              <p>
                Our platform provides booking coordination, logistical arrangements, and consulting information for traditional Vedic puja rituals conducted in Ujjain. Information on this website is for spiritual education and coordination purposes only.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">2. Booking & Cancellation Terms</h2>
              <p>
                When you submit a puja booking enquiry or package selection:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Booking dates (muhurat) are finalized in consultation with our Pandits based on planetary transits.</li>
                <li>All puja package details are subject to final coordination.</li>
                <li>Cancellations or date modifications should be communicated at least 48 hours prior to the scheduled puja time to allow logistics adjustments.</li>
              </ul>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">3. astrolgical Consultations & Checker</h2>
              <p>
                Our Mangal Dosh Checker form collects birth coordinates for manual evaluation by our Pandits. Astrological guidance is based on traditional Hindu scriptural principles and interpretations. Astrological advice represents traditional belief systems rather than scientific fact.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">4. Intellectual Property</h2>
              <p>
                Unless otherwise stated, all material on this website, including content layout, text descriptions, configurations, and graphics, is the intellectual property of {siteConfig.name}. All rights are reserved.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts located in Ujjain, Madhya Pradesh.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default TermsPage;
