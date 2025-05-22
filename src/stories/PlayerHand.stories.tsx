import type { Meta, StoryObj } from '@storybook/react';
import PlayerHand from '../components/PlayerHand';
import { getMockPlayerHand } from '../services/mockBackend';

const mockCards = getMockPlayerHand().map(card => ({ value: card.rank, suit: card.suit }));

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