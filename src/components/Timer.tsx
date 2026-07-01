import { GAME_CONFIG } from '../data/gameConfig';
import { formatTime } from '../utils/scoring';

type TimerProps = {
  secondsRemaining: number;
};

export function Timer({ secondsRemaining }: TimerProps) {
  const progress =
    secondsRemaining / GAME_CONFIG.roundDurationSec;
  const circumference = 2 * Math.PI * 10;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2.5 backdrop-blur-sm">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#4ADE80" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-lg font-bold text-accent">{formatTime(secondsRemaining)}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#4ADE80"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
