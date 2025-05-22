import React, { useState } from 'react';
import PlayerHand from '../components/PlayerHand';
import StakesDisplay from '../components/StakesDisplay';
import ActionLog from '../components/ActionLog';
import ButtonElements from '../components/ButtonElements';
import { usePlayerHand } from '../services/playerHandProvider';
import { getMockGameActions, getMockHandResults } from '../services/mockGameActions';
import type { ActionLogEntry } from '../services/mockGameActions';

const Game: React.FC = () => {
  const initialCards = usePlayerHand();
  // Stakes start at 2, Truco sets to 4, each raise +4, max 12
  const [stakes, setStakes] = useState(2);
  // Use mock actions for now
  const [actions, setActions] = useState<ActionLogEntry[]>(getMockGameActions());
  const handResults = getMockHandResults();

  // State for button logic
  const [isTrucoCalled, setIsTrucoCalled] = useState(false);
  // For now, raise is always enabled when Truco is called and stakes < 12
  const isRaiseEnabled = isTrucoCalled && stakes < 12;
  const [isRaiseDisabledForPlayer, setIsRaiseDisabledForPlayer] = useState(false); // Placeholder for team logic

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
    // Optionally disable further raises for player
    setIsRaiseDisabledForPlayer(true);
  };

  const onFold = () => {
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'fold' }
    ]);
    // Reset round state for demonstration
    setIsTrucoCalled(false);
    setIsRaiseDisabledForPlayer(false);
    setStakes(2);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <ActionLog actions={actions} />
      <StakesDisplay stakes={stakes} />
      <ButtonElements
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={isTrucoCalled}
        isRaiseEnabled={isRaiseEnabled}
        isRaiseDisabledForPlayer={isRaiseDisabledForPlayer}
      />
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand initialCards={initialCards} />
      {/* Display hand winners for demonstration */}
      <div style={{ marginTop: 16 }}>
        <strong>Previous Hands:</strong>
        <ul>
          {handResults.map(hr => (
            <li key={hr.handNumber}>Hand {hr.handNumber}: {hr.winner} won</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
