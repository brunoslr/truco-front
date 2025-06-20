import { render, screen } from '@testing-library/react';
import ActionLog from './ActionLog';
import type { ActionLogEntry } from '../types/api';

describe('ActionLog', () => {
  it('renders empty state when no actions', () => {
    render(<ActionLog actions={[]} />);
    expect(screen.getByText('No actions yet.')).toBeInTheDocument();
  });  it('renders a list of actions (latest first, max 10)', () => {
    const actions: ActionLogEntry[] = Array.from({ length: 12 }, (_, i) => ({
      type: 'card-played',
      playerSeat: i,
      card: { value: `${i + 1}`, suit: '♣' },
      action: null,
      handNumber: null,
      winner: null,
      winnerTeam: null,
    }));
    render(<ActionLog actions={actions} />);    // Only the last 10 actions should be shown, in reverse order
    expect(screen.queryByText(/Player 1 played 1♣/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Player 2 played 2♣/)).not.toBeInTheDocument();
    expect(screen.getByText(/Player 12 played 12♣/)).toBeInTheDocument();
    expect(screen.getByText(/Player 3 played 3♣/)).toBeInTheDocument();
    // The first rendered item should be Player 12 played 12♣
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Player 12 played 12♣');
    expect(items[items.length - 1]).toHaveTextContent('Player 3 played 3♣');
  });  it('renders card played, button pressed, and hand result actions', () => {
    const actions: ActionLogEntry[] = [
      { 
        type: 'card-played', 
        playerSeat: 0, 
        card: { value: '4', suit: '♣' },
        action: null,
        handNumber: null,
        winner: null,
        winnerTeam: null
      },
      { 
        type: 'button-pressed', 
        playerSeat: 1, 
        card: null,
        action: 'truco',
        handNumber: null,
        winner: null,
        winnerTeam: null
      },
      { 
        type: 'hand-result', 
        playerSeat: null,
        card: null, 
        action: null,
        handNumber: 1, 
        winner: 'Player',
        winnerTeam: null
      },
    ];    render(<ActionLog actions={actions} />);
    expect(screen.getByText(/Player 1 played 4♣/)).toBeInTheDocument();
    expect(screen.getByText(/Player 2.*Truco/)).toBeInTheDocument();
    expect(screen.getByText(/Hand 1: Player won/)).toBeInTheDocument();
  });
});
