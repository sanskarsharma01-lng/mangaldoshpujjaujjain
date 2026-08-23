import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBooking } from '../../contexts/BookingContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface NavItem {
  label: string;
  labelHi: string;
  href: string;
  isExternal?: boolean;
  isHash?: boolean;
  children?: NavItem[];
}

// ─────────────────────────────────────────────
//  Navigation Structure
// ─────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', labelHi: 'होम', href: '/' },
  { label: 'About Us', labelHi: 'हमारे बारे में', href: '/about' },
  {
    label: 'Puja Services',
    labelHi: 'पूजा सेवाएँ',
    href: '#',
    children: [
      { label: 'Mangal Dosh Puja', labelHi: 'मंगल दोष पूजा', href: '/mangal-dosh-puja-ujjain' },
      { label: 'Mangal Bhat Puja', labelHi: 'मंगल भात पूजा', href: '/mangal-bhat-puja-ujjain' },
      { label: 'Mangal Shanti Puja', labelHi: 'मंगल शांति पूजा', href: '/mangal-shanti-puja' },
      { label: 'Mahakaleshwar Puja', labelHi: 'महाकालेश्वर पूजा', href: '/mahakaleshwar-puja-ujjain' },
      { label: 'Mahamrityunjaya Jaap', labelHi: 'महामृत्युंजय जाप', href: '/mahamrityunjaya-jaap-ujjain' },
      { label: 'Kaal Sarp Dosh Puja', labelHi: 'काल सर्प दोष पूजा', href: '/kaal-sarp-dosh-puja-ujjain' },
      { label: 'Navgraha Shanti Puja', labelHi: 'नवग्रह शांति पूजा', href: '/navgraha-shanti-puja' },
      { label: 'Rudrabhishek Puja', labelHi: 'रुद्राभिषेक पूजा', href: '/rudrabhishek' },
      { label: 'Baglamukhi Havan', labelHi: 'बगलामुखी हवन', href: '/baglamukhi-havan-ujjain' },
      { label: 'Pitra Dosh Nivaran', labelHi: 'पितृ दोष निवारण', href: '/pitra-dosh-nivaran-puja' },
    ],
  },
  { label: 'Gallery', labelHi: 'गैलरी', href: '/gallery' },
  { label: 'Blog', labelHi: 'ब्लॉग', href: '/blog' },
  { label: 'FAQs', labelHi: 'प्रश्नोत्तर', href: '/faq' },
  { label: 'Contact', labelHi: 'संपर्क', href: '/contact' },
];

// ─────────────────────────────────────────────
//  Derived helpers
// ─────────────────────────────────────────────

const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  siteConfig.whatsappMessage
)}`;


// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────

/** Desktop nav link with gold active underline and hover dropdown */
const DesktopNavLink: React.FC<{ item: NavItem; lang: 'en' | 'hi' }> = ({ item, lang }) => {
  const label = lang === 'hi' ? item.labelHi : item.label;
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <div
        className="relative group py-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className="flex items-center gap-1 text-sm font-medium text-text-dark hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm cursor-pointer"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
          <svg className={`w-3 h-3 fill-none stroke-current transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" strokeWidth="2.5"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border border-gold/15 rounded-xl shadow-lg py-2 z-50 transition-all duration-200 ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-t border-l border-gold/15 rotate-45" />
          <ul className="relative z-10">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  to={child.href}
                  className="block px-4 py-2.5 text-xs font-semibold text-text-dark hover:text-primary hover:bg-gold/5 transition-all duration-150 border-l-2 border-transparent hover:border-gold"
                >
                  {lang === 'hi' ? child.labelHi : child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (item.isHash) {
    return (
      <a
        href={item.href}
        className="relative group text-sm font-medium text-text-dark hover:text-primary transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
      >
        {label}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300 rounded-full"
        />
      </a>
    );
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) =>
        [
          'relative group text-sm font-medium transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm',
          isActive ? 'text-primary' : 'text-text-dark hover:text-primary',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            aria-hidden="true"
            className={[
              'absolute -bottom-1 left-0 h-0.5 bg-gold rounded-full transition-all duration-300',
              isActive ? 'w-full' : 'w-0 group-hover:w-full',
            ].join(' ')}
          />
        </>
      )}
    </NavLink>
  );
};

