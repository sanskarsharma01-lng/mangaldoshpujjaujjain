import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { blogPosts } from '../../data/blogs';
import { ScrollReveal } from '../ui/ScrollReveal';

export const BlogSection: React.FC = () => {
  const { t, language } = useLanguage();

  // Show only first 3 blog posts on homepage
  const featuredPosts = blogPosts.slice(0, 3);
  const hindiPosts = [
    { title: 'मंगल दोष क्या है? संपूर्ण मार्गदर्शिका', category: 'मंगल दोष', excerpt: 'पारंपरिक वैदिक ज्योतिष के अनुसार मंगल दोष मंगल ग्रह की विशेष स्थिति है। इस मार्गदर्शिका में इसका अर्थ और पारंपरिक उपाय जानें।' },
    { title: 'उज्जैन में मंगल भात पूजा: विधि और महत्व', category: 'पूजा मार्गदर्शिका', excerpt: 'मंगल भात पूजा मंगल दोष निवारण से जुड़ा उज्जैन का पारंपरिक समारोह है। इसके महत्व और विधि के बारे में जानें।' },
    { title: 'मंगल दोष पूजा के लिए उज्जैन क्यों जाएं?', category: 'यात्रा मार्गदर्शिका', excerpt: 'वैदिक परंपरा में उज्जैन का विशेष आध्यात्मिक महत्व है। जानें कि भक्त मंगल संबंधी पूजा के लिए उज्जैन क्यों चुनते हैं।' },
  ];

  return (
    <section className="section-padding bg-cream/35 relative overflow-hidden" id="homepage-blog">
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">📖</span> ज्ञान गंगा
            </span>
            <h2 className="section-title">
              {t('blog.sectionTitle')}
            </h2>
            <div className="gold-divider" />
              <p className="section-subtitle mx-auto">
                {language === 'hi' ? 'उज्जैन की आध्यात्मिक यात्रा की तैयारी के लिए पारंपरिक शास्त्रीय मार्गदर्शिकाएं और उपयोगी सलाह पढ़ें।' : 'Explore traditional scriptural guides and practical advice to prepare for your spiritual journey to Ujjain.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Blog Grid */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <article
              key={post.id}
              className="card-base flex flex-col justify-between group h-full overflow-hidden p-0 bg-white"
            >
              {/* Thumbnail Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-primary-dark/90 to-primary/80 flex items-center justify-center p-6 text-center border-b border-gold/15 overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-10 pointer-events-none" />
                <span className="text-gold text-4xl block absolute top-4 left-4" aria-hidden="true">🕉</span>
                <p className="text-ivory font-serif text-lg font-semibold leading-snug px-6 relative z-10">
                  {language === 'hi' ? hindiPosts[index].title : post.title}
                </p>
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] tracking-widest text-gold font-bold uppercase bg-primary-dark/80 px-2 py-0.5 rounded border border-gold/30">
                    {language === 'hi' ? hindiPosts[index].category : post.category}
                  </span>
                </div>
              </div>

              {/* Summary details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-text-muted">
                    {post.publishedDate} • {language === 'hi' ? 'लेखक' : 'By'} {language === 'hi' ? 'मंगलदोष पूजा उज्जैन टीम' : post.author}
                  </p>
                  <h3 className="text-lg font-poppins font-bold text-primary group-hover:text-primary-light transition-colors duration-200 line-clamp-2">
                    {language === 'hi' ? hindiPosts[index].title : post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                    {language === 'hi' ? hindiPosts[index].excerpt : post.excerpt}
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

        {/* View All CTA */}
        <ScrollReveal direction="up" delay={0.3} className="text-center">
          <Link to="/blog" className="btn-outline-gold">
            {language === 'hi' ? 'सभी लेख देखें' : 'View All Articles'}
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
};
export default BlogSection;
