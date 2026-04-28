interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="max-w-2xl space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
    <h2 className="font-display text-4xl font-semibold leading-none text-ink md:text-5xl">{title}</h2>
    <p className="text-sm leading-7 text-stone md:text-base">{description}</p>
  </div>
);
