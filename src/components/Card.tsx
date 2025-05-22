import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  value: string;
  suit: string;
  highlight: boolean;
}

const Card: React.FC<CardProps> = ({ value, suit, highlight }) => {
  return (
    <div className={classNames(styles.card, { [styles.highlight]: highlight })}>
      <div className={styles.value}>{value}</div>
      <div className={styles.suit}>{suit}</div>
    </div>
  );
};

export default Card;