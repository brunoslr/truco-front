import type { Meta, StoryObj } from '@storybook/react';
import PlayerHand from '../components/PlayerHand';

const mockCards = [
  { value: '4', suit: 'Clubs' },
  { value: '7', suit: 'Hearts' },
  { value: '3', suit: 'Clubs' },
];

const meta: Meta<typeof PlayerHand> = {
  title: 'Components/PlayerHand',
  component: PlayerHand,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialCards: mockCards,
  },
};

export const Horizontal: Story = {
  args: {
    initialCards: mockCards,
    direction: 'horizontal',
    faceUp: true,
  },
};

export const Vertical: Story = {
  args: {
    initialCards: mockCards,
    direction: 'vertical',
    faceUp: true,
  },
};

export const Hidden: Story = {
  args: {
    initialCards: mockCards,
    direction: 'horizontal',
    faceUp: false,
  },
};