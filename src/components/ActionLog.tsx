import React from 'react';
import styles from './ActionLog.module.scss';
import type { ActionLogEntry } from '../types/api';

export interface ActionLogProps {
  actions: ActionLogEntry[];
  players?: Array<{
    seat: number;
    name: string;
    team: string;
  }>;
}

function renderAction(action: ActionLogEntry, players?: Array<{ seat: number; name: string; team: string; }>): string {
  // Helper function to get player name by seat
  const getPlayerName = (seat: number | null): string => {
    if (seat === null) return 'Unknown';
    const player = players?.find(p => p.seat === seat);
    return player?.name || `Player ${seat + 1}`;
  };

  // Helper function to get team emoji
  const getTeamEmoji = (seat: number | null): string => {
    if (seat === null) return '';
    const player = players?.find(p => p.seat === seat);
    return player?.team === "Player's Team" ? '🔵' : '🔴';
  };

  switch (action.type) {    case 'card-played':
      if (action.playerSeat !== null) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        
        let cardText = '';
        if (action.card) {
          if (typeof action.card === 'object' && 'value' in action.card && 'suit' in action.card) {
            // Card is an object with value and suit
            cardText = `${action.card.value}${action.card.suit}`;
          } else if (typeof action.card === 'string') {
            // Card is a string like "5 of ♦" - clean it up
            cardText = action.card.replace(' of ', '');
          } else {
            cardText = 'a card';
          }
        } else {
          cardText = 'a card';
        }
        
        return `${teamEmoji} ${playerName} played ${cardText}`;
      }
      return '🃏 Card played';
      
    case 'button-pressed':
      if (action.playerSeat !== null && action.action) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        const actionText = action.action.charAt(0).toUpperCase() + action.action.slice(1);
        let actionEmoji = '';
        switch (action.action.toLowerCase()) {
          case 'truco': actionEmoji = '⚡'; break;
          case 'raise': actionEmoji = '📈'; break;
          case 'fold': actionEmoji = '🏳️'; break;
          default: actionEmoji = '🎯';
        }
        return `${teamEmoji} ${playerName} ${actionEmoji} ${actionText}`;
      }
      return '🎯 Button pressed';
      
    case 'hand-result':
      if (action.handNumber !== null && action.winner) {
        return `🏆 Hand ${action.handNumber}: ${action.winner} won!`;
      }
      return '🏁 Hand completed';
      
    case 'game-started':
      return '🎮 Game started';
      
    case 'turn-start':
      if (action.playerSeat !== null) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        return `${teamEmoji} ${playerName}'s turn`;
      }
      return '▶️ Turn started';
      
    case 'truco-called':
      if (action.playerSeat !== null) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        return `${teamEmoji} ${playerName} ⚡ called Truco!`;
      }
      return '⚡ Truco called';
      
    case 'truco-accepted':
      if (action.playerSeat !== null) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        return `${teamEmoji} ${playerName} ✅ accepted Truco`;
      }
      return '✅ Truco accepted';
        case 'truco-rejected':
      if (action.playerSeat !== null) {
        const playerName = getPlayerName(action.playerSeat);
        const teamEmoji = getTeamEmoji(action.playerSeat);
        return `${teamEmoji} ${playerName} ❌ rejected Truco`;
      }
      return '❌ Truco rejected';
        case 'turn-result':
      if (action.winner && action.winnerTeam) {
        // Map team identifiers to friendly names and emojis
        let teamEmoji = '';
        let teamName = '';
        
        if (action.winnerTeam === 'Team 1' || action.winnerTeam === "Player's Team") {
          teamEmoji = '🔵';
          teamName = "Player's Team";
        } else if (action.winnerTeam === 'Team 2' || action.winnerTeam === "Opponent Team") {
          teamEmoji = '🔴';
          teamName = "Opponent Team";
        } else {
          teamEmoji = '🏆';
          teamName = action.winnerTeam;
        }
        
        return `${teamEmoji} Turn won by ${action.winner} (${teamName})`;
      } else if (action.winner) {
        return `🏁 Turn won by ${action.winner}`;
      }
      return '🏁 Turn completed';
      
    default:
      return '❓ Unknown action';
  }
}

const ActionLog: React.FC<ActionLogProps> = ({ actions, players }) => {
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
            <li key={idx} className={styles.item}>
              <div className={styles.actionText}>
                {renderAction(action, players)}
              </div>
              <div className={styles.timestamp}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionLog;
