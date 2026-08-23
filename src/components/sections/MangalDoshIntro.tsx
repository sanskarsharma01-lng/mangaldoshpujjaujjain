import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const MangalDoshIntro: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-ivory relative overflow-hidden" id="about-mangal-dosh">
      {/* Subtle om element in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gold/5 font-serif text-[24rem] select-none pointer-events-none transform translate-x-1/3">
        🕉
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Educational Content */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="section-label">
                <span aria-hidden="true">🔱</span> ज्योतिषीय परिचय
              </span>
              <h2 className="section-title">
                {t('mangalDosh.sectionTitle')}
              </h2>
              <div className="gold-divider-left" />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-4 text-text-muted leading-relaxed">
              {language === 'hi' ? <>
                <p>पारंपरिक वैदिक ज्योतिष के अनुसार <strong>मंगल दोष</strong> एक विशेष ग्रह स्थिति है। जब जन्म-कुंडली के 1वें, 2वें, 4वें, 7वें, 8वें या 12वें भाव में मंगल स्थित होता है, तब इसे मंगल दोष माना जाता है।</p>
                <p>मंगल को अग्नि, उत्साह, महत्वाकांक्षा और ऊर्जा से जुड़ा ग्रह माना जाता है। भक्त शांति और सामंजस्य के लिए पारंपरिक उपायों का सहारा लेते हैं।</p>
                <p>योग्य ज्योतिषी या वैदिक पंडित आपकी पूरी जन्म-कुंडली का विश्लेषण कर उचित मार्गदर्शन दे सकते हैं। पारंपरिक उपायों में वैदिक अनुष्ठान, मंत्र जाप और पवित्र स्थलों पर पूजा शामिल हैं।</p>
              </> : <>
                <p>According to traditional Vedic astrology, <strong>Mangal Dosh</strong> (also known as Kuja Dosha or Manglik Dosh) is a specific planetary combination. It is considered when Mars (Mangal) is positioned in the 1st, 2nd, 4th, 7th, 8th, or 12th house of a person's birth chart (Kundli).</p>
                <p>Mars is traditionally associated with fire, passion, ambition, and energy. Its placement in these specific houses is believed in Vedic tradition to create strong astrological influences. Many devotees seek traditional remedies to find peace and harmony.</p>
                <p>A qualified astrologer or Vedic Pandit can analyze your complete birth chart to guide you properly. Traditional remedies include dedicated Vedic rituals, chanting of mantras, and performing traditional ceremonies at sacred locations.</p>
              </>}
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">✔</span>
                  <span className="text-text-dark font-medium text-sm">{language === 'hi' ? 'पवित्र मंगलनाथ मंदिर से जुड़ाव' : 'Sacred Mangalnath Temple association'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">✔</span>
                  <span className="text-text-dark font-medium text-sm">{language === 'hi' ? 'अनुभवी वैदिक पंडित' : 'Experienced Vedic Pandits'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">✔</span>
                  <span className="text-text-dark font-medium text-sm">{language === 'hi' ? 'पारंपरिक वैदिक पूजा विधि' : 'Traditional Vedic ritual procedures'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-gold text-lg mt-0.5" aria-hidden="true">✔</span>
                  <span className="text-text-dark font-medium text-sm">{language === 'hi' ? 'पूजा बुकिंग में पूरी सहायता' : 'Full puja booking assistance'}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Decorative Sacred Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="right" delay={0.2} className="w-full max-w-sm">
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#FDF6E8] to-[#F5E8CE] border-2 border-gold/30 shadow-gold flex items-center justify-center p-8 overflow-hidden group">
                {/* Rotating decorative mandala rings */}
                <div className="absolute inset-4 border border-gold/15 rounded-full animate-spin-slow opacity-60 pointer-events-none" />
                <div className="absolute inset-10 border border-dashed border-gold/10 rounded-full animate-spin-slow opacity-40 pointer-events-none [animation-direction:reverse]" />
                
                {/* Inner glowing core */}
                <div className="relative z-10 text-center space-y-4">
                  <span className="text-gold text-8xl block select-none drop-shadow-[0_0_15px_rgba(201,162,39,0.4)] transition-transform duration-500 group-hover:scale-105" aria-hidden="true">🕉</span>
                  <div className="space-y-1">
                    <p className="text-primary font-serif text-xl tracking-wider font-semibold">श्री मंगलनाथाय नमः</p>
                    <p className="text-primary text-xs tracking-widest uppercase">{language === 'hi' ? 'पवित्र उज्जैन धाम' : 'Sacred Ujjain Dham'}</p>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 text-gold/60 text-xs">🔱</div>
                <div className="absolute top-4 right-4 text-gold/60 text-xs">🔱</div>
                <div className="absolute bottom-4 left-4 text-gold/60 text-xs">🔱</div>
                <div className="absolute bottom-4 right-4 text-gold/60 text-xs">🔱</div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
export default MangalDoshIntro;
