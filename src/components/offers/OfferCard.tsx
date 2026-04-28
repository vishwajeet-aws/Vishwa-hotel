import { Offer } from '../../types';

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard = ({ offer }: OfferCardProps) => (
  <article className="rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-white to-sand p-6 shadow-card">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Special Offer</p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{offer.title}</h3>
      </div>
      <div className="rounded-[1.4rem] bg-pine px-4 py-3 text-center text-white">
        <p className="text-2xl font-bold">{offer.discountPercent}%</p>
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">Savings</p>
      </div>
    </div>
    <p className="mt-4 text-sm leading-7 text-stone">{offer.description}</p>
    <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 text-sm">
      <span className="font-semibold text-ink">{offer.code}</span>
      <span className="text-stone">Valid until {offer.validUntil}</span>
    </div>
  </article>
);
