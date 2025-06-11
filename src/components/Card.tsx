import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  value: string;
  suit: string;
  highlight?: boolean;
  faceUp?: boolean;
}

const Card: React.FC<CardProps> = ({ value, suit, highlight = false, faceUp = true }) => {
  // Check if suit is red - handle both text names and Unicode symbols
  const isRed = suit === 'Hearts' || suit === 'Diamonds' || suit === '♥' || suit === '♦';
  
  // Get suit icon - if already a Unicode symbol, return as-is, otherwise convert
  const getSuitIcon = (suit: string) => {
    // If already a Unicode symbol, return it
    if (['♥', '♦', '♣', '♠'].includes(suit)) {
      return suit;
    }
    // Convert text names to symbols
    switch (suit.toLowerCase()) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return suit;
    }
  };

  return (
    <div className={classNames(styles.card, { [styles.highlight]: highlight })}>
      {faceUp ? (
        <>
          <div className={styles.value} style={{ color: isRed ? '#d7263d' : '#222' }}>{value}</div>
          <div className={styles.suit} style={{ color: isRed ? '#d7263d' : '#222' }}>
            {getSuitIcon(suit)}
          </div>
        </>
      ) : (
        <div className={styles.cardBack}>
          <span role="img" aria-label="card back" className={styles.cardBackIcon}>🂠</span>
        </div>
      )}
    </div>
  );
};

export default Card;