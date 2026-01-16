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
      query GetVehicleByDriver($driver_id: Int!) {
        getVehicleByDriver(driver_id: $driver_id) {
          vehicle_id
          plate_number
          make
          model
          color
          year
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { 
      query, 
      variables: { driver_id: driverId } 
    });
  }

  // Register vehicle
  registerVehicle(vehicle: any): Observable<any> {
    const mutation = `
      mutation RegisterVehicle($input: VehicleInput!) {
        registerVehicle(input: $input) {
          vehicle_id
          driver_id
          make
          model
          plate_number
          color
          year
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { 
      query: mutation, 
      variables: { input: vehicle } 
    });
  }

  // Update vehicle
  updateVehicle(driverId: number, vehicle: any): Observable<any> {
    const mutation = `
      mutation UpdateVehicle($driver_id: Int!, $input: VehicleUpdateInput!) {
        updateVehicle(driver_id: $driver_id, input: $input) {
          vehicle_id
          driver_id
          make
          model
          plate_number
          color
          year
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { 
      query: mutation, 
      variables: { driver_id: driverId, input: vehicle } 
    });
  }

  // Delete vehicle
  deleteVehicle(driverId: number): Observable<any> {
    const mutation = `
      mutation DeleteVehicle($driver_id: Int!) {
        deleteVehicle(driver_id: $driver_id)
      }
    `;
    return this.http.post<any>(this.baseUrl, { 
      query: mutation, 
      variables: { driver_id: driverId } 
    });
  }
}
