interface PageHeroProps {
  title: string;
  description: string;
}

export const PageHero = ({ title, description }: PageHeroProps) => (
  <section className="rounded-[2rem] bg-pine px-6 py-10 text-white shadow-soft md:px-10 md:py-14">
    <p className="text-xs uppercase tracking-[0.34em] text-white/70">Vishwa Hotel</p>
    <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold md:text-6xl">{title}</h1>
    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">{description}</p>
  </section>
);
