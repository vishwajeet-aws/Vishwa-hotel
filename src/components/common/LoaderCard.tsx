export const LoaderCard = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-[1.75rem] bg-white p-5 shadow-card ${className}`}>
    <div className="h-52 rounded-[1.4rem] bg-sand" />
    <div className="mt-5 h-4 w-2/3 rounded-full bg-sand" />
    <div className="mt-3 h-3 w-1/2 rounded-full bg-sand" />
    <div className="mt-6 h-10 rounded-full bg-sand" />
  </div>
);
