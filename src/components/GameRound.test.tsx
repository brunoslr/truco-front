import React from 'react';
import { render } from '@testing-library/react';
import GameRound from './GameRound';

describe('GameRound', () => {
  const players = [
    { name: 'You', team: 'blue', hand: [
      { value: '4', suit: 'Clubs' },
      { value: '7', suit: 'Hearts' },
      { value: '3', suit: 'Clubs' },
    ], isDealer: false },
    { name: 'AI 1', team: 'red', hand: [
      { value: 'A', suit: 'Spades' },
      { value: 'K', suit: 'Hearts' },
      { value: '2', suit: 'Diamonds' },
    ], isDealer: false },
    { name: 'Partner', team: 'blue', hand: [
      { value: '5', suit: 'Clubs' },
      { value: '6', suit: 'Hearts' },
      { value: 'Q', suit: 'Spades' },
    ], isDealer: true },
    { name: 'AI 2', team: 'red', hand: [
      { value: 'J', suit: 'Clubs' },
      { value: '9', suit: 'Hearts' },
      { value: '8', suit: 'Diamonds' },
    ], isDealer: false },
  ];
  const playedCards = [
    { playerName: 'You', card: { value: '4', suit: 'Clubs' } },
    { playerName: 'AI 1', card: null },
    { playerName: 'Partner', card: { value: '5', suit: 'Clubs' } },
    { playerName: 'AI 2', card: null },
  ];
  const actions = [
    { type: 'card-played', player: 'You', card: '4 of Clubs' },
    { type: 'card-played', player: 'Partner', card: '5 of Clubs' },
    { type: 'button-pressed', player: 'You', action: 'truco' },
  ];

  it('renders all player avatars, card play area, stakes, and action log', () => {
    const { getByText } = render(
      <GameRound
        players={players}
        playedCards={playedCards}
        stakes={4}
        actions={actions}
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={true}
        isRaiseEnabled={true}
        currentHand={1}
        teamScores={{ blue: 6, red: 4 }}
      />
    );
    expect(getByText('You')).toBeInTheDocument();
    expect(getByText('AI 1')).toBeInTheDocument();
    expect(getByText('Partner')).toBeInTheDocument();
    expect(getByText('AI 2')).toBeInTheDocument();
    expect(getByText('Stakes:')).toBeInTheDocument();
    expect(getByText('Action Log')).toBeInTheDocument();
    expect(getByText('Hand 1')).toBeInTheDocument();
    expect(getByText('Blue: 6')).toBeInTheDocument();
    expect(getByText('Red: 4')).toBeInTheDocument();
    expect(getByText('Dealer')).toBeInTheDocument();
  });
});
