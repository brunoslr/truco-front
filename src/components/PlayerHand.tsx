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
  faceUp?: boolean;
  alwaysShowBack?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ 
  initialCards, 
  direction = 'horizontal', 
  onPlayCard, 
  isActive,
  faceUp,
  alwaysShowBack = false
}) => {  return (
    <div className={direction === 'vertical' ? styles['player-hand-vertical'] : styles['player-hand-horizontal']}>      {initialCards.map((card, index) => {
        // Determine if card should show face-up:
        // 1. If alwaysShowBack is true, always show back
        // 2. If faceUp prop is explicitly set, use that
        // 3. Otherwise, auto-detect based on card having value and suit
        let shouldShowFaceUp = true;
        
        if (alwaysShowBack) {
          shouldShowFaceUp = false;
        } else if (faceUp !== undefined) {
          shouldShowFaceUp = faceUp;
        } else {
          shouldShowFaceUp = !!(card.value && card.suit);
        }return (
          <div 
            key={index} 
            onClick={() => onPlayCard && isActive && onPlayCard(index)} 
            style={{
              cursor: onPlayCard && isActive ? 'pointer' : 'default',
              transition: 'transform 0.2s, filter 0.2s',
              filter: onPlayCard && isActive ? 'none' : 'grayscale(20%)',
              opacity: onPlayCard && isActive ? 1 : 0.8,
            }}
            onMouseEnter={(e) => {
              if (onPlayCard && isActive) {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (onPlayCard && isActive) {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.filter = 'none';
              }
            }}
            title={onPlayCard && isActive ? 'Click to play this card' : ''}
          >
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