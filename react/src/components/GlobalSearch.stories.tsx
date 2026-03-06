import type {Meta, StoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';
import {GlobalSearch} from './GlobalSearch';

const meta: Meta<typeof GlobalSearch> = {
  title: 'Search/GlobalSearch',
  component: GlobalSearch,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GlobalSearch>;

export const Default: Story = {};
