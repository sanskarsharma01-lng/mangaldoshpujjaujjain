import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useBooking } from '../../contexts/BookingContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

// ─────────────────────────────────────────────
//  Diya Particle — floating flame element
// ─────────────────────────────────────────────

interface DivaParticleProps {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const DivaParticle: React.FC<DivaParticleProps> = ({ x, y, size, duration, delay, opacity }) => (
  <motion.div
    aria-hidden="true"
    className="absolute pointer-events-none select-none"
    style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem`, opacity }}
    animate={{
      y: [0, -20, -8, -18, 0],
      x: [0, 4, -3, 5, 0],
      rotate: [0, 6, -4, 5, 0],
      opacity: [opacity, opacity * 1.3, opacity, opacity * 1.15, opacity],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    🪔
  </motion.div>
);

const DIYA_PARTICLES: DivaParticleProps[] = [
  { x: 5,  y: 15, size: 1.8, duration: 5.2, delay: 0,   opacity: 0.55 },
  { x: 12, y: 72, size: 1.3, duration: 4.6, delay: 1.1, opacity: 0.40 },
  { x: 88, y: 20, size: 2.0, duration: 6.0, delay: 0.6, opacity: 0.50 },
  { x: 82, y: 68, size: 1.5, duration: 4.8, delay: 2.2, opacity: 0.45 },
  { x: 50, y: 8,  size: 1.2, duration: 5.5, delay: 1.8, opacity: 0.35 },
  { x: 95, y: 45, size: 1.6, duration: 4.2, delay: 0.4, opacity: 0.42 },
  { x: 3,  y: 50, size: 1.4, duration: 5.8, delay: 3.0, opacity: 0.38 },
];

const TRUST_ITEMS = [
  'Experienced Pandits',
  'Vedic Ritual Process',
  'Ujjain-Based Puja',
  'Booking Assistance',
] as const;

// ─────────────────────────────────────────────
//  Animation variants
// ─────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'backOut' as any } },
};

const trustItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const trustContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};

// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────

const CheckIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
    <circle cx="8" cy="8" r="8" fill="rgba(201,162,39,0.25)" />
    <path d="M4.5 8.25L6.75 10.5L11.5 5.5" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8, duration: 0.6 }}
    aria-hidden="true"
  >
    <span className="text-[#8B5555] text-xs tracking-widest uppercase font-inter">Scroll</span>
    <div className="scroll-indicator">
      <motion.div
        className="w-1 h-2 bg-gold rounded-full"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
);

const GeometricOverlay: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Faint Om — top right */}
    <div className="absolute -top-10 -right-10 text-[22rem] font-serif text-gold/[0.06] select-none leading-none">
      ॐ
    </div>
    {/* Radial glow — center left */}
    <div
      className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(107,28,28,0.04) 40%, transparent 70%)' }}
    />
    {/* Radial glow — bottom right */}
    <div
      className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
      style={{ background: 'radial-gradient(circle at bottom right, rgba(230,81,0,0.06) 0%, transparent 60%)' }}
    />
    {/* Gold top border accent */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.4) 30%, rgba(201,162,39,0.6) 50%, rgba(201,162,39,0.4) 70%, transparent 100%)' }}
    />
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-60"
      style={{ backgroundImage: 'radial-gradient(rgba(201,162,39,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
    />
    {/* Mandala ring SVG */}
    <svg className="absolute right-[5%] top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.08]" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="95" stroke="#C9A227" strokeWidth="1" />
      <circle cx="100" cy="100" r="75" stroke="#C9A227" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="55" stroke="#C9A227" strokeWidth="1" />
      <circle cx="100" cy="100" r="35" stroke="#C9A227" strokeWidth="0.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line key={angle} x1="100" y1="5" x2="100" y2="195" stroke="#C9A227" strokeWidth="0.3" transform={`rotate(${angle} 100 100)`} />
      ))}
    </svg>
  </div>
);

// ─────────────────────────────────────────────
//  HeroSection
// ─────────────────────────────────────────────

export const HeroSection: React.FC = () => {
  const { openBooking } = useBooking();
  const { language } = useLanguage();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  const handleBookPuja = () => {
    trackEvent('book_puja_clicked', { source: 'hero_section', language });
    openBooking('mangal-dosh-puja');
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_clicked', { source: 'hero_section' });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="hero"
      aria-label="Mangal Dosh Puja in Ujjain — Hero Section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 25% 60%, rgba(201,162,39,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 75% 30%, rgba(107,28,28,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(201,162,39,0.05) 0%, transparent 45%),
          linear-gradient(160deg, #FFFDF8 0%, #FDF6E8 40%, #FFFCF5 70%, #FFFDF8 100%)
        `,
      }}
    >
      <GeometricOverlay />

      {/* Floating diya particles */}
      {!prefersReducedMotion && DIYA_PARTICLES.map((p, i) => <DivaParticle key={i} {...p} />)}

      {/* Main content */}
      <div className="relative z-10 container-custom w-full py-28 md:py-32 lg:py-36">
        <div className="max-w-3xl mx-auto text-center md:mx-0 md:text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start gap-6"
          >
            {/* Animated Badge */}
            <motion.div variants={badgeVariants}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold font-devanagari text-sm md:text-base tracking-wide select-none"
                style={{
                  background: 'rgba(201,162,39,0.10)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -10, 12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  aria-hidden="true"
                >
                  🕉
                </motion.span>
                वैदिक मंगल दोष निवारण पूजा
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-[#1A0808] leading-[1.1] tracking-tight"
            >
              Mangal Dosh{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #C9A227 0%, #E5C35A 50%, #C9A227 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Puja
              </span>{' '}
              <br className="hidden sm:block" />
              in{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #E5C35A 0%, #C9A227 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ujjain
              </span>
            </motion.h1>

            {/* Decorative gold line */}
            <motion.div variants={fadeInVariants} className="flex items-center gap-3" aria-hidden="true">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[#5C3D3D] text-lg md:text-xl max-w-xl font-inter leading-relaxed"
            >
              Restore cosmic harmony and remove planetary afflictions with authentic Vedic Mangal
              Dosh puja, performed by experienced Pandits at the sacred city of{' '}
              <strong className="text-gold-dark font-semibold">Ujjain</strong> — the seat of Lord
              Mangalnath.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center md:items-start gap-4 w-full sm:w-auto"
            >
              <button
                onClick={handleBookPuja}
                className="btn-gold text-base px-8 py-4 w-full sm:w-auto shadow-gold"
                aria-label="Book Mangal Dosh Puja — opens booking form"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Book Mangal Dosh Puja
              </button>

              <button
                onClick={handleWhatsApp}
                className="btn-outline-gold text-base px-8 py-4 w-full sm:w-auto"
                aria-label="Talk to Pandit Ji on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Talk to Pandit Ji
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={trustContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 mt-2"
              role="list"
              aria-label="Trust indicators"
            >
              {TRUST_ITEMS.map((item) => (
                <motion.div
                  key={item}
                  variants={trustItemVariants}
                  role="listitem"
                  className="flex items-center gap-2 text-[#4A2828] text-sm font-inter"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,253,248,0.5) 70%, rgba(255,253,248,0.8) 100%)' }}
      />
    </section>
  );
};

export default HeroSection;
