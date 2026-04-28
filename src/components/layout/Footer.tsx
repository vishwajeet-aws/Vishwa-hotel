import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-ink/5 bg-white/80">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr,1fr,1fr] md:px-6">
      <div className="space-y-4">
        <h3 className="font-display text-3xl font-semibold text-ink">Vishwa Hotel</h3>
        <p className="max-w-md text-sm leading-7 text-stone">
          Crafted for travelers who want a premium booking flow, elegant room discovery, and calm decision-making from the first click.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Explore</p>
        <div className="mt-4 flex flex-col gap-3 text-sm text-stone">
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact</p>
        <div className="mt-4 space-y-3 text-sm text-stone">
          <p>vishwajitsuryawanshi4@gmail.com</p>
          <p>+91 9322442502</p>
          <p>MG Road, Bengaluru, India</p>
        </div>
      </div>
    </div>
  </footer>
);
