type HintPanelProps = {
  hint: string;
  visible: boolean;
};

export function HintPanel({ hint, visible }: HintPanelProps) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 max-w-lg -translate-x-1/2 -translate-y-1/2 px-6 text-center">
      <p className="text-lg font-medium text-white drop-shadow-lg">
        💡 {hint}
      </p>
    </div>
  );
}
