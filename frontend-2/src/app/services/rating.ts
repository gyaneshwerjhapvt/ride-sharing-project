import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/ratings';

  submitRating(ratingData: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, ratingData);
  }
}
