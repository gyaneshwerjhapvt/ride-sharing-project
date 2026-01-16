// src/app/components/rating/rating.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from '../../models/rating.model';
import { RatingService } from '../../services/rating-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css'],
})
export class RatingComponent {
  private ratingService = inject(RatingService);
  private authService = inject(AuthService);
  
  showAddModal = signal(false);
  showViewModal = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  
  newRating: {
    ride_id: number | null;
    given_to: number | null;
    score: number | null;
    comment: string;
  } = { ride_id: null, given_to: null, score: null, comment: '' };
  
  ratings: Rating[] = [];
  
  get currentUser() {
    return this.authService.getUser();
  }

  openAddRatingModal(): void {
    this.showAddModal.set(true);
    this.errorMessage.set(null);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
    this.newRating = { ride_id: null, given_to: null, score: null, comment: '' };
    this.errorMessage.set(null);
  }

  openViewRatingsModal(): void {
    this.loadRatings();
    this.showViewModal.set(true);
  }

  closeViewModal(): void {
    this.showViewModal.set(false);
  }

  submitRating(): void {
    const rideId = Number(this.newRating.ride_id);
    const givenTo = Number(this.newRating.given_to);
    const score = Number(this.newRating.score);

    if (
      isNaN(rideId) ||
      rideId <= 0 ||
      isNaN(givenTo) ||
      givenTo <= 0 ||
      isNaN(score) ||
      score < 1 ||
      score > 5
    ) {
      this.errorMessage.set('Valid Ride ID, User ID to Rate (positive integers), and Rating (1-5) are required.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    if (!this.currentUser) {
      this.errorMessage.set('Please login to submit a rating.');
      this.isLoading.set(false);
      return;
    }

    const input = {
      ride_id: rideId,
      given_by: this.currentUser.user_id,
      given_to: givenTo,
      score: score,
      comment: this.newRating.comment || null,
    };

    this.ratingService.addRating(input).subscribe({
      next: (response) => {
        if (response.data?.addRating) {
          alert('Rating submitted successfully!');
          this.closeAddModal();
        } else if (response.errors) {
          this.errorMessage.set(`Error: ${response.errors[0].message}`);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(`Error: ${err.message || 'Failed to submit rating'}`);
        this.isLoading.set(false);
        console.error('Rating submission error:', err);
      },
    });
  }

  private loadRatings(): void {
    if (!this.currentUser) {
      this.errorMessage.set('Please login to view ratings.');
      return;
    }

    this.isLoading.set(true);
    this.ratingService.getRatingsByUser(this.currentUser.user_id).subscribe({
      next: (response) => {
        if (response.data?.getRatingsByUser) {
          this.ratings = response.data.getRatingsByUser || [];
        } else if (response.errors) {
          this.ratings = [];
          this.errorMessage.set(`Error: ${response.errors[0].message}`);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.ratings = [];
        this.errorMessage.set(`Error: ${err.message || 'Failed to load ratings'}`);
        this.isLoading.set(false);
        console.error('Load ratings error:', err);
      },
    });
  }
}
