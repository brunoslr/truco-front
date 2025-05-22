import React, { useState } from 'react';
import PlayerHand from '../components/PlayerHand';
import StakesDisplay from '../components/StakesDisplay';
import { usePlayerHand } from '../services/playerHandProvider';

const Game: React.FC = () => {
  const initialCards = usePlayerHand();
  // Stakes start at 2, Truco sets to 4, each raise +4, max 12
  const [stakes, setStakes] = useState(2);

  const onTruco = () => {
    setStakes((prev) => {
      if (prev < 4) return 4;
      if (prev < 12) return Math.min(prev + 4, 12);
      return prev;
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <StakesDisplay stakes={stakes} />
      <button onClick={onTruco} style={{ marginBottom: 16 }}>Truco!</button>
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand initialCards={initialCards} />
    </div>
  );
};

export default Game;
