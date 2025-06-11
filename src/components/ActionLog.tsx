import React from 'react';
import styles from './ActionLog.module.scss';
import type { ActionLogEntry } from '../types/api';

export interface ActionLogProps {
  actions: ActionLogEntry[];
}

function renderAction(action: ActionLogEntry): string {
  switch (action.type) {
    case 'card-played':
      if (action.playerSeat !== null && action.card) {
        return `Player ${action.playerSeat + 1} played ${action.card.value} of ${action.card.suit}`;
      }
      return 'Card played';
    case 'button-pressed':
      if (action.playerSeat !== null && action.action) {
        return `Player ${action.playerSeat + 1} pressed ${action.action.charAt(0).toUpperCase() + action.action.slice(1)}`;
      }
      return 'Button pressed';
    case 'hand-result':
      if (action.handNumber !== null && action.winner) {
        return `Hand ${action.handNumber}: ${action.winner} won`;
      }
      return 'Hand completed';
    case 'game-started':
      return 'Game started';
    case 'turn-start':
      if (action.playerSeat !== null) {
        return `Player ${action.playerSeat + 1}'s turn`;
      }
      return 'Turn started';
    case 'truco-called':
      if (action.playerSeat !== null) {
        return `Player ${action.playerSeat + 1} called Truco`;
      }
      return 'Truco called';
    case 'truco-accepted':
      if (action.playerSeat !== null) {
        return `Player ${action.playerSeat + 1} accepted Truco`;
      }
      return 'Truco accepted';
    case 'truco-rejected':
      if (action.playerSeat !== null) {
        return `Player ${action.playerSeat + 1} rejected Truco`;
      }
      return 'Truco rejected';
    default:
      return 'Unknown action';
  }
}

const ActionLog: React.FC<ActionLogProps> = ({ actions }) => {
  // Show only the last 10 actions, latest first
  const visibleActions = [...actions].slice(-10).reverse();
  return (
    <div className={styles.actionLog}>
      <h3 className={styles.title}>Action Log</h3>
      {visibleActions.length === 0 ? (
        <div className={styles.empty}>No actions yet.</div>
      ) : (
        <ul className={styles.list}>
          {visibleActions.map((action, idx) => (
            <li key={idx} className={styles.item}>{renderAction(action)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionLog;
