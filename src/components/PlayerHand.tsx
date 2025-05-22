import React, { useState } from 'react';
import Card from './Card';

interface PlayerHandProps {
  initialCards: { suit: string; value: string }[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ initialCards }) => {
  const [cards, setCards] = useState(initialCards);

  const playCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="player-hand">
      {cards.map((card, index) => (
        <div key={index} onClick={() => playCard(index)}>
          <Card suit={card.suit} value={card.value} />
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;
