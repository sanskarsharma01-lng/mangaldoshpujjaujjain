import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useBooking } from '../../contexts/BookingContext';
import { trackEvent } from '../../lib/analytics';

interface Step {
  num: string;
  title: string;
  desc: string;
}

export const HowPujaWorks: React.FC = () => {
  const { t, language } = useLanguage();
  const { openBooking } = useBooking();

  const steps: Step[] = language === 'hi' ? [
    { num: '01', title: 'परामर्श', desc: 'अपने जन्म विवरण, प्रश्न और पूजा की आवश्यकता पर चर्चा करने के लिए फोन या व्हाट्सएप से हमारी टीम से जुड़ें।' },
    { num: '02', title: 'जन्म विवरण', desc: 'अपना नाम, जन्म तिथि, समय और स्थान दें। इससे पंडित जी पूजा की सही दिशा तय कर सकेंगे।' },
    { num: '03', title: 'पूजा चुनें', desc: 'अपनी आवश्यकता और ज्योतिषीय सलाह के अनुसार उपयुक्त पूजा और अनुष्ठान चुनें।' },
    { num: '04', title: 'तिथि चुनें', desc: 'ग्रहों की स्थिति या पारंपरिक शुभ दिनों, जैसे मंगलवार, के आधार पर शुभ मुहूर्त चुनें।' },
    { num: '05', title: 'पूजा समारोह', desc: 'पंडित जी उज्जैन में पारंपरिक पूजा संपन्न करते हैं। आप व्यक्तिगत रूप से या दूर से शामिल हो सकते हैं।' },
    { num: '06', title: 'पुष्टि और प्रसाद', desc: 'बुकिंग अपडेट, पूजा की तस्वीरें और पवित्र प्रसाद सीधे अपने घर पर प्राप्त करें।' },
  ] : [
    {
      num: '01',
      title: 'Consultation',
      desc: 'Connect with our team via phone or WhatsApp to discuss your birth details, query, and ritual needs.',
    },
    {
      num: '02',
      title: 'Birth Details',
      desc: 'Provide your name, birth date, time, and place. This helps our Pandit Ji align the puja coordinates.',
    },
    {
      num: '03',
      title: 'Select Puja',
      desc: 'Choose a package (Basic, Standard, or Premium) that fits your requirements and astrologer advice.',
    },
    {
      num: '04',
      title: 'Choose Date',
      desc: 'Select an auspicious date (muhurat) based on planetary transits or traditional holy days (e.g. Tuesdays).',
    },
    {
      num: '05',
      title: 'Puja Ceremony',
      desc: 'Pandit Ji performs the traditional ritual in Ujjain. You can participate in-person or remotely.',
    },
    {
      num: '06',
      title: 'Confirmation & Prasad',
      desc: 'Receive booking updates, ceremony photos, and sacred prasad shipped directly to your home address.',
    },
  ];

  return (
    <section className="section-padding bg-ivory relative overflow-hidden" id="how-puja-works">
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">📿</span> पूजा प्रक्रिया
            </span>
            <h2 className="section-title">
              {t('howItWorks.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              {language === 'hi' ? 'हम आपकी प्रारंभिक पूछताछ से लेकर पूजा और प्रसाद की व्यवस्था तक हर चरण में पारदर्शी मार्गदर्शन देते हैं।' : 'We guide you transparently through every stage, from your initial enquiry to the completion of sacred offerings.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/10 via-gold/30 to-primary/10 -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={step.num}
                  direction={isEven ? 'left' : 'right'}
                  delay={0.15}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 relative ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Left/Right Text Column */}
                  <div className="w-full md:w-1/2 flex justify-end md:text-right even:justify-start even:text-left">
                    <div className={`w-full max-w-md p-6 rounded-2xl bg-white border border-gold/15 shadow-glass relative ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <h3 className="text-lg font-poppins font-bold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Number Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                    <span className="timeline-number bg-primary text-ivory ring-4 ring-ivory">
                      {step.num}
                    </span>
                  </div>

                  {/* Mobile Badge indicator */}
                  <div className="md:hidden flex items-center gap-3 w-full justify-center">
                    <span className="w-8 h-8 rounded-full bg-primary text-ivory text-xs flex items-center justify-center font-bold">
                      {step.num}
                    </span>
                  </div>

                  {/* Spacer column (desktop only) */}
                  <div className="hidden md:block w-full md:w-1/2" />
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <ScrollReveal direction="up" delay={0.2} className="text-center mt-16">
          <button
            onClick={() => {
              trackEvent('book_puja_clicked', { source: 'how_it_works_cta' });
              openBooking();
            }}
            className="btn-primary"
          >
            {language === 'hi' ? 'अभी अपनी पूजा बुक करें' : 'Book Your Puja Now'}
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
export default HowPujaWorks;
