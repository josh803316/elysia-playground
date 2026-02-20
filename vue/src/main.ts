import { createApp } from 'vue';
import { clerkPlugin } from '@clerk/vue';
import App from './App.vue';
import { router } from './router';
import './style.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in .env');
}

const app = createApp(App);

app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
});

app.use(router);
app.mount('#app');
