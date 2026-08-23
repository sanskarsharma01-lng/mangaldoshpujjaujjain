import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { trustStats } from '../../data/siteConfig';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const TrustStats: React.FC = () => {
  const { t, language } = useLanguage();
  const labelsHi = ['वर्षों का अनुभव', 'मार्गदर्शन प्राप्त भक्त', 'पूजा समारोह', 'बुकिंग सहायता'];

  return (
    <section className="bg-cream/40 border-t border-b border-gold/15 py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
      <div className="container-custom relative z-10">
        <h2 className="sr-only">{t('trustStats.title')}</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="flex items-baseline justify-center text-gradient-gold text-4xl md:text-5xl font-poppins font-bold tracking-tight mb-2">
                <AnimatedCounter value={stat.value} duration={1.8} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-warm-brown font-medium text-sm md:text-base uppercase tracking-wider">
                {language === 'hi' ? labelsHi[index] : stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default TrustStats;
