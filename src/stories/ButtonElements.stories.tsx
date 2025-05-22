import type { Meta, StoryObj } from '@storybook/react';
import ButtonElements from '../components/ButtonElements';

const meta: Meta<typeof ButtonElements> = {
  title: 'Components/ButtonElements',
  component: ButtonElements,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: false,
    isRaiseEnabled: true,
    isRaiseDisabledForPlayer: false,
  },
};

export const TrucoCalled: Story = {
  args: {
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: true,
    isRaiseEnabled: true,
    isRaiseDisabledForPlayer: false,
  },
};

export const RaiseDisabled: Story = {
  args: {
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: true,
    isRaiseEnabled: false,
    isRaiseDisabledForPlayer: false,
  },
};

export const RaiseDisabledForPlayer: Story = {
  args: {
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: true,
    isRaiseEnabled: true,
    isRaiseDisabledForPlayer: true,
  },
};
