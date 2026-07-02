import { useEffect, useState } from 'react';
import { HintPanel } from '../components/HintPanel';
import { MiniMap } from '../components/MiniMap';
import { NavControls } from '../components/NavControls';
import { PillButton } from '../components/PillButton';
import { RoundIndicator } from '../components/RoundIndicator';
import { StreetViewPanel } from '../components/StreetViewPanel';
import { Timer } from '../components/Timer';
import type { MapInteractionMode, MockRound, Pin } from '../types/game';

type NavigationDirection = 'up' | 'down' | 'left' | 'right' | 'center';
type NavigationCommand = { direction: NavigationDirection; sequence: number } | null;
type RoundWithStreetView = MockRound & {
  panoramaId?: string;
  streetViewPov?: { heading: number; pitch: number };
};
const RANDOM_STREET_VIEW_ENABLED = import.meta.env.VITE_RANDOM_STREET_VIEW !== '0';

function getModeLabel(mapInteractionMode: MapInteractionMode): string {
  switch (mapInteractionMode) {
    case 'moving':
      return 'Mode: Moving';
    case 'noMoving':
      return 'Mode: No Moving';
    case 'lockedView':
      return 'Mode: No Move / No Pan / No Zoom';
    default:
      return 'Mode: Moving';
  }
}

type RoundScreenProps = Readonly<{
  round: MockRound;
  roundNumber: number;
  secondsRemaining: number;
  mapInteractionMode: MapInteractionMode;
  pin: Pin;
  hintVisible: boolean;
  onPinPlace: (coords: import('../types/game').Coords) => void;
  onToggleHint: () => void;
  onNavigate: (direction: NavigationDirection) => NavigationCommand;
  onSubmit: () => void;
}>;

export function RoundScreen({
  round,
  roundNumber,
  secondsRemaining,
  mapInteractionMode,
  pin,
  hintVisible,
  onPinPlace,
  onToggleHint,
  onNavigate,
  onSubmit,
}: RoundScreenProps) {
  const [navigationCommand, setNavigationCommand] = useState<NavigationCommand>(null);
  const [fallbackActive, setFallbackActive] = useState(false);
  const roundWithStreetView = round as RoundWithStreetView;
  const movementAllowed = mapInteractionMode === 'moving';
  const rotationAllowed = mapInteractionMode !== 'lockedView';
  const modeLabel = getModeLabel(mapInteractionMode);

  useEffect(() => {
    setNavigationCommand(null);
    setFallbackActive(false);
  }, [round.id]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {fallbackActive ? (
        <img
          src={round.imageUrl}
          alt="Round fallback"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <StreetViewPanel
          position={round.answer}
          panoramaId={roundWithStreetView.panoramaId}
          defaultPov={roundWithStreetView.streetViewPov}
          navigationCommand={navigationCommand}
          mapInteractionMode={mapInteractionMode}
          onUnavailableChange={setFallbackActive}
        />
      )}

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-start justify-between p-6">
          <RoundIndicator currentRound={roundNumber} />
          <div className="flex flex-col items-center gap-2">
            <Timer secondsRemaining={secondsRemaining} />
            {RANDOM_STREET_VIEW_ENABLED ? (
              <span className="rounded-full border border-blue-300/30 bg-blue-900/30 px-3 py-1 text-xs text-blue-100">
                Random coordinate mode
              </span>
            ) : null}
            {fallbackActive ? (
              <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white/80">
                Street View unavailable - using fallback image
              </span>
            ) : null}
            <span className="rounded-full border border-amber-300/30 bg-amber-900/30 px-3 py-1 text-xs text-amber-100">
              {modeLabel}
            </span>
          </div>
          <PillButton variant="hud" onClick={onToggleHint} className="rounded-xl px-4 py-2.5">
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Hint
            </span>
          </PillButton>
        </div>

        <HintPanel hint={round.hint} visible={hintVisible} />

        <div className="flex flex-1 items-end justify-between p-6 pb-8">
          <div className="flex-1" />
          <div className="flex flex-1 justify-center pb-4">
            <NavControls
              onNavigate={(dir) => {
                if (fallbackActive) return;
                if (!movementAllowed && (dir === 'up' || dir === 'down')) return;
                if (!rotationAllowed && (dir === 'left' || dir === 'right' || dir === 'center')) return;
                const command = onNavigate(dir);
                setNavigationCommand((previous) =>
                  command ?? {
                    direction: dir,
                    sequence: (previous?.sequence ?? 0) + 1,
                  }
                );
              }}
              disabled={fallbackActive || mapInteractionMode === 'lockedView'}
            />
          </div>
          <div className="flex flex-1 flex-col items-end gap-2">
            <MiniMap pin={pin} onPinPlace={onPinPlace} />
            {pin ? (
              <PillButton onClick={onSubmit}>Make Guess →</PillButton>
            ) : (
              <p className="pr-1 text-sm text-white/50">Place a pin first</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
