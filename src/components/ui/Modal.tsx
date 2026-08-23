import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  /** Show a close button in the header. Default true */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop closes the modal. Default true */
  closeOnBackdrop?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw] min-h-[90vh]',
};

/** All focusable element selectors */
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Modal – accessible, focus-trapped, body-scroll-locked modal dialog.
 *
 * Features:
 *  - Framer Motion backdrop + panel slide-up animation
 *  - Escape key closes
 *  - Focus trap (Tab / Shift+Tab cycles inside modal)
 *  - Body scroll lock while open
 *  - Backdrop blur overlay
 *  - Configurable size: sm | md | lg | xl | full
 *  - aria-modal, role="dialog", aria-labelledby
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = `modal-title-${React.useId().replace(/:/g, '')}`;

  // ── Body scroll lock ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // ── Save & restore focus ─────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      // Focus the dialog itself (or first focusable inside) after animation
      const raf = requestAnimationFrame(() => {
        if (dialogRef.current) {
          const first = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
          (first ?? dialogRef.current).focus();
        }
      });
      return () => cancelAnimationFrame(raf);
    } else {
      previouslyFocusedRef.current?.focus();
    }
  }, [isOpen]);

  // ── Escape key handler ───────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // ── Focus trap (Tab / Shift+Tab) ─────────────────────────────
  const handleTabKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter((el) => !el.closest('[hidden]'));

    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ──────────────────────────────────────── */}
          <motion.div
            key="modal-backdrop"
            className="modal-overlay fixed inset-0 z-50 bg-primary/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* ── Scroll container ──────────────────────────────── */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            aria-hidden="false"
          >
            {/* ── Dialog panel ──────────────────────────────────── */}
            <motion.div
              key="modal-panel"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              tabIndex={-1}
              onKeyDown={handleTabKey}
              className={`
                relative w-full ${sizeClasses[size]}
                bg-ivory rounded-3xl shadow-2xl shadow-primary/20
                border border-gold/20
                flex flex-col
                focus:outline-none
                my-auto
              `}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top border accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full" />

              {/* ── Header ──────────────────────────────────────── */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gold/10">
                  {title && (
                    <h2
                      id={titleId}
                      className="font-poppins font-bold text-xl text-primary leading-snug pr-2"
                    >
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      aria-label="Close modal"
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-primary transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 ml-auto"
                    >
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  )}
                </div>
              )}

              {/* ── Body ────────────────────────────────────────── */}
              <div className="flex-1 px-6 py-6 overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
