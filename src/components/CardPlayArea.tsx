import React from 'react';
import Card from './Card';
import styles from './CardPlayArea.module.scss';

interface PlayedCard {
  playerName: string;
  card: { value: string; suit: string } | null; // null if not played yet
  team?: "Player's Team" | "Opponent Team"; // Optional team information
  isCurrentPlayer?: boolean; // Optional flag to identify current player
}

interface CardPlayAreaProps {
  playedCards: PlayedCard[]; // Should be length 4, one per player
}

const CardPlayArea: React.FC<CardPlayAreaProps> = ({ playedCards }) => {
  return (
    <div className={styles.playAreaContainer}>
      {playedCards.map((slot, idx) => (
        <div 
          key={idx} 
          className={`${styles.cardSlot} ${
            slot.team === "Player's Team" ? styles.playerTeam : styles.opponentTeam
          } ${slot.isCurrentPlayer ? styles.currentPlayer : ''}`}
        >
          {slot.card ? (
            <>
              <Card value={slot.card.value} suit={slot.card.suit} faceUp={true} />
              <div className={styles.playerNameBelow}>{slot.playerName}</div>
            </>
          ) : (
            <>
              <div className={styles.emptySlot}>
                <span className={styles.waitingText}>Waiting...</span>
              </div>
              <div className={styles.playerNameBelow}>{slot.playerName}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardPlayArea;
