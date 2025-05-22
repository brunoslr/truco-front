import React from 'react';
import styles from './ButtonElements.module.scss';

interface ButtonElementsProps {
  onTruco: () => void;
  onRaise: () => void;
  onFold: () => void;
  isTrucoCalled: boolean;
  isRaiseEnabled: boolean;
  isRaiseDisabledForPlayer?: boolean;
}

const ButtonElements: React.FC<ButtonElementsProps> = ({
  onTruco,
  onRaise,
  onFold,
  isTrucoCalled,
  isRaiseEnabled,
  isRaiseDisabledForPlayer = false,
}) => {
  return (
    <div className={styles.buttonGroup}>
      {!isTrucoCalled ? (
        <button className={styles.truco} onClick={onTruco}>
          Truco!
        </button>
      ) : (
        <button
          className={styles.raise}
          onClick={onRaise}
          disabled={!isRaiseEnabled || isRaiseDisabledForPlayer}
        >
          Raise
        </button>
      )}
      <button className={styles.fold} onClick={onFold}>
        Fold
      </button>
    </div>
  );
};

export default ButtonElements;
