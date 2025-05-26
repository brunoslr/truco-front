import React from 'react';
import { render } from '@testing-library/react';
import GameRound from './GameRound';

describe('GameRound', () => {
  const players = [
    { name: 'You', team: "Player's Team" as const, hand: [
      { value: '4', suit: 'Clubs' },
      { value: '7', suit: 'Hearts' },
      { value: '3', suit: 'Clubs' },
    ], isDealer: false },
    { name: 'AI 1', team: 'Opponent Team' as const, hand: [
      { value: 'A', suit: 'Spades' },
      { value: 'K', suit: 'Hearts' },
      { value: '2', suit: 'Diamonds' },
    ], isDealer: false },
    { name: 'Partner', team: "Player's Team" as const, hand: [
      { value: '5', suit: 'Clubs' },
      { value: '6', suit: 'Hearts' },
      { value: 'Q', suit: 'Spades' },
    ], isDealer: true },
    { name: 'AI 2', team: 'Opponent Team' as const, hand: [
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
    const { getAllByText, queryAllByText, getByText } = render(
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
        teamScores={{ "Player's Team": 6, 'Opponent Team': 4 }}
      />
    );
    // There are multiple 'You' labels (avatar and play area), so use getAllByText and check length
    expect(getAllByText('You').length).toBeGreaterThanOrEqual(1);
    expect(queryAllByText('AI 1').length).toBeGreaterThanOrEqual(1);
    expect(queryAllByText('Partner').length).toBeGreaterThanOrEqual(1);
    expect(queryAllByText('AI 2').length).toBeGreaterThanOrEqual(1);
    expect(getByText('Stakes:')).toBeInTheDocument();
    expect(getByText('Action Log')).toBeInTheDocument();
    expect(getByText('Hand 1')).toBeInTheDocument();
    expect(getByText("Player's Team: 6")).toBeInTheDocument();
    expect(getByText('Opponent Team: 4')).toBeInTheDocument();
    expect(getByText('Dealer')).toBeInTheDocument();
  });
});
