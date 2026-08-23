import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /** The final number to count to */
  value: number;
  /** Text appended after the number (e.g. '+', '/7', '%') */
  suffix?: string;
  /** Text prepended before the number (e.g. '₹', '$') */
  prefix?: string;
  /** Animation duration in seconds. Default 2 */
  duration?: number;
  /** Extra Tailwind / CSS classes on the <span> wrapper */
  className?: string;
  /** Easing function for the counter animation. Default 'easeOut' */
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}

/** Maps easing name → progress transformer */
const easingFns: Record<string, (t: number) => number> = {
  linear:    (t) => t,
  easeOut:   (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

/**
 * AnimatedCounter – counts from 0 → value when scrolled into view.
 * Uses Framer Motion's useInView for the viewport trigger and a
 * requestAnimationFrame loop for smooth number interpolation.
 *
 * Usage:
 *   <AnimatedCounter value={5000} suffix="+" duration={2} className="text-4xl font-bold text-gold" />
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
  easing = 'easeOut',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const easeFn = easingFns[easing] ?? easingFns.easeOut;
    const durationMs = duration * 1000;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeFn(progress);

      setDisplayValue(Math.round(easedProgress * value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(value); // guarantee exact final value
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, value, duration, easing]);

  // Format large numbers with locale-aware commas
  const formatted = displayValue.toLocaleString('en-IN');

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
