import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useBooking } from '../../contexts/BookingContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { packages } from '../../data/packages';
import { trackEvent } from '../../lib/analytics';
import { Modal } from '../ui/Modal';

const bookingSchema = zod.object({
  pujaId: zod.string().min(1, 'Please select a Puja service'),
  packageId: zod.string().min(1, 'Please select a package'),
  date: zod.string().min(1, 'Puja preferred date is required'),
  time: zod.string().min(1, 'Preferred time slot is required'),
  name: zod.string().min(2, 'Full Name must be at least 2 characters'),
  mobile: zod.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  email: zod.string().email('Invalid email address').optional().or(zod.literal('')),
  dob: zod.string().optional(),
  tob: zod.string().optional(),
  pob: zod.string().optional(),
  devotees: zod.number().min(1).max(50).optional(),
  notes: zod.string().max(500).optional(),
});

type BookingForm = zod.infer<typeof bookingSchema>;

export const BookingModal: React.FC = () => {
  const { isOpen, closeBooking, selectedPuja, selectedPackage } = useBooking();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pujaId: '',
      packageId: '',
      date: '',
      time: 'Morning (6:00 AM - 9:00 AM)',
      name: '',
      mobile: '',
      email: '',
      dob: '',
      tob: '',
      pob: '',
      devotees: 1,
      notes: '',
    },
  });

  const watchedValues = watch();

  // Prefill when modal state changes
  useEffect(() => {
    if (isOpen) {
      reset();
      setStep(1);
      setSubmitted(false);
      
      if (selectedPuja) {
        setValue('pujaId', selectedPuja);
      } else if (services.length > 0) {
        setValue('pujaId', services[0].id);
      }
      
      if (selectedPackage) {
        setValue('packageId', selectedPackage);
      } else if (packages.length > 0) {
        setValue('packageId', packages[0].id);
      }

      trackEvent('booking_started');
    }
  }, [isOpen, selectedPuja, selectedPackage, setValue, reset]);

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['pujaId', 'packageId']);
    } else if (step === 2) {
      isValid = await trigger(['date', 'time']);
    } else if (step === 3) {
      isValid = await trigger(['name', 'mobile', 'email', 'dob', 'tob', 'pob', 'devotees']);
    }
    
    if (isValid) {
      trackEvent('booking_step_completed', { step });
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = (_data: BookingForm) => {
    setLoading(true);
    trackEvent('booking_completed');
    
    // Simulate API processing delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const activePuja = services.find((s) => s.id === watchedValues.pujaId);
  const activePackage = packages.find((p) => p.id === watchedValues.packageId);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Namaste Pandit Ji, I have submitted a puja booking request on your website.\n\nDetails:\n- Puja: ${activePuja?.name || watchedValues.pujaId}\n- Package: ${activePackage?.name || watchedValues.packageId}\n- Date: ${watchedValues.date}\n- Devotee: ${watchedValues.name}`
  )}`;

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={closeBooking} title={!submitted ? t('booking.title') : undefined} size="lg">
      {!submitted ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-warm-brown">
              <span>Step {step} of 4</span>
              <span className="text-gold">
                {step === 1 && t('booking.step1')}
                {step === 2 && t('booking.step2')}
                {step === 3 && t('booking.step3')}
                {step === 4 && t('booking.step4')}
              </span>
            </div>
            <div className="w-full bg-cream h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gold-gradient h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            
            {/* STEP 1: Select Puja and Package */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                {/* Select Puja */}
                <div>
                  <label htmlFor="modal-puja" className="input-label">{t('booking.selectPuja')}</label>
                  <select id="modal-puja" {...register('pujaId')} className="input-field">
                    <option value="" disabled>-- Choose Service --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {errors.pujaId && <p className="text-red-600 text-xs mt-1">{errors.pujaId.message}</p>}
                </div>

                {/* Select Package */}
                <div>
                  <label className="input-label block mb-3">{t('booking.selectPackage')}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {packages.map((pkg) => {
                      const isSelected = watchedValues.packageId === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => {
                            setValue('packageId', pkg.id);
                            trigger('packageId');
                          }}
                          className={`flex flex-col justify-between p-4 rounded-xl text-left border transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary-dark/5 border-primary text-primary-dark ring-2 ring-primary/20'
                              : 'bg-white border-gold/25 text-text-dark hover:border-gold hover:bg-ivory/30'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-base font-poppins">{pkg.name}</p>
                            <p className="text-xs text-text-muted mt-1 leading-normal line-clamp-2">{pkg.description}</p>
                          </div>
                          <p className="font-poppins font-bold text-gold text-lg mt-3">{pkg.priceDisplay}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.packageId && <p className="text-red-600 text-xs mt-1">{errors.packageId.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Preferred Date and Time */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label htmlFor="modal-date" className="input-label">{t('booking.selectDate')}</label>
                  <input
                    id="modal-date"
                    type="date"
                    min={today}
                    {...register('date')}
                    className="input-field"
                  />
                  {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="modal-time" className="input-label">{t('booking.selectTime')}</label>
                  <select id="modal-time" {...register('time')} className="input-field">
                    <option>Morning (6:00 AM - 9:00 AM)</option>
                    <option>Morning (9:00 AM - 12:00 PM)</option>
                    <option>Afternoon (12:00 PM - 3:00 PM)</option>
                    <option>Evening (3:00 PM - 6:00 PM)</option>
                  </select>
                  {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Devotee Personal Details */}
            {step === 3 && (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-name" className="input-label">{t('booking.fullName')} *</label>
                    <input id="modal-name" type="text" {...register('name')} placeholder="Enter full name" className="input-field" />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="modal-mobile" className="input-label">{t('booking.mobile')} *</label>
                    <input id="modal-mobile" type="tel" {...register('mobile')} placeholder="10-digit number" className="input-field" />
                    {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-email" className="input-label">{t('booking.email')}</label>
                    <input id="modal-email" type="email" {...register('email')} placeholder="email@example.com" className="input-field" />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="modal-devotees" className="input-label">{t('booking.devotees')}</label>
                    <input id="modal-devotees" type="number" {...register('devotees', { valueAsNumber: true })} className="input-field" />
                    {errors.devotees && <p className="text-red-600 text-xs mt-1">{errors.devotees.message}</p>}
                  </div>
                </div>

                <div className="border-t border-gold/10 pt-4 mt-4 space-y-3">
                  <p className="text-xs font-bold text-gold uppercase tracking-wide">Birth Chart details (optional for horoscope matching)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="modal-dob" className="input-label text-xs">{t('booking.dob')}</label>
                      <input id="modal-dob" type="date" {...register('dob')} className="input-field py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="modal-tob" className="input-label text-xs">{t('booking.tob')}</label>
                      <input id="modal-tob" type="time" {...register('tob')} className="input-field py-2 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="modal-pob" className="input-label text-xs">{t('booking.pob')}</label>
                      <input id="modal-pob" type="text" {...register('pob')} placeholder="Birth Town" className="input-field py-2 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Review and Submit */}
            {step === 4 && (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar animate-fade-in">
                <div className="p-4 rounded-xl bg-ivory-gradient border border-gold/20 space-y-3 text-sm">
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Selected Puja:</span>
                    <span className="font-semibold text-primary">{activePuja?.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Selected Package:</span>
                    <span className="font-semibold text-primary">{activePackage?.name} ({activePackage?.priceDisplay})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Puja Date:</span>
                    <span className="font-semibold text-text-dark">{watchedValues.date}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Time Slot:</span>
                    <span className="font-semibold text-text-dark">{watchedValues.time}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Devotee Name:</span>
                    <span className="font-semibold text-text-dark">{watchedValues.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/10">
                    <span className="text-text-muted">Mobile Number:</span>
                    <span className="font-semibold text-text-dark">{watchedValues.mobile}</span>
                  </div>
                  {watchedValues.devotees && watchedValues.devotees > 1 && (
                    <div className="flex justify-between py-1 border-b border-gold/10">
                      <span className="text-text-muted">Number of Devotees:</span>
                      <span className="font-semibold text-text-dark">{watchedValues.devotees}</span>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="modal-notes" className="input-label">Any special requests or instructions? (optional)</label>
                  <textarea
                    id="modal-notes"
                    {...register('notes')}
                    rows={2}
                    placeholder="Enter notes..."
                    className="input-field resize-none text-sm"
                  />
                </div>
              </div>
            )}

            {/* Form actions */}
            <div className="flex gap-4 pt-3 border-t border-gold/15 justify-end">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline-gold px-6 py-2.5 text-sm"
                  disabled={loading}
                >
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary px-8 py-2.5 text-sm"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary px-8 py-2.5 text-sm h-11 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Booking...
                    </>
                  ) : (
                    t('booking.submitButton')
                  )}
                </button>
              )}
            </div>

          </form>
        </div>
      ) : (
        /* SUCCESS SCREEN */
        <div className="text-center py-8 space-y-6 animate-fade-in">
          <span className="text-7xl block animate-bounce-gentle" role="img" aria-label="Folded Hands">🙏</span>
          <div className="space-y-2">
            <h3 className="text-2xl font-poppins font-bold text-primary">
              {t('booking.successTitle')}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto">
              {t('booking.successMessage')}
            </p>
          </div>

          <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl text-warm-brown text-sm font-semibold max-w-sm mx-auto select-all">
            Enquiry Reference: MD-{Math.floor(100000 + Math.random() * 900000)}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'booking_success' })}
              className="btn-whatsapp w-full sm:w-auto px-6 py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 1.95 12.014 1.95c-5.439 0-9.865 4.37-9.869 9.8.004 1.76.495 3.486 1.42 5.03L2.59 21.05l4.057-1.896zm12.164-5.328c-.287-.144-1.702-.84-1.965-.936-.263-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.258-.631-2.15-1.093-3.003-2.553-.223-.383.223-.356.639-1.187.072-.144.036-.264-.018-.372-.054-.108-.456-1.104-.624-1.512-.164-.396-.348-.342-.48-.342h-.408c-.144 0-.384.054-.585.276-.201.222-.768.75-.768 1.83 0 1.08.783 2.124.894 2.274.111.15 1.54 2.352 3.731 3.3 1.259.546 1.884.6 2.585.496.505-.075 1.702-.696 1.944-1.37.24-.674.24-1.253.168-1.37-.072-.116-.264-.21-.552-.354z"/></svg>
              {t('booking.whatsappButton')}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => trackEvent('call_clicked', { source: 'booking_success' })}
              className="btn-outline-gold w-full sm:w-auto px-6 py-2.5 text-sm flex items-center justify-center gap-2"
            >
              📞 {t('booking.callButton')}
            </a>
          </div>

          <div className="pt-4">
            <button onClick={closeBooking} className="text-text-muted hover:text-primary transition-colors text-xs font-semibold underline">
              Close Window
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default BookingModal;
