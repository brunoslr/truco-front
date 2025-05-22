import React from 'react';
import Card from './Card';
import styles from './CardPlayArea.module.scss';

interface PlayedCard {
  playerName: string;
  card: { value: string; suit: string } | null; // null if not played yet
}

interface CardPlayAreaProps {
  playedCards: PlayedCard[]; // Should be length 4, one per player
}

const CardPlayArea: React.FC<CardPlayAreaProps> = ({ playedCards }) => {
  return (
    <div className={styles.playAreaContainer}>
      {playedCards.map((slot, idx) => (
        <div key={idx} className={styles.cardSlot}>
          <div className={styles.playerLabel}>{slot.playerName}</div>
          {slot.card ? (
            <Card value={slot.card.value} suit={slot.card.suit} />
          ) : (
            <div className={styles.emptySlot}>Empty</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardPlayArea;
