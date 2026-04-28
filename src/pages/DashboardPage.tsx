import { useEffect, useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { StatCard } from '../components/common/StatCard';
import { LoaderCard } from '../components/common/LoaderCard';
import { useBookingContext } from '../context/BookingContext';
import { roomService } from '../services/roomService';
import { Room } from '../types';
import { getOccupancySummary, getRevenueSummary } from '../utils/booking';
import { formatCurrency, formatMonthDay } from '../utils/format';

export const DashboardPage = () => {
  const { bookings, loading: bookingsLoading } = useBookingContext();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await roomService.getRooms();
      setRooms(data);
      setLoadingRooms(false);
    };

    void loadRooms();
  }, []);

  if (bookingsLoading || loadingRooms) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoaderCard key={index} />
        ))}
      </div>
    );
  }

  const revenue = getRevenueSummary(bookings);
  const occupancy = getOccupancySummary(rooms, bookings);
  const activeBookings = bookings.filter((booking) => booking.status !== 'Completed');

  return (
    <div className="space-y-8">
      <PageHero
        title="Admin dashboard simulation powered by local calculations"
        description="Monitor total inventory, booking volume, revenue, and occupancy patterns through UI cards derived entirely from the mock dataset."
      />

      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="Total Rooms" value={String(rooms.length)} detail="Room inventory across standard, deluxe, and suite categories." />
        <StatCard label="Total Bookings" value={String(bookings.length)} detail="Includes seeded bookings and any newly confirmed frontend bookings." />
        <StatCard label="Revenue" value={formatCurrency(revenue)} detail="Aggregated total derived from mock booking price records." />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="section-shell p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Occupancy</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink">Category performance</h2>
          <div className="mt-8 space-y-5">
            {occupancy.map((item) => (
              <div key={item.type}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{item.type}</span>
                  <span className="text-stone">{item.occupancy}% occupied</span>
                </div>
                <div className="h-3 rounded-full bg-sand">
                  <div className="h-3 rounded-full bg-pine transition-all" style={{ width: `${item.occupancy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Recent Bookings</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink">Current activity</h2>
          <div className="mt-6 space-y-4">
            {activeBookings.slice(0, 5).map((booking) => {
              const room = rooms.find((candidate) => candidate.id === booking.roomId);

              return (
                <article key={booking.id} className="rounded-[1.4rem] bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{booking.userName}</p>
                      <p className="text-sm text-stone">{room?.name ?? 'Selected room'}</p>
                    </div>
                    <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-pine">{booking.status}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-stone">
                    <span>
                      {formatMonthDay(booking.checkInDate)} to {formatMonthDay(booking.checkOutDate)}
                    </span>
                    <span>{formatCurrency(booking.totalPrice)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
