/**
 * Vue app entry: Clerk, PrimeVue (Aura + green primary), and Vue Router.
 * Theme is configured here so it's global; router handles all navigation.
 */
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import { clerkPlugin } from '@clerk/vue';
import App from './App.vue';
import { router } from './router';
import './style.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Clerk publishable key. Copy vue/.env.example to vue/.env and set VITE_CLERK_PUBLISHABLE_KEY (get it from https://dashboard.clerk.com).'
  );
}

// Vue-green accent on top of Aura
const VuePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '{green.50}',
      100: '{green.100}',
      200: '{green.200}',
      300: '{green.300}',
      400: '{green.400}',
      500: '#42b883',
      600: '#33a06f',
      700: '#278a5b',
      800: '#1c7349',
      900: '#145c39',
      950: '{green.950}',
    },
  },
});

const app = createApp(App);

app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.use(PrimeVue, {
  theme: {
    preset: VuePreset,
    options: { darkModeSelector: false },
  },
});

app.use(router);
app.mount('#app');
