import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { blogPosts } from '../data/blogs';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';

export const BlogPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Astrology', 'Remedies', 'Ujjain Guide', 'Vedic Customs'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const canonical = `${siteConfig.seo.siteUrl}/blog`;
  const title = `Vedic Knowledge & Puja Guides Blog | ${siteConfig.name}`;
  const description = `Read about traditional scriptural meanings of Mangal Dosh, steps to perform Bhat Puja in Ujjain, historical temple guides, and astronomical customs.`;

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog & Guides' },
              ]}
            />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="page-banner-light py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 वैदिक ज्ञान गंगा 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-primary">
              Knowledge & Guides
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto font-light">
              Explore traditional scriptural guides and practical advice to prepare for your spiritual journey to Ujjain.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="py-8 bg-ivory">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 focus-visible:outline-none ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-ivory shadow-primary-sm'
                      : 'bg-white border-gold/20 text-text-dark hover:border-gold hover:bg-gold/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <section className="pb-20 bg-ivory">
          <div className="container-custom">
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="card-base flex flex-col justify-between group h-full overflow-hidden p-0 bg-white"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary-dark/90 to-primary/80 flex items-center justify-center p-6 text-center border-b border-gold/15 overflow-hidden">
                    <div className="absolute inset-0 pattern-dots opacity-10 pointer-events-none" />
                    <span className="text-gold text-4xl block absolute top-4 left-4" aria-hidden="true">🕉</span>
                    <p className="text-ivory font-serif text-lg font-semibold leading-snug px-6 relative z-10">
                      {post.title}
                    </p>
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] tracking-widest text-gold font-bold uppercase bg-primary-dark/80 px-2 py-0.5 rounded border border-gold/30">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-text-muted">
                        {post.publishedDate} • By {post.author}
                      </p>
                      <h2 className="text-lg font-poppins font-bold text-primary group-hover:text-primary-light transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-gold hover:text-gold-dark text-sm font-semibold tracking-wide transition-colors duration-200"
                      >
                        {t('blog.readMore')}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
};
export default BlogPage;
