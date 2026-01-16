// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class RideServices {
  
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiUrl = 'http://localhost:3000/api/rides';

  constructor(private http: HttpClient) {}

  requestRide(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/request`, payload);
  }

  getAllRides(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  acceptRide(rideId: number, driverId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/accept/${rideId}`, { driver_id: driverId });
  }

  completeRide(rideId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/complete/${rideId}`, {});
  }

  cancelRide(rideId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${rideId}`, {});
  }
}