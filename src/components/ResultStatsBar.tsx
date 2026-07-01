import { GAME_CONFIG } from '../data/gameConfig';
import { formatDistance, formatScore } from '../utils/scoring';
import { PillButton } from './PillButton';

type ResultStatsBarProps = {
  roundIndex: number;
  landmark: string;
  location: string;
  distanceKm: number;
  score: number;
  rating: string;
  isLastRound: boolean;
  onNext: () => void;
};

export function ResultStatsBar({
  roundIndex,
  landmark,
  location,
  distanceKm,
  score,
  rating,
  isLastRound,
  onNext,
}: ResultStatsBarProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-white/10 bg-black/40 px-8 py-6 backdrop-blur-sm">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Round {roundIndex + 1} of {GAME_CONFIG.totalRounds}
        </p>
        <p className="text-2xl font-bold text-white">{landmark}</p>
        <p className="text-sm text-muted">{location}</p>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Distance</p>
        <p className="text-2xl font-bold text-white">{formatDistance(distanceKm)}</p>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Score</p>
        <p className="text-2xl font-bold text-accent">{formatScore(score)}</p>
        <p className="text-sm text-accent">{rating}</p>
      </div>

      <PillButton onClick={onNext} className="shrink-0 px-8">
        {isLastRound ? 'See Final Score →' : 'Next Round →'}
      </PillButton>
    </div>
  );
}
