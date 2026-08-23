// Analytics event tracking wrapper
// Configure VITE_GA4_ID and VITE_META_PIXEL_ID in .env to activate

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | 'book_puja_clicked'
  | 'whatsapp_clicked'
  | 'call_clicked'
  | 'booking_started'
  | 'booking_step_completed'
  | 'booking_completed'
  | 'package_selected'
  | 'contact_submitted'
  | 'mangal_checker_submitted'
  | 'service_page_viewed';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (event: AnalyticsEvent, params?: EventParams): void => {
  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, {
      ...params,
      send_to: import.meta.env.VITE_GA4_ID,
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, params);
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, params);
  }
};

export const trackPageView = (path: string, title: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', import.meta.env.VITE_GA4_ID, {
      page_path: path,
      page_title: title,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics] page_view: ${path} — ${title}`);
  }
};
