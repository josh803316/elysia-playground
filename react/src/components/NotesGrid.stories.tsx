import type {Meta, StoryObj} from '@storybook/react';
import NotesGrid from './NotesGrid';

const meta: Meta<typeof NotesGrid> = {
  title: 'Notes/NotesGrid',
  component: NotesGrid,
};

export default meta;

type Story = StoryObj<typeof NotesGrid>;

const sampleNotes = [
  {
    id: '1',
    title: 'First note',
    content: 'This is the content of the first note.',
    userId: null,
    isPublic: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    user: {firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com'},
  },
  {
    id: '2',
    title: 'Second note',
    content: 'Another note with some longer content to show how the card wraps text.',
    userId: 'user_2',
    isPublic: false,
    createdAt: '2025-01-16T14:30:00Z',
    updatedAt: '2025-01-16T14:30:00Z',
  },
  {
    id: '3',
    title: 'Public anonymous note',
    content: 'Short note.',
    userId: null,
    isPublic: 'true',
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-17T09:00:00Z',
  },
];

export const Empty: Story = {
  args: {
    notes: [],
    emptyMessage: 'No notes yet.',
  },
};

export const WithNotes: Story = {
  args: {
    notes: sampleNotes,
    emptyMessage: 'No notes yet.',
    showUser: true,
  },
};
