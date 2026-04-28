import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-pine text-white hover:bg-ink',
  secondary: 'bg-white text-ink ring-1 ring-ink/10 hover:bg-sand',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
};

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);
