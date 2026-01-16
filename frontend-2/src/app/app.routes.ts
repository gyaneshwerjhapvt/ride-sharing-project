// frontend-2/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserAuthComponent } from './components/users/users';
import { RatingComponent } from './components/rating/rating';
import { PaymentComponent } from './components/payment/payment';
import { VehicleComponent } from './components/vehicle/vehicle';
import { RidesComponent } from './components/rides/rides';

export const routes: Routes = [
  { path: 'auth', component: UserAuthComponent },
  { path: 'rides', component: RidesComponent },
  { path: 'rate', component: RatingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];
