import React, { useState } from 'react';
import Card from './Card';

interface CardProps {
  suit: string;
  value: string;
}

interface PlayerHandProps {
  initialCards: CardProps[];
  direction?: 'horizontal' | 'vertical';
  faceUp?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ initialCards, direction = 'horizontal', faceUp = true }) => {
  const [cards, setCards] = useState<CardProps[]>(initialCards);

  const playCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} space-x-2`}>
      {cards.map((card, index) => (
        <div key={index} onClick={() => playCard(index)} className="cursor-pointer">
          <Card value={card.value} suit={card.suit} faceUp={faceUp} />
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;