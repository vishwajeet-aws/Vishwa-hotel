import { formatCurrency } from '../../utils/format';

interface PriceTagProps {
  amount: number;
  suffix?: string;
}

export const PriceTag = ({ amount, suffix = '/ night' }: PriceTagProps) => (
  <div className="flex items-end gap-2">
    <span className="font-display text-3xl font-semibold text-ink">{formatCurrency(amount)}</span>
    <span className="pb-1 text-sm text-stone">{suffix}</span>
  </div>
);
