import { useGameState } from './hooks/useGameState';
import { FinalResultsScreen } from './screens/FinalResultsScreen';
import { LandingScreen } from './screens/LandingScreen';
import { RoundResultScreen } from './screens/RoundResultScreen';
import { RoundScreen } from './screens/RoundScreen';

export default function App() {
  const game = useGameState();
  const { state } = game;

  switch (state.phase) {
    case 'landing':
      return <LandingScreen onPlay={game.startGame} />;

    case 'round':
      return (
        <RoundScreen
          round={game.currentRound}
          roundNumber={state.roundIndex + 1}
          secondsRemaining={state.secondsRemaining}
          pin={state.pin}
          hintVisible={state.hintVisible}
          onPinPlace={game.setPin}
          onToggleHint={game.toggleHint}
          onNavigate={game.navigate}
          onSubmit={game.submitGuess}
        />
      );

    case 'roundResult':
      if (!state.lastOutcome) return null;
      return (
        <RoundResultScreen
          outcome={state.lastOutcome}
          onNext={game.nextRound}
        />
      );

    case 'finalResults':
      return (
        <FinalResultsScreen
          outcomes={state.outcomes}
          onPlayAgain={game.playAgain}
        />
      );

    default:
      return null;
  }
}
