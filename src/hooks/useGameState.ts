import { useCallback, useEffect, useReducer, useRef } from 'react';
import { GAME_CONFIG } from '../data/gameConfig';
import { MOCK_ROUNDS } from '../data/mockRounds';
import type { Coords, GamePhase, Pin, RoundOutcome } from '../types/game';
import { haversineKm } from '../utils/distance';
import { ratingFromScore, scoreFromDistance } from '../utils/scoring';

type NavigationDirection = 'up' | 'down' | 'left' | 'right' | 'center';
type NavigationCommand = { direction: NavigationDirection; sequence: number } | null;

type State = {
  phase: GamePhase;
  roundIndex: number;
  secondsRemaining: number;
  pin: Pin;
  hintVisible: boolean;
  lastNavigationCommand: NavigationCommand;
  outcomes: RoundOutcome[];
  lastOutcome: RoundOutcome | null;
};

type Action =
  | { type: 'START_GAME' }
  | { type: 'TICK' }
  | { type: 'SET_PIN'; coords: Coords }
  | { type: 'TOGGLE_HINT' }
  | { type: 'NAVIGATE'; direction: NavigationDirection }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'NEXT_ROUND' }
  | { type: 'PLAY_AGAIN' };

const initialState: State = {
  phase: 'landing',
  roundIndex: 0,
  secondsRemaining: GAME_CONFIG.roundDurationSec,
  pin: null,
  hintVisible: false,
  lastNavigationCommand: null,
  outcomes: [],
  lastOutcome: null,
};

function submitPin(state: State, pin: Coords): State {
  const round = MOCK_ROUNDS[state.roundIndex];
  const distanceKm = haversineKm(pin, round.answer);
  const score = scoreFromDistance(distanceKm);
  const outcome: RoundOutcome = {
    roundIndex: state.roundIndex,
    distanceKm,
    score,
    rating: ratingFromScore(score),
    guess: pin,
  };
  return {
    ...state,
    phase: 'roundResult',
    lastOutcome: outcome,
    outcomes: [...state.outcomes, outcome],
    hintVisible: false,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        phase: 'round',
      };

    case 'TICK':
      if (state.phase !== 'round') return state;
      if (state.secondsRemaining <= 1) {
        if (state.pin) return submitPin(state, state.pin);
        const outcome: RoundOutcome = {
          roundIndex: state.roundIndex,
          distanceKm: GAME_CONFIG.maxDistanceKm,
          score: 0,
          rating: ratingFromScore(0),
          guess: null,
        };
        return {
          ...state,
          phase: 'roundResult',
          secondsRemaining: 0,
          lastOutcome: outcome,
          outcomes: [...state.outcomes, outcome],
          hintVisible: false,
        };
      }
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };

    case 'SET_PIN':
      return { ...state, pin: action.coords };

    case 'TOGGLE_HINT':
      return { ...state, hintVisible: !state.hintVisible };

    case 'NAVIGATE':
      return {
        ...state,
        lastNavigationCommand: {
          direction: action.direction,
          sequence: (state.lastNavigationCommand?.sequence ?? 0) + 1,
        },
      };

    case 'SUBMIT_GUESS':
      if (!state.pin) return state;
      return submitPin(state, state.pin);

    case 'NEXT_ROUND': {
      const isLast = state.roundIndex >= GAME_CONFIG.totalRounds - 1;
      if (isLast) {
        return { ...state, phase: 'finalResults' };
      }
      return {
        ...state,
        phase: 'round',
        roundIndex: state.roundIndex + 1,
        secondsRemaining: GAME_CONFIG.roundDurationSec,
        pin: null,
        hintVisible: false,
        lastNavigationCommand: null,
        lastOutcome: null,
      };
    }

    case 'PLAY_AGAIN':
      return initialState;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigationSequenceRef = useRef(0);

  useEffect(() => {
    if (state.phase !== 'round') return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [state.phase]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const setPin = useCallback((coords: Coords) => dispatch({ type: 'SET_PIN', coords }), []);
  const toggleHint = useCallback(() => dispatch({ type: 'TOGGLE_HINT' }), []);
  const navigate = useCallback((direction: NavigationDirection) => {
    navigationSequenceRef.current += 1;
    const command = { direction, sequence: navigationSequenceRef.current };
    dispatch({ type: 'NAVIGATE', direction });
    return command;
  }, []);
  const submitGuess = useCallback(() => dispatch({ type: 'SUBMIT_GUESS' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'PLAY_AGAIN' }), []);

  const currentRound = MOCK_ROUNDS[state.roundIndex];

  return {
    state,
    currentRound,
    rounds: MOCK_ROUNDS,
    startGame,
    setPin,
    toggleHint,
    navigate,
    submitGuess,
    nextRound,
    playAgain,
  };
}
