import type { Meta, StoryObj } from '@storybook/vue3';
import NotesGrid from './NotesGrid.vue';
import type { Note } from '../types/note';

const meta: Meta<typeof NotesGrid> = {
  title: 'Notes/NotesGrid',
  component: NotesGrid,
};

export default meta;

type Story = StoryObj<typeof NotesGrid>;

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'First note',
    content: 'Content of the first note.',
    userId: null,
    isPublic: 'true',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    user: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
  },
  {
    id: '2',
    title: 'Second note',
    content: 'Another note with longer content.',
    userId: 'user_2',
    isPublic: 'false',
    createdAt: '2025-01-16T14:30:00Z',
    updatedAt: '2025-01-16T14:30:00Z',
  },
];

export const Empty: Story = {
  args: {
    notes: [],
    emptyMessage: 'No notes yet',
  },
};

export const WithNotes: Story = {
  args: {
    notes: sampleNotes,
    emptyMessage: 'No notes yet',
    showUser: true,
  },
};
