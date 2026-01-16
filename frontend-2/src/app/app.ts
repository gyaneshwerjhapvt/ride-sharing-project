import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html', // Fixed: Matches your file name 'app.html'
  styles: [`
    .main-header { display: flex; justify-content: space-between; padding: 1rem; background: #1a202c; color: white; }
    .nav-link { color: white; text-decoration: none; }
    .content-area { min-height: 80vh; padding: 2rem; }
    .main-footer { text-align: center; padding: 1rem; background: #f7fafc; }
  `]
})
export class App {} // Renamed to 'App' to fix TS2305 error