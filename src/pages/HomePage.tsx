import { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Room, Offer, Review } from '../types';
import { roomService } from '../services/roomService';
import { offerService } from '../services/offerService';
import { reviewService } from '../services/reviewService';
import { SectionHeading } from '../components/common/SectionHeading';
import { LoaderCard } from '../components/common/LoaderCard';
import { RoomCard } from '../components/rooms/RoomCard';
import { OfferCard } from '../components/offers/OfferCard';
import { Button } from '../components/common/Button';

export const HomePage = () => {
  const navigate = useNavigate();
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    checkIn: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    checkOut: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    guests: 2,
  });

  useEffect(() => {
    const loadData = async () => {
      const [featured, offersData, reviewsData] = await Promise.all([
        roomService.getFeaturedRooms(),
        offerService.getOffers(),
        reviewService.getReviews(),
      ]);

      setFeaturedRooms(featured);
      setOffers(offersData);
      setReviews(reviewsData);
      setLoading(false);
    };

    void loadData();
  }, []);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: String(search.guests),
    });

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-8 text-white shadow-soft md:p-12">
          <div className="absolute inset-0 bg-hero" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/70">Premium City Retreat</p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-none md:text-7xl">
              Vishwa Hotel brings a calmer way to book luxury stays.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-white/80 md:text-base">
              Discover elegant rooms, honest pricing, and a polished mock booking experience shaped like a production hotel platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#featured">
                <Button>Explore Rooms</Button>
              </a>
              <a href="#offers">
                <Button variant="secondary">View Offers</Button>
              </a>
            </div>
          </div>
        </div>

        <div className="section-shell grid-pattern p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Plan your stay</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink">Search availability</h2>
          <form onSubmit={handleSearch} className="mt-8 space-y-5">
            <label className="block space-y-2 text-sm font-medium text-ink">
              <span>Check-in</span>
              <input
                type="date"
                value={search.checkIn}
                onChange={(event) => setSearch((current) => ({ ...current, checkIn: event.target.value }))}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-ink">
              <span>Check-out</span>
              <input
                type="date"
                value={search.checkOut}
                onChange={(event) => setSearch((current) => ({ ...current, checkOut: event.target.value }))}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-ink">
              <span>Guests</span>
              <select
                value={search.guests}
                onChange={(event) => setSearch((current) => ({ ...current, guests: Number(event.target.value) }))}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-pine"
              >
                {[1, 2, 3, 4].map((count) => (
                  <option key={count} value={count}>
                    {count} Guest{count > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" fullWidth>
              Search Rooms
            </Button>
          </form>
        </div>
      </section>

      <section id="featured" className="space-y-8">
        <SectionHeading
          eyebrow="Featured Rooms"
          title="Curated spaces for every kind of premium stay"
          description="Each category is designed with a distinctive mood, pricing clarity, and practical details so guests can decide quickly."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => <LoaderCard key={index} />)
            : featuredRooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </section>

      <section id="offers" className="space-y-8">
        <SectionHeading
          eyebrow="Popular Offers"
          title="Packages that feel valuable, not noisy"
          description="The mock offer system mirrors a live booking product with promotional content that stays believable and useful."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      <section className="section-shell overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">Why Guests Return</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
              Hospitality that feels intentionally designed.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Thoughtful rooms', 'Layouts planned for comfort, work, and slower evenings.'],
              ['Transparent pricing', 'Room rates and mock totals stay clear at every step.'],
              ['Responsive flow', 'Built for desktop and mobile decision-making alike.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] bg-sand p-5">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="space-y-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Guest sentiment with real personality"
          description="Review cards pull from the mock data layer and mirror what a live hospitality frontend would surface across the funnel."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[1.75rem] bg-white p-6 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-ink">{review.userName}</h3>
                <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-pine">{review.rating.toFixed(1)}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone">{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
