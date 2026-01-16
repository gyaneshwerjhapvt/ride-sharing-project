import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:3000/graphql';

  constructor(private http: HttpClient) {}

  submitRating(rating: Rating): Observable<any> {
    const mutation = `
      mutation {
        submitRating(input: {
          ride_id: ${rating.ride_id}
          given_by: ${rating.given_by}
          given_to: ${rating.given_to}
          score: ${rating.score}
          comment: "${rating.comment}"
        }) {
          id
          score
          comment
        }
      }
    `;
    
    return this.http.post<any>(this.apiUrl, { query: mutation });
  }

  getRating(rideId: number): Observable<any> {
    const query = `
      query {
        getRating(ride_id: ${rideId}) {
          id
          score
          comment
          given_by
          given_to
        }
      }
    `;
    
    return this.http.post<any>(this.apiUrl, { query });
  }
}
