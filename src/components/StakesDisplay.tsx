import React from 'react';
import styles from './StakesDisplay.module.scss';

export interface StakesDisplayProps {
  stakes: number;
}

const StakesDisplay: React.FC<StakesDisplayProps> = ({ stakes }) => {
  return (
    <div className={styles.stakesDisplay}>
      <span className={styles.label}>Stakes:</span>
      <span className={styles.value}>{stakes} {stakes === 1 ? 'point' : 'points'}</span>
    </div>
  );
};

export default StakesDisplay;
