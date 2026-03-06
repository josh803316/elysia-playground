import type {Meta, StoryObj} from '@storybook/react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
