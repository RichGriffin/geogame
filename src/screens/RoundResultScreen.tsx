import { GAME_CONFIG } from '../data/gameConfig';
import { MapLegend } from '../components/MapLegend';
import { ResultMap } from '../components/ResultMap';
import { ResultStatsBar } from '../components/ResultStatsBar';
import type { RoundOutcome } from '../types/game';

type RoundResultScreenProps = Readonly<{
  outcome: RoundOutcome;
  onNext: () => void;
}>;

export function RoundResultScreen({ outcome, onNext }: RoundResultScreenProps) {
  const isLastRound = outcome.roundIndex >= GAME_CONFIG.totalRounds - 1;

  return (
    <div className="flex min-h-screen flex-col bg-resultBg">
      <div className="relative flex-1">
        <MapLegend location={outcome.round.location} />
        <ResultMap answer={outcome.round.answer} guess={outcome.guess} />
      </div>
      <ResultStatsBar
        roundIndex={outcome.roundIndex}
        landmark={outcome.round.landmark}
        location={outcome.round.location}
        distanceKm={outcome.distanceKm}
        score={outcome.score}
        rating={outcome.rating}
        isLastRound={isLastRound}
        onNext={onNext}
      />
    </div>
  );
}
