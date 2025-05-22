import React from 'react';
import { render } from '@testing-library/react';
import CardPlayArea from './CardPlayArea';

describe('CardPlayArea', () => {
  it('renders four card slots with player names', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' } },
      { playerName: 'AI 1', card: null },
      { playerName: 'Partner', card: { value: '7', suit: 'Hearts' } },
      { playerName: 'AI 2', card: null },
    ];
    const { getByText } = render(<CardPlayArea playedCards={playedCards} />);
    expect(getByText('You')).toBeInTheDocument();
    expect(getByText('AI 1')).toBeInTheDocument();
    expect(getByText('Partner')).toBeInTheDocument();
    expect(getByText('AI 2')).toBeInTheDocument();
  });

  it('shows card values and "Empty" for unplayed slots', () => {
    const playedCards = [
      { playerName: 'You', card: { value: '4', suit: 'Clubs' } },
      { playerName: 'AI 1', card: null },
      { playerName: 'Partner', card: { value: '7', suit: 'Hearts' } },
      { playerName: 'AI 2', card: null },
    ];
    const { getByText } = render(<CardPlayArea playedCards={playedCards} />);
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('Empty')).toBeInTheDocument();
  });
});
