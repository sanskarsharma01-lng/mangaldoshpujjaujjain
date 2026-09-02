// ─────────────────────────────────────────────
//  Global TypeScript Types
// ─────────────────────────────────────────────

export interface Service {
  id: string;
  name: string;
  nameHi?: string;
  slug: string;
  shortDescription: string;
  shortDescriptionHi?: string;
  fullDescription: string;
  fullDescriptionHi?: string;
  icon: string;
  features: string[];
  featuresHi?: string[];
  image?: string;
  metaTitle: string;
  metaDescription: string;
  faqs?: {
    question: string;
    answer: string;
    questionHi?: string;
    answerHi?: string;
  }[];
}

export interface Package {
  id: string;
  name: string;
  price?: number;
  priceDisplay?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export interface PackageFeature {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  isPlaceholder: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  category: string;
  tags: string[];
  faqs?: FAQ[];
  relatedSlugs?: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altHi?: string;
  category: 'Temple' | 'Puja' | 'Havan' | 'Pandit Ji' | 'Ujjain' | 'Devotees' | 'Prasad';
  width: number;
  height: number;
}

export interface Pandit {
  name: string;
  title: string;
  experience: string;
  specializations: string[];
  languages: string[];
  location: string;
  bio: string;
  badges: string[];
  image?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  secondaryTagline: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  mapUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
}

export interface BookingForm {
  pujaId: string;
  packageId: string;
  date: string;
  time: string;
  name: string;
  mobile: string;
  email?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  devotees?: number;
  notes?: string;
}

export interface Language {
  code: 'en' | 'hi';
  label: string;
  nativeLabel: string;
}
