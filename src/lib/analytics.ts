/**
 * analytics.ts
 * Centralised Google Analytics 4 (GA4) tracking wrapper.
 *
 * The measurement ID is read from the VITE_GA4_ID env variable so it never
 * has to be hard-coded in component files.
 *
 * Usage:
 *   import { trackEvent, trackPageView } from '../lib/analytics';
 *   trackEvent('whatsapp_clicked', { source: 'floating_cta' });
 *   trackPageView('/contact', 'Contact Us');
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID: string = import.meta.env.VITE_GA4_ID ?? '';

// ─── Event catalogue ────────────────────────────────────────────────────────
export type AnalyticsEvent =
  // Contact / CTA
  | 'whatsapp_clicked'
  | 'call_clicked'
  // Booking funnel
  | 'book_puja_clicked'
  | 'booking_started'
  | 'booking_step_completed'
  | 'booking_completed'
  // Packages
  | 'package_selected'
  // Services
  | 'service_page_viewed'
  // Forms
  | 'contact_submitted'
  | 'mangal_checker_submitted'
  // Misc consultations
  | 'numerology_consult_clicked'
  | 'vastu_consult_clicked';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isGtagReady = (): boolean =>
  Boolean(GA_ID) && typeof window !== 'undefined' && typeof window.gtag === 'function';

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Track a named event with optional parameters.
 * Automatically sent to the configured GA4 property.
 */
export const trackEvent = (event: AnalyticsEvent, params?: EventParams): void => {
  if (isGtagReady()) {
    window.gtag!('event', event, {
      send_to: GA_ID,
      ...params,
    });
  }

  // Meta Pixel (if configured)
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, params);
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics] event: ${event}`, params ?? '');
  }
};

/**
 * Track a virtual page view on SPA route changes.
 * Call this whenever the URL changes (see the usePageTracking hook in Layout.tsx).
 */
export const trackPageView = (path: string, title: string): void => {
  if (isGtagReady()) {
    window.gtag!('config', GA_ID, {
      page_path: path,
      page_title: title,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics] page_view: ${path} — "${title}"`);
  }
};

