import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

interface WhyCard {
  icon: string;
  title: string;
  desc: string;
}

export const WhyUjjain: React.FC = () => {
  const { t, language } = useLanguage();

  const cards: WhyCard[] = language === 'hi' ? [
    { icon: '🔱', title: 'पवित्र मंगलनाथ मंदिर', desc: 'पारंपरिक मान्यताओं में इसे भगवान मंगल का जन्मस्थान माना जाता है, इसलिए मंगल पूजा के लिए यह सबसे शुभ स्थान है।' },
    { icon: '🕉', title: 'वैदिक अनुष्ठान', desc: 'सभी समारोह शास्त्रीय वैदिक ग्रंथों, परंपराओं और मंत्र विधि के अनुसार संपन्न किए जाते हैं।' },
    { icon: '👨‍🦳', title: 'अनुभवी पंडित', desc: 'हमारे स्थानीय पंडितों को पीढ़ियों से वैदिक प्रशिक्षण प्राप्त है और वे मंगल दोष व मंगल भात पूजा में विशेषज्ञ हैं।' },
    { icon: '🌺', title: 'पूजा में पूरी सहायता', desc: 'हम आवश्यक पूजा सामग्री, मंदिर समन्वय और सभी अनुष्ठानिक व्यवस्थाएं करते हैं, जिससे आपका अनुभव सहज रहता है।' },
    { icon: '📿', title: 'व्यक्तिगत मार्गदर्शन', desc: 'हर अनुष्ठान आपकी जन्म-कुंडली और पारंपरिक पारिवारिक गोत्र के अनुसार व्यवस्थित किया जाता है।' },
    { icon: '🙏', title: 'पवित्र वातावरण', desc: 'आध्यात्मिक ऊर्जा और भक्ति से भरे प्राचीन शहर उज्जैन में पवित्र शिप्रा नदी के तट पर पूजा करें।' },
  ] : [
    {
      icon: '🔱',
      title: 'Sacred Mangalnath Temple',
      desc: 'Regarded in traditional beliefs as the birthplace of Lord Mangal (Mars), making it the most auspicious location for Mangal worship.',
    },
    {
      icon: '🕉',
      title: 'Vedic Rituals',
      desc: 'All ceremonies are conducted precisely according to classical Vedic scriptures, traditions, and mantra procedures.',
    },
    {
      icon: '👨‍🦳',
      title: 'Experienced Pandits',
      desc: 'Our local Pandits have generations of Vedic training and specialize in traditional Mangal Dosh and Mangal Bhat puja rituals.',
    },
    {
      icon: '🌺',
      title: 'Complete Puja Assistance',
      desc: 'We arrange all necessary puja samagri, temple coordination, and ritual arrangements, ensuring a seamless experience for you.',
    },
    {
      icon: '📿',
      title: 'Personalized Guidance',
      desc: 'Each ritual is customized according to your birth chart (Kundli) requirements and traditional family gotra alignments.',
    },
    {
      icon: '🙏',
      title: 'Sacred Environment',
      desc: 'Perform your puja on the holy banks of River Shipra in Ujjain, a ancient city filled with spiritual energy and devotion.',
    },
  ];

  return (
    <section className="section-padding bg-[#FDF8EF] relative overflow-hidden" id="why-ujjain">
      {/* Background patterns */}
      <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label text-gold justify-center">
              <span aria-hidden="true">🔱</span> पवित्र अवंतिका धाम
            </span>
            <h2 className="section-title">
              {t('whyUjjain.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="text-text-muted text-lg mt-4">
              {language === 'hi' ? 'उज्जैन का वैदिक ब्रह्मांड विज्ञान और ज्योतिष में विशेष स्थान है। भगवान शिव और मंगल देव की इस पवित्र नगरी में अपना अनुष्ठान संपन्न करें।' : 'Ujjain holds a unique position in Vedic cosmology and astrology. Perform your rituals in the ultimate city of Lord Shiva and Mangal Dev.'}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative flex flex-col p-6 rounded-2xl bg-white border border-gold/15 hover:border-gold/35 hover:shadow-gold-sm hover:bg-gold/5 transition-all duration-300 shadow-glass"
            >
              {/* Gold border hover line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-semibold mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <span aria-hidden="true">{card.icon}</span>
              </div>

              <h3 className="text-xl font-poppins font-bold text-primary mb-3">
                {card.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};
export default WhyUjjain;
