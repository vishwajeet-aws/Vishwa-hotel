import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterPanel } from '../components/rooms/FilterPanel';
import { PageHero } from '../components/common/PageHero';
import { LoaderCard } from '../components/common/LoaderCard';
import { RoomCard } from '../components/rooms/RoomCard';
import { roomService } from '../services/roomService';
import { Room, RoomFilters } from '../types';

const defaultFilters: RoomFilters = {
  priceRange: [5000, 20000],
  roomType: 'All',
  capacity: 'All',
  sortBy: 'price',
};

export const RoomsPage = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RoomFilters>({
    ...defaultFilters,
    capacity: searchParams.get('guests') ? Number(searchParams.get('guests')) : 'All',
  });

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      const data = await roomService.filterRooms(filters);
      setRooms(data);
      setLoading(false);
    };

    void loadRooms();
  }, [filters]);

  return (
    <div className="space-y-8">
      <PageHero
        title="Browse stays with flexible filters and elegant comparisons"
        description="Explore all room categories, sort by price or rating, and narrow by guest capacity or budget using the local mock data engine."
      />

      <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />

        <section className="space-y-5">
          <div className="flex items-center justify-between rounded-[1.5rem] bg-white px-5 py-4 shadow-card">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Available Rooms</p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-ink">{rooms.length} stays found</h2>
            </div>
            <p className="text-sm text-stone">Guest query ready for booking flow</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => <LoaderCard key={index} />)
              : rooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </div>
        </section>
      </div>
    </div>
  );
};
