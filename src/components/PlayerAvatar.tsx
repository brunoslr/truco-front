import React from 'react';
import PlayerHand from './PlayerHand';
import ButtonElements from './ButtonElements';
import styles from './PlayerAvatar.module.scss';

interface CardProps {
  suit: string;
  value: string;
}

interface PlayerAvatarProps {
  playerName: string;
  teamIndicator: "Player's Team" | "Opponent Team";
  hand: CardProps[];
  onTruco: () => void;
  onRaise: () => void;
  onFold: () => void;
  isTrucoCalled: boolean;
  isRaiseEnabled: boolean;
  isRaiseDisabledForPlayer?: boolean;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  playerName,
  teamIndicator,
  hand,
  onTruco,
  onRaise,
  onFold,
  isTrucoCalled,
  isRaiseEnabled,
  isRaiseDisabledForPlayer = false,
}) => {
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.teamIndicator} data-team={teamIndicator === "Player's Team" ? 'blue' : 'red'} />
      <div className={styles.playerName}>{playerName}</div>
      <div className={styles.handWrapper}>
        <PlayerHand initialCards={hand} />
      </div>
      <ButtonElements
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={isTrucoCalled}
        isRaiseEnabled={isRaiseEnabled}
        isRaiseDisabledForPlayer={isRaiseDisabledForPlayer}
      />
    </div>
  );
};

export default PlayerAvatar;
