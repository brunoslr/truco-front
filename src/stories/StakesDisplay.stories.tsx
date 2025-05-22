import type { Meta, StoryObj } from '@storybook/react';
import StakesDisplay from '../components/StakesDisplay';

const meta: Meta<typeof StakesDisplay> = {
  title: 'Components/StakesDisplay',
  component: StakesDisplay,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const TwoPoints: Story = {
  args: { stakes: 2 },
};
export const FourPoints: Story = {
  args: { stakes: 4 },
};
export const EightPoints: Story = {
  args: { stakes: 8 },
};
export const TwelvePoints: Story = {
  args: { stakes: 12 },
};
