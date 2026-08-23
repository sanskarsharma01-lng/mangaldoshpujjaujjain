import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { faqs } from '../../data/faqs';
import { Accordion } from '../ui/Accordion';
import { StructuredData } from '../seo/StructuredData';
import { ScrollReveal } from '../ui/ScrollReveal';

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();

  // Show only first 5 FAQs on homepage
  const hindiFaqs = [
    { ...faqs[0], question: 'मंगल दोष क्या है?', answer: 'पारंपरिक वैदिक ज्योतिष के अनुसार मंगल दोष जन्म-कुंडली में मंगल ग्रह की विशेष स्थिति को कहा जाता है। इसकी सही व्याख्या के लिए योग्य पंडित या ज्योतिषी से परामर्श करें।' },
    { ...faqs[1], question: 'मंगल भात पूजा क्या है?', answer: 'मंगल भात पूजा उज्जैन में की जाने वाली पारंपरिक पूजा है, जिसका संबंध मंगल दोष निवारण से माना जाता है। यह पूजा अनुभवी पंडितों द्वारा वैदिक विधि से कराई जाती है।' },
    { ...faqs[2], question: 'मंगलनाथ मंदिर का मंगल पूजा से क्या संबंध है?', answer: 'पारंपरिक मान्यताओं के अनुसार उज्जैन और मंगलनाथ मंदिर का भगवान मंगल से विशेष संबंध है। इसी कारण भक्त मंगल संबंधी पूजा के लिए उज्जैन आते हैं।' },
    { ...faqs[3], question: 'उज्जैन में मंगल दोष पूजा कैसे बुक करें?', answer: 'आप वेबसाइट के पूजा बुक करें बटन, फोन या व्हाट्सएप के माध्यम से मंगल दोष पूजा बुक कर सकते हैं। हमारी टीम आपको पूरी प्रक्रिया में मार्गदर्शन देगी।' },
    { ...faqs[4], question: 'बुकिंग के लिए कौन-सी जानकारी आवश्यक है?', answer: 'बुकिंग के लिए आपका नाम, मोबाइल नंबर, ईमेल और पसंदीदा पूजा तिथि व समय चाहिए। कुंडली विश्लेषण के लिए जन्म तिथि, समय और स्थान भी आवश्यक हो सकते हैं।' },
  ];
  const displayedFaqs = language === 'hi' ? hindiFaqs : faqs.slice(0, 5);

  // Generate structured FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding bg-ivory relative overflow-hidden" id="homepage-faq">
      <StructuredData data={faqSchema} />
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">❓</span> संदेह निवारण
            </span>
            <h2 className="section-title">
              {t('faq.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              {language === 'hi' ? 'मंगल दोष, मंगल भात पूजा और बुकिंग प्रक्रिया से जुड़े सामान्य प्रश्नों के उत्तर जानें।' : 'Find answers to common questions about Mangal Dosh, Mangal Bhat Puja, and the booking process.'}
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" delay={0.2}>
            <Accordion items={displayedFaqs} />
          </ScrollReveal>

          {/* View All CTA */}
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-12">
            <Link to="/faq" className="btn-outline-gold">
              {language === 'hi' ? 'सभी प्रश्न देखें' : 'View All FAQs'}
            </Link>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
export default FAQSection;
