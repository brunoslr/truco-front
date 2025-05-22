import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlayerHand from '../components/PlayerHand';

export default {
  title: 'PlayerHand',
  component: PlayerHand,
} as ComponentMeta<typeof PlayerHand>;

const Template: ComponentStory<typeof PlayerHand> = (args) => <PlayerHand {...args} />;

export const DefaultHand = Template.bind({});
DefaultHand.args = {
  initialCards: [
    { suit: 'hearts', value: 'A' },
    { suit: 'spades', value: 'K' },
    { suit: 'diamonds', value: 'Q' },
  ],
};