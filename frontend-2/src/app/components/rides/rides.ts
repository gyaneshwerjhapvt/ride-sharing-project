import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RideService } from '../../services/ride-services';
import { AuthService } from '../../services/auth.service';

interface Ride {
  ride_id: number;
  rider_id: number;
  driver_id: number | null;
  pickup_location: string;
  drop_location: string;
  status: 'requested' | 'ongoing' | 'completed' | 'cancelled';
  fare: number | null;
  start_time?: string;
  end_time?: string;
}

@Component({
  selector: 'app-rides',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rides.html',
  styleUrls: ['./rides.css']
})
export class RidesComponent implements OnInit {
  private rideService = inject(RideService);
  private authService = inject(AuthService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  
  rides: Ride[] = [];
  myRides: Ride[] = [];
  availableRides: Ride[] = [];
  
  // For requesting a ride (rider)
  pickupLocation = '';
  dropLocation = '';

  ngOnInit(): void {
    this.loadRides();
  }

  get isDriver(): boolean {
    return this.authService.isDriver();
  }

  get isRider(): boolean {
    return this.authService.isRider();
  }

  get currentUser() {
    return this.authService.getUser();
  }

  loadRides(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.rideService.getAllRides().subscribe({
      next: (rides: Ride[]) => {
        this.rides = rides;
        
        if (this.isRider) {
          this.myRides = rides.filter(r => r.rider_id === this.currentUser?.user_id);
        } else if (this.isDriver) {
          this.availableRides = rides.filter(r => r.status === 'requested');
          this.myRides = rides.filter(r => r.driver_id === this.currentUser?.user_id);
        }
        
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load rides');
        this.isLoading.set(false);
        console.error('Error loading rides:', err);
      }
    });
  }

  requestRide(): void {
    if (!this.pickupLocation.trim() || !this.dropLocation.trim()) {
      this.errorMessage.set('Please enter both pickup and drop locations.');
      return;
    }

    if (!this.currentUser) {
      this.errorMessage.set('Please login to request a ride.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.rideService.requestRide({
      rider_id: this.currentUser.user_id,
      pickup_location: this.pickupLocation.trim(),
      drop_location: this.dropLocation.trim()
    }).subscribe({
      next: (response) => {
        this.successMessage.set(`Ride requested successfully! Fare: ${response.ride_details?.calculated_fare || 'Calculating...'}`);
        this.pickupLocation = '';
        this.dropLocation = '';
        this.loadRides();
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || err.message || 'Failed to request ride');
        this.isLoading.set(false);
      }
    });
  }

  acceptRide(rideId: number): void {
    if (!this.currentUser) return;

    if (!confirm('Are you sure you want to accept this ride?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.rideService.acceptRide(rideId, this.currentUser.user_id).subscribe({
      next: () => {
        this.successMessage.set('Ride accepted successfully!');
        this.loadRides();
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || err.message || 'Failed to accept ride');
        this.isLoading.set(false);
      }
    });
  }

  completeRide(rideId: number): void {
    if (!confirm('Mark this ride as completed?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.rideService.completeRide(rideId).subscribe({
      next: () => {
        this.successMessage.set('Ride completed successfully!');
        this.loadRides();
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || err.message || 'Failed to complete ride');
        this.isLoading.set(false);
      }
    });
  }

  cancelRide(rideId: number): void {
    if (!confirm('Are you sure you want to cancel this ride?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.rideService.cancelRide(rideId).subscribe({
      next: () => {
        this.successMessage.set('Ride cancelled.');
        this.loadRides();
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || err.message || 'Failed to cancel ride');
        this.isLoading.set(false);
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'requested': return 'badge-requested';
      case 'ongoing': return 'badge-ongoing';
      case 'completed': return 'badge-completed';
      case 'cancelled': return 'badge-cancelled';
      default: return '';
    }
  }
}