/** Mobile drawer nav link with collapsible accordion for children */
const MobileNavLink: React.FC<{
  item: NavItem;
  onClose: () => void;
  lang: 'en' | 'hi';
}> = ({ item, onClose, lang }) => {
  const label = lang === 'hi' ? item.labelHi : item.label;
  const [isOpen, setIsOpen] = useState(false);

  const baseClasses =
    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold';

  if (item.children) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${baseClasses} w-full justify-between text-text-dark hover:bg-gold/10`}
        >
          <span className="flex items-center gap-3">
            <span className="text-gold/60 text-xs">॰</span>
            {label}
          </span>
          <svg className={`w-4 h-4 fill-none stroke-current transition-transform duration-200 ${isOpen ? 'rotate-185' : ''}`} viewBox="0 0 24 24" strokeWidth="2.5"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {isOpen && (
          <ul className="pl-6 border-l border-gold/25 mt-1 space-y-1">
            {item.children.map((child) => (
              <li key={child.href}>
                <NavLink
                  to={child.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/5 font-semibold'
                        : 'text-text-muted hover:text-primary hover:bg-gold/10'
                    }`
                  }
                >
                  {lang === 'hi' ? child.labelHi : child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (item.isHash) {
    return (
      <a
        href={item.href}
        onClick={onClose}
        className={`${baseClasses} text-text-dark hover:text-primary hover:bg-gold/10`}
      >
        <span className="text-gold text-xs">॰</span>
        {label}
      </a>
    );
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      onClick={onClose}
      className={({ isActive }) =>
        `${baseClasses} ${
          isActive
            ? 'text-primary bg-primary/5 border-l-2 border-gold'
            : 'text-text-dark hover:text-primary hover:bg-gold/10'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`text-xs ${isActive ? 'text-gold' : 'text-gold/60'}`}>॰</span>
          {label}
        </>
      )}
    </NavLink>
  );
};

// ─────────────────────────────────────────────
//  Main Navbar Component
// ─────────────────────────────────────────────

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { openBooking } = useBooking();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // ── Scroll detection ──────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close drawer on route change ──────────
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // ── Close drawer on Escape ─────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  // ── Scroll lock when drawer open ──────────
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // ── Focus trap in mobile drawer ────────────
  useEffect(() => {
    if (!isMobileOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', trap);
    first?.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [isMobileOpen]);



  const handleWhatsAppClick = useCallback(() => {
    trackEvent('whatsapp_clicked', { source: 'navbar' });
  }, []);

  const handleBookPuja = useCallback(() => {
    trackEvent('book_puja_clicked', { source: 'navbar' });
    openBooking();
  }, [openBooking]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  // ─────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────

  return (
    <>
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gold/20 shadow-sm navbar-scrolled'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="container-custom"
        >
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* ── Logo ──────────────────────────── */}
            <Link
              to="/"
              aria-label="MangalDoshPujaUjjain — Go to homepage"
              className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1 -m-1"
            >
              <span
                aria-hidden="true"
                className="text-2xl leading-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              >
                🕉
              </span>
              <span className="font-poppins font-bold text-primary text-lg leading-tight hidden sm:block">
                MangalDosh
                <span className="text-gold">Puja</span>
                <span className="text-primary">Ujjain</span>
              </span>
              <span className="font-poppins font-bold text-primary text-base leading-tight sm:hidden">
                MDPU
              </span>
            </Link>

            {/* ── Desktop Nav Links ──────────────── */}
            <ul
              role="list"
              className="hidden lg:flex items-center gap-6 xl:gap-8"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <DesktopNavLink item={item} lang={language} />
                </li>
              ))}
            </ul>

            {/* ── Desktop CTAs ───────────────────── */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gold/40 text-sm font-medium text-text-dark hover:border-gold hover:text-primary hover:bg-gold/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span
                  className={`transition-all duration-200 ${language === 'en' ? 'text-primary font-semibold' : 'text-text-muted'}`}
                >
                  EN
                </span>
                <span className="text-gold/60 text-xs">|</span>
                <span
                  className={`font-devanagari transition-all duration-200 ${language === 'hi' ? 'text-primary font-semibold' : 'text-text-muted'}`}
                >
                  हिंदी
                </span>
              </button>



              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-200 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <MessageCircle size={15} strokeWidth={2.2} aria-hidden="true" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>

              {/* Book Puja */}
              <button
                onClick={handleBookPuja}
                aria-label="Book a Puja ceremony"
                className="btn-primary text-sm px-4 py-2"
              >
                Book Puja
              </button>
            </div>

            {/* ── Mobile: Language + Hamburger ──── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Language mini toggle */}
              <button
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gold/40 text-xs font-medium text-text-dark hover:border-gold hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className={language === 'en' ? 'text-primary font-bold' : 'text-text-muted'}>
                  EN
                </span>
                <span className="text-gold/60 text-xs">|</span>
                <span
                  className={`font-devanagari ${language === 'hi' ? 'text-primary font-bold' : 'text-text-muted'}`}
                >
                  हि
                </span>
              </button>

              {/* Hamburger */}
              <button
                ref={hamburgerRef}
                onClick={toggleMobile}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-drawer"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <X size={22} aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <Menu size={22} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ──────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-ivory flex flex-col shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20 bg-cream/50">
                <Link
                  to="/"
                  onClick={closeMobile}
                  className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
                  aria-label="MangalDoshPujaUjjain homepage"
                >
                  <span className="text-xl" aria-hidden="true">🕉</span>
                  <span className="font-poppins font-bold text-primary text-base">
                    MangalDosh<span className="text-gold">Puja</span>Ujjain
                  </span>
                </Link>
                <button
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-xl text-text-muted hover:text-primary hover:bg-gold/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Decorative divider */}
              <div className="px-5 pt-4">
                <div className="flex items-center gap-2 text-gold/40 text-xs font-medium uppercase tracking-widest">
                  <div className="h-px flex-1 bg-gold/20" />
                  <span>Navigation</span>
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
              </div>

              {/* Nav links */}
              <nav
                role="navigation"
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar"
              >
                <ul role="list" className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <MobileNavLink item={item} lang={language} onClose={closeMobile} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer CTAs */}
              <div className="px-4 py-5 border-t border-gold/20 bg-cream/40 space-y-3">
                {/* Call + WhatsApp row */}
                <div className="grid grid-cols-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handleWhatsAppClick();
                      closeMobile();
                    }}
                    aria-label="Chat with us on WhatsApp"
                    className="btn-whatsapp text-sm px-4 py-3 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} strokeWidth={2.2} aria-hidden="true" />
                    WhatsApp Chat
                  </a>
                </div>

                {/* Book Puja CTA */}
                <button
                  onClick={() => {
                    handleBookPuja();
                    closeMobile();
                  }}
                  aria-label="Book a Puja ceremony"
                  className="btn-primary w-full py-3 text-base"
                >
                  <span>Book Puja Now</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
