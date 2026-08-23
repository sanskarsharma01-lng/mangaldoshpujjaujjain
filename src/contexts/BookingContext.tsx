import React, { createContext, useContext, useState, useCallback } from 'react';

// ─────────────────────────────────────────────
//  BookingContext — global booking modal state
// ─────────────────────────────────────────────

interface BookingContextType {
  isOpen: boolean;
  selectedPuja: string | null;
  selectedPackage: string | null;
  openBooking: (pujaId?: string, packageId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const openBooking = useCallback((pujaId?: string, packageId?: string) => {
    setSelectedPuja(pujaId ?? null);
    setSelectedPackage(packageId ?? null);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Slight delay before clearing selection to avoid flash during close animation
    setTimeout(() => {
      setSelectedPuja(null);
      setSelectedPackage(null);
    }, 300);
  }, []);

  return (
    <BookingContext.Provider
      value={{ isOpen, selectedPuja, selectedPackage, openBooking, closeBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
};

export default BookingContext;
