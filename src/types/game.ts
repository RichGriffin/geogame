export type Coords = { lat: number; lng: number };

export type GamePhase = 'landing' | 'round' | 'roundResult' | 'finalResults';

export type MapInteractionMode = 'moving' | 'noMoving' | 'lockedView';

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

export type RoundSnapshot = {
  landmark: string;
  location: string;
  answer: Coords;
};

export type RoundOutcome = {
  roundIndex: number;
  round: RoundSnapshot;
  distanceKm: number;
  score: number;
  rating: string;
  guess: Coords | null;
};

export type Pin = Coords | null;
