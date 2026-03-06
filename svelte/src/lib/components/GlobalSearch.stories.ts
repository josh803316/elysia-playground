import type {Meta, StoryObj} from '@storybook/svelte';
import GlobalSearch from './GlobalSearch.svelte';

const meta = {
  title: 'Search/GlobalSearch',
  component: GlobalSearch,
} satisfies Meta<GlobalSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
