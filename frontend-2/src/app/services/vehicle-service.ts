import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = 'http://localhost:3000/graphql';

  constructor(private http: HttpClient) {}

  // Get vehicle by driver
  getVehicleByDriver(driverId: number): Observable<any> {
    const query = `
      query {
        getVehicleByDriver(driver_id: ${driverId}) {
          vehicle_id
          plate_number
          make
          model
          color
          year
        }
      }
    `;
    return this.http.post<any>(`${this.baseUrl}`, { query });
  }

  // Register vehicle
  registerVehicle(vehicle: any): Observable<any> {
    const mutation = `
      mutation {
        registerVehicle(input: {
          make: "${vehicle.make}"
          model: "${vehicle.model}"
          plate_number: "${vehicle.plate_number}"
          color: "${vehicle.color}"
          year: ${vehicle.year}
          driver_id: ${vehicle.driver_id}
        }) {
          vehicle_id
          make
          plate_number
        }
      }
    `;
    return this.http.post<any>(`${this.baseUrl}`, { query: mutation });
  }

  // Update vehicle
  updateVehicle(driverId: number, vehicle: any): Observable<any> {
    const mutation = `
      mutation {
        updateVehicle(input: {
          driver_id: ${driverId}
          make: "${vehicle.make}"
          plate_number: "${vehicle.plate_number}"
          color: "${vehicle.color}"
        }) {
          vehicle_id
          make
          plate_number
        }
      }
    `;
    return this.http.post<any>(`${this.baseUrl}`, { query: mutation });
  }

  // Delete vehicle
  deleteVehicle(driverId: number): Observable<any> {
    const mutation = `
      mutation {
        deleteVehicle(driver_id: ${driverId}) {
          success
        }
      }
    `;
    return this.http.post<any>(`${this.baseUrl}`, { query: mutation });
  }
}
