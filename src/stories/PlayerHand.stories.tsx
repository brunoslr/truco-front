import type { Meta, StoryObj } from '@storybook/react';
import PlayerHand from '../components/PlayerHand';
import { getMockPlayerHand } from '../services/mockBackend';

const meta: Meta<typeof PlayerHand> = {
  title: 'Components/PlayerHand',
  component: PlayerHand,
};
export default meta;

type Story = StoryObj<typeof meta>;

const mockCards = getMockPlayerHand().map(card => ({ value: card.rank, suit: card.suit }));

export const Default: Story = {
  args: {
    initialCards: mockCards,
  },
};