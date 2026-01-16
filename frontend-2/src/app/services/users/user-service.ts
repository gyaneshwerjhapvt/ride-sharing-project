import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/users';

  // Enterprise pattern: Methods use inline type definitions to avoid separate files
  register(userData: any): Observable<{ message: string; user: any }> {
    return this.http.post<{ message: string; user: any }>(`${this.API_URL}/register`, userData);
  }

  login(credentials: any): Observable<{ message: string; user: any }> {
    return this.http.post<{ message: string; user: any }>(`${this.API_URL}/login`, credentials);
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${id}`);
  }
}