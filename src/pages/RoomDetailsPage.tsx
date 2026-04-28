import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { LoaderCard } from '../components/common/LoaderCard';
import { PriceTag } from '../components/common/PriceTag';
import { roomService } from '../services/roomService';
import { reviewService } from '../services/reviewService';
import { Review, Room } from '../types';
import { formatCurrency } from '../utils/format';

export const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      if (!roomId) return;
      setLoading(true);
      const [roomData, reviewData] = await Promise.all([
        roomService.getRoomById(roomId),
        reviewService.getReviewsByRoomId(roomId),
      ]);
      setRoom(roomData);
      setReviews(reviewData);
      setLoading(false);
    };

    void loadRoom();
  }, [roomId]);

  const availability = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => {
        const date = dayjs().add(index, 'day');
        const isOpen = room?.available ? index % 5 !== 0 : index % 3 === 0;
        return {
          label: date.format('DD MMM'),
          isOpen,
        };
      }),
    [room?.available],
  );

  if (loading) {
    return <LoaderCard className="h-[480px]" />;
  }

  if (!room) {
    return (
      <div className="section-shell p-8 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink">Room not found</h1>
        <p className="mt-3 text-stone">The requested room could not be loaded from the mock catalog.</p>
        <Link to="/rooms" className="mt-6 inline-block text-pine underline">
          Return to rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
            <img src={room.images[selectedImage]} alt={room.name} className="h-[420px] w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {room.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-[1.3rem] border-2 ${selectedImage === index ? 'border-pine' : 'border-transparent'}`}
              >
                <img src={image} alt={`${room.name} view ${index + 1}`} className="h-28 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="section-shell space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{room.type}</p>
              <h1 className="mt-2 font-display text-5xl font-semibold text-ink">{room.name}</h1>
            </div>
            <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-pine">{room.rating.toFixed(1)}</span>
          </div>

          <p className="text-sm leading-7 text-stone">{room.description}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Capacity', `${room.capacity} guests`],
              ['Room Size', `${room.size} sq ft`],
              ['View', room.view],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.3rem] bg-sand p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone">{label}</p>
                <p className="mt-2 font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>

          <PriceTag amount={room.pricePerNight} />

          <div>
            <p className="text-sm font-semibold text-ink">Amenities</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-white px-3 py-2 text-sm text-stone ring-1 ring-ink/10">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-ink px-5 py-4 text-white">
            <p className="text-sm text-white/70">Price breakdown</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Base nightly rate</span>
              <span>{formatCurrency(room.pricePerNight)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Estimated taxes & fees</span>
              <span>{formatCurrency(Math.round(room.pricePerNight * 0.18))}</span>
            </div>
          </div>

          <Button
            fullWidth
            onClick={() => navigate(`/booking?roomId=${room.id}`)}
            disabled={!room.available}
          >
            {room.available ? 'Book Now' : 'Currently Unavailable'}
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <div className="section-shell p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Availability Calendar</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink">Next 14 days</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-7">
            {availability.map((day) => (
              <div
                key={day.label}
                className={`rounded-[1.2rem] p-4 ${day.isOpen ? 'bg-mist text-pine' : 'bg-sand text-stone'}`}
              >
                <p className="text-xs uppercase tracking-[0.18em]">{day.label}</p>
                <p className="mt-2 text-sm font-semibold">{day.isOpen ? 'Available' : 'Booked'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Guest Reviews</p>
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-[1.4rem] bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-ink">{review.userName}</h3>
                  <span className="text-sm font-semibold text-pine">{review.rating.toFixed(1)}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-stone">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
