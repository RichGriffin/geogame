export type Coords = { lat: number; lng: number };

export type GamePhase = 'landing' | 'round' | 'roundResult' | 'finalResults';

export type StreetViewPov = {
  heading: number;
  pitch: number;
};

export type MockRound = {
  id: number;
  landmark: string;
  location: string;
  imageUrl: string;
  thumbnailUrl: string;
  hint: string;
  answer: Coords;
  panoramaId?: string;
  streetViewPov?: StreetViewPov;
};

export type RoundOutcome = {
  roundIndex: number;
  distanceKm: number;
  score: number;
  rating: string;
  guess: Coords | null;
};

export type Pin = Coords | null;
