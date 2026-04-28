import { Link, NavLink } from 'react-router-dom';
import { Button } from '../common/Button';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Booking', to: '/booking' },
  { label: 'Dashboard', to: '/dashboard' },
];

export const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-white/70 bg-ivory/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pine text-sm font-bold uppercase tracking-[0.2em] text-white">
          VH
        </div>
        <div>
          <p className="font-display text-2xl font-semibold leading-none text-ink">Vishwa Hotel</p>
          <p className="text-xs uppercase tracking-[0.28em] text-stone">Luxury stays reimagined</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-white text-ink shadow-card' : 'text-stone hover:bg-white/80 hover:text-ink'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/rooms">
        <Button className="hidden md:inline-flex">Reserve a Stay</Button>
      </Link>
    </div>
  </header>
);
