import type { Coords, StreetViewPov } from '../types/game';

export type StreetViewRoundInput = {
  answer: Coords;
  panoramaId?: string;
  streetViewPov?: StreetViewPov;
};

export type StreetViewFallbackSource = 'panoramaId' | 'coordinates' | 'imageFallback';

export type StreetViewFallbackPolicy = {
  primary: Extract<StreetViewFallbackSource, 'panoramaId' | 'coordinates'>;
  secondary: Extract<StreetViewFallbackSource, 'coordinates' | 'imageFallback'>;
};

export type ResolvedStreetViewConfig = {
  position: Coords;
  panoramaId?: string;
  pov: StreetViewPov;
  fallback: StreetViewFallbackPolicy;
};

const DEFAULT_HEADING = 0;
const DEFAULT_PITCH = 0;
const MIN_PITCH = -90;
const MAX_PITCH = 90;
const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LNG = -180;
const MAX_LNG = 180;

// IDs observed as unreliable in Cycle 3 map recovery.
const UNRELIABLE_PANORAMA_IDS = new Set<string>([
  'Xta4ugN_QRTIo3XDFLujgw',
  'XlVh96-Z9lAI5tKrU2O4Yg',
  'ywskIOsAFskiKHt5fwIUWA',
  '_TMu7QCnwWBKSlIyvxFh2g',
  'Z47FwC7ICZVNc2M7rWmIMg',
]);

export const DEFAULT_STREET_VIEW_POV: StreetViewPov = {
  heading: DEFAULT_HEADING,
  pitch: DEFAULT_PITCH,
};

function toFiniteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeHeading(heading: number): number {
  const normalized = ((heading % 360) + 360) % 360;
  return Number(normalized.toFixed(2));
}

function normalizePitch(pitch: number): number {
  const clamped = Math.min(MAX_PITCH, Math.max(MIN_PITCH, pitch));
  return Number(clamped.toFixed(2));
}

function normalizePanoramaId(panoramaId?: string): string | undefined {
  if (!panoramaId) return undefined;
  const trimmed = panoramaId.trim();
  if (trimmed.length === 0) return undefined;
  // Street View pano IDs are URL-safe strings; reject malformed/known-bad values.
  if (!/^[A-Za-z0-9_-]{10,}$/.test(trimmed)) return undefined;
  if (UNRELIABLE_PANORAMA_IDS.has(trimmed)) return undefined;
  return trimmed;
}

function normalizeCoords(coords: Coords): Coords {
  const lat = toFiniteNumber(coords.lat, 0);
  const lng = toFiniteNumber(coords.lng, 0);
  const clampedLat = Math.min(MAX_LAT, Math.max(MIN_LAT, lat));
  const wrappedLng = ((((lng - MIN_LNG) % (MAX_LNG - MIN_LNG)) + (MAX_LNG - MIN_LNG)) % (MAX_LNG - MIN_LNG)) + MIN_LNG;
  return {
    lat: Number(clampedLat.toFixed(6)),
    lng: Number(wrappedLng.toFixed(6)),
  };
}

function resolveFallbackPolicy(panoramaId?: string): StreetViewFallbackPolicy {
  if (panoramaId) {
    return { primary: 'panoramaId', secondary: 'coordinates' };
  }
  return { primary: 'coordinates', secondary: 'imageFallback' };
}

export function normalizeStreetViewPov(pov?: StreetViewPov): StreetViewPov {
  if (!pov) return DEFAULT_STREET_VIEW_POV;

  return {
    heading: normalizeHeading(toFiniteNumber(pov.heading, DEFAULT_HEADING)),
    pitch: normalizePitch(toFiniteNumber(pov.pitch, DEFAULT_PITCH)),
  };
}

export function normalizeStreetViewRoundInput(round: StreetViewRoundInput): StreetViewRoundInput {
  return {
    answer: normalizeCoords(round.answer),
    panoramaId: normalizePanoramaId(round.panoramaId),
    streetViewPov: normalizeStreetViewPov(round.streetViewPov),
  };
}

export function resolveStreetViewConfig(round: StreetViewRoundInput): ResolvedStreetViewConfig {
  const normalized = normalizeStreetViewRoundInput(round);

  return {
    position: normalized.answer,
    panoramaId: normalized.panoramaId,
    pov: normalized.streetViewPov ?? DEFAULT_STREET_VIEW_POV,
    fallback: resolveFallbackPolicy(normalized.panoramaId),
  };
}
