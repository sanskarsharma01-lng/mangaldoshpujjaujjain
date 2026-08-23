import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';

export const PrivacyPolicyPage: React.FC = () => {
  const title = `Privacy Policy | ${siteConfig.name}`;
  const canonical = `${siteConfig.seo.siteUrl}/privacy-policy`;

  return (
    <>
      <SEOHead title={title} description="Privacy Policy of MangalDoshPujaUjjain website." canonical={canonical} noIndex={true} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Privacy Policy' },
              ]}
            />
          </div>
        </div>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-glass border border-gold/10">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-2">Privacy Policy</h1>
            <p className="text-xs text-text-muted mb-8">Last Updated: August 2026</p>

            <div className="space-y-6 text-text-muted text-sm leading-relaxed">
              <p>
                At <strong>{siteConfig.name}</strong>, accessible from {siteConfig.seo.siteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our platform and how we use it.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">1. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you fill out booking forms, checker tools, contact forms, or communicate with us via WhatsApp. This information may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name, email address, mobile number, and address details.</li>
                <li>Horoscope details (Date, Time, and Place of Birth) submitted for checking alignments.</li>
                <li>Preferences and any specific notes or instructions regarding your puja booking.</li>
              </ul>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and coordinate your requested Vedic puja services.</li>
                <li>Process your booking enquiries and send confirmation notifications.</li>
                <li>Analyze and evaluate birth charts (Kundli) for horoscope consultations.</li>
                <li>Improve, personalize, and expand our website user experience.</li>
                <li>Communicate with you for customer service, updates, and booking assistance.</li>
              </ul>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">3. Data Security & Storage</h2>
              <p>
                We employ standard security protocols to safeguard your personal details. We do not sell, trade, or transfer your personally identifiable information to outside parties. Your birth chart parameters are evaluated privately by our authorized Pandits for ritual alignments only.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">4. Log Files & Analytics</h2>
              <p>
                Our platform follows standard procedures of using log files and analytical tools (like Google Analytics). These tools gather general internet usage details, including IP addresses, browser types, ISPs, timestamps, and page views, to analyze trends and manage the site.
              </p>

              <h2 className="text-xl font-poppins font-bold text-primary pt-4">5. Contact Information</h2>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>{siteConfig.email}</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default PrivacyPolicyPage;
