import { bookings as seedBookings } from '../data/bookings';
import { Booking, BookingPayload } from '../types';
import { mockDelay } from './mockDelay';

let bookingStore = [...seedBookings];

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    await mockDelay(450);
    return bookingStore.map((booking) => ({ ...booking }));
  },

  async createBooking(payload: BookingPayload): Promise<Booking> {
    await mockDelay(600);
    const nextBooking: Booking = {
      id: `BK-${200 + bookingStore.length + 1}`,
      ...payload,
      status: 'Confirmed',
    };

    bookingStore = [nextBooking, ...bookingStore];
    return { ...nextBooking };
  },
};
