import { RoomFilters, RoomType } from '../../types';

interface FilterPanelProps {
  filters: RoomFilters;
  onChange: (filters: RoomFilters) => void;
}

const roomTypes: Array<RoomType | 'All'> = ['All', 'Standard', 'Deluxe', 'Suite'];
const capacities: Array<number | 'All'> = ['All', 2, 3, 4];

export const FilterPanel = ({ filters, onChange }: FilterPanelProps) => (
  <aside className="section-shell space-y-6 p-6">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Filters</p>
      <h3 className="mt-2 font-display text-3xl font-semibold text-ink">Refine your stay</h3>
    </div>

    <div className="space-y-3">
      <label className="text-sm font-semibold text-ink">Max Price</label>
      <input
        type="range"
        min={5000}
        max={20000}
        step={200}
        value={filters.priceRange[1]}
        onChange={(event) =>
          onChange({ ...filters, priceRange: [filters.priceRange[0], Number(event.target.value)] })
        }
        className="w-full accent-pine"
      />
      <div className="flex items-center justify-between text-sm text-stone">
        <span>INR 5,000</span>
        <span>INR {filters.priceRange[1].toLocaleString('en-IN')}</span>
      </div>
    </div>

    <div className="space-y-3">
      <label className="text-sm font-semibold text-ink">Room Type</label>
      <div className="flex flex-wrap gap-2">
        {roomTypes.map((type) => (
          <button
            key={type}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filters.roomType === type ? 'bg-pine text-white' : 'bg-sand text-stone hover:bg-white'
            }`}
            onClick={() => onChange({ ...filters, roomType: type })}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <label className="text-sm font-semibold text-ink">Capacity</label>
      <select
        value={filters.capacity}
        onChange={(event) =>
          onChange({
            ...filters,
            capacity: event.target.value === 'All' ? 'All' : Number(event.target.value),
          })
        }
        className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
      >
        {capacities.map((capacity) => (
          <option key={capacity} value={capacity}>
            {capacity === 'All' ? 'All guest sizes' : `${capacity}+ guests`}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-3">
      <label className="text-sm font-semibold text-ink">Sort By</label>
      <select
        value={filters.sortBy}
        onChange={(event) =>
          onChange({
            ...filters,
            sortBy: event.target.value as RoomFilters['sortBy'],
          })
        }
        className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
      >
        <option value="price">Price: low to high</option>
        <option value="rating">Highest rating</option>
      </select>
    </div>
  </aside>
);
