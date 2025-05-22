import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PlayerHand, PlayerHandProps } from './PlayerHand';

export default {
  title: 'Components/PlayerHand',
  component: PlayerHand,
} as Meta;

const Template: Story<PlayerHandProps> = (args) => <PlayerHand {...args} />;

export const Default = Template.bind({});
Default.args = {
  cards: ['A♠', 'K♦', 'Q♣'],
  onCardPlay: (card) => console.log(card),
};