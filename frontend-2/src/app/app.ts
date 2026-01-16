import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user = this.authService.user;

  ngOnInit(): void {
    // Load user from localStorage on app init
    this.authService.loadUserFromStorage();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isDriver(): boolean {
    return this.authService.isDriver();
  }

  isRider(): boolean {
    return this.authService.isRider();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }
}