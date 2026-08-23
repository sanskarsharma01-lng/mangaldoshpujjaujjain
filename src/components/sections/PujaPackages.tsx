import { motion, Variants } from 'framer-motion';
import { useBooking } from '../../contexts/BookingContext';
import { packages } from '../../data/packages';
import { trackEvent } from '../../lib/analytics';
import type { Package } from '../../types';

// ─────────────────────────────────────────────
//  Animation variants
// ─────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─────────────────────────────────────────────
//  CheckIcon sub-component
// ─────────────────────────────────────────────
const CheckIcon: React.FC<{ highlighted: boolean }> = ({ highlighted: _ }) => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 flex-shrink-0 text-gold"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// ─────────────────────────────────────────────
//  PackageCard sub-component
// ─────────────────────────────────────────────
interface PackageCardProps {
  pkg: Package;
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
  const { openBooking } = useBooking();

  const handleBook = () => {
    trackEvent('package_selected', {
      package_id: pkg.id,
      package_name: pkg.name,
      package_price: pkg.price,
    });
    trackEvent('book_puja_clicked', {
      source: 'packages_section',
      package_id: pkg.id,
    });
    openBooking('mangal-dosh-puja', pkg.id);
  };

  const isHighlighted = pkg.highlighted;

  // Border-top styling for basic and premium
  const borderTopStyle =
    !isHighlighted ? { borderTop: '4px solid #C9A227' } : {};

  return (
    <motion.article
      variants={cardVariants}
      className={`
        relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300
        ${
          isHighlighted
            ? 'bg-primary-dark text-ivory shadow-2xl shadow-primary/40 scale-[1.04] z-10 ring-2 ring-gold/60'
            : 'bg-white border border-gold/20 shadow-glass hover:shadow-card-hover'
        }
      `}
      style={borderTopStyle}
      whileHover={!isHighlighted ? { y: -6 } : { y: -3 }}
      aria-label={`${pkg.name} package — ${pkg.priceDisplay}`}
    >
      {/* Popular Badge */}
      {pkg.badge && (
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 z-20 pt-0"
          aria-label={`Badge: ${pkg.badge}`}
        >
          <span className="inline-flex items-center px-4 py-1.5 bg-gold text-primary font-bold text-xs tracking-widest rounded-b-xl shadow-gold uppercase">
            ★ {pkg.badge}
          </span>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-7 ${pkg.badge ? 'pt-12' : 'pt-8'}`}>
        {/* Package Name */}
        <h3
          className={`text-xl font-poppins font-bold mb-1 ${
            isHighlighted ? 'text-ivory' : 'text-primary'
          }`}
        >
          {pkg.name} Package
        </h3>

        {/* Sanskrit decoration */}
        <p
          className={`text-xs tracking-widest mb-5 font-devanagari ${
            isHighlighted ? 'text-gold/70' : 'text-gold/60'
          }`}
          aria-hidden="true"
        >
          {pkg.id === 'basic' && '।। मंगल शांति ।।'}
          {pkg.id === 'standard' && '।। मंगल भात पूजा ।।'}
          {pkg.id === 'premium' && '।। सम्पूर्ण मंगल दोष पूजा ।।'}
        </p>

        {/* Price */}
        <div className="mb-1 flex items-end gap-2">
          <span className="text-5xl font-poppins font-bold text-gold leading-none">
            {pkg.priceDisplay}
          </span>
          <span
            className={`mb-1 text-sm font-medium ${
              isHighlighted ? 'text-ivory/60' : 'text-text-muted'
            }`}
          >
            onwards
          </span>
        </div>

        {/* Gold divider */}
        <div
          className={`h-px w-12 my-5 ${isHighlighted ? 'bg-gold/50' : 'bg-gold/40'}`}
          aria-hidden="true"
        />

        {/* Description */}
        <p
          className={`text-sm leading-relaxed mb-6 ${
            isHighlighted ? 'text-ivory/80' : 'text-text-muted'
          }`}
        >
          {pkg.description}
        </p>

        {/* Feature list */}
        <ul
          className="space-y-3 mb-8 flex-1"
          aria-label={`${pkg.name} package features`}
        >
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-3 text-sm font-medium ${
                isHighlighted ? 'text-ivory/90' : 'text-text-dark'
              }`}
            >
              <CheckIcon highlighted={isHighlighted} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleBook}
          className={`
            w-full py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            active:translate-y-0 hover:-translate-y-0.5
            ${
              isHighlighted
                ? 'bg-gold text-primary hover:bg-gold-light hover:shadow-gold focus-visible:ring-gold'
                : 'bg-primary text-ivory hover:bg-primary-dark hover:shadow-primary focus-visible:ring-primary'
            }
          `}
          aria-label={`${pkg.cta} — ${pkg.name} package at ${pkg.priceDisplay}`}
        >
          {pkg.cta}
        </button>

        {/* Index badge for visual identity */}
        {index === 2 && (
          <p
            className="text-center text-xs text-text-muted mt-3"
            aria-hidden="true"
          >
            ✦ Best for complete remediation
          </p>
        )}
      </div>
    </motion.article>
  );
};

// ─────────────────────────────────────────────
//  Main PujaPackages Section
// ─────────────────────────────────────────────
export const PujaPackages: React.FC = () => {
  return (
    <section
      id="packages"
      className="section-padding bg-ivory relative overflow-hidden"
      aria-labelledby="packages-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pattern-dots opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label justify-center" aria-hidden="true">
            <span>✦</span>
            <span>Sacred Offerings</span>
            <span>✦</span>
          </p>
          <h2 id="packages-heading" className="section-title">
            Mangal Dosh Puja{' '}
            <span className="relative inline-block">
              Packages
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-gradient"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="section-subtitle mx-auto mt-5 text-center">
            Choose a package that aligns with your devotion. Each puja is
            conducted with complete Vedic procedure by our experienced Pandit Ji
            at the sacred temples of Ujjain.
          </p>
          <div className="gold-divider mt-6" aria-hidden="true" />
        </motion.div>

        {/* Pricing cards grid — md:items-start so non-highlighted cards align top */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 md:items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          role="list"
          aria-label="Puja packages"
        >
          {packages.map((pkg, index) => (
            <div key={pkg.id} role="listitem">
              <PackageCard pkg={pkg} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.p
          className="text-center text-sm text-text-muted mt-10 flex items-center justify-center gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <svg
            className="w-4 h-4 text-gold flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Prices are indicative and may vary based on specific requirements. Final
          confirmation and details will be shared via WhatsApp after booking.
        </motion.p>
      </div>
    </section>
  );
};

export default PujaPackages;
