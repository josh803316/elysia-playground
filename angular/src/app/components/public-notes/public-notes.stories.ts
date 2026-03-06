import type { Meta, StoryObj } from '@storybook/angular';
import { PublicNotesComponent } from './public-notes';

const meta: Meta<PublicNotesComponent> = {
  title: 'Notes/PublicNotes',
  component: PublicNotesComponent,
};

export default meta;

type Story = StoryObj<PublicNotesComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<app-public-notes></app-public-notes>',
  }),
};
