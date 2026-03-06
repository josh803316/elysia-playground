import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel/universal';
import { definePreview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

import '../src/style.css';

const VuePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{green.50}',
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

setup((app) => {
  app.use(PrimeVue, {
    theme: {
      preset: VuePreset,
      options: { darkModeSelector: false },
    },
  });
});

export default definePreview({
  addons: [addonPerformancePanel()],
});
