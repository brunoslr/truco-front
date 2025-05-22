import React from 'react';
import styles from './ActionLog.module.scss';
import type { ActionLogEntry } from '../services/mockGameActions';

export interface ActionLogProps {
  actions: ActionLogEntry[];
}

function renderAction(action: ActionLogEntry): string {
  switch (action.type) {
    case 'card-played':
      return `${action.player} played ${action.card}`;
    case 'button-pressed':
      return `${action.player} pressed ${action.action.charAt(0).toUpperCase() + action.action.slice(1)}`;
    case 'hand-result':
      return `Hand ${action.handNumber}: ${action.winner} won`;
    default:
      return '';
  }
}

const ActionLog: React.FC<ActionLogProps> = ({ actions }) => {
  return (
    <div className={styles.actionLog}>
      <h3 className={styles.title}>Action Log</h3>
      <ul className={styles.list}>
        {actions.map((action, idx) => (
          <li key={idx} className={styles.item}>{renderAction(action)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActionLog;
