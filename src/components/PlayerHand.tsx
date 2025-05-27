import React from 'react';
import Card from './Card';
import styles from './Card.module.scss';

interface CardProps {
  suit: string;
  value: string;
}

interface PlayerHandProps {
  initialCards: CardProps[];
  direction?: 'horizontal' | 'vertical';
  faceUp?: boolean;
  onPlayCard?: (index: number) => void;
  isActive?: boolean;
  alwaysShowBack?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ initialCards, direction = 'horizontal', faceUp = true, onPlayCard, isActive, alwaysShowBack }) => {
  return (
    <div className={direction === 'vertical' ? styles['player-hand-vertical'] : styles['player-hand-horizontal']}>
      {initialCards.map((card, index) => (
        <div key={index} onClick={() => onPlayCard && isActive && onPlayCard(index)} style={onPlayCard && isActive ? { cursor: 'pointer' } : {}}>
          <Card value={card.value} suit={card.suit} faceUp={alwaysShowBack ? false : faceUp} />
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;