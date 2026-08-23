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
    let message = 'Namaste Pandit Ji, I would like to enquire about Puja services in Ujjain.';
    if (pujaId) {
      const formattedPuja = pujaId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      message = `Namaste Pandit Ji, I would like to book the ${formattedPuja}.`;
      if (packageId) {
        message += ` (Package: ${packageId.charAt(0).toUpperCase() + packageId.slice(1)})`;
      }
    }
    const url = `https://wa.me/919770581244?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
