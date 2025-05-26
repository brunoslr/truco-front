import type { Meta, StoryObj } from '@storybook/react';
import GameRound from '../components/GameRound';

const players = [
  { name: 'You', team: "Player's Team", hand: [
    { value: '4', suit: 'Clubs' },
    { value: '7', suit: 'Hearts' },
    { value: '3', suit: 'Clubs' },
  ], isDealer: false },
  { name: 'AI 1', team: 'Opponent Team', hand: [
    { value: 'A', suit: 'Spades' },
    { value: 'K', suit: 'Hearts' },
    { value: '2', suit: 'Diamonds' },
  ], isDealer: false },
  { name: 'Partner', team: "Player's Team", hand: [
    { value: '5', suit: 'Clubs' },
    { value: '6', suit: 'Hearts' },
    { value: 'Q', suit: 'Spades' },
  ], isDealer: true },
  { name: 'AI 2', team: 'Opponent Team', hand: [
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

const meta: Meta<typeof GameRound> = {
  title: 'Components/GameRound',
  component: GameRound,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    players,
    playedCards,
    stakes: 4,
    actions,
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: true,
    isRaiseEnabled: true,
    currentHand: 1,
    teamScores: { "Player's Team": 6, 'Opponent Team': 4 },
  },
};
