import type { Meta, StoryObj } from '@storybook/react';
import Card from '../components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    value: { control: 'text' },
    suit: { control: 'text' },
    highlight: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'A',
    suit: '♠',
    highlight: false,
  },
};

export const Highlighted: Story = {
  args: {
    value: '7',
    suit: '♥',
    highlight: true,
  },
};

export const KingOfDiamonds: Story = {
  args: {
    value: 'K',
    suit: '♦',
    highlight: false,
  },
};

export const QueenOfClubs: Story = {
  args: {
    value: 'Q',
    suit: '♣',
    highlight: false,
  },
};

export const HighlightedAceOfSpades: Story = {
  args: {
    value: 'A',
    suit: '♠',
    highlight: true,
  },
};