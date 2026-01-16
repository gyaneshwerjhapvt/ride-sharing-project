import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = 'http://localhost:3000/api/vehicles'; 
  // change according to your backend

  constructor(private http: HttpClient) {}

  // Get vehicle by driver
  getVehicleByDriver(driverId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/driver/${driverId}`);
  }

  // Register vehicle
  registerVehicle(vehicle: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, vehicle);
  }

  // Update vehicle
  updateVehicle(driverId: number, vehicle: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/driver/${driverId}`, vehicle);
  }

  // Delete vehicle
  deleteVehicle(driverId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/driver/${driverId}`);
  }
}
