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
  team: "Player's Team" | "Opponent Team";
  hand: Card[];
  isDealer: boolean;
  isActive?: boolean; // NEW: highlight active player
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
  currentHand: number;  teamScores: { "Player's Team": number; "Opponent Team": number };
  turnWinner?: "Player's Team" | "Opponent Team";
  onPlayCard?: (index: number) => void;
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
  currentHand,  teamScores,
  turnWinner,
  onPlayCard,
}) => {
  const [actionLogMinimized, setActionLogMinimized] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
      {/* Main game area */}
      <div style={{ flex: 1 }}>
        <div className={styles.gameRoundContainer}>
          {/* Team scores */}
          <div className={styles.scoreTopLeft}>{`Player's Team: ${teamScores["Player's Team"]}`}</div>
          <div className={styles.scoreTopRight}>{`Opponent Team: ${teamScores["Opponent Team"]}`}</div>
          {/* Hand and dealer info */}
          <div className={styles.handInfo}>Hand {currentHand}</div>
          {/* Main layout: square formation */}
          <div className={styles.squareLayout}>
            {/* Top player */}
            <div className={styles.topPlayer}>
              <PlayerAvatar
                playerName={players[2].name}
                teamIndicator={players[2].team}
                hand={players[2].hand}
                onTruco={onTruco}
                onRaise={onRaise}
                onFold={onFold}
                isTrucoCalled={isTrucoCalled}
                isRaiseEnabled={isRaiseEnabled}
                isActive={!!players[2].isActive}
              />
              {players[2].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
            </div>
            {/* Left and right players with center area */}
            <div className={styles.middleRow}>
              <div className={styles.leftPlayer}>
                <PlayerAvatar
                  playerName={players[1].name}
                  teamIndicator={players[1].team}
                  hand={players[1].hand}
                  onTruco={onTruco}
                  onRaise={onRaise}
                  onFold={onFold}
                  isTrucoCalled={isTrucoCalled}
                  isRaiseEnabled={isRaiseEnabled}
                  isActive={!!players[1].isActive}
                />
                {players[1].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
              </div>
              <div className={styles.centerArea}>
                <StakesDisplay stakes={stakes} />
                {turnWinner && (
                  <div style={{ color: turnWinner === "Player's Team" ? '#4f8cff' : '#ff4f4f', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>
                    {turnWinner} wins the turn!
                  </div>
                )}
                <CardPlayArea playedCards={playedCards} />
              </div>
              <div className={styles.rightPlayer}>
                <PlayerAvatar
                  playerName={players[3].name}
                  teamIndicator={players[3].team}
                  hand={players[3].hand}
                  onTruco={onTruco}
                  onRaise={onRaise}
                  onFold={onFold}
                  isTrucoCalled={isTrucoCalled}
                  isRaiseEnabled={isRaiseEnabled}
                  isActive={!!players[3].isActive}
                />
                {players[3].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
              </div>
            </div>
            {/* Bottom player (You) */}
            <div className={styles.bottomPlayer}>
              <PlayerAvatar
                playerName={players[0].name}
                teamIndicator={players[0].team}
                hand={players[0].hand}
                onTruco={onTruco}
                onRaise={onRaise}
                onFold={onFold}
                isTrucoCalled={isTrucoCalled}
                isRaiseEnabled={isRaiseEnabled}
                isActive={!!players[0].isActive}
                onPlayCard={onPlayCard}
              />
              {players[0].isDealer && <div className={styles.dealerBadge}>Dealer</div>}
            </div>
          </div>
        </div>
      </div>
      {/* Action Log on the right with minimize/restore button */}
      <div style={{ minWidth: actionLogMinimized ? 40 : 280, maxWidth: 320, marginLeft: 24, transition: 'min-width 0.2s', position: 'relative', alignSelf: 'flex-start' }}>
        <button
          onClick={() => setActionLogMinimized(m => !m)}
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 2,
            background: '#ffe066',
            color: '#7a5c00',
            border: '1px solid #c9a227',
            borderRadius: 6,
            padding: '2px 8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: 14,
          }}
          aria-label={actionLogMinimized ? 'Restore Action Log' : 'Minimize Action Log'}
        >
          {actionLogMinimized ? '◀' : '▶'}
        </button>
        {!actionLogMinimized && (
          <ActionLog actions={actions} />
        )}
      </div>
    </div>
  );
};

export default GameRound;
