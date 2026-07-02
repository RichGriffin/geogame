import type { MockRound } from '../types/game';
import { normalizeStreetViewRoundInput } from '../utils/streetView';
import urbanLocationPool from './urbanLocationPool.json';
import { GAME_CONFIG } from './gameConfig';

const RANDOM_STREET_VIEW_ENABLED = import.meta.env.VITE_RANDOM_STREET_VIEW !== '0';
const RANDOM_PITCH_RANGE = { min: -8, max: 8 };
const RANDOM_COORDINATE_JITTER_DEGREES = 0.06;

type UrbanLocation = {
  city: string;
  country: string;
  lat: number;
  lng: number;
};

const URBAN_LOCATIONS = urbanLocationPool as UrbanLocation[];
const TOTAL_ROUNDS = GAME_CONFIG.totalRounds;

const RAW_MOCK_ROUNDS: MockRound[] = [
  {
    id: 1,
    landmark: 'Eiffel Tower',
    location: 'Paris, France',
    imageUrl:
      'https://images.unsplash.com/photo-1609971757431-439cf7b4141b?w=1920&h=1080&fit=crop&auto=format',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1609971757431-439cf7b4141b?w=200&h=200&fit=crop&auto=format',
    hint: 'Iron lattice tower on the Champ de Mars',
    answer: { lat: 48.8584, lng: 2.2945 },
    panoramaId: 'Xta4ugN_QRTIo3XDFLujgw',
    streetViewPov: { heading: 127, pitch: 5 },
  },
  {
    id: 2,
    landmark: 'Shibuya Crossing',
    location: 'Tokyo, Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1920&h=1080&fit=crop&auto=format',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=200&h=200&fit=crop&auto=format',
    hint: 'Neon signs in an East Asian script illuminate a busy intersection at night.',
    answer: { lat: 35.6595, lng: 139.7005 },
    panoramaId: 'XlVh96-Z9lAI5tKrU2O4Yg',
    streetViewPov: { heading: 48, pitch: 2 },
  },
  {
    id: 3,
    landmark: 'Times Square',
    location: 'New York, USA',
    imageUrl:
      'https://images.unsplash.com/photo-1695147383484-621b933811d6?w=1920&h=1080&fit=crop&auto=format',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1695147383484-621b933811d6?w=200&h=200&fit=crop&auto=format',
    hint: 'Bright billboards and yellow cabs',
    answer: { lat: 40.758, lng: -73.9855 },
    panoramaId: 'ywskIOsAFskiKHt5fwIUWA',
    streetViewPov: { heading: 210, pitch: 1 },
  },
  {
    id: 4,
    landmark: 'Sydney Harbour Bridge',
    location: 'Sydney, Australia',
    imageUrl:
      'https://images.unsplash.com/photo-1598948485421-33a1655d3c18?w=1920&h=1080&fit=crop&auto=format',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1598948485421-33a1655d3c18?w=200&h=200&fit=crop&auto=format',
    hint: 'Iconic steel arch bridge at dusk',
    answer: { lat: -33.8523, lng: 151.2108 },
    panoramaId: '_TMu7QCnwWBKSlIyvxFh2g',
    streetViewPov: { heading: 318, pitch: 4 },
  },
  {
    id: 5,
    landmark: 'Colosseum',
    location: 'Rome, Italy',
    imageUrl:
      'https://images.unsplash.com/photo-1707342269520-03ca1dddc0fa?w=1920&h=1080&fit=crop&auto=format',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1707342269520-03ca1dddc0fa?w=200&h=200&fit=crop&auto=format',
    hint: 'Ancient amphitheatre in the city centre',
    answer: { lat: 41.8902, lng: 12.4922 },
    panoramaId: 'Z47FwC7ICZVNc2M7rWmIMg',
    streetViewPov: { heading: 263, pitch: 3 },
  },
];

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomizeStreetViewRound(round: MockRound): MockRound {
  const hotspot = URBAN_LOCATIONS[Math.floor(Math.random() * URBAN_LOCATIONS.length)];
  const randomizedAnswer = {
    lat: Number(
      randomInRange(
        hotspot.lat - RANDOM_COORDINATE_JITTER_DEGREES,
        hotspot.lat + RANDOM_COORDINATE_JITTER_DEGREES
      ).toFixed(6)
    ),
    lng: Number(
      randomInRange(
        hotspot.lng - RANDOM_COORDINATE_JITTER_DEGREES,
        hotspot.lng + RANDOM_COORDINATE_JITTER_DEGREES
      ).toFixed(6)
    ),
  };

  return {
    ...round,
    landmark: `${hotspot.city} City Center`,
    location: `${hotspot.city}, ${hotspot.country}`,
    hint: `Randomized urban coordinates near ${hotspot.city}.`,
    answer: randomizedAnswer,
    panoramaId: undefined,
    streetViewPov: {
      heading: Number(randomInRange(0, 360).toFixed(2)),
      pitch: Number(randomInRange(RANDOM_PITCH_RANGE.min, RANDOM_PITCH_RANGE.max).toFixed(2)),
    },
  };
}

function expandCuratedRoundsToTotal(rounds: MockRound[], totalRounds: number): MockRound[] {
  if (rounds.length === 0 || totalRounds <= 0) {
    return [];
  }

  return Array.from({ length: totalRounds }, (_, index) => ({
    ...rounds[index % rounds.length],
  }));
}

function generateRandomRounds(totalRounds: number): MockRound[] {
  if (RAW_MOCK_ROUNDS.length === 0 || totalRounds <= 0) {
    return [];
  }

  return Array.from({ length: totalRounds }, (_, index) => {
    const templateRound = RAW_MOCK_ROUNDS[index % RAW_MOCK_ROUNDS.length];
    return randomizeStreetViewRound(templateRound);
  });
}

const roundSource = RANDOM_STREET_VIEW_ENABLED
  ? generateRandomRounds(TOTAL_ROUNDS)
  : expandCuratedRoundsToTotal(RAW_MOCK_ROUNDS, TOTAL_ROUNDS);

export const MOCK_ROUNDS: MockRound[] = roundSource.map((round, index) => {
  const normalizedStreetView = normalizeStreetViewRoundInput(round);

  return {
    ...round,
    id: index + 1,
    answer: normalizedStreetView.answer,
    ...(normalizedStreetView.panoramaId ? { panoramaId: normalizedStreetView.panoramaId } : {}),
    streetViewPov: normalizedStreetView.streetViewPov,
  };
});

export const LANDING_PANELS =
  MOCK_ROUNDS.length === 0 ? [] : [0, 1, 2].map((index) => MOCK_ROUNDS[index % MOCK_ROUNDS.length].imageUrl);
