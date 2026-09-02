import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../data/siteConfig';

interface SEOHeadProps {
  title: string;
  description: string;
  /** Fully qualified canonical URL for this page, e.g. https://mangaldoshpujaaujjain.com/mangal-dosh-puja-ujjain */
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Override og:locale. Defaults to en_IN */
  ogLocale?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogImage = siteConfig.seo.ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
  ogLocale = 'en_IN',
}) => {
  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${siteConfig.seo.siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={ogLocale} />

      {/* Article-specific OG tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && (
        <meta property="article:author" content={siteConfig.name} />
      )}

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};
export default SEOHead;
