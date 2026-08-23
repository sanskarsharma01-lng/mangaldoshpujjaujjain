import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /**
   * When true, multiple items can be open simultaneously.
   * When false (default), opening one item closes the previous.
   */
  allowMultiple?: boolean;
  /** Extra Tailwind / CSS classes on the root wrapper */
  className?: string;
}

/**
 * Accordion – fully accessible, single or multi-open accordion.
 *
 * - Uses aria-expanded + aria-controls + role="region" for screen readers
 * - Gold +/- icon, smooth Framer Motion height animation
 * - Keyboard: Enter / Space opens; Tab navigates between triggers
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const uid = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <div className={`space-y-3 ${className ?? ''}`} role="list">
      {items.map((item, idx) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${uid}-trigger-${item.id}`;
        const regionId = `${uid}-region-${item.id}`;

        return (
          <div
            key={item.id}
            role="listitem"
            className={`
              rounded-2xl border transition-all duration-300 overflow-hidden
              ${isOpen
                ? 'border-gold/50 shadow-gold bg-white'
                : 'border-gold/20 bg-white/80 hover:border-gold/40 hover:bg-white'}
            `}
          >
            {/* ── Trigger ──────────────────────────────────────── */}
            <button
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={regionId}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset rounded-2xl"
            >
              {/* Question number badge + text */}
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-colors duration-300
                    ${isOpen ? 'bg-gold text-primary' : 'bg-gold/10 text-gold'}
                  `}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span
                  className={`
                    font-poppins font-semibold text-base md:text-lg leading-snug transition-colors duration-200
                    ${isOpen ? 'text-primary' : 'text-text-dark group-hover:text-primary'}
                  `}
                >
                  {item.question}
                </span>
              </div>

              {/* Expand / collapse icon */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                  ${isOpen ? 'bg-gold text-primary' : 'bg-gold/10 text-gold group-hover:bg-gold/20'}
                `}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                )}
              </motion.div>
            </button>

            {/* ── Content Panel ─────────────────────────────────── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={regionId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Gold top border accent */}
                  <div className="mx-6 h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

                  <div className="px-6 py-5 pl-16">
                    <p className="text-text-muted leading-relaxed text-base font-inter">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
