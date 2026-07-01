import { GAME_CONFIG } from '../data/gameConfig';
import { LANDING_PANELS, MOCK_ROUNDS } from '../data/mockRounds';
import { GlobeLogo } from '../components/GlobeLogo';
import { LocationCarousel } from '../components/LocationCarousel';
import { PillButton } from '../components/PillButton';

type LandingScreenProps = {
  onPlay: () => void;
};

export function LandingScreen({ onPlay }: LandingScreenProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex">
        {LANDING_PANELS.map((url, i) => (
          <div
            key={i}
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-8 px-6 text-center">
        <GlobeLogo />
        <p className="text-lg leading-relaxed text-white/90">
          You&apos;ll be dropped somewhere in the world. Study the surroundings and pin your
          best guess on the map.
        </p>
        <LocationCarousel rounds={MOCK_ROUNDS} />
        <PillButton onClick={onPlay} className="px-10 py-4 text-base">
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
