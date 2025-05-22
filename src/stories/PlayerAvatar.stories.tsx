import type { Meta, StoryObj } from '@storybook/react';
import PlayerAvatar from '../components/PlayerAvatar';

const mockHand = [
  { value: '4', suit: 'Clubs' },
  { value: '7', suit: 'Hearts' },
  { value: '3', suit: 'Clubs' },
];

const meta: Meta<typeof PlayerAvatar> = {
  title: 'Components/PlayerAvatar',
  component: PlayerAvatar,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const FriendlyTeam: Story = {
  args: {
    playerName: 'You',
    teamIndicator: 'blue',
    hand: mockHand,
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: false,
    isRaiseEnabled: true,
  },
};

export const AdversaryTeam: Story = {
  args: {
    playerName: 'Opponent',
    teamIndicator: 'red',
    hand: mockHand,
    onTruco: () => alert('Truco!'),
    onRaise: () => alert('Raise!'),
    onFold: () => alert('Fold!'),
    isTrucoCalled: true,
    isRaiseEnabled: false,
    isRaiseDisabledForPlayer: true,
  },
};
