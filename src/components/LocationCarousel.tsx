import type { MockRound } from '../types/game';

type LocationCarouselProps = {
  rounds: MockRound[];
};

export function LocationCarousel({ rounds }: LocationCarouselProps) {
  return (
    <div className="flex items-start justify-center gap-4">
      {rounds.map((round) => (
        <div key={round.id} className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/20">
            <img
              src={round.thumbnailUrl}
              alt={round.landmark}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-mono text-xs text-white/60">
            {String(round.id).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  );
}
