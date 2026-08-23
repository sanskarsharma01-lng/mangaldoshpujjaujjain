import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { StructuredData } from './StructuredData';

export interface BreadcrumbItem {
  label: string;
  /** If omitted the item renders as plain text (current page). */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb – renders a gold-accented visual trail AND injects
 * BreadcrumbList JSON-LD schema into <head>.
 *
 * The first item is always treated as "Home"; pass items starting
 * from the first child page (the component prepends Home automatically).
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { siteUrl } = siteConfig.seo;

  // Always start with Home
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  // ── JSON-LD BreadcrumbList ─────────────────────────────────────
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href
        ? item.href.startsWith('http')
          ? item.href
          : `${siteUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`
        : undefined,
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />

      {/* ── Visual Breadcrumb ───────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center flex-wrap gap-1 text-sm font-inter"
      >
        <ol
          className="flex items-center flex-wrap gap-1 list-none m-0 p-0"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            const isFirst = idx === 0;

            return (
              <li
                key={`${item.label}-${idx}`}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator — skip before first item */}
                {!isFirst && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-gold/60 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast || !item.href ? (
                  /* Current page – plain text */
                  <span
                    className="text-text-muted font-medium"
                    aria-current="page"
                    itemProp="name"
                  >
                    {isFirst && (
                      <Home className="w-3.5 h-3.5 inline-block mr-0.5 -mt-0.5 text-gold/70" aria-hidden="true" />
                    )}
                    {item.label}
                  </span>
                ) : (
                  /* Ancestor page – clickable link */
                  <Link
                    to={item.href}
                    className="text-gold hover:text-primary transition-colors duration-200 underline-gold font-medium flex items-center gap-0.5"
                    itemProp="item"
                  >
                    {isFirst && (
                      <Home className="w-3.5 h-3.5 text-gold/80" aria-hidden="true" />
                    )}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}

                <meta itemProp="position" content={String(idx + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
