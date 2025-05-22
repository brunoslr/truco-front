import React, { useState } from 'react';
import Card from './Card';

interface CardProps {
  suit: string;
  value: string;
}

interface PlayerHandProps {
  initialCards: CardProps[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ initialCards }) => {
  const [cards, setCards] = useState<CardProps[]>(initialCards);

  const playCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
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