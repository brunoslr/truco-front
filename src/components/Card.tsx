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
  const isRed = suit === 'Hearts' || suit === 'Diamonds';

  return (
    <div className={classNames(styles.card, { [styles.highlight]: highlight })}>
      {faceUp ? (
        <>
          <div className={styles.value} style={{ color: isRed ? '#d7263d' : '#222' }}>{value}</div>
          <div className={styles.suit} style={{ color: isRed ? '#d7263d' : '#222' }}>{suit}</div>
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