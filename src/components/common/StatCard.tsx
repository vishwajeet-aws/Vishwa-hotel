interface StatCardProps {
  label: string;
  value: string;
  detail: string;
}

export const StatCard = ({ label, value, detail }: StatCardProps) => (
  <div className="rounded-[1.75rem] bg-white p-6 shadow-card">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{label}</p>
    <p className="mt-4 font-display text-4xl font-semibold text-ink">{value}</p>
    <p className="mt-2 text-sm text-stone">{detail}</p>
  </div>
);
