import React from 'react';
import { motion, Variants } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'down';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay before the animation starts (seconds). Default 0 */
  delay?: number;
  /** Direction from which the element slides in. Default 'up' */
  direction?: Direction;
  /** Extra Tailwind / CSS classes on the wrapper div */
  className?: string;
  /** How far (px) the element travels before reaching its final position. Default 32 */
  distance?: number;
  /** Animation duration in seconds. Default 0.6 */
  duration?: number;
  /** Fraction of element visible before triggering. Default 0.15 */
  threshold?: number;
}

const buildVariants = (direction: Direction, distance: number): Variants => {
  const axis: Record<Direction, { x?: number; y?: number }> = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...axis[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

/**
 * ScrollReveal – wraps any children in a Framer Motion div that fades
 * and slides in when the element enters the viewport.
 *
 * Usage:
 *   <ScrollReveal delay={0.2} direction="left">
 *     <MyCard />
 *   </ScrollReveal>
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  distance = 32,
  duration = 0.6,
  threshold = 0.15,
}) => {
  const variants = buildVariants(direction, distance);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // custom ease-out curve
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Stagger helpers ──────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child animation. Default 0.1 */
  staggerDelay?: number;
  /** Fraction of container visible before triggering. Default 0.08 */
  threshold?: number;
}

const staggerContainerVariants = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * StaggerContainer – motion parent that cascades children animations.
 * Pair with <StaggerItem> for each child.
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.08,
}) => (
  <motion.div
    className={className}
    variants={staggerContainerVariants(staggerDelay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: threshold }}
  >
    {children}
  </motion.div>
);

/** StaggerItem – direct child of StaggerContainer that inherits stagger timing. */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div className={className} variants={staggerChildVariants}>
    {children}
  </motion.div>
);

export default ScrollReveal;
