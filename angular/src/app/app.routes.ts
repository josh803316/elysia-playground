import { Routes } from '@angular/router';
import { PublicNotesComponent } from './components/public-notes/public-notes';
import { PrivateNotesComponent } from './components/private-notes/private-notes';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicNotesComponent },
  { path: 'private', component: PrivateNotesComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'public' },
];
