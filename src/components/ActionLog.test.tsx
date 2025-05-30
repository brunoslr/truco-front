import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionLog from './ActionLog';
import type { ActionLogEntry } from '../services/mockGameActions';

describe('ActionLog', () => {
  it('renders empty state when no actions', () => {
    render(<ActionLog actions={[]} />);
    expect(screen.getByText('No actions yet.')).toBeInTheDocument();
  });

  it('renders a list of actions (latest first, max 10)', () => {
    const actions: ActionLogEntry[] = Array.from({ length: 12 }, (_, i) => ({
      type: 'card-played',
      player: `Player ${i + 1}`,
      card: `${i + 1} of Clubs`,
    }));
    render(<ActionLog actions={actions} />);
    // Only the last 10 actions should be shown, in reverse order
    expect(screen.queryByText('Player 1 played 1 of Clubs')).not.toBeInTheDocument();
    expect(screen.queryByText('Player 2 played 2 of Clubs')).not.toBeInTheDocument();
    expect(screen.getByText('Player 12 played 12 of Clubs')).toBeInTheDocument();
    expect(screen.getByText('Player 3 played 3 of Clubs')).toBeInTheDocument();
    // The first rendered item should be Player 12 played 12 of Clubs
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Player 12 played 12 of Clubs');
    expect(items[items.length - 1]).toHaveTextContent('Player 3 played 3 of Clubs');
  });

  it('renders card played, button pressed, and hand result actions', () => {
    const actions: ActionLogEntry[] = [
      { type: 'card-played', player: 'Player', card: '4 of Clubs' },
      { type: 'button-pressed', player: 'AI', action: 'truco' },
      { type: 'hand-result', handNumber: 1, winner: 'Player' },
    ];
    render(<ActionLog actions={actions} />);
    expect(screen.getByText('Player played 4 of Clubs')).toBeInTheDocument();
    expect(screen.getByText('AI pressed Truco')).toBeInTheDocument();
    expect(screen.getByText('Hand 1: Player won')).toBeInTheDocument();
  });
});
