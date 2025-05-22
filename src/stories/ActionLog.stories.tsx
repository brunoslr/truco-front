import type { Meta, StoryObj } from '@storybook/react';
import ActionLog from '../components/ActionLog';

const meta: Meta<typeof ActionLog> = {
  title: 'Components/ActionLog',
  component: ActionLog,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [
      'Player played 4 of Clubs',
      'AI played 7 of Hearts',
      'Player called Truco',
      'AI accepted Truco',
      'Player won the hand',
    ],
  },
};

export const Empty: Story = {
  args: {
    actions: [],
  },
};
