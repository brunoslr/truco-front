import React from 'react';
import { Meta, Story } from '@storybook/react';
import StakesDisplay, { StakesDisplayProps } from '../components/StakesDisplay';

export default {
  title: 'Components/StakesDisplay',
  component: StakesDisplay,
} as Meta;

const Template: Story<StakesDisplayProps> = (args) => <StakesDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  stakes: 2,
};

export const FourPoints = Template.bind({});
FourPoints.args = {
  stakes: 4,
};

export const SixPoints = Template.bind({});
SixPoints.args = {
  stakes: 6,
};
