import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { testimonials } from '../../data/testimonials';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();
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
              (Demo review indicators - genuine verified experiences will be added upon launch)
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
                aria-roledescription="slide"
                aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 text-gold" aria-label="Rating: 5 out of 5 stars">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl font-serif italic text-[#2A1515] leading-relaxed max-w-2xl mx-auto relative">
                  "{activeTestimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="space-y-1">
                  <p className="font-poppins font-bold text-gold tracking-wide">{activeTestimonial.name}</p>
                  <p className="text-text-muted text-xs tracking-wider uppercase">
                    {activeTestimonial.city} • <span className="text-gold/80">{activeTestimonial.service}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-primary bg-primary/8 hover:bg-primary/15 transition-all duration-300 focus-visible:outline-none"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
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
                aria-label={`Go to testimonial ${idx + 1}`}
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
