import type { ButtonHTMLAttributes, ReactNode } from 'react';

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'muted' | 'hud';
};

export function PillButton({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: PillButtonProps) {
  const base = 'rounded-full px-6 py-3 text-sm font-semibold transition-opacity';
  const variants = {
    primary:
      'bg-accent text-accentText shadow-accent hover:opacity-90 disabled:opacity-50',
    muted:
      'bg-white/10 text-muted cursor-not-allowed',
    hud: 'bg-black/70 text-white backdrop-blur-sm hover:bg-black/80',
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
