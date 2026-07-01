import { MOCK_ROUNDS } from '../data/mockRounds';
import { PillButton } from '../components/PillButton';
import { formatDistance, formatScore } from '../utils/scoring';
import type { RoundOutcome } from '../types/game';

type FinalResultsScreenProps = {
  outcomes: RoundOutcome[];
  onPlayAgain: () => void;
};

export function FinalResultsScreen({ outcomes, onPlayAgain }: FinalResultsScreenProps) {
  const totalScore = outcomes.reduce((sum, o) => sum + o.score, 0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-resultBg px-8 py-12">
      <div className="w-full max-w-2xl">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted">
          Game Complete
        </p>
        <h1 className="mt-2 text-center text-5xl font-bold text-accent">
          {formatScore(totalScore)}
        </h1>
        <p className="mt-1 text-center text-muted">Total score</p>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/30 text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3">Round</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Distance</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((outcome) => {
                const round = MOCK_ROUNDS[outcome.roundIndex];
                return (
                  <tr key={outcome.roundIndex} className="border-b border-white/5">
                    <td className="px-4 py-3 text-muted">
                      {String(outcome.roundIndex + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 text-white">{round.landmark}</td>
                    <td className="px-4 py-3 text-white">{formatDistance(outcome.distanceKm)}</td>
                    <td className="px-4 py-3 font-medium text-accent">
                      {formatScore(outcome.score)}
                      <span className="ml-2 text-xs text-muted">{outcome.rating}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-center">
          <PillButton onClick={onPlayAgain} className="px-10 py-4 text-base">
            Play Again
          </PillButton>
        </div>
      </div>
    </div>
  );
}
