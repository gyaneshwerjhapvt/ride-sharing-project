import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  role: 'rider' | 'driver';
  license_number?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  user = this.currentUser.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setUser(user: User): void {
    this.currentUser.set(user);
    // Store in localStorage for persistence
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUser(): User | null {
    return this.currentUser();
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isDriver(): boolean {
    return this.currentUser()?.role === 'driver';
  }

  isRider(): boolean {
    return this.currentUser()?.role === 'rider';
  }

  logout(): void {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          this.currentUser.set(user);
        } catch (e) {
          console.error('Error loading user from storage:', e);
          localStorage.removeItem('currentUser');
        }
      }
    }
  }
}
