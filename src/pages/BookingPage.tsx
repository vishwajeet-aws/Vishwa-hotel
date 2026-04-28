import { FormEvent, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { LoaderCard } from '../components/common/LoaderCard';
import { PageHero } from '../components/common/PageHero';
import { useBookingContext } from '../context/BookingContext';
import { roomService } from '../services/roomService';
import { Room } from '../types';
import { calculateBookingPrice, calculateStayNights } from '../utils/booking';
import { formatCurrency, formatDate } from '../utils/format';

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const { createBooking } = useBookingContext();
  const [room, setRoom] = useState<Room | undefined>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [form, setForm] = useState({
    userName: 'Guest User',
    checkInDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    guests: 2,
  });

  useEffect(() => {
    const loadRoom = async () => {
      const roomId = searchParams.get('roomId') ?? 'amber-deluxe';
      const roomData = await roomService.getRoomById(roomId);
      setRoom(roomData);
      setLoading(false);
    };

    void loadRoom();
  }, [searchParams]);

  const totals = useMemo(() => {
    if (!room) {
      return { nights: 0, roomTotal: 0, taxes: 0, total: 0 };
    }

    const roomTotal = calculateBookingPrice(room.pricePerNight, form.checkInDate, form.checkOutDate);
    const taxes = Math.round(roomTotal * 0.18);

    return {
      nights: calculateStayNights(form.checkInDate, form.checkOutDate),
      roomTotal,
      taxes,
      total: roomTotal + taxes,
    };
  }, [form.checkInDate, form.checkOutDate, room]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!room) return;
    setSubmitting(true);
    const booking = await createBooking({
      roomId: room.id,
      userName: form.userName,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      guests: form.guests,
      totalPrice: totals.total,
    });

    setConfirmationId(booking.id);
    setSubmitting(false);
  };

  if (loading) {
    return <LoaderCard className="h-[480px]" />;
  }

  if (!room) {
    return (
      <div className="section-shell p-8 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink">Select a room to continue</h1>
        <p className="mt-3 text-stone">The booking flow needs a valid room from the catalog before we can price the stay.</p>
        <Link to="/rooms" className="mt-6 inline-block text-pine underline">
          Browse rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHero
        title="Complete your booking in a clean frontend-only flow"
        description="This booking journey simulates date selection, guest counts, pricing logic, and confirmation states without any backend request."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <form onSubmit={handleSubmit} className="section-shell space-y-6 p-6 md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Guest Details</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink">Stay preferences</h2>
          </div>

          <label className="block space-y-2 text-sm font-medium text-ink">
            <span>Guest Name</span>
            <input
              value={form.userName}
              onChange={(event) => setForm((current) => ({ ...current, userName: event.target.value }))}
              className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-medium text-ink">
              <span>Check-in</span>
              <input
                type="date"
                value={form.checkInDate}
                onChange={(event) => setForm((current) => ({ ...current, checkInDate: event.target.value }))}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-ink">
              <span>Check-out</span>
              <input
                type="date"
                value={form.checkOutDate}
                onChange={(event) => setForm((current) => ({ ...current, checkOutDate: event.target.value }))}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm font-medium text-ink">
            <span>Guests</span>
            <select
              value={form.guests}
              onChange={(event) => setForm((current) => ({ ...current, guests: Number(event.target.value) }))}
              className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
            >
              {Array.from({ length: room.capacity }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  {count} Guest{count > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-[1.5rem] bg-sand p-5">
            <p className="text-sm font-semibold text-ink">Booking confirmation state</p>
            <p className="mt-2 text-sm leading-7 text-stone">
              When submitted, this page creates a new in-memory booking record and shows a confirmation reference immediately.
            </p>
          </div>

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Confirming booking...' : 'Confirm Booking'}
          </Button>

          {confirmationId && (
            <div className="rounded-[1.5rem] bg-mist p-5 text-pine">
              <p className="text-sm font-semibold">Booking confirmed</p>
              <p className="mt-2 text-sm">Reference {confirmationId} is now included in the dashboard summary.</p>
            </div>
          )}
        </form>

        <aside className="section-shell space-y-6 p-6 md:p-8">
          <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-card">
            <img src={room.images[0]} alt={room.name} className="h-60 w-full object-cover" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Selected Room</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink">{room.name}</h2>
            <p className="mt-3 text-sm leading-7 text-stone">{room.description}</p>
          </div>

          <div className="rounded-[1.5rem] bg-white p-5 shadow-card">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone">Dates</span>
              <span className="font-semibold text-ink">
                {formatDate(form.checkInDate)} to {formatDate(form.checkOutDate)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-stone">Guests</span>
              <span className="font-semibold text-ink">{form.guests}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-stone">Nights</span>
              <span className="font-semibold text-ink">{totals.nights}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-stone">Room total</span>
              <span className="font-semibold text-ink">{formatCurrency(totals.roomTotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-stone">Taxes & fees</span>
              <span className="font-semibold text-ink">{formatCurrency(totals.taxes)}</span>
            </div>
            <div className="mt-4 border-t border-ink/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">Total payable</span>
                <span className="font-display text-3xl font-semibold text-ink">{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
