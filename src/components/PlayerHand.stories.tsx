import React from 'react';
import { Story, Meta } from '@storybook/react';
import App from '../App';

export default {
  title: 'App',
  component: App,
} as Meta;

const Template: Story = () => <App />;

export const Default = Template.bind({});
Default.args = {};