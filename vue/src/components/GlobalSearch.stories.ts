import type { Meta, StoryObj } from '@storybook/vue3';
import GlobalSearch from './GlobalSearch.vue';

const meta: Meta<typeof GlobalSearch> = {
  title: 'Search/GlobalSearch',
  component: GlobalSearch,
};

export default meta;

type Story = StoryObj<typeof GlobalSearch>;

export const Default: Story = {};
