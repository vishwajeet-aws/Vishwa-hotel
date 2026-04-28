import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => (
  <div className="section-shell py-20 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">404</p>
    <h1 className="mt-3 font-display text-5xl font-semibold text-ink">This page has checked out.</h1>
    <p className="mt-4 text-stone">The route you requested does not exist in the Vishwa Hotel experience.</p>
    <Link to="/" className="mt-8 inline-block">
      <Button>Return Home</Button>
    </Link>
  </div>
);
