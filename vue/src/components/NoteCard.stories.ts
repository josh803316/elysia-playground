import type { Meta, StoryObj } from '@storybook/vue3';
import NoteCard from './NoteCard.vue';
import type { Note } from '../types/note';

const sampleNote: Note = {
  id: '1',
  title: 'Sample note',
  content: 'This is the note content. It can be longer.',
  userId: null,
  isPublic: 'true',
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-15T10:00:00Z',
  user: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
};

const meta: Meta<typeof NoteCard> = {
  title: 'Notes/NoteCard',
  component: NoteCard,
};

export default meta;

type Story = StoryObj<typeof NoteCard>;

export const Default: Story = {
  args: {
    note: sampleNote,
    showUser: true,
  },
};

export const Anonymous: Story = {
  args: {
    note: { ...sampleNote, user: undefined, userId: null },
    showUser: false,
  },
};
