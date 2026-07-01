import { GAME_CONFIG } from '../data/gameConfig';

export function scoreFromDistance(distanceKm: number): number {
  const { maxPointsPerRound, maxDistanceKm } = GAME_CONFIG;
  return Math.round(
    maxPointsPerRound * Math.max(0, 1 - distanceKm / maxDistanceKm),
  );
}

export function ratingFromScore(score: number): string {
  if (score >= 4000) return 'Excellent';
  if (score >= 2500) return 'Great';
  if (score >= 1000) return 'Good';
  return 'Keep trying';
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}

export function formatDistance(km: number): string {
  return `${Math.round(km).toLocaleString('en-US')} km`;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
