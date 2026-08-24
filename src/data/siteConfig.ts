import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'MangalDoshPujaUjjain',
  tagline: 'Authentic Mangal Dosh Puja in Ujjain',
  secondaryTagline: 'Vedic Rituals • Experienced Pandits • Sacred Ujjain',

  // ── Contact Details (update before going live) ──
  phone: import.meta.env.VITE_PHONE_NUMBER || '9926410652',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919926410652',
  whatsappMessage: 'Namaste, I would like to enquire about Mangal Dosh Puja in Ujjain.',
  email: import.meta.env.VITE_EMAIL || 'info@mangaldoshpujaujjain.com',

  // ── Location ──
  address: 'Near Mangalnath Temple, Ujjain',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  country: 'India',
  mapUrl: 'https://www.google.com/maps/search/Mangalnath+Temple+Ujjain',

  // ── Social Links (update before going live) ──
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },

  // ── SEO ──
  seo: {
    siteUrl: 'https://mangaldoshpujaujjain.com',
    defaultTitle: 'Mangal Dosh Puja in Ujjain | Mangal Bhat Puja | MangalDoshPujaUjjain',
    defaultDescription:
      'Book Mangal Dosh Puja and Mangal Bhat Puja in Ujjain. Explore traditional Vedic rituals, puja packages, booking options and guidance from experienced Pandits.',
    ogImage: '/og-image.jpg',
  },
};

// ── Trust Statistics (configurable) ──
export const trustStats = [
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 5000, suffix: '+', label: 'Devotees Guided' },
  { value: 1000, suffix: '+', label: 'Puja Ceremonies' },
  { value: 24, suffix: '/7', label: 'Booking Assistance' },
];
