import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { bookingService } from '../services/bookingService';
import { Booking, BookingPayload } from '../types';

interface BookingContextValue {
  bookings: Booking[];
  loading: boolean;
  createBooking: (payload: BookingPayload) => Promise<Booking>;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export const BookingProvider = ({ children }: PropsWithChildren) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await bookingService.getBookings();
      setBookings(data);
      setLoading(false);
    };

    void loadBookings();
  }, []);

  const createBooking = async (payload: BookingPayload) => {
    const created = await bookingService.createBooking(payload);
    setBookings((current) => [created, ...current]);
    return created;
  };

  const value = useMemo(
    () => ({
      bookings,
      loading,
      createBooking,
    }),
    [bookings, loading],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }

  return context;
};
