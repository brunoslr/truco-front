import React, { useState } from 'react';
import PlayerHand from '../components/PlayerHand';
import StakesDisplay from '../components/StakesDisplay';
import ActionLog from '../components/ActionLog';
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
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <ActionLog actions={actions} />
      <StakesDisplay stakes={stakes} />
      <button onClick={onTruco} style={{ marginBottom: 16 }}>Truco!</button>
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
