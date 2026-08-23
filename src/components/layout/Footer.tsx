import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleContactClick = () => {
    trackEvent('whatsapp_clicked', { source: 'footer' });
  };

  return (
    <footer role="contentinfo" className="bg-primary-dark text-ivory pt-16 pb-8 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient-gold">
              <span aria-hidden="true">🕉</span>
              <span className="font-poppins">{siteConfig.name}</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4 pt-2">
              {siteConfig.socialLinks.facebook && (
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-gold font-poppins font-semibold tracking-wider uppercase text-sm mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/mangal-dosh-puja-ujjain" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.mangalDoshPuja')}
                </Link>
              </li>
              <li>
                <Link to="/puja-packages" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.pujaPackages')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Blog & Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.faqs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-gold font-poppins font-semibold tracking-wider uppercase text-sm mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/mangal-dosh-puja-ujjain" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Mangal Dosh Puja
                </Link>
              </li>
              <li>
                <Link to="/mangal-bhat-puja-ujjain" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Mangal Bhat Puja
                </Link>
              </li>
              <li>
                <Link to="/mangal-shanti-puja" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Mangal Shanti Puja
                </Link>
              </li>
              <li>
                <Link to="/navgraha-shanti-puja" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Navgraha Shanti
                </Link>
              </li>
              <li>
                <Link to="/rudrabhishek" className="text-ivory/80 hover:text-gold transition-colors duration-200">
                  Rudrabhishek
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Legal */}
          <div>
            <h3 className="text-gold font-poppins font-semibold tracking-wider uppercase text-sm mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-ivory/80">
                  {siteConfig.address}, {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                </span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleContactClick}
                  className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>WhatsApp: +91 9770581244</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ivory/60">
          <p>{t('footer.copyright')}</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="hover:text-gold transition-colors duration-200">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
