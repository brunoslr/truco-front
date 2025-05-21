import type { Meta, StoryObj } from '@storybook/react';
import Card from '../components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
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
