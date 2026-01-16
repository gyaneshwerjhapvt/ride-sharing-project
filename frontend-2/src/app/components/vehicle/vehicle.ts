import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../../services/vehicle-service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './vehicle.html',
  styleUrls: ['./vehicle.css']
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  driverId: number = 1; // set dynamically later

  newVehicle: Vehicle = {
    vehicleNumber: '',
    vehicleType: '',
    driverName: '',
    capacity: 0,
    status: 'Available'
  };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(): void {
    this.vehicleService.getVehicleByDriver(this.driverId).subscribe({
      next: (data) => {
        this.vehicles = [this.mapVehicleData(data)];
      },
      error: (err) => {
        console.error('Failed to load vehicle', err);
      }
    });
  }

  addVehicle(): void {
    const payload = {
      make: this.newVehicle.vehicleType,
      model: this.newVehicle.vehicleType,
      plate_number: this.newVehicle.vehicleNumber,
      color: '',
      year: new Date().getFullYear(),
      driver_id: this.driverId
    };

    this.vehicleService.registerVehicle(payload).subscribe({
      next: () => {
        this.loadVehicle();
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to add vehicle', err);
      }
    });
  }

  deleteVehicle(): void {
    this.vehicleService.deleteVehicle(this.driverId).subscribe({
      next: () => {
        this.vehicles = [];
      },
      error: (err) => {
        console.error('Failed to delete vehicle', err);
      }
    });
  }

  private mapVehicleData(data: any): Vehicle {
    return {
      id: data.vehicle_id,
      vehicleNumber: data.plate_number,
      vehicleType: data.make,
      driverName: '',
      capacity: 0,
      status: 'Available'
    };
  }

  private resetForm(): void {
    this.newVehicle = {
      vehicleNumber: '',
      vehicleType: '',
      driverName: '',
      capacity: 0,
      status: 'Available'
    };
  }
}
