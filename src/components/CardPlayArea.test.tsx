import React from 'react';
import { render } from '@testing-library/react';
import CardPlayArea from './CardPlayArea';

describe('CardPlayArea', () => {
  it('renders four card slots with player names', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' }, team: "Player's Team" as const, isCurrentPlayer: true },
      { playerName: 'AI 1', card: null, team: 'Opponent Team' as const, isCurrentPlayer: false },
      { playerName: 'Partner', card: { value: '7', suit: 'Hearts' }, team: "Player's Team" as const, isCurrentPlayer: false },
      { playerName: 'AI 2', card: null, team: 'Opponent Team' as const, isCurrentPlayer: false },
    ];
    const { getByText } = render(<CardPlayArea playedCards={playedCards} />);
    expect(getByText('You')).toBeInTheDocument();
    expect(getByText('AI 1')).toBeInTheDocument();
    expect(getByText('Partner')).toBeInTheDocument();
    expect(getByText('AI 2')).toBeInTheDocument();
  });

  it('shows card values and "Waiting..." for unplayed slots', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' }, team: "Player's Team" as const, isCurrentPlayer: true },
      { playerName: 'AI 1', card: null, team: 'Opponent Team' as const, isCurrentPlayer: false },
      { playerName: 'Partner', card: { value: '7', suit: 'Hearts' }, team: "Player's Team" as const, isCurrentPlayer: false },
      { playerName: 'AI 2', card: null, team: 'Opponent Team' as const, isCurrentPlayer: false },
    ];
    const { getByText, getAllByText } = render(<CardPlayArea playedCards={playedCards} />);
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getAllByText('Waiting...').length).toBe(2);
  });

  it('applies team-based CSS classes correctly', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' }, team: "Player's Team" as const, isCurrentPlayer: true },
      { playerName: 'AI 1', card: null, team: 'Opponent Team' as const, isCurrentPlayer: false },
    ];
    const { container } = render(<CardPlayArea playedCards={playedCards} />);
    const slots = container.querySelectorAll('[class*="cardSlot"]');
    
    // First slot should have playerTeam and currentPlayer classes
    expect(slots[0]).toHaveClass('playerTeam');
    expect(slots[0]).toHaveClass('currentPlayer');
    
    // Second slot should have opponentTeam class
    expect(slots[1]).toHaveClass('opponentTeam');
    expect(slots[1]).not.toHaveClass('currentPlayer');
  });

  it('shows player names below cards', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' }, team: "Player's Team" as const, isCurrentPlayer: true },
    ];
    const { container } = render(<CardPlayArea playedCards={playedCards} />);
    const playerNameElement = container.querySelector('[class*="playerNameBelow"]');
    expect(playerNameElement).toHaveTextContent('You');
  });
});
