import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotesView from '../views/NotesView.vue';
import StorybookView from '../views/StorybookView.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/notes', component: NotesView },
    { path: '/storybook/vue', component: StorybookView },
  ],
});
