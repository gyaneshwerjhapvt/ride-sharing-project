import { Routes } from '@angular/router';
import { RatingComponent } from './components/rating/rating';
import { VehicleComponent } from './components/vehicle/vehicle';

export const routes: Routes = [
  { path: '', component: VehicleComponent },
  { path: 'rate', component: RatingComponent },
  { path: 'vehicle', component: VehicleComponent }
];
