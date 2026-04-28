import { Offer } from '../types';

export const offers: Offer[] = [
  {
    id: 'OFF-01',
    title: 'Suite Escape',
    description: 'Book two nights in any suite and enjoy complimentary breakfast and a private airport pickup.',
    discountPercent: 18,
    code: 'SUITE18',
    validUntil: '2026-06-30',
  },
  {
    id: 'OFF-02',
    title: 'Midweek Serenity',
    description: 'A curated business-and-leisure package with late checkout, lounge access, and weekday savings.',
    discountPercent: 12,
    code: 'MIDWEEK12',
    validUntil: '2026-07-12',
  },
  {
    id: 'OFF-03',
    title: 'Family Courtyard Plan',
    description: 'Ideal for small families with breakfast for three and flexible guest upgrades on standard rooms.',
    discountPercent: 15,
    code: 'FAMILY15',
    validUntil: '2026-08-01',
  },
];
