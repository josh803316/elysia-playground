import React from 'react';
import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel';
import {definePreview} from '@storybook/react-vite';
import {ClerkProvider} from '@clerk/clerk-react';
import {MantineProvider} from '@mantine/core';
import {NoteProvider} from '../src/context/NoteContext';
import {theme} from '../src/theme';

import '../src/index.css';
import '@mantine/core/styles.css';
import '../src/App.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY for Storybook. Add it to react/.env.');
}

const preview = definePreview({
  addons: [addonPerformancePanel()],
  decorators: [
    (Story) => (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInUrl='/sign-in'
        signUpUrl='/sign-up'
        afterSignInUrl='/'
        afterSignUpUrl='/'
      >
        <MantineProvider theme={theme} defaultColorScheme='light'>
          <NoteProvider>
            <Story />
          </NoteProvider>
        </MantineProvider>
      </ClerkProvider>
    ),
  ],
});

export default preview;
