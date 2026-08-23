import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { testimonials } from '../../data/testimonials';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play effect
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeTestimonial = testimonials[currentIndex];
  const hindiTestimonials = [
    { text: 'पूजा पूरी श्रद्धा और पारंपरिक विधि से संपन्न हुई। पंडित जी ने पूरी प्रक्रिया में हमारा बहुत अच्छा मार्गदर्शन किया। उज्जैन में पूजा के बाद हमें सचमुच आशीर्वाद का अनुभव हुआ।', service: 'मंगल दोष पूजा' },
    { text: 'टीम ने हर बात सरलता से समझाई और मंगल भात पूजा बिल्कुल बताए गए तरीके से संपन्न हुई। उज्जैन का आध्यात्मिक अनुभव बहुत विशेष रहा।', service: 'मंगल भात पूजा' },
    { text: 'बुकिंग प्रक्रिया सरल थी और पूजा पूरी पारंपरिक विधि से संपन्न हुई। उज्जैन में मंगल दोष पूजा कराने वालों के लिए मैं इसकी सिफारिश करता हूं।', service: 'मंगल शांति पूजा' },
    { text: 'नवग्रह शांति पूजा बहुत व्यवस्थित तरीके से हुई। पंडित जी ने हर चरण का महत्व समझाया और उज्जैन का वातावरण अनुभव को और सुंदर बनाता है।', service: 'नवग्रह शांति' },
    { text: 'टीम ने सभी व्यवस्थाओं में सहायता की और रुद्राभिषेक पारंपरिक तरीके से संपन्न हुआ। सेवा बहुत अच्छी रही।', service: 'रुद्राभिषेक' },
    { text: 'बुकिंग आसान रही, संवाद तेज था और पूजा सुंदर तरीके से संपन्न हुई। पंडित जी ने हमारे परिवार का पूरे सम्मान से स्वागत किया।', service: 'मंगल दोष पूजा' },
  ];
  const currentHindiTestimonial = hindiTestimonials[currentIndex];

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="devotee-experiences">
      <div className="absolute inset-0 pattern-dots opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label text-gold justify-center">
              <span aria-hidden="true">★</span> भक्त अनुभव
            </span>
            <h2 className="section-title">
              {t('testimonials.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="text-text-muted text-sm italic">
              {language === 'hi' ? '(डेमो समीक्षा संकेतक - वास्तविक सत्यापित अनुभव लॉन्च के बाद जोड़े जाएंगे)' : '(Demo review indicators - genuine verified experiences will be added upon launch)'}
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel Area */}
        <div className="max-w-3xl mx-auto relative px-4 sm:px-8">
          <div className="min-h-[220px] sm:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-center space-y-5"
                role="group"
                aria-roledescription={language === 'hi' ? 'स्लाइड' : 'slide'}
                aria-label={`${language === 'hi' ? 'अनुभव' : 'Testimonial'} ${currentIndex + 1} ${language === 'hi' ? 'में से' : 'of'} ${testimonials.length}`}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 text-gold" aria-label="Rating: 5 out of 5 stars">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl font-serif italic text-[#2A1515] leading-relaxed max-w-2xl mx-auto relative">
                  "{language === 'hi' ? currentHindiTestimonial.text : activeTestimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="space-y-1">
                  <p className="font-poppins font-bold text-gold tracking-wide">{activeTestimonial.name}</p>
                  <p className="text-text-muted text-xs tracking-wider uppercase">
                    {activeTestimonial.city} • <span className="text-gold/80">{language === 'hi' ? currentHindiTestimonial.service : activeTestimonial.service}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label={language === 'hi' ? 'पिछला अनुभव' : 'Previous testimonial'}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-primary bg-primary/8 hover:bg-primary/15 transition-all duration-300 focus-visible:outline-none"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label={language === 'hi' ? 'अगला अनुभव' : 'Next testimonial'}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-primary bg-primary/8 hover:bg-primary/15 transition-all duration-300 focus-visible:outline-none"
          >
            ›
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${language === 'hi' ? 'अनुभव देखें' : 'Go to testimonial'} ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none ${
                  currentIndex === idx ? 'bg-gold w-6' : 'bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
export default Testimonials;
