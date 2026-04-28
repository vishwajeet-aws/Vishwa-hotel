import { Link } from 'react-router-dom';
import { Room } from '../../types';
import { getStarLabel } from '../../utils/format';
import { Button } from '../common/Button';
import { PriceTag } from '../common/PriceTag';

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => (
  <article className="overflow-hidden rounded-[1.9rem] bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
    <div className="relative">
      <img src={room.images[0]} alt={room.name} className="h-64 w-full object-cover" />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
        {room.type}
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-sm font-semibold text-white">
        {getStarLabel(room.rating)}
      </div>
    </div>

    <div className="space-y-5 p-5">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl font-semibold text-ink">{room.name}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.available ? 'bg-mist text-pine' : 'bg-ink/10 text-stone'}`}>
            {room.available ? 'Available' : 'Limited'}
          </span>
        </div>
        <p className="text-sm leading-7 text-stone">{room.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {room.amenities.slice(0, 4).map((amenity) => (
          <span key={amenity} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-stone">
            {amenity}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <PriceTag amount={room.pricePerNight} />
        <Link to={`/rooms/${room.id}`}>
          <Button variant="secondary">View Details</Button>
        </Link>
      </div>
    </div>
  </article>
);
