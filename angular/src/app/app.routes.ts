import { Routes } from '@angular/router';
import { PublicNotesComponent } from './components/public-notes/public-notes';
import { PrivateNotesComponent } from './components/private-notes/private-notes';
import { AdminComponent } from './components/admin/admin';

/**
 * Route definitions. The app currently renders a single view (App component) that shows
 * all sections; these routes support direct linking to /public, /private, or /admin
 * when/if the shell uses a router-outlet. Wildcard redirect ensures unknown paths go to public.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicNotesComponent },
  { path: 'private', component: PrivateNotesComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'public' },
];
