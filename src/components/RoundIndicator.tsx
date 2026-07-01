import { GAME_CONFIG } from '../data/gameConfig';

type RoundIndicatorProps = {
  currentRound: number;
};

export function RoundIndicator({ currentRound }: RoundIndicatorProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-black/70 px-4 py-2.5 backdrop-blur-sm">
      <span className="text-xs font-semibold tracking-wider text-white">ROUND</span>
      <div className="flex gap-1">
        {Array.from({ length: GAME_CONFIG.totalRounds }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full ${
              i < currentRound ? 'bg-accent' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-white">
        {currentRound}/{GAME_CONFIG.totalRounds}
      </span>
    </div>
  );
}
