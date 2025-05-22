import React from 'react';
import PlayerAvatar from './PlayerAvatar';
import CardPlayArea from './CardPlayArea';
import StakesDisplay from './StakesDisplay';
import ActionLog from './ActionLog';
import styles from './GameRound.module.scss';

interface Card {
  value: string;
  suit: string;
}

interface Player {
  name: string;
  team: 'blue' | 'red';
  hand: Card[];
  isDealer: boolean;
}

interface PlayedCard {
  playerName: string;
  card: Card | null;
}

interface GameRoundProps {
  players: Player[]; // length 4
  playedCards: PlayedCard[]; // length 4
  stakes: number;
  actions: any[];
  onTruco: () => void;
  onRaise: () => void;
  onFold: () => void;
  isTrucoCalled: boolean;
  isRaiseEnabled: boolean;
  currentHand: number;
  teamScores: { blue: number; red: number };
}

const GameRound: React.FC<GameRoundProps> = ({
  players,
  playedCards,
  stakes,
  actions,
  onTruco,
  onRaise,
  onFold,
  isTrucoCalled,
  isRaiseEnabled,
  currentHand,
  teamScores,
}) => {
  // Arrange players: 0 = bottom (You), 1 = left, 2 = top, 3 = right
  return (
    <div className={styles.gameRoundContainer}>
      {/* Team scores */}
      <div className={styles.scoreTopLeft}>Blue: {teamScores.blue}</div>
      <div className={styles.scoreTopRight}>Red: {teamScores.red}</div>
      {/* Hand and dealer info */}
      <div className={styles.handInfo}>Hand {currentHand}</div>
      {/* Main layout: square formation */}
      <div className={styles.squareLayout}>
        {/* Top player */}
        <div className={styles.topPlayer}>
          <PlayerAvatar {...players[2]}
            onTruco={onTruco}
            onRaise={onRaise}
            onFold={onFold}
            isTrucoCalled={isTrucoCalled}
            isRaiseEnabled={isRaiseEnabled}
          />
          {players[2].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
        </div>
        {/* Left and right players with center area */}
        <div className={styles.middleRow}>
          <div className={styles.leftPlayer}>
            <PlayerAvatar {...players[1]}
              onTruco={onTruco}
              onRaise={onRaise}
              onFold={onFold}
              isTrucoCalled={isTrucoCalled}
              isRaiseEnabled={isRaiseEnabled}
            />
            {players[1].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
          </div>
          <div className={styles.centerArea}>
            <StakesDisplay stakes={stakes} />
            <CardPlayArea playedCards={playedCards} />
          </div>
          <div className={styles.rightPlayer}>
            <PlayerAvatar {...players[3]}
              onTruco={onTruco}
              onRaise={onRaise}
              onFold={onFold}
              isTrucoCalled={isTrucoCalled}
              isRaiseEnabled={isRaiseEnabled}
            />
            {players[3].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
          </div>
        </div>
        {/* Bottom player (You) */}
        <div className={styles.bottomPlayer}>
          <PlayerAvatar {...players[0]}
            onTruco={onTruco}
            onRaise={onRaise}
            onFold={onFold}
            isTrucoCalled={isTrucoCalled}
            isRaiseEnabled={isRaiseEnabled}
          />
          {players[0].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
        </div>
      </div>
      {/* Action log at the bottom */}
      <div className={styles.actionLogArea}>
        <ActionLog actions={actions} />
      </div>
    </div>
  );
};

export default GameRound;
