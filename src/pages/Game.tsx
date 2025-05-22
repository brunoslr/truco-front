import React, { useState } from 'react';
import GameRound from '../components/GameRound';
import { usePlayerHand } from '../services/playerHandProvider';
import { getMockGameActions } from '../services/mockGameActions';
import type { ActionLogEntry } from '../services/mockGameActions';

const Game: React.FC = () => {
  const initialCards = usePlayerHand();
  // Stakes start at 2, Truco sets to 4, each raise +4, max 12
  const [stakes, setStakes] = useState(2);
  // Use mock actions for now
  const [actions, setActions] = useState<ActionLogEntry[]>(getMockGameActions());

  // Demo data for GameRound integration
  const players = [
    { name: 'You', team: 'blue' as const, hand: initialCards, isDealer: false },
    { name: 'AI 1', team: 'red' as const, hand: [], isDealer: false },
    { name: 'Partner', team: 'blue' as const, hand: [], isDealer: true },
    { name: 'AI 2', team: 'red' as const, hand: [], isDealer: false },
  ];
  const playedCards = [
    { playerName: 'You', card: { value: '4', suit: 'Clubs' } },
    { playerName: 'AI 1', card: null },
    { playerName: 'Partner', card: { value: '7', suit: 'Hearts' } },
    { playerName: 'AI 2', card: null },
  ];
  const teamScores = { blue: 6, red: 4 };
  const currentHand = 1;

  // State for button logic
  const [isTrucoCalled, setIsTrucoCalled] = useState(false);
  // For now, raise is always enabled when Truco is called and stakes < 12
  const isRaiseEnabled = isTrucoCalled && stakes < 12;

  const onTruco = () => {
    setStakes((prev) => {
      if (prev < 4) return 4;
      if (prev < 12) return Math.min(prev + 4, 12);
      return prev;
    });
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'truco' }
    ]);
    setIsTrucoCalled(true);
  };

  const onRaise = () => {
    setStakes((prev) => (prev < 12 ? Math.min(prev + 4, 12) : prev));
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'raise' }
    ]);
  };

  const onFold = () => {
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'fold' }
    ]);
    // Reset round state for demonstration
    setIsTrucoCalled(false);
    setStakes(2);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <GameRound
        players={players}
        playedCards={playedCards}
        stakes={stakes}
        actions={actions}
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={isTrucoCalled}
        isRaiseEnabled={isRaiseEnabled}
        currentHand={currentHand}
        teamScores={teamScores}
      />
      {/* Old UI below for reference, can be removed after validation */}
      {/* 
      <ActionLog actions={actions} />
      <StakesDisplay stakes={stakes} />
      <ButtonElements
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={isTrucoCalled}
        isRaiseEnabled={isRaiseEnabled}
      />
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand initialCards={initialCards} />
      <div style={{ marginTop: 16 }}>
        <strong>Previous Hands:</strong>
        <ul>
          {handResults.map(hr => (
            <li key={hr.handNumber}>Hand {hr.handNumber}: {hr.winner} won</li>
          ))}
        </ul>
      </div>
      */}
    </div>
  );
};

export default Game;
