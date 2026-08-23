import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { trackEvent } from '../lib/analytics';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumb } from '../components/seo/Breadcrumb';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import FinalCTA from '../components/sections/FinalCTA';

const contactSchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  mobile: zod.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  email: zod.string().email('Invalid email address').optional().or(zod.literal('')),
  subject: zod.string().min(1, 'Please choose a subject'),
  message: zod.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = zod.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'Booking Enquiry',
    },
  });

  const onSubmit = (data: ContactForm) => {
    setLoading(true);
    trackEvent('contact_submitted', { subject: data.subject });
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      reset();
    }, 1200);
  };

  const canonical = `${siteConfig.seo.siteUrl}/contact`;
  const title = `Contact Us | Mangal Dosh Puja Booking Ujjain | ${siteConfig.name}`;
  const description = `Contact our team to book your Mangal Dosh and Mangal Bhat Puja in Ujjain. Call, WhatsApp, email, or fill out our online form for free guidance.`;

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
                { label: t('nav.contact') },
              ]}
            />
          </div>
        </div>

        {/* Compact Hero Banner */}
        <div className="bg-primary text-ivory py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-10 pointer-events-none" />
          <div className="container-custom relative z-10 space-y-2">
            <span className="text-gold font-devanagari text-base tracking-widest block">🕉 संपर्क सूत्र 🕉</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold">
              {t('nav.contact')}
            </h1>
            <p className="text-ivory/70 text-sm md:text-base max-w-xl mx-auto font-light">
              We are here to assist you with booking enquiries, date calculations, and ceremony details.
            </p>
          </div>
        </div>

        {/* Contact Layout */}
        <section className="section-padding bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7">
                <ScrollReveal direction="up" className="card-glass">
                  <h2 className="text-2xl font-poppins font-bold text-primary mb-6">Send an Enquiry</h2>
                  
                  {submitted && (
                    <div className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/25 text-warm-brown text-sm font-semibold animate-fade-in">
                      🙏 Thank you! Your enquiry has been received. Our team will contact you shortly.
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="con-name" className="input-label">Full Name *</label>
                        <input
                          id="con-name"
                          type="text"
                          {...register('name')}
                          className="input-field"
                          placeholder="Your Name"
                          disabled={loading}
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label htmlFor="con-mobile" className="input-label">Mobile Number *</label>
                        <input
                          id="con-mobile"
                          type="tel"
                          {...register('mobile')}
                          className="input-field"
                          placeholder="10-digit mobile number"
                          disabled={loading}
                        />
                        {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="con-email" className="input-label">Email Address (optional)</label>
                        <input
                          id="con-email"
                          type="email"
                          {...register('email')}
                          className="input-field"
                          placeholder="email@example.com"
                          disabled={loading}
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="con-subject" className="input-label">Enquiry Subject *</label>
                        <select id="con-subject" {...register('subject')} className="input-field" disabled={loading}>
                          <option>Booking Enquiry</option>
                          <option>Horoscope Check Query</option>
                          <option>Puja Packages Query</option>
                          <option>Travel & Lodging Query</option>
                          <option>General Query</option>
                        </select>
                        {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="con-msg" className="input-label">Your Message *</label>
                      <textarea
                        id="con-msg"
                        {...register('message')}
                        rows={4}
                        placeholder="Write your message here..."
                        className="input-field resize-none text-sm"
                        disabled={loading}
                      />
                      {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3 h-12 flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>

                  </form>
                </ScrollReveal>
              </div>

              {/* Right Column: Contact Details & Map */}
              <div className="lg:col-span-5 space-y-8">
                <ScrollReveal direction="right" className="space-y-6">
                  <h2 className="text-2xl font-poppins font-bold text-primary">Office Details</h2>
                  <div className="gold-divider-left" />

                  <ul className="space-y-5 text-sm">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-text-dark">Sacred Location Address:</p>
                        <p className="text-text-muted leading-relaxed">
                          {siteConfig.address}, {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-text-dark">Call Support:</p>
                        <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline font-semibold">
                          {siteConfig.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-text-dark">Email Enquiries:</p>
                        <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline break-all font-semibold">
                          {siteConfig.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </ScrollReveal>

                {/* Compact Map placeholder */}
                <ScrollReveal direction="right" delay={0.2} className="card-base p-0 overflow-hidden border border-gold/25 aspect-video sm:aspect-square flex flex-col justify-between">
                  <div className="bg-primary/95 text-ivory p-4 flex-grow flex flex-col justify-center items-center text-center space-y-2">
                    <span className="text-gold text-4xl" aria-hidden="true">📍</span>
                    <p className="font-poppins font-bold uppercase tracking-wider">Mangalnath Temple, Ujjain</p>
                    <p className="text-ivory/60 text-xs">Coordinates: 23.2044° N, 75.7834° E</p>
                  </div>
                  <div className="p-4 border-t border-gold/15 bg-ivory">
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold w-full text-center py-2 text-xs uppercase font-bold"
                    >
                      Open Google Maps
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
};
export default ContactPage;
