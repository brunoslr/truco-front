import React from 'react';
import PlayerHand from './PlayerHand';

export default function Game() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand />
    </div>
  );
}