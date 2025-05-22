import React, { useState } from 'react';
import PlayerHand from '../components/PlayerHand';
import StakesDisplay from '../components/StakesDisplay';
import { usePlayerHand } from '../services/playerHandProvider';

const Game: React.FC = () => {
  const [stakes, setStakes] = useState(2);
  const initialCards = usePlayerHand();

  return (
    <div style={{ padding: 20 }}>
      <h1>Truco Mineiro Game</h1>
      <StakesDisplay stakes={stakes} />
      <h2>Game Page</h2>
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand initialCards={initialCards} />
      {/* Add logic here to change the stakes value based on game events */}
    </div>
  );
};

export default Game;
