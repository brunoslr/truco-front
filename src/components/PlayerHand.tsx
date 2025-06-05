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
  onPlayCard?: (index: number) => void;
  isActive?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ initialCards, direction = 'horizontal', onPlayCard, isActive }) => {
  console.log('PlayerHand received cards:', initialCards);
  
  return (
    <div className={direction === 'vertical' ? styles['player-hand-vertical'] : styles['player-hand-horizontal']}>      {initialCards.map((card, index) => {
        // If card has value and suit, show it face-up, otherwise show card back
        const shouldShowFaceUp = !!(card.value && card.suit);
        
        console.log(`Card ${index}:`, card, 'shouldShowFaceUp:', shouldShowFaceUp);
        
        return (
          <div key={index} onClick={() => onPlayCard && isActive && onPlayCard(index)} style={onPlayCard && isActive ? { cursor: 'pointer' } : {}}>
            <Card 
              value={card.value || ''} 
              suit={card.suit || ''} 
              faceUp={shouldShowFaceUp} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerHand;