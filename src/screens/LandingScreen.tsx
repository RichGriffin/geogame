import { useState } from 'react';
import { GAME_CONFIG } from '../data/gameConfig';
import { GlobeLogo } from '../components/GlobeLogo';
import { PillButton } from '../components/PillButton';
import type { MapInteractionMode } from '../types/game';

type LandingScreenProps = Readonly<{
  onPlay: (mapInteractionMode: MapInteractionMode) => void;
}>;

export function LandingScreen({ onPlay }: LandingScreenProps) {
  const [mapInteractionMode, setMapInteractionMode] = useState<MapInteractionMode>('moving');

  const interactionModeOptions: ReadonlyArray<{ value: MapInteractionMode; label: string; detail: string }> = [
    { value: 'moving', label: 'Option 1: Moving', detail: 'Move, pan, and zoom are all allowed.' },
    { value: 'noMoving', label: 'Option 2: No Moving', detail: 'Pan and zoom are allowed, movement is blocked.' },
    {
      value: 'lockedView',
      label: 'Option 3: No Moving, Panning, or Zooming',
      detail: 'Fixed viewpoint challenge mode.',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex">

      </div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-8 px-6 text-center">
        <GlobeLogo />
        <p className="text-lg leading-relaxed text-white/90">
          You&apos;ll be dropped somewhere in the world. Study the surroundings and pin your
          best guess on the map.
        </p>
        <div className="w-full rounded-2xl border border-white/10 bg-black/35 p-4 text-left backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/80">Map Interaction Mode</p>
          <div className="space-y-2">
            {interactionModeOptions.map((option) => {
              const selected = option.value === mapInteractionMode;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMapInteractionMode(option.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                    selected
                      ? 'border-accent/80 bg-accent/20 text-white'
                      : 'border-white/15 bg-black/30 text-white/80 hover:bg-black/45'
                  }`}
                >
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-white/70">{option.detail}</p>
                </button>
              );
            })}
          </div>
        </div>
        <PillButton onClick={() => onPlay(mapInteractionMode)} className="px-10 py-4 text-base">
          Play — {GAME_CONFIG.totalRounds} Rounds
        </PillButton>
        <p className="font-mono text-xs text-white/60">
          {GAME_CONFIG.roundDurationSec} seconds per round · max{' '}
          {GAME_CONFIG.maxPointsPerRound.toLocaleString()} pts each
        </p>
      </div>
    </div>
  );
}
