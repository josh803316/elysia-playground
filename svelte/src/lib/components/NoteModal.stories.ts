import type {Meta, StoryObj} from '@storybook/svelte';
import NoteModal from './NoteModal.svelte';

const meta = {
  title: 'Notes/NoteModal',
  component: NoteModal,
} satisfies Meta<NoteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};
