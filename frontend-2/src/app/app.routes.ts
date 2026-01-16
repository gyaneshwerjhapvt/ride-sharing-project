import { Routes } from '@angular/router';
import { UserAuthComponent } from './components/users/users';

export const routes: Routes = [
  { path: 'auth', component: UserAuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirect default path to login
  { path: '**', redirectTo: 'auth' } // Wildcard route for 404s
];