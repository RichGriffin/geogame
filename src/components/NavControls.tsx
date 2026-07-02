import type { ReactNode } from 'react';

type NavControlsProps = Readonly<{
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => void;
  disabled?: boolean;
}>;

function NavButton({
  children,
  onClick,
  disabled = false,
  className = '',
}: Readonly<{
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-35 ${className}`}
    >
      {children}
    </button>
  );
}

export function NavControls({ onNavigate, disabled = false }: NavControlsProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1">
      <div />
      <NavButton onClick={() => onNavigate('up')} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </NavButton>
      <div />
      <NavButton onClick={() => onNavigate('left')} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </NavButton>
      <NavButton onClick={() => onNavigate('center')} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </NavButton>
      <NavButton onClick={() => onNavigate('right')} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NavButton>
      <div />
      <NavButton onClick={() => onNavigate('down')} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </NavButton>
      <div />
    </div>
  );
}
