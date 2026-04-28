import dayjs from 'dayjs';
import { Booking, Room } from '../types';

export const calculateStayNights = (checkInDate: string, checkOutDate: string) => {
  const diff = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
  return Math.max(diff, 1);
};

export const calculateBookingPrice = (pricePerNight: number, checkInDate: string, checkOutDate: string) =>
  calculateStayNights(checkInDate, checkOutDate) * pricePerNight;

export const getRevenueSummary = (bookings: Booking[]) =>
  bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

export const getOccupancySummary = (rooms: Room[], bookings: Booking[]) => {
  const byType = ['Standard', 'Deluxe', 'Suite'] as const;

  return byType.map((type) => {
    const matchingRooms = rooms.filter((room) => room.type === type).length;
    const matchingBookings = bookings.filter((booking) => rooms.find((room) => room.id === booking.roomId)?.type === type).length;
    const occupancy = matchingRooms === 0 ? 0 : Math.min(100, Math.round((matchingBookings / (matchingRooms * 4)) * 100));

    return { type, occupancy };
  });
};
