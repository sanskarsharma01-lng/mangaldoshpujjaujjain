import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { blogPosts } from '../data/blogs';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { StructuredData } from '../components/seo/StructuredData';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 text-center text-red-600 font-bold min-h-screen bg-ivory">
        Article not found. <Link to="/blog" className="underline text-primary">Go back to Blog</Link>
      </div>
    );
  }

  const canonical = `${siteConfig.seo.siteUrl}/blog/${post.slug}`;

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}/favicon.svg`,
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
  };

  // Find related articles (excluding the current one)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${post.metaTitle} | ${siteConfig.name}`}
        description={post.metaDescription}
        canonical={canonical}
        ogType="article"
        publishedTime={post.publishedDate}
        modifiedTime={post.updatedDate}
      />
      <StructuredData data={articleSchema} />

      <main role="main" className="pt-24 md:pt-28 bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/40 border-b border-gold/15 py-4">
          <div className="container-custom">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title },
              ]}
            />
          </div>
        </div>

        {/* Article Banner Header */}
        <header className="page-banner-light py-16 relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-[0.07] pointer-events-none" />
          <div className="container-custom relative z-10 max-w-4xl mx-auto space-y-4 text-center">
            <span className="badge-gold bg-gold/15 border-gold/40 text-gold-dark uppercase text-xs tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold leading-tight max-w-3xl mx-auto text-balance text-primary">
              {post.title}
            </h1>
            <div className="text-xs md:text-sm text-text-muted flex items-center justify-center gap-3 pt-2">
              <span>By <strong>{post.author}</strong></span>
              <span>•</span>
              <time dateTime={post.publishedDate}>{post.publishedDate}</time>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="section-padding bg-ivory">
          <div className="container-custom max-w-3xl mx-auto">
            <ScrollReveal direction="up" className="prose max-w-none prose-headings:font-poppins prose-headings:font-bold prose-headings:text-primary prose-a:text-gold prose-strong:text-text-dark text-text-muted leading-relaxed space-y-6">
              {/* Splitting fake Markdown paragraphs for display */}
              {post.content.split('\n\n').map((para, idx) => {
                if (para.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold pt-6 border-b border-gold/10 pb-2">{para.replace('## ', '')}</h2>;
                }
                if (para.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold pt-4">{para.replace('### ', '')}</h3>;
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-6 space-y-2">
                      {para.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx} className="text-sm md:text-base leading-relaxed">{para}</p>;
              })}
            </ScrollReveal>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-cream/30 border-t border-gold/10">
            <div className="container-custom max-w-4xl mx-auto">
              <h3 className="text-2xl font-poppins font-bold text-primary mb-8 text-center">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    to={`/blog/${rPost.slug}`}
                    className="card-base flex flex-col justify-between hover:shadow-card-hover group border border-gold/15 bg-white p-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] tracking-widest text-gold font-bold uppercase">
                        {rPost.category}
                      </span>
                      <h4 className="font-poppins font-bold text-primary text-base group-hover:text-primary-light transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                      <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">
                        {rPost.excerpt}
                      </p>
                    </div>
                    <span className="inline-block text-gold text-xs font-bold pt-3 group-hover:underline">
                      Read Article →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
    </>
  );
};
export default BlogPostPage;
