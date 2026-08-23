import type { Package, PackageFeature } from '../types';

// ── Pricing (update before going live) ──
export const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential Mangal Shanti Puja with traditional rituals.',
    highlighted: false,
    cta: 'Book Now',
    features: [
      'Mangal Shanti Puja',
      'Mantra Jaap',
      'Havan',
      'Aarti',
      'Prasad',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Complete Mangal Bhat Puja with Graha Shanti and booking confirmation.',
    highlighted: true,
    badge: 'MOST POPULAR',
    cta: 'Book Now',
    features: [
      'Mangal Bhat Puja',
      'Mangal Shanti',
      'Graha Shanti',
      'Havan',
      'Aarti',
      'Prasad',
      'Booking Confirmation',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Complete premium Mangal Dosh Puja with extended Vedic rituals.',
    highlighted: false,
    cta: 'Book Premium Puja',
    features: [
      'Complete Mangal Dosh Puja',
      'Special Mangal Havan',
      'Tarpan',
      'Extended Vedic Ritual',
      'Multiple Pandit Arrangement',
      'Prasad',
      'Puja Confirmation',
    ],
  },
];

export const packageComparison: PackageFeature[] = [
  { name: 'Mangal Shanti', basic: true, standard: true, premium: true },
  { name: 'Mangal Bhat Puja', basic: false, standard: true, premium: true },
  { name: 'Mantra Jaap', basic: true, standard: true, premium: true },
  { name: 'Havan', basic: true, standard: true, premium: true },
  { name: 'Graha Shanti', basic: false, standard: true, premium: true },
  { name: 'Tarpan', basic: false, standard: false, premium: true },
  { name: 'Pandit Arrangement', basic: '1 Pandit', standard: '1 Pandit', premium: 'Multiple Pandits' },
  { name: 'Prasad', basic: true, standard: true, premium: true },
  { name: 'Booking Confirmation', basic: false, standard: true, premium: true },
  { name: 'Extended Ritual', basic: false, standard: false, premium: true },
];
