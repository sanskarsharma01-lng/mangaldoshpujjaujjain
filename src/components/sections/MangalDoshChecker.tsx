import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { trackEvent } from '../../lib/analytics';
import { ScrollReveal } from '../ui/ScrollReveal';

const checkerSchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  dob: zod.string().min(1, 'Date of Birth is required'),
  tob: zod.string().min(1, 'Time of Birth is required'),
  pob: zod.string().min(1, 'Place of Birth is required'),
  gender: zod.enum(['Male', 'Female', 'Other']),
});

type CheckerForm = zod.infer<typeof checkerSchema>;

export const MangalDoshChecker: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckerForm>({
    resolver: zodResolver(checkerSchema),
    defaultValues: {
      gender: 'Male',
    },
  });

  const onSubmit = (data: CheckerForm) => {
    setLoading(true);
    trackEvent('mangal_checker_submitted', { gender: data.gender });

    const message = [
      'Namaste Pandit Ji, I submitted my birth details for Mangal Dosh analysis.',
      '',
      `Full Name: ${data.name}`,
      `Date of Birth: ${data.dob}`,
      `Time of Birth: ${data.tob}`,
      `Place of Birth: ${data.pob}`,
      `Gender: ${data.gender}`,
      '',
      'Please share my Kundli analysis and guidance.',
    ].join('\n');

    setWhatsappUrl(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
    );

    const whatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setWhatsappUrl('');
  };

  return (
    <section className="section-padding bg-cream/45 relative overflow-hidden" id="dosh-checker">
      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="section-label justify-center">
              <span aria-hidden="true">🕉</span> दोष परीक्षण
            </span>
            <h2 className="section-title">
              {t('checker.sectionTitle')}
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mx-auto">
              Submit your birth details to consult our Pandit Ji for an accurate, scriptural interpretation of your birth chart (Kundli).
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-xl mx-auto">
          <ScrollReveal direction="up" delay={0.2} className="card-glass">
            
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="chk-name" className="input-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    {...register('name')}
                    placeholder="Enter your full name"
                    className="input-field"
                    disabled={loading}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1" role="alert">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="chk-dob" className="input-label">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="chk-dob"
                      type="date"
                      {...register('dob')}
                      className="input-field"
                      disabled={loading}
                      aria-invalid={errors.dob ? 'true' : 'false'}
                    />
                    {errors.dob && (
                      <p className="text-red-600 text-xs mt-1" role="alert">{errors.dob.message}</p>
                    )}
                  </div>

                  {/* Time of Birth */}
                  <div>
                    <label htmlFor="chk-tob" className="input-label">
                      Time of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="chk-tob"
                      type="time"
                      {...register('tob')}
                      className="input-field"
                      disabled={loading}
                      aria-invalid={errors.tob ? 'true' : 'false'}
                    />
                    {errors.tob && (
                      <p className="text-red-600 text-xs mt-1" role="alert">{errors.tob.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Place of Birth */}
                  <div>
                    <label htmlFor="chk-pob" className="input-label">
                      Place of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="chk-pob"
                      type="text"
                      {...register('pob')}
                      placeholder="e.g. Ujjain, MP"
                      className="input-field"
                      disabled={loading}
                      aria-invalid={errors.pob ? 'true' : 'false'}
                    />
                    {errors.pob && (
                      <p className="text-red-600 text-xs mt-1" role="alert">{errors.pob.message}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="input-label block mb-2">Gender</label>
                    <div className="flex gap-4 pt-1.5">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className="flex items-center gap-2 text-sm text-text-dark cursor-pointer">
                          <input
                            type="radio"
                            value={g}
                            {...register('gender')}
                            disabled={loading}
                            className="w-4 h-4 text-primary border-gold/30 focus:ring-gold"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full py-3 h-12 flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing charts...
                      </>
                    ) : (
                      t('checker.checkButton')
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Panel */
              <div className="text-center space-y-6 py-6 animate-fade-in">
                <span className="text-6xl block" aria-hidden="true">📊</span>
                <h3 className="text-2xl font-poppins font-bold text-primary">Details Received Successfully</h3>
                
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 text-warm-brown text-sm leading-relaxed max-w-md mx-auto">
                  {t('checker.resultMessage')}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
                    {t('checker.consultCta')}
                  </a>
                  <button onClick={handleReset} className="btn-outline-gold px-6">
                    Check Another Chart
                  </button>
                </div>
              </div>
            )}

            {/* Form Disclaimer */}
            <p className="text-center text-[11px] text-text-muted mt-5 leading-normal">
              ⚠️ <strong>Astrological Note:</strong> Accurate birth-chart (Kundli) calculations require complex astronomical formulas and mathematical engines. This tool does not perform automatic calculation algorithms. Your coordinates are secure and will be hand-evaluated by Pandit Ji.
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
export default MangalDoshChecker;
