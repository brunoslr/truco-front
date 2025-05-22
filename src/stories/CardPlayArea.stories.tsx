import type { Meta, StoryObj } from '@storybook/react';
import CardPlayArea from '../components/CardPlayArea';

const meta: Meta<typeof CardPlayArea> = {
  title: 'Components/CardPlayArea',
  component: CardPlayArea,
};
export default meta;

type Story = StoryObj<typeof meta>;

const playedCards = [
  { playerName: 'You', card: { value: '4', suit: 'Clubs' } },
  { playerName: 'AI 1', card: { value: '7', suit: 'Hearts' } },
  { playerName: 'Partner', card: null },
  { playerName: 'AI 2', card: { value: '3', suit: 'Clubs' } },
];

export const Default: Story = {
  args: {
    playedCards,
  },
};

export const AllEmpty: Story = {
  args: {
    playedCards: [
      { playerName: 'You', card: null },
      { playerName: 'AI 1', card: null },
      { playerName: 'Partner', card: null },
      { playerName: 'AI 2', card: null },
    ],
  },
};
