import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from '../components/Card';

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '4',
  suit: '♠',
  highlight: false,
};

export const Manilha = Template.bind({});
Manilha.args = {
  value: '4',
  suit: '♠',
  highlight: true,
};
