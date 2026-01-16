// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RatingComponent } from './components/rating/rating';
import { PaymentComponent } from './components/payment/payment';

export const routes: Routes = [
  { path: 'rate', component: RatingComponent },
  { path: 'payment', component: PaymentComponent },

  // optional: make / land on /payment for now:
  { path: '', redirectTo: 'payment', pathMatch: 'full' },
  { path: '**', redirectTo: 'payment' }
];
